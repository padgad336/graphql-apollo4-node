"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("config"));
const http_1 = require("http");
const server_1 = require("@apollo/server");
require("./Dbconfig/mongoDB");
const graphql_1 = __importDefault(require("./graphql"));
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
(async function () {
    const app = (0, express_1.default)();
    const port = config_1.default.get('app.port');
    const host = config_1.default.get('app.host');
    //
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
    app.use(express_1.default.json({ limit: '50mb' }));
    // app.use(graphqlUploadExpress())
    app.use('/upload', express_1.default.static(path_1.default.join(__dirname, '../assets')));
    /**
     * Router API V.1.
     * @remarks
     *  API Version 1
     */
    app.get('/', (req, res) => {
        res.send('Express + TypeScript Server');
    });
    const httpServer = (0, http_1.createServer)(app);
    // Creating the WebSocket server
    const wsServer = new ws_1.WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if your ApolloServer serves at
        // a different path.
        path: '/graphql',
    });
    // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    const serverCleanup = (0, ws_2.useServer)({ schema: graphql_1.default }, wsServer);
    /**
     * ApolloServer Config.
     * @remarks
     *  Apollo Server 3
     * @constructor
     * @param {any.schemaComposer} schema - Schema GraphQL import schema from './graphql' .
     * @param {PluginDefinition[]} plugins - config Dashboaimport router from './router/v1/router';
rd Apollo or Playgroud import { ContentModel } from './models/content';
    
     *  Open  PlayGround use ApolloServerPluginLandingPageGraphQLPlayground.
     *  Close PlayGround use ApolloServerPluginLandingPageDisabled
     * @see https://www.apollographql.com/docs/apollo-server/migration/
     *
     */
    const server = new server_1.ApolloServer({
        schema: graphql_1.default,
        csrfPrevention: false,
        cache: 'bounded',
        plugins: [
            // Proper shutdown for the HTTP server.
            (0, default_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });
    // const wsServer = new WebSocketServer({
    //     // This is the `httpServer` we created in a previous step.
    //     server: httpServer,
    //     // Pass a different path here if your ApolloServer serves at
    //     // a different path.
    //     path: '/graphql',
    // });
    await server.start();
    app.use('/graphql', (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server));
    // server.applyMiddleware({ app })
    httpServer.listen(port, () => {
        console.log(`Server is now running on http://localhost:${port}/graphql`);
    });
})();
