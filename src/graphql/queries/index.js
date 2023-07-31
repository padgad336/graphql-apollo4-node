"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const author_1 = __importDefault(require("./author"));
const book_1 = __importDefault(require("./book"));
const user_1 = __importDefault(require("./user"));
exports.default = Object.assign(Object.assign(Object.assign({}, user_1.default), book_1.default), author_1.default);
