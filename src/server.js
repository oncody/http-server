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
     * @param {string} route
     * @param {Function} func. This takes in request and response
     */
    registerGetRoute(route, func) {
        this._server.get(route, func);
    }

    /**
     * Start listening and serving traffic
     */
    start() {
        this._server.listen(this._port);
    }
}

export {Server}
