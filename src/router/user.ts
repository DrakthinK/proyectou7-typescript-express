import express, {Express,Request,Response} from 'express';
import {PrismaClient} from '@prisma/client';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const usersr=express.Router();
const prisma= new PrismaClient();


usersr.get('/api/v1/users',async (req:Request,res:Response)=>{
  const users = await prisma.user.findMany();
  res.json(users);
});


usersr.post('/api/v1/users',async(req:Request,res:Response)=>{
   const {name,email,password}=req.body;
   let Usuario:User= new User(name,email,password);
   const users=await prisma.user.create({
    data :Usuario,
   });
   res.json(users)
});

usersr.post('/api/v1/users/login',async(req:Request,res:Response)=>{
  const {email,password}=req.body;
  
  const usuario = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
      }
      })
      // res.json(usuario);
  
  if (usuario==null){
      res.json({
        "error":401,
        "msg":"credenciales incorectas"
      });
  }else{
      const ispassword=bcrypt.compareSync(password,usuario.password)
      if(ispassword){
        const token:string=jwt.sign({id:usuario.email},process.env.TOKEN_KEY||'tkwqwer',{
          expiresIn:60*60*24
        })
        res.header('auth-token',token).json(usuario);
      }else{
        res.json({
          "error":401,
          "msg":"credenciales incorectas"
        });
      }
  }
  

});


export default usersr;