import { TOKEN_LOCAL_STORAGE_KEY } from './constants';

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
};
