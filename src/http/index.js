import axios from 'axios';

const $host = axios.create({
    baseURL: 'https://final-server-lyart.vercel.app'
})

const $authHost = axios.create({
    baseURL: 'https://final-server-lyart.vercel.app'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}