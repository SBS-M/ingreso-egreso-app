import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';

// FireBase 
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private afAtuh: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore 
    ) { }

  initAuthListener(){
    this.afAtuh.authState.subscribe( (fbUser: firebase.User)=> {
      console.log("fbUser ", fbUser);
      
    });
  };

  crearUsuario(nombre: string, email: string, password: string){
    
    this.afAtuh.auth.createUserWithEmailAndPassword(email,password).then((result)=>{
      console.log("Success ", result);

      const user: User = {
        uid: result.user.uid,
        nombre: nombre,
        correo: result.user.email
      };

      this.afDB.doc(`${ user.uid }/usuario`)
      .set( user ).then(() => {
        this.router.navigate(['/']);
      })
    }).catch((error)=>{
      console.error(error);
      Swal.fire('Error en la crecion de usuario', error.message, 'error');
    });

  };

  login(email: string, password: string){

    this.afAtuh.auth.signInWithEmailAndPassword(email, password).then((result)=>{
      console.log("Success ", result);
      this.router.navigate(['/dashboard']);
    }).catch((error)=>{
      console.error(error);
      Swal.fire('Error en el login', error.message, 'error');
    });
  }

  logOut(){
    this.afAtuh.auth.signOut();
    this.router.navigate(['/login']);
  }
  
  isAuth(){
    return this.afAtuh.authState.pipe(
      map( fbUser => {
        
        if(fbUser === null){
          this.router.navigate(['/login']);
        }

        return fbUser != null })
    );
  }

}
