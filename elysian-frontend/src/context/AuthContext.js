import React, { createContext, useContext, useState, useEffect } from 'react';
import ky from 'ky';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isVendorLoggedIn, setIsVendorLoggedIn] = useState(false);
    const [vendorName, setVendorName] = useState('');

    useEffect(() => {
        const savedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
        const savedVendorLoginStatus = localStorage.getItem('isVendorLoggedIn') === 'true';

        // Check session status with Ky
        const checkSession = async () => {
            try {
                const response = await ky.get('http://localhost:5000/api/check-session', { credentials: 'include' }).json();
                if (response.isAuthenticated) {
                    setIsLoggedIn(true);
                    localStorage.setItem('isLoggedIn', 'true');
                } else {
                    setIsLoggedIn(savedLoginStatus);
                }
            } catch (error) {
                console.error('Error checking user session:', error);
                setIsLoggedIn(false);
            }

            // Check vendor session
            try {
                const vendorResponse = await ky.get('http://localhost:5000/api/vendor/dashboard', { credentials: 'include' }).json();
                if (vendorResponse) {
                    setIsVendorLoggedIn(true);
                    setVendorName(vendorResponse.vendorName || '');
                    localStorage.setItem('isVendorLoggedIn', 'true');
                } else {
                    setIsVendorLoggedIn(savedVendorLoginStatus);
                }
            } catch (error) {
                console.error('Error checking vendor session:', error);
                setIsVendorLoggedIn(false);
            }
        };

        checkSession();
    }, []);

    const logIn = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const vendorLogIn = (vendorName) => {
        setIsVendorLoggedIn(true);
        setVendorName(vendorName);
        localStorage.setItem('isVendorLoggedIn', 'true');
    };

    const logOut = async () => {
        try {
            await ky.post('http://localhost:5000/api/logout', { credentials: 'include' });
            setIsLoggedIn(false);
            setIsVendorLoggedIn(false);
            setVendorName('');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isVendorLoggedIn');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const isAuthenticated = () => isLoggedIn;

    const isVendorAuthenticated = () => isVendorLoggedIn;

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isVendorLoggedIn,
                vendorName,
                logIn,
                vendorLogIn,
                logOut,
                isAuthenticated,
                isVendorAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
