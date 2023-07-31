"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const models_1 = require("../../models");
const baseOptions = {
    fields: {
        remove: ['password'],
    },
};
exports.UserTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(models_1.UserModel, baseOptions);
exports.UserTC.addRelation('createdById', {
    resolver: () => exports.UserTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.createdById,
    },
    projection: { createdById: true },
});
exports.default = exports.UserTC;
