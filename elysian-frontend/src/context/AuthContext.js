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
        // Check both customer and vendor sessions on component mount
        const checkSessions = async () => {
            try {
                // Check customer session
                const userResponse = await ky.get('http://localhost:5000/api/check-session', {
                    credentials: 'include'
                }).json();
                
                if (userResponse.isAuthenticated) {
                    setIsLoggedIn(true);
                }

                // Check vendor session
                const vendorResponse = await ky.get('http://localhost:5000/api/vendor/check-session', {
                    credentials: 'include'
                }).json();
                
                if (vendorResponse.isVendor) {
                    setIsVendorLoggedIn(true);
                    setVendorName(vendorResponse.vendorName || '');
                }
            } catch (error) {
                console.error('Error checking sessions:', error);
                // Reset states on error
                setIsLoggedIn(false);
                setIsVendorLoggedIn(false);
                setVendorName('');
            }
        };

        checkSessions();
    }, []); // Empty dependency array means this runs once on mount

    const logIn = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const vendorLogIn = (name) => {
        setIsVendorLoggedIn(true);
        setVendorName(name);
    };

    const logOut = async () => {
        try {
            // Attempt to logout from both customer and vendor sessions
            await ky.post('http://localhost:5000/api/logout', { credentials: 'include' });
            await ky.post('http://localhost:5000/api/vendor/logout', { credentials: 'include' });
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            // Reset all auth states regardless of logout API success
            setIsLoggedIn(false);
            setIsVendorLoggedIn(false);
            setVendorName('');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isVendorLoggedIn');
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
                vendorLogIn, // Make sure this is exposed
                logOut,
                isAuthenticated,
                isVendorAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
