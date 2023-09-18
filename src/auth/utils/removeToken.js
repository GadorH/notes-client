import { TOKEN_LOCAL_STORAGE_KEY } from './constants';

export const removeToken = () => {
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
};
