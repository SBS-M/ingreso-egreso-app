import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import * as fromIngresoEgresoReducer from './../ingreso-egreso.reducer';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  ingresosSubscription: Subscription = new Subscription();
  egresosSubscription: Subscription = new Subscription();

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];
  
  constructor(
    private store: Store<fromIngresoEgresoReducer.AppState>
  ) { }

  ngOnInit() {
    this.listenerIngresosEgresos();
  }

  ngOnDestroy(): void {
    this.ingresosSubscription.unsubscribe();
  }

  public listenerIngresosEgresos(){
    this.ingresosSubscription = this.store.select('itemsUser').subscribe((collection) => {
      console.log("collection ", collection);
      
      this.contarIngresoEgreso(collection.items);
      
    })
  }

  public contarIngresoEgreso(listItems: Array<IngresoEgreso>){

    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;
    
    listItems.map((item) => {
      if(item.tipo === 'Ingreso'){
        this.ingresos += item.monto;
        this.cuantosIngresos ++;
      } else {
        this.egresos += item.monto;
        this.cuantosEgresos ++;
      } 
    })

    this.doughnutChartData = [this.ingresos, this.egresos];

  }

}
