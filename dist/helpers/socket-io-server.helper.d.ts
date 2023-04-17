/// <reference types="node" />
/// <reference types="node" />
import { Server as IOServer, Socket as IOSocket } from 'socket.io';
import Redis from 'ioredis';
import { Server } from 'http';
import { Handshake } from 'socket.io/dist/socket';
export interface ISocketIOServerOptions {
    identifier: string;
    useAuth: boolean;
    path?: string;
    port?: number;
    server: Server;
    redisConnection: Redis;
    authenticateFn: (args: Handshake) => Promise<boolean>;
    defaultRooms?: string[];
}
export declare class SocketIOServerHelper {
    private logger;
    private identifier;
    private path;
    private authenticateFn;
    private defaultRooms;
    private io;
    private emitter;
    private server;
    private redisConnection;
    private clients;
    constructor(opts: ISocketIOServerOptions);
    getIOServer(): IOServer<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
    getClients(opts?: {
        id: string;
    }): {
        id: string;
        socket: IOSocket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
        state: "authenticated" | "unauthorized" | "authenticating";
        interval?: NodeJS.Timeout | undefined;
        authenticateTimeout: NodeJS.Timeout;
    } | Record<string, {
        id: string;
        socket: IOSocket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
        state: "authenticated" | "unauthorized" | "authenticating";
        interval?: NodeJS.Timeout | undefined;
        authenticateTimeout: NodeJS.Timeout;
    }>;
    on(opts: {
        topic: string;
        handler: (...args: any) => Promise<void>;
    }): void;
    configure(): void;
    onClientConnect(opts: {
        socket: IOSocket;
    }): Promise<void>;
    onClientAuthenticated(opts: {
        socket: IOSocket;
    }): void;
    ping(opts: {
        socket: IOSocket;
        ignoreAuth: boolean;
    }): void;
    disconnect(opts: {
        socket: IOSocket;
    }): void;
    send(opts: {
        destination: string;
        payload: {
            topic: string;
            data: any;
        };
        log?: boolean;
        cb?: () => void;
    }): void;
}
