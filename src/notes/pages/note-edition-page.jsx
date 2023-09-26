import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SaveNoteIcon from '@mui/icons-material/Save.js';
import CloseIcon from '@mui/icons-material/Close.js';
import Badge from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';

import { useQueryParams } from '../../shared/hooks/use-query-params.js';
import { useMessageProvider } from '../../shared/context/messages-provider.jsx';
import useNotes from '../hooks/useNotes.js';
import { Editor } from '../components/editor/editor';

export const NoteEditionPage = () => {
    const editorRef = useRef(null);

    const { actions: messagesActions } = useMessageProvider();

    const { state: notesState, actions: notesActions } = useNotes();

    const query = useQueryParams();

    const [editorState, setEditorState] = useState({
        id: null,
        loaded: false,
        hasChanges: false,
        canBeSaved: true,
        savedNote: null,
    });

    useEffect(() => {
        const noteId = query.get('note');

        if (noteId) {
            notesActions.retrieve(noteId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (notesState.notes.length > 0) {
            const [savedNote] = notesState.notes;

            setEditorState({
                ...editorState,
                savedNote: savedNote,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notesState.notes]);

    const bindEditorRef = (_, editor) => {
        editorRef.current = editor;
        setEditorState({
            ...editorState,
            loaded: true,
        });
    };

    const handleOnEditorChange = (content, editor) => {
        const hasContent =
            editor.plugins.wordcount.getCount() > 0 ||
            editor.getBody().querySelector('img') != null;

        setEditorState({
            ...editorState,
            hasChanges: true,
            canBeSaved: hasContent,
        });
    };

    const handleSaveNote = async () => {
        const { current: editor } = editorRef;
        const header = editor.getBody().querySelector('h1, h2, h3, h4, h5, h6');
        const title = header?.textContent.trim() || null;
        const content = editor.getContent();

        const noteData = editorState?.savedNote?.id
            ? {
                  title: title || editorState.savedNote.title,
                  content,
              }
            : {
                  title,
                  content,
                  categoryId: query.get('category'),
              };

        try {
            const saveFunction =
                editorState.savedNote != null
                    ? notesActions.edit.bind(null, editorState.savedNote.id)
                    : notesActions.create;

            const savedNote = await saveFunction(noteData);

            setEditorState((prevState) => ({
                ...prevState,
                savedNote,
                hasChanges: false,
            }));

            messagesActions.addSuccess('Nota guardada correctamente');
        } catch (error) {
            messagesActions.addError('No se pudo guardar la nota');
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        color="inherit"
                        component={Link}
                        to={'/notes'}
                    >
                        <CloseIcon />
                    </IconButton>
                    <StyledSaveNoteButton
                        size="large"
                        color="inherit"
                        disabled={!editorState.canBeSaved}
                        onClick={handleSaveNote}
                    >
                        <Badge
                            variant="dot"
                            color="secondary"
                            invisible={!editorState.hasChanges}
                        >
                            <SaveNoteIcon />
                        </Badge>
                    </StyledSaveNoteButton>
                </Toolbar>
            </AppBar>

            {!editorState.loaded && (
                <StyledProgressContainer>
                    <CircularProgress color="inherit" />
                </StyledProgressContainer>
            )}

            <StyledEditorContainer loaded={editorState.loaded}>
                <Editor
                    onInit={bindEditorRef}
                    onEditorChange={handleOnEditorChange}
                    onUploadImage={notesActions.addImage}
                    initialValue={
                        editorState?.savedNote?.content ?? '<h1>Nueva Nota</h1>'
                    }
                />
            </StyledEditorContainer>
        </>
    );
};

const StyledSaveNoteButton = styled(IconButton)`
    margin-left: auto;
`;

const StyledEditorContainer = styled('main')(({ loaded }) => {
    return {
        opacity: loaded ? 1 : 0,
        height: 'calc(100% - 70px)',
    };
});

const StyledProgressContainer = styled('div')`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`;
