import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import * as fromIngresoEgreso from './ingreso-egreso.actions';


export interface IngresoEgresoState {
    items: Array<IngresoEgreso>;
}


const estadoInicial: IngresoEgresoState = {
    items: new Array<IngresoEgreso>()
}


export function IngresoEgresoReducer(state: IngresoEgresoState = estadoInicial, action: fromIngresoEgreso.IngresoEgresoActions): IngresoEgresoState {

    switch (action.type) {
        case fromIngresoEgreso.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item => {
                        return {...item};
                    })
                ]
            };
        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: new Array<IngresoEgreso>()
            };
        default:
            return state;
    }

}