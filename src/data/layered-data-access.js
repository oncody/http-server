import {Cache} from "./cache.js";

class LayeredDataAccess {
    /**
     *
     * @param {Cache} cache
     */
    constructor(cache) {
        this._cache = cache;
    }

    /**
     * This will try to fetch it from cache. If that fails, then it will look it up according to the function and then add that value to cache
     * @param {string} key
     * @param {function} func
     * @returns {*}
     */
    get(key, func) {
        let value = this._cache.get(key);
        if(value) {
            return value;
        }

        value = func();
        this._cache.set(key, value);
        return value;
    }

    /**
     * This will try to fetch it from cache. If that fails, then it will look it up according to the function and then add that value to cache
     * @param {string} key
     * @param {function} func
     * @returns {*}
     */
    async asyncGet(key, func) {
        let value = this._cache.get(key);
        if(value) {
            return value;
        }

        value = await func();
        this._cache.set(key, value);
        return value;
    }
}

export {LayeredDataAccess}