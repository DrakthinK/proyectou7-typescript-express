import express, {Express,Request,Response} from 'express';
import {PrismaClient, song} from '@prisma/client';
import Song from '../models/Song';
import jwt from 'jsonwebtoken';
const songsr=express.Router();
const prisma= new PrismaClient();


export interface IPverificacion {
  id: string;
  iat: number;
} 


songsr.get('/api/v1/songs',async (req:Request,res:Response)=>{
  const songs = await prisma.song.findMany();
  res.json(songs);
});
///api/v1/songs/:id
songsr.get('/api/v1/songs/:id',async (req:Request,res:Response)=>{
  const songs_id=req.params.id;

  const songs = await prisma.song.findUnique({
    where:{
      id:Number(songs_id),
    },
  });

  if (songs.isprivate){
        const token= req.header('auth-token');
        if(!token) return res.status(401).json('Access denied')
        try{

          const verificacion=jwt.verify(token, process.env.TOKEN_KEY|| 'tkwqwer') as IPverificacion
          const usuario = await prisma.user.findUnique({
            where: {
              email: verificacion.id,
            },
            select: {
              email: true,
              password: true,
            }
            })
          
        if (usuario==null){
              res.json({
                "error":401,
                "msg":"credenciales token  incorecta"
              });
        }else{
            res.json(songs)
          }
        }catch(error){
           res.status(401).json('Token invalido')
        }

  }else{

    res.json(songs);
  }
});
songsr.post('/api/v1/songs',async(req:Request,res:Response)=>{
  const {name,artist,year,album,genre,duration,isprivate}=req.body;
  const cancion:Song=new Song(name,artist,year,album,genre,duration,isprivate);

  const songs=await prisma.song.create({
    data :cancion,
   });
  res.json(songs)
});

export default songsr;