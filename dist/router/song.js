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
const Song_1 = __importDefault(require("../models/Song"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const songsr = express_1.default.Router();
const prisma = new client_1.PrismaClient();
songsr.get('/api/v1/songs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield prisma.song.findMany();
    res.json(songs);
}));
songsr.get('/api/v1/songs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs_id = req.params.id;
    const songs = yield prisma.song.findUnique({
        where: {
            id: Number(songs_id),
        },
    });
    if (songs.isprivate) {
        const token = req.header('auth-token');
        if (!token)
            return res.status(401).json('Access denied');
        try {
            const verificacion = jsonwebtoken_1.default.verify(token, process.env.TOKEN_KEY || 'tkwqwer');
            const usuario = yield prisma.user.findUnique({
                where: {
                    email: verificacion.id,
                },
                select: {
                    email: true,
                    password: true,
                }
            });
            if (usuario == null) {
                res.json({
                    "error": 401,
                    "msg": "credenciales token  incorecta"
                });
            }
            else {
                res.json(songs);
            }
        }
        catch (error) {
            res.status(401).json('Token invalido');
        }
    }
    else {
        res.json(songs);
    }
}));
songsr.post('/api/v1/songs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, artist, year, album, genre, duration, isprivate } = req.body;
    const cancion = new Song_1.default(name, artist, year, album, genre, duration, isprivate);
    const songs = yield prisma.song.create({
        data: cancion,
    });
    res.json(songs);
}));
exports.default = songsr;
