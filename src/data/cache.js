import LRU from 'lru-cache';

class Cache {
    /**
     * @param {number} maxSize
     * @param {number} timeToLiveMs
     */
    constructor(maxSize, timeToLiveMs) {
        const options = {
            max: maxSize,
            ttl: timeToLiveMs,
            updateAgeOnGet: false,
            updateAgeOnHas: false,
        }

        this._cache = new LRU(options);
    }

    /**
     * Get from cache
     * @param {string} key
     * @returns {*}
     */
    get(key) {
        return this._cache.get(key);
    }

    /**
     * @param {string} key
     * @param {*} value
     * @returns {*}
     */
    set(key, value) {
        return this._cache.set(key, value);
    }
}

export {Cache}