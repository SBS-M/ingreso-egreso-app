

export class User {

    public nombre: string;
    public correo: string;
    public uid: string;

    constructor( nombre: string, correo: string, uid: string){
        this.nombre = nombre;
        this.correo = correo;
        this.uid = uid;
    }
    
}