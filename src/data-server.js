import {Server} from "./server.js";
import {Cache} from "./data/cache.js";
import {LayeredDataAccess} from "./data/layered-data-access.js";

class DataServer extends Server {

    /**
     * @param {number} port
     * @param {number} maxSize
     * @param {number} timeToLiveMs
     */
    constructor(port, maxSize, timeToLiveMs) {
        super(port);
        let cache = new Cache(maxSize, timeToLiveMs);
        this._layeredDataAccess = new LayeredDataAccess(cache);
    }

    /**
     * Register a get route
     * @param {string} url URL includes route param with :routeParam
     * @param {string} urlParameter
     * @param {Function} dataFetchFunction. Function to fetch the data
     */
    registerGetRouteWithDataFunction(url, urlParameter, dataFetchFunction) {
        super.registerGetRoute(url, async (request, response) => {
            let urlValue = request.params[urlParameter];
            let cacheKey = `/historical-data/${urlValue}`;
            let data = await this._layeredDataAccess.asyncGet(cacheKey, async () => await dataFetchFunction(urlValue));
            response.json({data: data});
        });
    }
}

export {DataServer}