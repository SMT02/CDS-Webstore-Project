import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ky from 'ky';
import styles from './AuthForm.module.css';
import { useAuth } from '../context/AuthContext';

function VendorLogin() {
    const { vendorLogIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ky.post('http://localhost:5000/api/vendor/login', {
                json: { email, password },
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).json();

            if (response.message === 'Login successful') {
                // Get vendor details after successful login
                const vendorDetails = await ky.get('http://localhost:5000/api/vendor/check-session', {
                    credentials: 'include'
                }).json();
                
                vendorLogIn(vendorDetails.vendorName);
                setMessage('Login successful! Redirecting...');
                setTimeout(() => navigate('/vendor-dashboard'), 1000);
            }
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        }
    };

    const navigateToVendorSignup = () => {
        navigate('/vendor-signup');
    };

    return (
        <div className={styles["auth-form-container"]}>
            <h2 className={styles["auth-form-title"]}>Vendor Login</h2>
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
                    Login
                </button>
            </form>
            {message && <p className={styles["auth-message"]}>{message}</p>}
            
            <div className={styles["vendor-section"]}>
                <h3>New to Elysian?</h3>
                <button onClick={navigateToVendorSignup} className={styles["vendor-button"]}>
                    Apply as Vendor
                </button>
            </div>
        </div>
    );
}

export default VendorLogin;