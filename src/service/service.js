import axios from 'axios';

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