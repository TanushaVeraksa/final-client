import {makeAutoObservable} from 'mobx'

export default class TagStore {
    
    constructor() {
        this._tags = [];
        this._serchedReviews = [];
        makeAutoObservable(this);
    }

    setSerchedReviews(review) {
        this._serchedReviews = review;
    }

    setTags(tag) {
        this._tags = tag;
    }

    addTags(tag) {
        Array.from(new Set(this._tags.concat(tag)));
    }

    get tags() {
        return this._tags;
    }

    get serchedReviews() {
        return this._serchedReviews;
    }
}