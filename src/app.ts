import express, { Application, Request, Response, NextFunction } from 'express'
import fs from 'fs'
import cors from 'cors'
import path from 'path'
import config from 'config'
import { v1 as uuid } from 'uuid'
import { createServer, Server } from 'http'
import {
	 ApolloServer
} from '@apollo/server'
import mongoose from 'mongoose'

import './Dbconfig/mongoDB'
import schema from './graphql'

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { execute, subscribe } from 'graphql'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'

(async function () {
	const app: Application = express()
	const port = config.get('app.port')
	const host = config.get('app.host')

	//
	app.use(cors())
	app.use(express.urlencoded({ limit: '50mb', extended: true }))
	app.use(express.json({ limit: '50mb' }))
	// app.use(graphqlUploadExpress())
	app.use('/upload', express.static(path.join(__dirname, '../assets')))

	/**
	 * Router API V.1.
	 * @remarks
	 *  API Version 1
	 */

	app.get('/', (req: Request, res: Response) => {
		res.send('Express + TypeScript Server')
	})

	
	const httpServer: Server = createServer(app)
	// Creating the WebSocket server
	const wsServer = new WebSocketServer({
		// This is the `httpServer` we created in a previous step.
		server: httpServer,
		// Pass a different path here if your ApolloServer serves at
		// a different path.
		path: '/graphql',
	})

	// Hand in the schema we just created and have the
	// WebSocketServer start listening.
	const serverCleanup = useServer({ schema }, wsServer)
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

	const server = new ApolloServer({
		schema,
		csrfPrevention: false,
		cache: 'bounded',
		plugins: [
			// Proper shutdown for the HTTP server.
			ApolloServerPluginLandingPageLocalDefault({ embed: true }),
			ApolloServerPluginDrainHttpServer({ httpServer }),
			// Proper shutdown for the WebSocket server.
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose()
						},
					}
				},
			},
		],
	})
	// const wsServer = new WebSocketServer({
	//     // This is the `httpServer` we created in a previous step.
	//     server: httpServer,
	//     // Pass a different path here if your ApolloServer serves at
	//     // a different path.
	//     path: '/graphql',
	// });

	await server.start()
	app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));
	// server.applyMiddleware({ app })

	httpServer.listen(port, () => {
		console.log(
			`Server is now running on http://localhost:${port}/graphql`
		)
	})
})()


