"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
    }
}
exports.default = User;
