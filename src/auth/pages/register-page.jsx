import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from '@emotion/styled';

import { useState } from 'react';
import { useAuth } from '../context/auth-provider';

export const RegisterPage = () => {
    const { authRegister } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        authRegister(email, password, repeatedPassword);
    };

    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const handleShowRepeatedPasswordClick = () => {
        setShowRepeatedPassword(!showRepeatedPassword);
    };

    return (
        <StyledRegisterMain component="main">
            <StyledForm noValidate autoComplete="on" onSubmit={handleSubmit}>
                <TextField
                    required
                    id="standard-basic"
                    label="Email"
                    type="email"
                    variant="standard"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    id="standard-adornment-password"
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    variant="standard"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleShowPasswordClick}
                                    edge="end"
                                    aria-label="toggle password visibility"
                                >
                                    {showPassword ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    required
                    id="standard-adornment-repeated-password"
                    label="Repite contraseña"
                    type={showRepeatedPassword ? 'text' : 'password'}
                    variant="standard"
                    placeholder="Repite contraseña"
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleShowRepeatedPasswordClick}
                                    edge="end"
                                    aria-label="toggle repeated password visibility"
                                >
                                    {showRepeatedPassword ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" variant="contained">
                    Registrarme
                </Button>
            </StyledForm>
        </StyledRegisterMain>
    );
};

const StyledRegisterMain = styled(Container)`
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
