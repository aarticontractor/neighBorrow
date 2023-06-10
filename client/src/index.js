import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { StoreProvider } from './utils/globalState.js';
import './index.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto Slab", serif',  // Specify your font here
        fontWeight: '300',
        color: '#ffffff',
        textShadow: '2px 2px 4px #000000',
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);