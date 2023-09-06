import {$host} from "./index";


export const createReview = async(title, piece, group, tag, description, grade, img, userId) => {
    const {data} = await $host.post('api/review/create', {title, piece, group, tag, description, grade, img, userId })
    return data;
}

export const dateReview = async() => {
    const {data} = await $host.get('api/review/date');
    return data;
}

export const ratindReview = async() => {
    const {data} = await $host.get('api/review/rating');
    return data;
}

export const personalReview = async(userId, rating, dateCreatind, grade) => {
    const {data} = await $host.get('api/review/personal', {userId, rating, dateCreatind, grade});
    return data;
}

export const fetchOneReview = async(id) => {
    const {data} = await $host.get('api/review/' + id);
    return data;
}

export const checkLike = async(userId, reviewId) => {
    const {data} = await $host.post('api/review/likes', {userId, reviewId});
    return data;
}   

export const putLikeReview = async(userId, reviewId) => {
    const {data} = await $host.post('api/review/like', {userId, reviewId});
    return data;
}

export const putRatingReview = async(reviewId, userId, grade) => {
    const {data} = await $host.post('api/review/rating', {reviewId, userId, grade});
    return data;
}

export const personalReviews = async(userId, group, dateCreation, grade) => {
    const {data} = await $host.get('api/review/personal/' + userId, null, {params: {
        group,
        dateCreation,
        grade
    }});
    return data;
}