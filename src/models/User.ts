import bcrypt from 'bcrypt';
export default class User{
  public name :string;
  public email:string;
  public password:string
   constructor( name :string,
                 email:string,
                 password:string
                ){

            this.name=name;
            this.email=email;
            this.password=bcrypt.hashSync(password,bcrypt.genSaltSync(10));
     }
}

/* 
interface User{
  name:string,
  email:string,
  password:string

} */