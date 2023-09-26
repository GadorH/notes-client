const baseURL = import.meta.env.VITE_API_URL;

import { getToken } from '../../auth/utils/getToken';

export const getAllCategoriesService = async () => {
    const token = getToken();

    const res = await fetch(`${baseURL}/categories`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const body = await res.json();

    if (res.status !== 200) {
        throw new Error(body.message);
    }

    return body;
};

export const createCategoryService = async (payload) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/categories`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const body = await res.json();

    if (res.status !== 201) {
        throw new Error(body.message);
    }

    return body;
};

export const editCategoryService = async (categoryId, payload) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const body = await res.json();

    if (res.status !== 200) {
        throw new Error(body.message);
    }

    return body;
};

export const removeCategoryService = async (categoryId) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const body = await res.json();

    if (res.status !== 200) {
        throw new Error(body.message);
    }

    return body;
};
