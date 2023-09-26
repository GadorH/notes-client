import { useState } from 'react';
import {
    createNoteService,
    editNoteService,
    getNoteService,
    getAllNotesService,
    removeNoteService,
    uploadImageService,
    getPublicNoteService,
} from '../services/notes-services.js';

const useNotes = () => {
    const [notes, setNotes] = useState([]);

    const create = async (noteData) => {
        return await createNoteService(noteData);
    };

    const retrieveAll = async () => {
        const notes = await getAllNotesService();
        setNotes(notes);
    };

    const retrieve = async (noteId) => {
        const note = await getNoteService(noteId);
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    const retrievePublic = async (noteId) => {
        const note = await getPublicNoteService(noteId);
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    const remove = async (noteId) => {
        await removeNoteService(noteId);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    };

    const edit = async (noteId, payload) => {
        const editedNote = await editNoteService(noteId, payload);

        setNotes((prevNotes) =>
            prevNotes.map((note) => {
                if (note.id === noteId) {
                    return editedNote;
                }

                return note;
            })
        );

        return editedNote;
    };

    const addImage = async (blobInfo) => {
        const { location } = await uploadImageService(blobInfo);
        return location;
    };

    const publish = async (noteId) => {
        await edit(noteId, { public: true });
    };

    const unpublish = async (noteId) => {
        await edit(noteId, { public: false });
    };

    const sharePublic = (noteId) => {
        return `${window.location.origin}/#/notes/share/${noteId}`;
    };

    return {
        state: {
            notes,
        },
        actions: {
            create,
            retrieve,
            retrievePublic,
            retrieveAll,
            remove,
            publish,
            unpublish,
            edit,
            sharePublic,
            addImage,
        },
    };
};

export default useNotes;
