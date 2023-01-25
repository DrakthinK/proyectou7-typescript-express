"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./router/user"));
const song_1 = __importDefault(require("./router/song"));
const playlist_1 = __importDefault(require("./router/playlist"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.port || 5000;
app.use(express_1.default.json());
app.use(user_1.default);
app.use(song_1.default);
app.use(playlist_1.default);
app.get('/', (req, res) => {
    const contrasenaGeneradaConBcrypt = "$2b$10$5W8jPXBfbLq8U61Sfi5A6.VDq0cFgkTwoQgCHWgMCmo/zsJ0qd86K";
    const respuesta = bcrypt_1.default.compareSync("root2023", contrasenaGeneradaConBcrypt);
    res.send('Express + TypeScript Server,testing prisma ||test contraseña generada -> ' + respuesta);
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
