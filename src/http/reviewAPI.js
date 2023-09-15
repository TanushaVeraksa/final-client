import {$host} from "./index";

export const createReview = async(title, piece, group, tag, description, grade, img, publicId, userId) => {
    const {data} = await $host.post('api/review/create', {title, piece, group, tag, description, grade, img, publicId, userId })
    return data;
}

export const deleteReview = async(id) => {
    const {data} = await $host.post('api/review/delete', {id})
    return data;
}

export const oneReview = async(id) => {
    const {data} = await $host.post('api/review/one', {id})
    return data;
}

export const updateReview = async(id, title, piece, group, tag, description, grade, img, publicId) => {
    const {data} = await $host.post('api/review/update', {id, title, piece, group, tag, description, grade, img, publicId})
    return data;
}

export const destroyImage = async(publicId) => {
    const data = await $host.post('api/review/destroyImg', {publicId});
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

export const personalReviews = async(id, group, dateCreation, grade) => {
    const {data} = await $host.get('api/personal/' + id, {params: {
        group: group,
        dateCreation: dateCreation,
        grade: grade
    }});
    return data;
}

export const fetchPieceTitles = async() => {
    const {data} = await $host.get('api/piece/title');
    return data;
} 

export const getTags = async() => {
    const {data} = await $host.get('api/tag');
    return data;
} 

export const getReviewTags = async(tags) => {
    const {data} = await $host.get('api/tag/review-tag', {params: {
        tags:tags 
    }});
    return data;
} 


export const countLikes = async(id) => {
    const {data} = await $host.get('api/tag/count-likes', {params: {
        id:id 
    }});
    return data;
} 

export const searchReview = async(searchString) => {
    const {data} = await $host.get('api/search', {params: {
        searchString:searchString 
    }});
    return data;
} 


