import config from '../config';

const usersUrl = `${config.apiUrl}/users`;

export interface UserData {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export const loginUserApi = async (username: string, password: string): Promise<UserData> => {
    const response = await fetch(`${usersUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    return await response.json();
};

export const fetchUsersApi = async (): Promise<UserData[]> => {
    const response = await fetch(usersUrl);
    return await response.json();
};

export const addUserApi = async (user: Omit<UserData, 'id'>): Promise<UserData> => {
    const response = await fetch(usersUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return await response.json();
};

export const getUserByIdApi = async (id: number): Promise<UserData> => {
    const response = await fetch(`${usersUrl}/${id}`);
    return await response.json();
};

export const updateUserApi = async (id: number, userData: Partial<Omit<UserData, 'id'>>): Promise<UserData> => {
    const response = await fetch(`${usersUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return await response.json();
};

export const deleteUserApi = async (id: number): Promise<void> => {
    await fetch(`${usersUrl}/${id}`, { method: 'DELETE' });
};
