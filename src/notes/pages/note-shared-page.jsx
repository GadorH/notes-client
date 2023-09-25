import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';

import useNotes from '../hooks/useNotes.js';

export const NoteSharedPage = () => {
    const { noteId } = useParams();
    const { state: notesState, actions: notesActions } = useNotes();

    useEffect(() => {
        notesActions.retrievePublic(noteId);
    }, [noteId]);

    const [note] = notesState.notes;

    return <Container dangerouslySetInnerHTML={{ __html: note?.content }} />;
};
