import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

export const EditCategoryDialog = (props) => {
    const { open, category, onClose, onEditCategory } = props;

    const [categoryName, setCategoryName] = useState(category?.name ?? '');

    useEffect(() => {
        setCategoryName(category?.name ?? '');
    }, [category, open]);

    const handleChangeCategoryName = (event) => {
        setCategoryName(event.target.value.trimStart());
    };

    const handleOnEditCategory = () => {
        onClose();
        onEditCategory(categoryName);
        setCategoryName('');
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <DialogTitle>Editar categoria</DialogTitle>
            <DialogContent>
                <StyledDialogContentContainer>
                    <TextField
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        value={categoryName}
                        onChange={handleChangeCategoryName}
                    />
                </StyledDialogContentContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    Cancelar
                </Button>
                <Button
                    onClick={handleOnEditCategory}
                    disabled={categoryName.trim() === ''}
                >
                    Aceptar
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

EditCategoryDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    category: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
    onEditCategory: PropTypes.func.isRequired,
};

const StyledDialog = styled(Dialog)`
    .MuiPaper-root {
        width: 90vw;
    }
`;

const StyledDialogContentContainer = styled('div')`
    margin-top: 10px;
`;
