import React from 'react';
import Container from './components/Container/Container';
import LoginPage from './LoginPage';
import { AuthProvider, useAuth } from './AuthContext';
import { loginUserApi } from './api/userApi';
import {useUserId} from "./api/taskListsApi";


function AppContent(): JSX.Element {
    const { user, setUser } = useAuth();
    const { updateUserId } = useUserId();

    const handleLogin = async (username: string, password: string) => {
        try {
            const loggedInUser = await loginUserApi(username, password);
            setUser(loggedInUser);
            updateUserId(loggedInUser['data']?.id ?? null);
        } catch (error) {
            console.error('Login failed:', (error as Error).message);
        }
    };

    return (
        <div className="App">
            {user ? <Container className="container" /> : <LoginPage onLogin={handleLogin} />}
        </div>
    );
}

function App(): JSX.Element {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;