import {makeAutoObservable} from 'mobx'

export default class ReviewStore {
    
    constructor() {
        this._lastReviews = [];
        this._topReviews = [];
        this._review = [];
        this._personalReview = [];
        this._selectedReview = {};
        this._pieceTitles = [];
        this._selectedImg = {};
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

   addPersonalReview(review) {
    this._personalReview.push(review);
   }

   deletePersonalReview(id) {
    this._personalReview = this._personalReview.filter(review => review._id !== id)
   }

   updatePersonalReview(newReview) {
    this._personalReview = this._personalReview.map(review => review._id === newReview._id ? {...newReview} : review);
   }

   completeReview(id) {
    this._personalReview = this._personalReview.map(review => review._id === id ? {...review, completed: !review.completed} : review)
   }

   setSelectedReview(review) {
    this._selectedReview = review;
   }

   setPieseTitles(titles) {
    this._pieceTitles = titles;
   }

   setSelectedImg(img) {
    this._selectedImg = img;
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

   get pieceTitles() {
    return this._pieceTitles;
   }

   get selectedImg() {
    return this._selectedImg;
   }
}