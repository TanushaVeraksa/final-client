import {makeAutoObservable} from 'mobx'

export default class ReviewStore {
    constructor() {
        this._lastReviews = [];
        this._topReviews = [];
        this._review = [];
        this._personalReview = [];
        this._selectedReview = {};
        makeAutoObservable(this);
    }

   setLastReviews(reviews) {
        this._lastReviews = reviews;
   }

   setTopReviews(reviews) {
        this._topReviews = reviews;
   }

   setReview(review) {
    this._review = review;
   }

   setPersonalReview(review) {
    this._personalReview = review;
   }

   setSelectedReview(review) {
    this._selectedReview = review;
   }

   get lastReviews() {
    return this._lastReviews;
   }

   get topReviews() {
    return this._topReviews;
   }

   get review() {
    return this._review;
   }

   get personalReview() {
    return this._personalReview;
   }

   get selectedReview() {
    return this._selectedReview;
   }
}