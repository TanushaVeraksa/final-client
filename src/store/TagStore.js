import {makeAutoObservable} from 'mobx'

export default class TagStore {
    
    constructor() {
        this._tags = [];
        makeAutoObservable(this);
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
}