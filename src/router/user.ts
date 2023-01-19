import express, {Express,Request,Response} from 'express';
import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';
const usersr=express.Router();
const prisma= new PrismaClient();


usersr.get('/user',async (req:Request,res:Response)=>{
  const users = await prisma.user.findMany();
  res.json(users);
});


usersr.post('/user',async(req:Request,res:Response)=>{
   const {name,email,password}=req.body;
   //bcrypt.compareSync(password,user.password)
   const users=await prisma.user.create({
    data :{
      name:name,
      email:email,
      password:bcrypt.hashSync(password,bcrypt.genSaltSync(10)),
    },
   });
   res.json(users)
});

export default usersr;