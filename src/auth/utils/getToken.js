import { TOKEN_SESSION_STORAGE_KEY } from './constants';

export const getToken = () => {
    const authToken = sessionStorage.getItem(TOKEN_SESSION_STORAGE_KEY);

    return authToken ? authToken : null;
};
