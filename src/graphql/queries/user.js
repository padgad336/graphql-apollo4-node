"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../type-composers/user");
const userQueries = {
    users: user_1.UserTC.getResolver('findMany'),
    userId: user_1.UserTC.getResolver('findById')
};
exports.default = userQueries;
