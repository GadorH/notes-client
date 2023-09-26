import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/NoteAddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import OptionsIcon from '@mui/icons-material/MoreVert.js';
import LockOpenIcon from '@mui/icons-material/LockOpen.js';
import LockIcon from '@mui/icons-material/Lock.js';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { NoteListOptionsMenu } from './note-list-options-menu';

export const NoteList = (props) => {
    const {
        category,
        notes,
        onAddNewNote,
        onRemoveNote,
        onPublishNote,
        onUnpublishNote,
        onSharePublicNote,
        onMoveNote,
        onEditCategory,
        onRemoveCategory,
    } = props;

    const [optionsMenuState, setOptionsMenuState] = useState({
        open: false,
        note: null,
        anchorEl: null,
    });

    const handleOpenOptionsMenu = (note) => (event) => {
        setOptionsMenuState({
            open: true,
            note: note,
            anchorEl: event.currentTarget,
        });
    };

    const handleCloseOptionsMenu = () => {
        setOptionsMenuState({
            ...optionsMenuState,
            open: false,
            anchorEl: null,
        });
    };

    const handleOnAddNewNote = () => {
        onAddNewNote(category);
    };

    const handleOnRemoveNote = () => {
        onRemoveNote(optionsMenuState.note);
        handleCloseOptionsMenu();
    };

    const handleOnPublishNote = () => {
        onPublishNote(optionsMenuState.note);
        handleCloseOptionsMenu();
    };

    const handleOnUnpublishNote = () => {
        onUnpublishNote(optionsMenuState.note);
        handleCloseOptionsMenu();
    };

    const handleOnSharePublicNote = () => {
        onSharePublicNote(optionsMenuState.note);
        handleCloseOptionsMenu();
    };

    const handleOnMoveNote = () => {
        onMoveNote(optionsMenuState.note);
        handleCloseOptionsMenu();
    };

    const handleOnEditCategory = () => {
        onEditCategory(category);
    };

    const handleOnRemoveCategory = () => {
        onRemoveCategory(category);
    };

    return (
        <Box component={Paper} elevation={2}>
            <Container>
                <Grid>
                    <StyledList>
                        <StyledListSubheader
                            empty={(notes.length === 0).toString()}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography variant={'h6'} component={'h2'}>
                                    {category.name.toUpperCase()}
                                </Typography>

                                <ButtonGroup variant="text">
                                    <Button onClick={handleOnEditCategory}>
                                        <EditIcon />
                                    </Button>
                                    <Button onClick={handleOnRemoveCategory}>
                                        <DeleteIcon />
                                    </Button>
                                    <Button onClick={handleOnAddNewNote}>
                                        <AddIcon />
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </StyledListSubheader>

                        <Grid>
                            {notes.map((note) => {
                                return (
                                    <ListItem
                                        key={note.id}
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                onClick={handleOpenOptionsMenu(
                                                    note
                                                )}
                                            >
                                                <OptionsIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemIcon>
                                            {note.public ? (
                                                <LockOpenIcon />
                                            ) : (
                                                <LockIcon />
                                            )}
                                        </ListItemIcon>
                                        <ListItemButton
                                            component={Link}
                                            to={`/notes/edit?category=${category.id}&note=${note.id}`}
                                        >
                                            <StyleListItemText
                                                primary={note.title}
                                                secondary={new Date(
                                                    note.updatedAt
                                                ).toLocaleDateString()}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </Grid>
                    </StyledList>
                </Grid>
            </Container>

            <NoteListOptionsMenu
                open={optionsMenuState.open}
                anchorEl={optionsMenuState.anchorEl}
                onClose={handleCloseOptionsMenu}
                isPublic={optionsMenuState.note?.public}
                onPublishNote={handleOnPublishNote}
                onUnpublishNote={handleOnUnpublishNote}
                onSharePublicNote={handleOnSharePublicNote}
                onRemoveNote={handleOnRemoveNote}
                onMoveNote={handleOnMoveNote}
            />
        </Box>
    );
};

NoteList.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            public: PropTypes.bool.isRequired,
            updatedAt: PropTypes.string.isRequired,
        })
    ).isRequired,
    onAddNewNote: PropTypes.func.isRequired,
    onRemoveNote: PropTypes.func.isRequired,
    onPublishNote: PropTypes.func.isRequired,
    onUnpublishNote: PropTypes.func.isRequired,
    onSharePublicNote: PropTypes.func.isRequired,
    onMoveNote: PropTypes.func.isRequired,
    onEditCategory: PropTypes.func.isRequired,
    onRemoveCategory: PropTypes.func.isRequired,
};

const StyledList = styled(List)`
    overflow: auto;
    max-height: 33vh;
    width: 100%;
    padding-top: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const StyledListSubheader = styled(ListSubheader)((props) => ({
    paddingTop: '8px',
    paddingBottom: '8px',
    borderBottom:
        props.empty === 'true'
            ? 'none'
            : `1px solid ${props.theme.palette.divider}`,
}));

const StyleListItemText = styled(ListItemText)`
    white-space: nowrap;
`;
