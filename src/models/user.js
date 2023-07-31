"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const enumUserType = {
    ADMIN: 'Admin',
    MEMBER: 'Member',
};
const UserSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: Object.keys(enumUserType),
    },
    username: { type: String, required: true },
    password: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    mobile: { type: String },
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = exports.UserModel;
