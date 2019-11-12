import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/service/ingreso-egreso/ingreso-egreso.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, OnDestroy {

  listItems: Array<IngresoEgreso>;
  cargaDetalleSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.cargarDetalles();
  }

  ngOnDestroy(): void {
    this.cargaDetalleSubscription.unsubscribe();
  }

  public cargarDetalles(){
    this.cargaDetalleSubscription = this.store.select('itemsUser').subscribe((collection)=>{
      this.listItems = collection.items;
      console.log("listItems ", this.listItems);
      
    })
  }

  public borrarItem( item: IngresoEgreso ){
    
    this.ingresoEgresoService.borrarIngresoEgreso( item.uid )
    .then((result) => {
      console.log("result ", result);
      
      Swal.fire('Borrado', item.descripcion ,'success');
    })
    .catch((error) => {

    });

  }



}
