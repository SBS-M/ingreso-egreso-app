import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private afDB: AngularFirestore) { }


  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    this.afDB.doc(`UID/ingresos-egresos`).collection('items')
    .add({...ingresoEgreso})
  }


}
