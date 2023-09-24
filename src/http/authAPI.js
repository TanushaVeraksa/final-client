import {$host} from "./index";
import jwt_decode from 'jwt-decode';

export const authGithub = async() => {
    try{
        const {data} = await $host.get('/api/github/')
        return data;
    } catch(e) {
        console.log(e)
    }

}

export const chechAuthGitHub = async() => {
    const {data} = await $host.get('/api/github/check', {headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        "Access-Controll-Allow-Credentials": true,
    }})
    return data;
}

export const logoutGithub = async() => {
    const {data} = await $host.get('/api/github/logout')
    return data;
}

export const logoutGoogle = async() => {
    const {data} = await $host.get('/api/google/logout')
    return data;
}

export const getGoogleUser = async(cookie) => {
    const {data} = await $host.get('/api/google/user', {params: {
        cookie: cookie
    }})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}

export const getGithubUser = async() => {
    const {data} = await $host.get('/api/github/user')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token);
}