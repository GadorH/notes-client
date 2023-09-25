import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AddCategoryIcon from '@mui/icons-material/CreateNewFolder';
import LogoutIcon from '@mui/icons-material/Logout';

import {useAuth} from "../../auth/context/auth-provider.jsx";
import { useMessageProvider } from '../../shared/context/messages-provider.jsx';
import useCategories from '../../categories/hooks/use-categories.js';
import { NoteList } from '../components/note-list/note-list';
import { AddCategoryDialog } from '../components/add-category-dialog/add-category-dialog';
import { MoveNoteDialog } from '../components/move-note-dialog/move-note-dialog';
import { EditCategoryDialog } from '../components/edit-category-dialog/edit-category-dialog';
import { RemoveCategoryDialog } from '../components/remove-category-dialog/remove-category-dialog';
import { EmptyCategoriesMessage } from '../components/empty-categories-message.jsx';
import useNotes from '../hooks/useNotes.js';

export const NoteListPage = () => {
    const appBarRef = useRef(null);

    const { actions: messageActions } = useMessageProvider();

    const { authLogout } = useAuth();

    const { state: categoriesState, actions: categoriesActions } =
        useCategories();

    const { state: notesState, actions: notesActions } = useNotes();

    const navigate = useNavigate();

    const [showCategoryDialog, setShowCategoryDialog] = useState(false);

    const [moveNoteState, setMoveNoteState] = useState({
        dialogOpen: false,
        note: null,
        category: null,
    });

    const [editCategoryState, setEditCategoryState] = useState({
        dialogOpen: false,
        category: null,
    });

    const [removeCategoryState, setRemoveCategoryState] = useState({
        dialogOpen: false,
        category: null,
    });

    useEffect(() => {
        categoriesActions.retrieve();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        notesActions.retrieveAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnAddNewNote = (category) => {
        navigate(`/notes/new?category=${category.id}`);
    };

    const handleOnRemoveNote = async (note) => {
        try {
            await notesActions.remove(note.id);
            messageActions.addSuccess('Nota eliminada correctamente');
        } catch (error) {
            messageActions.addError('No se pudo eliminar la nota');
        }
    };

    const handleOnPublishNote = async (note) => {
        try {
            await notesActions.publish(note.id);
            messageActions.addSuccess('Nota publicada correctamente');
        } catch (error) {
            messageActions.addError('No se pudo publicar la nota');
        }
    };

    const handleOnUnpublishNote = async (note) => {
        try {
            await notesActions.unpublish(note.id);
            messageActions.addSuccess('Nota despublicada correctamente');
        } catch (error) {
            messageActions.addError('No se pudo despublicar la nota');
        }
    };

    const handleSharePublicNote = (note) => {
        const url = notesActions.sharePublic(note.id);
        navigator.clipboard.writeText(url);
        messageActions.addInfo('URL copiada al portapapeles');
    };

    const handleToggleAddCategoryDialog = () => {
        setShowCategoryDialog(!showCategoryDialog);
    };

    const handleOnAddCategory = async (categoryName) => {
        try {
            await categoriesActions.create(categoryName);
            messageActions.addSuccess('Categoría creada correctamente');
        } catch (error) {
            messageActions.addError('No se pudo crear la categoría');
        }
    };

    const handleOnMoveNote = async (category) => {
        try {
            await notesActions.edit(moveNoteState.note.id, {
                categoryId: category.id,
            });
            messageActions.addSuccess('Nota movida correctamente');
        } catch (error) {
            messageActions.addError('No se pudo mover la nota');
        }
    };

    const handleOpenMoveNoteDialog = (note) => {
        setMoveNoteState({
            ...moveNoteState,
            dialogOpen: true,
            note: note,
        });
    };

    const handleCloseMoveNoteDialog = () => {
        setMoveNoteState({
            ...moveNoteState,
            dialogOpen: false,
        });
    };

    const handleOpenEditCategoryDialog = (category) => {
        setEditCategoryState({
            ...editCategoryState,
            dialogOpen: true,
            category: category,
        });
    };

    const handleCloseEditCategoryDialog = () => {
        setEditCategoryState({
            ...editCategoryState,
            dialogOpen: false,
        });
    };

    const handleOnEditCategory = async (categoryName) => {
        try {
            await categoriesActions.edit(editCategoryState.category.id, {
                name: categoryName,
            });
            messageActions.addSuccess('Categoría editada correctamente');
        } catch (error) {
            messageActions.addError('No se pudo editar la categoría');
        }
    };

    const handleOpenRemoveCategoryDialog = (category) => {
        setRemoveCategoryState({
            ...removeCategoryState,
            dialogOpen: true,
            category: category,
        });
    };

    const handleCloseRemoveCategoryDialog = () => {
        setRemoveCategoryState({
            ...removeCategoryState,
            category: null,
            dialogOpen: false,
        });
    };

    const handleOnRemoveCategory = async () => {
        try {
            await categoriesActions.remove(removeCategoryState.category.id);
            messageActions.addSuccess('Categoría eliminada correctamente');
        } catch (error) {
            messageActions.addError('No se pudo eliminar la categoría');
        }
    };

    const handleLogout = () => {
        authLogout();
    }

    return (
        <>
            <AppBar ref={appBarRef} position="sticky">
                <Toolbar>
                    <StyledLogoutButton
                        size="large"
                        color="inherit"
                        onClick={handleLogout}
                    >
                        <LogoutIcon />
                    </StyledLogoutButton>

                    <StyledAddCategoryButton
                        size="large"
                        color="inherit"
                        onClick={handleToggleAddCategoryDialog}
                    >
                        <AddCategoryIcon />
                    </StyledAddCategoryButton>
                </Toolbar>
            </AppBar>

            <StyledNoteListContainer
                component={'main'}
                appbarheight={appBarRef?.current?.offsetHeight}
            >
                {categoriesState.categories.length === 0 && (
                    <EmptyCategoriesMessage />
                )}
                {categoriesState.categories.map((category) => {
                    const notes = notesState.notes.filter((note) => {
                        return note.categoryId === category.id;
                    });

                    return (
                        <NoteList
                            key={category.id}
                            notes={notes}
                            category={category}
                            onAddNewNote={handleOnAddNewNote}
                            onRemoveNote={handleOnRemoveNote}
                            onPublishNote={handleOnPublishNote}
                            onUnpublishNote={handleOnUnpublishNote}
                            onSharePublicNote={handleSharePublicNote}
                            onMoveNote={handleOpenMoveNoteDialog}
                            onEditCategory={handleOpenEditCategoryDialog}
                            onRemoveCategory={handleOpenRemoveCategoryDialog}
                        />
                    );
                })}
            </StyledNoteListContainer>

            <AddCategoryDialog
                open={showCategoryDialog}
                onClose={handleToggleAddCategoryDialog}
                onAddCategory={handleOnAddCategory}
            />

            <EditCategoryDialog
                open={editCategoryState.dialogOpen}
                category={editCategoryState.category}
                onClose={handleCloseEditCategoryDialog}
                onEditCategory={handleOnEditCategory}
            />

            <MoveNoteDialog
                open={moveNoteState.dialogOpen}
                noteCategoryId={moveNoteState?.note?.categoryId}
                categories={categoriesState.categories}
                onClose={handleCloseMoveNoteDialog}
                onMoveNote={handleOnMoveNote}
            />

            <RemoveCategoryDialog
                open={removeCategoryState.dialogOpen}
                onClose={handleCloseRemoveCategoryDialog}
                onRemoveCategory={handleOnRemoveCategory}
            />
        </>
    );
};

const StyledNoteListContainer = styled(Container)((props) => ({
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    height: `calc(100% - ${props?.appbarheight}px)`,
}));

const StyledAddCategoryButton = styled(IconButton)`
    margin-left: auto;
`;

const StyledLogoutButton = styled(IconButton)`
    margin-right: auto;
`;