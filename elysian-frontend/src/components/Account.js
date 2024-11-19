import React, { useState, useEffect } from 'react';
import ky from 'ky';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './AuthForm.module.css';

function Account() {
    const { logIn, logOut, isLoggedIn, isVendorLoggedIn, vendorName } = useAuth();
    const { loadCart, clearCart } = useCart();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [vendorInfo, setVendorInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/vendor/check-session', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setVendorInfo(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error:', err);
            setLoading(false);
        });
    }, []);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/login' : '/api/signup';
        const payload = { email, password };

        try {
            const response = await ky.post(`http://localhost:5000${endpoint}`, { json: payload }).json();
            if (response.message === 'Login successful') {
                logIn();
                setMessage('');
                await loadCart();
                navigate('/');
            } else {
                setMessage(response.message);
            }
        } catch (error) {
            setMessage(isLogin ? 'Login failed' : 'Sign-up failed');
            console.error(`Error during ${isLogin ? 'login' : 'sign-up'}:`, error);
        }
    };

    const handleLogout = async () => {
        await logOut();
        await clearCart();
        navigate('/');
    };

    const navigateToVendorPortal = () => {
        navigate('/vendor/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles["auth-form-container"]}>
            {isLoggedIn || isVendorLoggedIn ? (
                <div>
                    <h2>Welcome Back{isVendorLoggedIn ? `, ${vendorName}` : ''}!</h2>
                    {isVendorLoggedIn && (
                        <Link to="/vendor-dashboard" className={styles["dashboard-link"]}>
                            Go to Vendor Dashboard
                        </Link>
                    )}
                    <button onClick={handleLogout} className={styles["auth-button"]}>Log Out</button>
                </div>
            ) : (
                <>
                    <h2 className={styles["auth-form-title"]}>
                        {isLogin ? 'Login' : 'Sign Up'}
                    </h2>
                    <form onSubmit={handleSubmit} className={styles["auth-form"]}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles["auth-input"]}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles["auth-input"]}
                        />
                        <button type="submit" className={styles["auth-button"]}>
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                    {message && <p className={styles["auth-message"]}>{message}</p>}
                    
                    <div className={styles["form-footer"]}>
                        <p>
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                            <button onClick={toggleForm} className={styles["toggle-button"]}>
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>

                        <div className={styles["vendor-section"]}>
                            <h3>Are you a Vendor?</h3>
                            <button onClick={navigateToVendorPortal} className={styles["vendor-button"]}>
                                Access Vendor Portal
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Account;
