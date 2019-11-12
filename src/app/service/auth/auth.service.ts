import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import * as fromUI from './../../components/shared/ui.reducer';
import * as fromAuth from './../../components/auth/auth.action';

// NgRx
import { Store } from '@ngrx/store';

// FireBase 
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from 'src/app/app.reducer';
import { ActivateLoadingAction, DesactivateLoadingAction } from 'src/app/components/shared/ui.accions';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSuscription: Subscription = new Subscription();
  private usuario: User;

  constructor( 
    private afAtuh: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
    ) { }

  initAuthListener(){
    this.afAtuh.authState.subscribe( (fbUser: firebase.User)=> {
      /* console.log("fbUser ", fbUser); */

      if ( fbUser ){
        this.userSuscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe((result: any) => {
          /* console.log(" this.result ", result); */
          this.store.dispatch(new fromAuth.AuthUserAction( new User( result )));
          this.usuario = new User(result);
        });
      } else {
        
        this.usuario = null;
        this.userSuscription.unsubscribe();
      }
    });
  };

  crearUsuario(nombre: string, email: string, password: string){
    
    this.store.dispatch( new ActivateLoadingAction());

    this.afAtuh.auth.createUserWithEmailAndPassword(email,password).then((result)=>{
      //console.log("Success ", result);

      const user: User = {
        uid: result.user.uid,
        nombre: nombre,
        correo: result.user.email
      };

      this.afDB.doc(`${ user.uid }/usuario`)
      .set( user ).then(() => {

        this.router.navigate(['/']);
        this.store.dispatch( new DesactivateLoadingAction());
      })
    }).catch((error)=>{
      console.error(error);
      this.store.dispatch( new DesactivateLoadingAction());
      Swal.fire('Error en la crecion de usuario', error.message, 'error');
    });

  };

  login(email: string, password: string){

    this.store.dispatch( new ActivateLoadingAction());

    this.afAtuh.auth.signInWithEmailAndPassword(email, password).then((result)=>{
      //console.log("Success ", result);

      this.router.navigate(['/dashboard']);
      this.store.dispatch( new DesactivateLoadingAction());
    }).catch((error)=>{
      console.error(error);
      this.store.dispatch( new DesactivateLoadingAction());
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

  getUser(){
    return new User(this.usuario);
  }

}
