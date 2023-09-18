import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const RemoveCategoryDialog = (props) => {
    const { open, onClose, onRemoveCategory } = props;

    const handleOnRemoveCategory = () => {
        onRemoveCategory();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Eliminar categoria</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Se eliminaran todas las notas asociadas a esta categoria.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    Cancelar
                </Button>
                <Button onClick={handleOnRemoveCategory}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    );
};

RemoveCategoryDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onRemoveCategory: PropTypes.func.isRequired,
};
