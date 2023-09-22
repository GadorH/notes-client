import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInService, signUpService } from '../services/auth-services.js';

import { getToken } from '../utils/getToken';
import { saveToken } from '../utils/saveToken';
import { removeToken } from '../utils/removeToken';

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [authUser, setAuthUser] = useState(getToken);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [authorizationError, setAuthorizationError] = useState(false);
    const [loading, setLoading] = useState(false);

    const authRegister = async (email, password, repeatedPassword) => {
        try {
            setLoading(true);

            if (password !== repeatedPassword) {
                throw new Error('Las contraseñas no coinciden');
            }

            await signUpService(email, password);
        } catch (error) {
            console.error('AuthProvider::authRegister error:', error);
        } finally {
            setLoading(false);
        }
    };

    const authLogin = async (email, password) => {
        try {
            setLoading(true);
            setAuthorizationError(null);

            const accessTokenObj = await signInService(email, password);

            if (accessTokenObj && accessTokenObj.accessToken) {
                const accessTokenString = accessTokenObj.accessToken.toString();

                saveToken(accessTokenString);
                setAuthUser(accessTokenObj);
            } else {
                throw new Error('Error al obtener el token');
            }

            setIsAuthenticated(true);
        } catch (error) {
            console.error('AuthProvider::authLogin error:', error);
            setAuthorizationError(true);
        } finally {
            setLoading(false);
        }
    };

    const authLogout = () => {
        removeToken();

        setAuthUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                authUser,
                authorizationError,
                isAuthenticated,
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
