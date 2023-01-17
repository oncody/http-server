import express from 'express';
import cors from 'cors';

class Server {
    /**
     * @param {number} port
     */
    constructor(port) {
        this._server = express();
        this._port = port;
    }

    /**
     * @returns {undefined}
     */
    enableCrossOriginResourceSharing() {
        this._server.use(cors());
    }

    /**
     * Register a get route
     * @param {string} url
     * @param {Function} func. This takes in request and response
     */
    registerGetRoute(url, func) {
        this._server.get(url, func);
    }

    /**
     * Start listening and serving traffic
     */
    start() {
        this._server.listen(this._port);
    }
}

export {Server}
