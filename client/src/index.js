import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { StoreProvider } from './utils/globalState.js';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);