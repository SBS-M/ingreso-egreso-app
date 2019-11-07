import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit {

  ingresoEgresoForm: FormGroup;

  constructor(
    private formBiulder: FormBuilder
  ) {
    this.ingresoEgresoForm = this.formBiulder.group({
      descripcion: ['', [Validators.required]],
      monto: [0, [Validators.required, Validators.min(1)]],
      tipo: ['Ingreso']
    });
   }

  ngOnInit() {
  }

  public submitIngresoEgreso() {
    
    const ingresoEgreso = new IngresoEgreso(this.ingresoEgresoForm.value);
    console.log(ingresoEgreso);

  }

  public changeType(){
    this.ingresoEgresoForm.get('tipo').value === 'Ingreso' ? this.ingresoEgresoForm.get('tipo').setValue('Egreso') : this.ingresoEgresoForm.get('tipo').setValue('Ingreso');
  }

}
