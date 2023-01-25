"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Song {
    constructor(name, artist, year, album, genre, duration, isprivate = '0') {
        this.name = name.toString();
        this.artist = artist.toString();
        this.year = year.toString();
        this.album = album.toString();
        this.genre = genre.toString();
        this.duration = duration.toString();
        this.isprivate = isprivate.toString();
    }
}
exports.default = Song;
