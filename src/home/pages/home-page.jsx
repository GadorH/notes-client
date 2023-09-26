import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import LogoSVG from './assets/logo.svg';
import CirclesBackgroundSVG from './assets/circles-background.svg';

export const HomePage = () => {
    return (
        <StyledMain>
            <StyledLogoImg src={LogoSVG} aria-hidden={true} />
            <StyledCirclesImg src={CirclesBackgroundSVG} aria-hidden={true} />

            <StyledCopyContainer>
                <StyledTitle variant="h2" component="h2">
                    ¡MyNotes: Plasmando tus Ideas con Creatividad y Orden!
                </StyledTitle>
                <StyledParagraph variant="h5" component="p">
                    Descubre la forma más innovadora de plasmar y organizar tus
                    ideas con nuestra aplicación de toma de notas. En MyNotes
                    podrás crear categorías, editar tus reflexiones y, si lo
                    decides, compartir tus notas públicamente.
                </StyledParagraph>
                <StyledParagraph variant="h5" component="p">
                    ¡Regístrate ahora y comienza a dar forma a tus ideas con
                    MyNotes!
                </StyledParagraph>
            </StyledCopyContainer>
            <StyledButtonContainer>
                <StyledLoginButton
                    variant="outlined"
                    component={Link}
                    to="/login"
                >
                    INICIAR SESIÓN
                </StyledLoginButton>
                <Button variant="contained" component={Link} to="/register">
                    REGÍSTRATE AQUÍ
                </Button>
            </StyledButtonContainer>
        </StyledMain>
    );
};

const StyledMain = styled('main')`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    background-color: white;
    padding: 1rem;

    @media (min-width: 1024px) {
        justify-content: center;
    }
`;

const StyledButtonContainer = styled('div')`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    gap: 0.5rem;

    @media (min-width: 767px) {
        width: 70%;
    }

    @media (min-width: 1024px) {
        width: 50%;
    }

    @media (min-width: 1920px) {
        width: 35%;
    }
`;

const StyledLoginButton = styled(Button)`
    background-color: white;
`;

const StyledCopyContainer = styled('div')`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    margin-bottom: 2rem;
    margin-top: 5rem;
    gap: 1rem;

    @media (min-width: 767px) {
        width: 70%;
    }

    @media (min-width: 1024px) {
        width: 50%;
    }

    @media (min-width: 1920px) {
        width: 35%;
    }
`;

const StyledTitle = styled(Typography)`
    font-weight: 600;
    font-style: italic;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    z-index: 1;
`;

const StyledCirclesImg = styled('img')`
    position: absolute;
    width: auto;
    height: 45%;
    right: 0;
    z-index: 0;
    bottom: 0;
    opacity: 0.75;

    @media (min-width: 1024px) {
        height: 80%;
    }
`;

const StyledLogoImg = styled('img')`
    width: 8rem;
    height: auto;
`;

const StyledParagraph = styled(Typography)`
    font-size: 1rem;
    z-index: 1;
    font-weight: 500;
`;
