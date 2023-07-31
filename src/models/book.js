"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
// project: {
//     type: Schema.Types.ObjectId,
//     ref: 'Project',
//     required: true,
// },
const BookSchema = new Schema({
    name: { type: String },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    category: {
        type: String
    }
});
exports.BookModel = mongoose_1.default.model('Book', BookSchema);
exports.default = exports.BookModel;
