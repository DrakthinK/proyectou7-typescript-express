import Song from "./Song";

export default class Playlist{
  public name :string;
  public user_id:Number;
  public songs:Song[]=[];
   constructor( name :string,user_id:Number,songs:Song[]){
            this.name=name;
            this.user_id=Number(user_id);
            this.songs=songs;
     }
}