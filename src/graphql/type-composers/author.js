"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const models_1 = require("../../models");
exports.AuthorTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(models_1.AuthorModel);
