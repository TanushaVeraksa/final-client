import {makeAutoObservable} from 'mobx'

export default class CommentStore {
    constructor() {
        this._reviewComments = [];
        makeAutoObservable(this);
    }

    setReviewComments(comments) {
        this._reviewComments = comments;
    }
    addReviewComments(comment) {
        this._reviewComments.push(comment);
       }
    get reviewComments() {
        return this._reviewComments;
    }
}