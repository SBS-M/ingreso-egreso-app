import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { IngresoEgresoService } from 'src/app/service/ingreso-egreso/ingreso-egreso.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as fromUI from './../shared/ui.accions';
import { Subscription } from 'rxjs';
import * as fromIngresoEgresoReducer from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoEgresoForm: FormGroup;
  loadingSuscription: Subscription = new Subscription();
  isLoading: boolean = false;

  constructor(
    private formBiulder: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<fromIngresoEgresoReducer.AppState>
  ) {
    this.ingresoEgresoForm = this.formBiulder.group({
      descripcion: ['', [Validators.required]],
      monto: [0, [Validators.required, Validators.min(1)]],
      tipo: ['Ingreso']
    });
   }

  ngOnInit() {
    this.loadingSuscription = this.store.select('ui').subscribe((result)=>{
      this.isLoading = result.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.loadingSuscription.unsubscribe();
  }

  public submitIngresoEgreso() {

    this.store.dispatch(new fromUI.ActivateLoadingAction());

    const ingresoEgreso = new IngresoEgreso({...this.ingresoEgresoForm.value});
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
      this.store.dispatch(new fromUI.DesactivateLoadingAction());
      this.ingresoEgresoForm.reset({
        monto: 0
      });
    })
    .catch(error => {
      this.store.dispatch(new fromUI.DesactivateLoadingAction());
      Swal.fire('Error', error, 'error');
    });
    
    console.log(ingresoEgreso);
  }

  public changeType(){
    this.ingresoEgresoForm.get('tipo').value === 'Ingreso' ? this.ingresoEgresoForm.get('tipo').setValue('Egreso') : this.ingresoEgresoForm.get('tipo').setValue('Ingreso');
  }

}
