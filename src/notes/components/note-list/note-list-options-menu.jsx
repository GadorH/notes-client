import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import LockIcon from '@mui/icons-material/Lock.js';
import LockOpenIcon from '@mui/icons-material/LockOpen.js';
import MoveIcon from '@mui/icons-material/DriveFileMove';
import ShareIcon from '@mui/icons-material/Share.js';
import Divider from '@mui/material/Divider';
import RemoveIcon from '@mui/icons-material/Delete.js';
import Menu from '@mui/material/Menu';

export const NoteListOptionsMenu = (props) => {
    const {
        anchorEl,
        open,
        isPublic,
        onClose,
        onPublishNote,
        onUnpublishNote,
        onSharePublicNote,
        onRemoveNote,
        onMoveNote,
    } = props;

    return (
        <StyledMenu anchorEl={anchorEl} open={open} onClose={onClose}>
            <MenuItem
                onClick={isPublic ? onUnpublishNote : onPublishNote}
                disableRipple
            >
                {isPublic ? <LockIcon /> : <LockOpenIcon />}
                {isPublic ? 'Hacer privada' : 'Hacer pública'}
            </MenuItem>

            {isPublic && (
                <MenuItem onClick={onSharePublicNote} disableRipple>
                    <ShareIcon />
                    Compartir
                </MenuItem>
            )}

            <MenuItem onClick={onMoveNote} disableRipple>
                <MoveIcon />
                Mover
            </MenuItem>

            <Divider />

            <MenuItem onClick={onRemoveNote} disableRipple>
                <RemoveIcon />
                Eliminar
            </MenuItem>
        </StyledMenu>
    );
};

NoteListOptionsMenu.propTypes = {
    anchorEl: PropTypes.any,
    isPublic: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onPublishNote: PropTypes.func.isRequired,
    onUnpublishNote: PropTypes.func.isRequired,
    onSharePublicNote: PropTypes.func.isRequired,
    onRemoveNote: PropTypes.func.isRequired,
    onMoveNote: PropTypes.func.isRequired,
};

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light'
                ? 'rgb(55, 65, 81)'
                : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));
