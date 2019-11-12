import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform( items: Array<IngresoEgreso> ): Array<IngresoEgreso> {
    return items.sort( (a,b) => {
      
      if( a.tipo === 'Ingreso'){
        return -1;
      } else {
        return 1;
      }
    });
  }

}
