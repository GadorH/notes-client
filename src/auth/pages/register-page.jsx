import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { useAuth } from '../context/auth-provider';

export const RegisterPage = () => {
    const { authRegister } = useAuth();
    const [email, setEmail] = useState({
        value: '',
        error: false,
    });
    const [password, setPassword] = useState({
        value: '',
        isVisible: false,
    });
    const [repeatedPassword, setRepeatedPassword] = useState({
        value: '',
        isVisible: false,
        error: false,
    });

    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (password.value !== repeatedPassword.value) {
            return setRepeatedPassword({
                ...repeatedPassword,
                error: true,
            });
        }

        await authRegister(email.value, password.value, repeatedPassword.value);
        navigate('/notes');
    };

    const handleOnEmailChange = (e) => {
        setEmail({
            ...email,
            value: e.target.value,
            error: false,
        });
    };

    const handleOnPasswordChange = (e) => {
        setPassword({
            ...password,
            value: e.target.value,
        });
    };

    const handleOnRepeatedPasswordChange = (e) => {
        setRepeatedPassword({
            ...repeatedPassword,
            value: e.target.value,
        });
    };

    const handleTogglePasswordVisibility = () => {
        setPassword((prevState) => ({
            ...prevState,
            isVisible: !prevState.isVisible,
        }));
    };

    const handleToggleRepeatedPasswordVisibility = () => {
        setRepeatedPassword((prevState) => ({
            ...prevState,
            isVisible: !prevState.isVisible,
        }));
    };

    return (
        <StyledRegisterMain component="main">
            <StyledForm autoComplete="on" onSubmit={handleOnSubmit}>
                <TextField
                    required
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    variant="standard"
                    placeholder="Email"
                    value={email.value}
                    error={email.error}
                    onChange={handleOnEmailChange}
                    helperText={
                        email.error ? 'Formato de email inválido' : null
                    }
                />
                <TextField
                    required
                    name="password"
                    id="password"
                    label="Contraseña"
                    variant="standard"
                    placeholder="Contraseña"
                    value={password.value}
                    type={password.isVisible ? 'text' : 'password'}
                    onChange={handleOnPasswordChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                    aria-label="toggle password visibility"
                                >
                                    {password.isVisible ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{
                        minLength: 4,
                        maxLength: 20,
                    }}
                />
                <TextField
                    required
                    name="repeatedPassword"
                    id="repeatedPassword"
                    label="Repite contraseña"
                    variant="standard"
                    placeholder="Repite contraseña"
                    type={repeatedPassword.isVisible ? 'text' : 'password'}
                    value={repeatedPassword.value}
                    error={repeatedPassword.error}
                    helperText={
                        repeatedPassword.error
                            ? 'Las contraseñas no coinciden'
                            : null
                    }
                    onChange={handleOnRepeatedPasswordChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={
                                        handleToggleRepeatedPasswordVisibility
                                    }
                                    edge="end"
                                    aria-label="toggle repeated password visibility"
                                >
                                    {repeatedPassword.isVisible ? (
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
