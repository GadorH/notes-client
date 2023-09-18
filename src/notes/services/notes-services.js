const baseURL = import.meta.env.VITE_API_URL;

import { getToken } from '../../auth/utils/getToken';

export const createNoteService = async (note) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/notes`, {
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });

    const body = await res.json();

    if (res.status !== 201) {
        throw new Error(body.message);
    }

    return body;
};

export const editNoteService = async (noteId, payload) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/notes/${noteId}`, {
        method: 'put',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const body = await res.json();

    if (res.status !== 200) {
        throw new Error(body.message);
    }

    return body;
};

export const getAllNotesService = async (fields) => {
    const token = getToken();
    const url = `${baseURL}/notes`;
    const fieldsQueryString = fields ? fields.join(',') : '';
    const queryString = fieldsQueryString ? `?fields=${fieldsQueryString}` : '';

    const res = await fetch(`${url}${queryString}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const body = await res.json();

    if (res.status !== 200) {
        throw new Error(body.message);
    }

    return body;
};

export const getNoteService = async (noteId) => {
    const token = getToken();
    const res = await fetch(`${baseURL}/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const body = await res.json();

    if (res.status !== 200) {
        throw new Error(body.message);
    }

    return body;
};

export const removeNoteService = async (noteId) => {
    const token = getToken();

    const res = await fetch(`${baseURL}/notes/${noteId}`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const body = await res.json();

    if (res.status !== 200) {
        throw new Error(body.message);
    }

    return body;
};

export const getPublicNoteService = async (noteId) => {
    const res = await fetch(`${baseURL}/notes/share/${noteId}`);

    const body = await res.json();

    return body;
};

export const uploadImageService = async (blobInfo) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('image', blobInfo.blob());

    const res = await fetch(`${baseURL}/notes/upload-image`, {
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const body = await res.json();

    if (res.status !== 200) {
        throw new Error(body.message);
    }

    return body;
};
