"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const authorSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    penedname: {
        type: String
    }
});
exports.AuthorModel = mongoose_1.default.model('Author', authorSchema);
exports.default = exports.AuthorModel;
