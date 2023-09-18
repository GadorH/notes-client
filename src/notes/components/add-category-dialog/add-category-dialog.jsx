import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

export const AddCategoryDialog = (props) => {
    const { open, onClose, onAddCategory } = props;

    const [categoryName, setCategoryName] = useState('');

    const handleChangeCategoryName = (event) => {
        setCategoryName(event.target.value.trimStart());
    };

    const handleOnAddCategory = () => {
        onClose();
        onAddCategory(categoryName);
        setCategoryName('');
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <DialogTitle>Nueva categoria</DialogTitle>
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
                    onClick={handleOnAddCategory}
                    disabled={categoryName.trim() === ''}
                >
                    Aceptar
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};

AddCategoryDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddCategory: PropTypes.func.isRequired,
};

const StyledDialog = styled(Dialog)`
    .MuiPaper-root {
        width: 90vw;
    }
`;

const StyledDialogContentContainer = styled('div')`
    margin-top: 10px;
`;
