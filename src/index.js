import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// A referencia ao HTML onde o React irá "anexar" o app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza o componente App
root.render (
    <React.StrictMode>
        <App />
    </React.StrictMode>
);