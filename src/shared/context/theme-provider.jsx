import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        primary: purple,
        secondary: lime,
    },
});

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
    return (
        <>
            <CssBaseline />
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </>
    );
};
