import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));  //Newest React syntax (as it stands today) for App rendering
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
