import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
//state mgmt
import { Provider } from 'react-redux';
import store from "@store/store";
//google auth
import { GoogleOAuthProvider } from "@react-oauth/google";
import { google_client_id } from '@utils/config.js';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
//react-query cache

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer position="top-center" autoClose={2000} theme="dark"/>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={google_client_id}>
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
