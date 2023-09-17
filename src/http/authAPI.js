import {$host} from "./index";

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