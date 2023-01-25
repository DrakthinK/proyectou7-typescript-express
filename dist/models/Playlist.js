"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Playlist {
    constructor(name, user_id, songs) {
        this.songs = [];
        this.name = name;
        this.user_id = Number(user_id);
        this.songs = songs;
    }
}
exports.default = Playlist;
