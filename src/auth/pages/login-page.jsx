import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useAuth } from '../context/auth-provider';
import { useMessageProvider } from '../../shared/context/messages-provider';

export const LoginPage = () => {
    const { authLogin, loading, authorizationError, authUser } = useAuth();

    const [email, setEmail] = useState({
        value: '',
        error: false,
    });
    const [password, setPassword] = useState({
        value: '',
        isVisible: false,
    });

    const navigate = useNavigate();
    const {
        actions: { addError },
    } = useMessageProvider();

    useEffect(() => {
        if (authUser != null) {
            navigate('/notes');
        }
    });

    useEffect(() => {
        if (authorizationError) {
            addError('Email o contraseña inválidos');
        }
    }, [authorizationError]);

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
                    type={password.isVisible ? 'text' : 'password'}
                    value={password.value}
                    onChange={handleOnPasswordChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleTogglePasswordVisibility}
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
                    Iniciar sesión
                </Button>
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
