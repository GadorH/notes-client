import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import { Password } from '@mui/icons-material';

import { useAuth } from '../context/auth-provider';
import { useState } from 'react';

export const LoginPage = () => {
    const { authLogin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <StyledLoginMain component={'main'}>
            <StyledForm
                noValidate
                autoComplete="on"
                onSubmit={(e) => {
                    e.preventDefault();
                    authLogin(email, Password);
                }}
            >
                <TextField
                    required
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    id="standard-basic"
                    label="Contraseña"
                    type="password"
                    variant="standard"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button variant="contained">Loguearse</Button>
            </StyledForm>
        </StyledLoginMain>
    );
};

const StyledLoginMain = styled(Container)`
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 50px;
`;

const StyledForm = styled('form')`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    gap: 10px;
    width: 450px;
`;
