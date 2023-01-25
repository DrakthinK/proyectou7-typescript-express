"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersr = express_1.default.Router();
const prisma = new client_1.PrismaClient();
usersr.get('/api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json(users);
}));
usersr.post('/api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    let Usuario = new User_1.default(name, email, password);
    const users = yield prisma.user.create({
        data: Usuario,
    });
    res.json(users);
}));
usersr.post('/api/v1/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const usuario = yield prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            email: true,
            password: true,
        }
    });
    if (usuario == null) {
        res.json({
            "error": 401,
            "msg": "credenciales incorectas"
        });
    }
    else {
        const ispassword = bcrypt_1.default.compareSync(password, usuario.password);
        if (ispassword) {
            const token = jsonwebtoken_1.default.sign({ id: usuario.email }, process.env.TOKEN_KEY || 'tkwqwer', {
                expiresIn: 60 * 60 * 24
            });
            res.header('auth-token', token).json(usuario);
        }
        else {
            res.json({
                "error": 401,
                "msg": "credenciales incorectas"
            });
        }
    }
}));
exports.default = usersr;
