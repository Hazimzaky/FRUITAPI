import mongoose from 'mongoose';
export declare const connectDatabase: () => Promise<void>;
export declare const disconnectDatabase: () => Promise<void>;
export declare const isDatabaseConnected: () => boolean;
export declare const getDatabaseInfo: () => {
    host: string;
    port: number;
    name: string;
    readyState: mongoose.ConnectionStates;
    states: {
        0: string;
        1: string;
        2: string;
        3: string;
    };
};
//# sourceMappingURL=database.d.ts.map