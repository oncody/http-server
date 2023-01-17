import express from 'express';
import cors from 'cors';
import {Cache} from "./data/cache.js";
import {LayeredDataAccess} from "./data/layered-data-access.js";

class Server {
    /**
     * @param {number} port
     * @param {number} maxSize
     * @param {number} timeToLiveMs
     * @returns {Server}
     */
    constructor(port, maxSize, timeToLiveMs) {
        this._port = port;
        this._server = express();
        let cache = new Cache(maxSize, timeToLiveMs);
        this._layeredDataAccess = new LayeredDataAccess(cache);
    }

    /**
     * Register a get route
     * @param {string} url URL includes route param with :routeParam
     * @param {string} urlParameter
     * @param {Function} dataFetchFunction. Function to fetch the data
     */
    registerGet(url, urlParameter, dataFetchFunction) {
        this._server.get(url, async (request, response) => {
            let urlValue = request.params[urlParameter];
            let cacheKey = `/historical-data/${urlValue}`;
            let data = await this._layeredDataAccess.asyncGet(cacheKey, async () => await dataFetchFunction(urlValue));
            response.json({data: data});
        });

        return this;
    }

    /**
     * Enables cross origin resource sharing
     * @returns {Server}
     */
    enableCrossOriginResourceSharing() {
        this._server.use(cors());
        return this;
    }

    /**
     * This starts the server. Start listening and serving traffic
     */
    start() {
        this._server.listen(this._port);
    }
}

export {Server}
