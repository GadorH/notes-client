import { Route, Routes } from 'react-router-dom';

import { Messages } from './shared/components/messages';
import { ThemeProvider } from './shared/context/theme-provider';
import { AuthProvider } from './auth/context/auth-provider';
import { MessagesProvider } from './shared/context/messages-provider';
import { NoteListPage } from './notes/pages/note-list-page';
import { NoteEditionPage } from './notes/pages/note-edition-page';
import { NoteSharedPage } from './notes/pages/note-shared-page';
import { LoginPage } from './auth/pages/login-page';
import { RegisterPage } from './auth/pages/register-page';


export const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider>
                <MessagesProvider>
                    <Messages />

                    <Routes>

                        <Route path="/register" element={<RegisterPage />} />
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
            </ThemeProvider>
        </AuthProvider>
    );
};
