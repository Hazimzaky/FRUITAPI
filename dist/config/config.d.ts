interface Config {
    server: {
        port: number;
        nodeEnv: string;
        apiVersion: string;
        apiPrefix: string;
    };
    database: {
        mongodbUri: string;
        mongodbTestUri: string;
    };
    rateLimit: {
        windowMs: number;
        maxRequests: number;
    };
    cors: {
        origin: string;
    };
}
declare const config: Config;
export { config };
//# sourceMappingURL=config.d.ts.map