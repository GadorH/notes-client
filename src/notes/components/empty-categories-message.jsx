import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import EmptyCategoriesSvg from './assets/empty-categories.svg';

export const EmptyCategoriesMessage = () => {
    return (
        <EmptyCategoriesMessageContainer
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <StyledImg src={EmptyCategoriesSvg} alt="Empty categories" />
            <p>No parece que tengas categorías.</p>
        </EmptyCategoriesMessageContainer>
    );
};

const EmptyCategoriesMessageContainer = styled(Grid)`
    height: 100%;
`;

const StyledImg = styled('img')`
    width: 100%;
    max-width: 300px;
    height: auto;

    @media (min-width: 767px) {
        max-width: 450px;
    }
`;
