
export default class Song{
  public name :string;
  public artist:string;
  public year:string;
  public album:string;
  public genre:string;
  public duration:string;
  public isprivate:string;
   constructor( name :string,
    artist:string,
    year:string,
    album:string,
    genre:string,
    duration:string,
    isprivate:string='0'

                ){

            this.name=name.toString();
            this.artist=artist.toString();
            this.year=year.toString();
            this.album=album.toString();
            this.genre=genre.toString();
            this.duration=duration.toString();
            this.isprivate=isprivate.toString()
     }
}