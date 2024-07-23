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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
