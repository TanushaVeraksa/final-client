import {$host} from "./index";

export const sendComment = async(message, email, reviewId) => {
    const {data} = await $host.post('api/comment/new-comment', {message, email, reviewId})
    return data;
}

export const getComments = async(reviewId) => {
    const {data} = await $host.get('api/comment/review', {params: {
        reviewId: reviewId
    }})
    return data;
}