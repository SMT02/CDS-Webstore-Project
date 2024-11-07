import React, { createContext, useContext, useState, useEffect } from 'react';
import ky from 'ky';

export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const savedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';

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
                console.error('Error checking session:', error);
                setIsLoggedIn(false);
            }
        };

        checkSession();
    }, []);

    const logIn = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logOut = async () => {
        try {
            await ky.post('http://localhost:5000/api/logout', { credentials: 'include' });
            setIsLoggedIn(false);
            localStorage.removeItem('isLoggedIn');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const isAuthenticated = () => isLoggedIn;

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
