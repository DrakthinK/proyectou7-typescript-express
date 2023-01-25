import express, {Express,Request,Response} from 'express';
import {PrismaClient} from '@prisma/client';
import Playlist from '../models/Playlist';
import Song  from '../models/Song';
const playlistr=express.Router();
const prisma= new PrismaClient();

playlistr.post('/api/v1/playlist',async(req:Request,res:Response)=>{
  const {name,user_id,songs}=req.body;
  const listaReproduccion=new Playlist(name,user_id,songs);
  const playlist=await prisma.playlist.create({
   data :{
    name,
    usuario:{
      connect:{id:user_id},
    },
   },
  });
  
  //creamos las canciones
  //var song_playlist:any []=[];
  songs.forEach( async (element:any) => {
    const cancion= await prisma.song.create({
      data:new Song(element.name,element.artist,element.year,element.album,element.genre,element.duration)
    });

     //anadimor cancion_asociada_playlist
    
       const song_playlist_ax= await prisma.songs_playlist.create({
        data:{
          playlist:{
            connect:{id:Number(playlist.id)}
          },
          songs:{
            connect:{id:Number(cancion.id)}
          },
        },
      });
      //song_playlist.push(song_playlist_ax);

  });
 
  res.json({"success":200,"playlist":listaReproduccion})
});

playlistr.get('/api/v1/playlist',async (req:Request,res:Response) => {
  const playlists = await prisma.playlist.findMany();
  res.json(playlists);
})

playlistr.get('/api/v1/song_playlist',async (req:Request,res:Response) => {
  const song_playlists = await prisma.songs_playlist.findMany();
  res.json(song_playlists);
})

export default playlistr;