import express, {Express,Request,Response} from 'express';
import dotenv from 'dotenv';

import usersr  from './router/user';
import bcrypt from 'bcrypt';

dotenv.config();
const app :Express=express();
const port =process.env.port || 5000;


app.use(express.json());
app.use(usersr);//endpoit de mi usuario-rutas
app.get('/',(req:Request,res:Response)=>{
  const contrasenaGeneradaConBcrypt :string="$2b$10$5W8jPXBfbLq8U61Sfi5A6.VDq0cFgkTwoQgCHWgMCmo/zsJ0qd86K";
  const respuesta:boolean=bcrypt.compareSync("root2023",contrasenaGeneradaConBcrypt);
  res.send('Express + TypeScript Server,testing prisma ||test contraseña generada -> '+respuesta)
 });


 app.listen(port,()=>{
  console.log(`Server running on http://localhost:${port}`)
})