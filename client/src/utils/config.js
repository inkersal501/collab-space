export const api_endpoint = import.meta.env.VITE_API_BASE_URL;
export const socket_endpoint = import.meta.env.VITE_SOCKET_BASE_URL;
export const app_name = import.meta.env.VITE_APP_NAME;
export const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const defaultState = {
    auth : { 
        user: null
    },
};

 