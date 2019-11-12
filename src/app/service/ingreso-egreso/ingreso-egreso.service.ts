import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AuthService } from "./../auth/auth.service";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsActions, UnsetItemsActions } from 'src/app/components/ingreso-egreso/ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  public initIngresoEgresoListener() {

    this.ingresoEgresoListenerSubscription = this.store.select('authUser')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe((auth) => {
        
        this.ingresosEgresosItems( auth.user.uid);
      });
  }

  private ingresosEgresosItems(uid: string) {
    
    this.ingresoEgresoListenerSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`).snapshotChanges()
      .pipe( 
         map( docData => {
           return docData.map( doc => {
             return {
               uid: doc.payload.doc.id,
               ...doc.payload.doc.data()
             }
           } )
         })
      )
      .subscribe((collect: Array<any>) => {
        this.store.dispatch( new SetItemsActions(collect));
      });
  }

  public cancelarSubscriptions(){
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
    
    this.store.dispatch(new UnsetItemsActions())
  }

  public crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {

    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`).collection('items')
      .add({ ...ingresoEgreso });

  }

  public borrarIngresoEgreso( uid: String ){

    const user = this.authService.getUser();
    return this.afDB.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`).delete();

  }




}
