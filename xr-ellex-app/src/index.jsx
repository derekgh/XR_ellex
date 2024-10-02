import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import useStore from './state';

const root = ReactDOM.createRoot(document.getElementById('root'));

const handleKeyDown = (event) => {
  useStore.getState().setKeyState(event.key, true);
};

const handleKeyUp = (event) => {
  useStore.getState().setKeyState(event.key, false);
};

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals(); 