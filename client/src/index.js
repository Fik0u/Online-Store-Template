import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './JS/store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store} >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

