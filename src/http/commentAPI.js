import {$host} from "./index";

export const sendComment = async(message, userName, reviewId) => {
    const {data} = await $host.post('api/comment/new-comment', {message, userName, reviewId})
    return data;
}

export const getComments = async(reviewId) => {
    const {data} = await $host.get('api/comment/review', {params: {
        reviewId: reviewId
    }})
    return data;
}

export const getComment = async(curr, reviewId, userName) => {
    const {data} = await $host.get('api/comment/get-comment', {params: {
        userName: userName,
        curr: curr,
        reviewId: reviewId
    }})
    return data;
}