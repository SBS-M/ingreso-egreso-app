

export class User {

    public nombre: string;
    public correo: string;
    public uid: string;

    constructor( user: DataUser ){
        this.nombre = user && user.nombre || null;
        this.correo = user && user.correo || null;
        this.uid = user && user.uid || null;
    }
    
}

interface DataUser {
    nombre: string;
    correo: string;
    uid: string;
}