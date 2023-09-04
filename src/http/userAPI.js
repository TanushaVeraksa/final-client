import {$host } from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async(email, name, password) => {
    const {data} = await $host.post('api/auth/registration', {email, name, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}

export const login = async(email, password) => {
    const {data} = await $host.post('api/auth/login', {email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}

export const check = async() => {
    try {
        let config = {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }
        const {data} = await $host.get('api/user/check', config)
        localStorage.setItem('access', data.access)

    } catch(e) {
        localStorage.setItem('access', '')
        console.log(e)
    }
}