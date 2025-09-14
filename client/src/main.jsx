import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from "@store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { google_client_id } from '@utils/config.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer position="top-center" autoClose={2000} theme="dark"/>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={google_client_id}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
