import axios from 'axios';
import {store} from "../store/store.js";

const url = "http://localhost:8080/api/v1/";

const headers = {
    'Content-Type': 'application/json'
}

export const $axios = axios.create({
    baseURL: url,
    headers: headers,
});

const token = localStorage.getItem('token');

if (token) $axios.defaults.headers['authorization'] = `Bearer ${token}`;

$axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 403) {
            if(error.response.data.startsWith("JWT expired")) {
                store.dispatch('onLogout');
            } else {
                alert('У вас недостаточно прав');
            }
        }

        return Promise.reject(error);
    }
)