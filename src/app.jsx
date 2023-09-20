import { Route, Routes } from 'react-router-dom';

import { Messages } from './shared/components/messages';
import { ThemeProvider } from './shared/context/theme-provider';
import { MessagesProvider } from './shared/context/messages-provider';
import { NoteListPage } from './notes/pages/note-list-page';
import { NoteEditionPage } from './notes/pages/note-edition-page';
import { NoteSharedPage } from './notes/pages/note-shared-page';
import { LoginPage } from './auth/pages/login-page';
import { AuthProvider } from './auth/context/auth-provider';

export const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <MessagesProvider>
                    <Messages />

                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/notes" element={<NoteListPage />} />
                        <Route
                            path="/notes/new"
                            element={<NoteEditionPage />}
                        />
                        <Route
                            path="/notes/edit"
                            element={<NoteEditionPage />}
                        />
                        <Route
                            path="/notes/share/:noteId"
                            element={<NoteSharedPage />}
                        />
                    </Routes>
                </MessagesProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};
