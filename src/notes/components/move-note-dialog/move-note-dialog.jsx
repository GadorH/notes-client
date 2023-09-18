import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export const MoveNoteDialog = (props) => {
    const { open, categories, noteCategoryId, onClose, onMoveNote } = props;

    const [selectedCategoryId, setSelectedCategoryId] =
        useState(noteCategoryId);

    useEffect(() => {
        setSelectedCategoryId(noteCategoryId);
    }, [noteCategoryId, open]);

    const handleOnMoveNote = () => {
        onMoveNote(
            categories.find((category) => category.id === selectedCategoryId)
        );
        onClose();
    };

    const handleSelectCategory = (event) => {
        setSelectedCategoryId(event.target.value);
    };

    return (
        <StyledDialog open={open} onClose={onClose} keepMounted={false}>
            <DialogTitle>Cambiar categoria</DialogTitle>
            <DialogContent>
                <StyledDialogContentContainer>
                    {selectedCategoryId && (
                        <Select
                            fullWidth
                            variant={'standard'}
                            label="Categorias"
                            value={selectedCategoryId}
                            onChange={handleSelectCategory}
                        >
                            {categories.map((category) => {
                                return (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name.toUpperCase()}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    )}
                </StyledDialogContentContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    Cancelar
                </Button>
                <Button onClick={handleOnMoveNote}>Aceptar</Button>
            </DialogActions>
        </StyledDialog>
    );
};

MoveNoteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    noteCategoryId: PropTypes.string,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
    onMoveNote: PropTypes.func.isRequired,
};

const StyledDialog = styled(Dialog)`
    .MuiPaper-root {
        width: 90vw;
    }
`;

const StyledDialogContentContainer = styled('div')`
    margin-top: 10px;
`;
