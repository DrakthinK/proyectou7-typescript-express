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
const Playlist_1 = __importDefault(require("../models/Playlist"));
const Song_1 = __importDefault(require("../models/Song"));
const playlistr = express_1.default.Router();
const prisma = new client_1.PrismaClient();
playlistr.post('/api/v1/playlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, user_id, songs } = req.body;
    const listaReproduccion = new Playlist_1.default(name, user_id, songs);
    const playlist = yield prisma.playlist.create({
        data: {
            name,
            usuario: {
                connect: { id: user_id },
            },
        },
    });
    songs.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
        const cancion = yield prisma.song.create({
            data: new Song_1.default(element.name, element.artist, element.year, element.album, element.genre, element.duration)
        });
        const song_playlist_ax = yield prisma.songs_playlist.create({
            data: {
                playlist: {
                    connect: { id: Number(playlist.id) }
                },
                songs: {
                    connect: { id: Number(cancion.id) }
                },
            },
        });
    }));
    res.json({ "success": 200, "playlist": listaReproduccion });
}));
playlistr.get('/api/v1/playlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlists = yield prisma.playlist.findMany();
    res.json(playlists);
}));
playlistr.get('/api/v1/song_playlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const song_playlists = yield prisma.songs_playlist.findMany();
    res.json(song_playlists);
}));
exports.default = playlistr;
