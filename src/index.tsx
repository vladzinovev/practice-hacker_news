import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StoreComponent from './store/store';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <StoreComponent>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      
    </StoreComponent>
);

