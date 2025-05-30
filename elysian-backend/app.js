const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // For session management

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow cookies from frontend
app.use(bodyParser.json());
app.use(cookieParser());

// Configure session middleware
app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true, sameSite: 'strict' }
}));


// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your MySQL username
    password: 'Adsfjlk;122',  // Replace with your MySQL password
    database: 'elysiantest'  // Your database name
});

db.connect(err => {
    if (err) {
        console.log('DB connection error:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// API route to get all products, optionally filtered by category
app.get('/api/products', (req, res) => {
    const category = req.query.category;
    let query = 'SELECT * FROM products';
    const params = [];

    if (category) {
        query += ' WHERE category = ?';
        params.push(category);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

// API route to get a product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM products WHERE id = ?';

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// User Registration Route with Unique Email Check
app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(checkEmailQuery, [email], async (err, results) => {
            if (err) {
                console.error('Database error during email check:', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            
            if (results.length > 0) {
                res.status(400).json({ error: 'Email already in use' });
                return;
            }
            
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
            db.query(insertUserQuery, [email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    res.status(500).json({ error: 'Database error' });
                } else {
                    res.status(201).json({ message: 'User registered successfully' });
                }
            });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Error during registration' });
    }
});

// User Login Route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else if (results.length === 0) {
            res.status(401).json({ error: 'Invalid email or password' });
        } else {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.userId = user.user_id; // Set session userId
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ error: 'Invalid email or password' });
            }
        }
    });
});

// Route to add item to cart (POST /api/cart)
app.post('/api/cart', (req, res) => {
    const { product_id, quantity } = req.body;
    const userId = req.session.userId || null; // For logged-in users
    const sessionId = req.session.id || null; // For guests

    if (!userId && !sessionId) {
        return res.status(401).json({ error: 'User not logged in or session not available' });
    }

    const query = `
        INSERT INTO cart_items (user_id, session_id, product_id, quantity)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?;
    `;
    const params = [userId, sessionId, product_id, quantity, quantity];

    db.query(query, params, (err) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ message: 'Item added to cart' });
        }
    });
});


// Route to get cart items (GET /api/cart)
app.get('/api/cart', (req, res) => {
    const userId = req.session.userId; // Assume user is logged in with session

    if (!userId) {
        return res.status(401).json({ error: 'User not logged in' });
    }

    const query = `
        SELECT c.*, p.name, p.price, p.image 
        FROM cart_items c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?;
    `;
    const params = [userId];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results); // Send the cart items to the frontend
        }
    });
});


// Route to clear cart items (DELETE /api/cart)
app.delete('/api/cart', (req, res) => {
    const userId = req.session.userId || null;
    const sessionId = req.session.id || null;

    if (!userId && !sessionId) {
        return res.status(401).json({ error: 'User not logged in or session not available' });
    }

    const query = `DELETE FROM cart_items WHERE user_id = ? OR session_id = ?`;
    const params = [userId, sessionId];

    db.query(query, params, (err) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ message: 'Cart cleared successfully' });
        }
    });
});

// User Logout Route
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.status(200).json({ message: 'Logout successful' });
    });
});

// Session Check Route
app.get('/api/check-session', (req, res) => {
    if (req.session.userId) {
        res.json({ isAuthenticated: true, userId: req.session.userId });
    } else {
        res.json({ isAuthenticated: false });
    }
});
// Route to add item to wishlist (POST /api/wishlist)
app.post('/api/wishlist', (req, res) => {
    const { product_id } = req.body;
    const userId = req.session.userId; // For logged-in users

    if (!userId) {
        return res.status(401).json({ error: 'User not logged in' });
    }

    const query = `
        INSERT INTO wishlist_items (user_id, product_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE product_id = product_id; 
    `;
    const params = [userId, product_id];

    db.query(query, params, (err) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ message: 'Item added to wishlist' });
        }
    });
});

// Route to get wishlist items (GET /api/wishlist)
app.get('/api/wishlist', (req, res) => {
    const userId = req.session.userId; // Assume user is logged in with session

    if (!userId) {
        return res.status(401).json({ error: 'User not logged in' });
    }

    const query = `
        SELECT w.*, p.name, p.price, p.image 
        FROM wishlist_items w
        JOIN products p ON w.product_id = p.id
        WHERE w.user_id = ?;
    `;
    const params = [userId];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results); // Send the wishlist items to the frontend
        }
    });
});

// Route to remove item from wishlist (DELETE /api/wishlist/:id)
app.delete('/api/wishlist/:id', (req, res) => {
    const userId = req.session.userId; // Assume user is logged in with session
    const productId = req.params.id;

    if (!userId) {
        return res.status(401).json({ error: 'User not logged in' });
    }

    const query = `DELETE FROM wishlist_items WHERE user_id = ? AND product_id = ?`;
    const params = [userId, productId];

    db.query(query, params, (err) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ message: 'Item removed from wishlist' });
        }
    });
});


// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
