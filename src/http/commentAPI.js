import {$host} from "./index";

export const sendComment = async(message, userEmail, reviewId) => {
    const {data} = await $host.post('api/comment/new-comment', {message, userEmail, reviewId})
    return data;
}

export const getComments = async(reviewId) => {
    const {data} = await $host.get('api/comment/review', {params: {
        reviewId: reviewId
    }})
    return data;
}

export const getComment = async(curr, reviewId, userEmail) => {
    const {data} = await $host.get('api/comment/get-comment', {params: {
        userEmail: userEmail,
        curr: curr,
        reviewId: reviewId
    }})
    return data;
}