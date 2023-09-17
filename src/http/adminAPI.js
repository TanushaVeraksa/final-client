import {$host} from "./index";

export const getUsers = async() => {
    const {data} = await $host.get('api/admin/users', {mode: 'no-cors'})
    return data;
}