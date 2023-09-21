import { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useAuth } from '../context/auth-provider';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const { authLogin, loading } = useAuth();
    const [email, setEmail] = useState({
        value: '',
        error: false,
    });
    const [password, setPassword] = useState({
        value: '',
        isVisible: false,
    });

    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!pattern.test(email.value)) {
            return setEmail({
                ...email,
                error: true,
            });
        }

        authLogin(email.value, password.value);
        //navigate('/notes');
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

    const handleTogglePasswordVisibility = () => {
        setPassword((prevState) => {
            const { isVisible } = prevState;
            return { ...prevState, isVisible: !isVisible };
        });
    };

    return (
        <StyledLoginMain component={'main'}>
            <StyledForm autoComplete="on" onSubmit={handleOnSubmit}>
                <TextField
                    required
                    name="email"
                    id="email"
                    label="Email"
                    variant="standard"
                    placeholder="Email"
                    value={email.value}
                    onChange={handleOnEmailChange}
                    error={email.error}
                    helperText={
                        email.error ? 'Introduce un email válido' : null
                    }
                />
                <TextField
                    required
                    name="password"
                    id="password"
                    label="Contraseña"
                    type={password.isVisible ? 'text' : 'password'}
                    variant="standard"
                    placeholder="Contraseña"
                    value={password.value}
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

                <Button type="submit" variant="contained" disabled={loading}>
                    Loguearse
                </Button>
            </StyledForm>
        </StyledLoginMain>
    );
};

const StyledLoginMain = styled(Container)`
    height: 100%;
    display: flex;src
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
