import {makeAutoObservable} from 'mobx'

export default class ReviewStore {
    constructor() {
        this._lastReviews = [
            {id: 1, name: 'Book', img:'http://res.cloudinary.com/dshdtks2s/image/upload/v1693461026/jw535ung3ithuofo8s6q.jpg'},
            {id: 2, name: 'Film', img: 'http://res.cloudinary.com/dshdtks2s/image/upload/v1693461263/kpicaogl9tg58xmrwvgr.jpg'},
            {id: 2, name: 'Film', img: 'http://res.cloudinary.com/dshdtks2s/image/upload/v1693461263/kpicaogl9tg58xmrwvgr.jpg'},
            {id: 2, name: 'Film', img: 'http://res.cloudinary.com/dshdtks2s/image/upload/v1693461263/kpicaogl9tg58xmrwvgr.jpg'},
        ]

        this._topReviews = [
            {id: 1, name: 'Book', img:'http://res.cloudinary.com/dshdtks2s/image/upload/v1693463085/wo4qugqz8u6lxjexp7xs.jpg'},
            {id: 2, name: 'Film', img: 'http://res.cloudinary.com/dshdtks2s/image/upload/v1693463085/wo4qugqz8u6lxjexp7xs.jpg'},
            {id: 2, name: 'Film', img: 'http://res.cloudinary.com/dshdtks2s/image/upload/v1693463235/wn9gq4bcksenb9wxzkc8.jpg'},
            {id: 2, name: 'Film', img: 'http://res.cloudinary.com/dshdtks2s/image/upload/v1693461263/kpicaogl9tg58xmrwvgr.jpg'},
        ]
        makeAutoObservable(this);
    }

   setLastReviews(reviews) {
        this._lastReviews = reviews;
   }

   setTopReviews(reviews) {
        this._topReviews = reviews;
   }

   get lastReviews() {
    return this._lastReviews;
   }

   get topReviews() {
    return this._topReviews;
   }
}