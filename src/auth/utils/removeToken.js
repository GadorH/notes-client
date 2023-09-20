import { TOKEN_SESSION_STORAGE_KEY } from './constants';

export const removeToken = () => {
    sessionStorage.removeItem(TOKEN_SESSION_STORAGE_KEY);
};
