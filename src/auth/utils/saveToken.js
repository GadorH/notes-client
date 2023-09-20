import { TOKEN_SESSION_STORAGE_KEY } from './constants';

export const saveToken = (token) => {
    sessionStorage.setItem(TOKEN_SESSION_STORAGE_KEY, token);
};
