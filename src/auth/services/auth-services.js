const baseURL = import.meta.env.VITE_API_URL;

export const signUpService = async (email, password) => {
    const res = await fetch(`${baseURL}/auth/register`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const body = await res.json();
    return body;
};

export const signInService = async (email, password) => {
    const res = await fetch(`${baseURL}/auth/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const body = await res.json();

    if (res.status !== 200) {
        throw new Error(body.message);
    }

    return body;
};
