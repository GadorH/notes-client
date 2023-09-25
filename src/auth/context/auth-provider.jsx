import { createContext, useContext, useState } from 'react';
import { signInService, signUpService } from '../services/auth-services.js';

import { getToken } from '../utils/getToken';
import { saveToken } from '../utils/saveToken';
import { removeToken } from '../utils/removeToken';

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(getToken);
    const [authorizationError, setAuthorizationError] = useState(false);
    const [loading, setLoading] = useState(false);

    const authRegister = async (email, password, repeatedPassword) => {
        try {
            removeToken();
            setLoading(true);

            if (password !== repeatedPassword) {
                throw new Error('Las contraseñas no coinciden');
            }

            const accessTokenObj = await signUpService(email, password);
            const accessTokenString = accessTokenObj.accessToken;

            saveToken(accessTokenString);
            setAuthUser(accessTokenObj);
        } catch (error) {
            console.error('AuthProvider::authRegister error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const authLogin = async (email, password) => {
        try {
            removeToken();
            setLoading(true);
            setAuthorizationError(false);

            const accessTokenObj = await signInService(email, password);
            const accessTokenString = accessTokenObj.accessToken;

            saveToken(accessTokenString);
            setAuthUser(accessTokenObj);
        } catch (error) {
            setAuthorizationError(true);
        } finally {
            setLoading(false);
        }
    };

    const authLogout = () => {
        removeToken();
        setAuthUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                authUser,
                authorizationError,
                authRegister,
                authLogin,
                authLogout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
