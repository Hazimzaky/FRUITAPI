import express from 'express';
declare class Server {
    app: express.Application;
    private port;
    constructor();
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeErrorHandling;
    start(): Promise<void>;
    getApp(): express.Application;
}
declare const server: Server;
export default server;
//# sourceMappingURL=server.d.ts.map