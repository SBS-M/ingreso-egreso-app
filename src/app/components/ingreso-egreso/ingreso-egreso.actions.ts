import { Action } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';


export const SET_ITEMS = '[Ingreso-Egreso] Set items';
export const UNSET_ITEMS = '[Ingreso-Egreso] Unset items';


export class SetItemsActions implements Action{
    readonly type = SET_ITEMS;
    constructor( public items: Array<IngresoEgreso>){}
}

export class UnsetItemsActions implements Action{
    readonly type = UNSET_ITEMS;
}

export type IngresoEgresoActions = SetItemsActions | UnsetItemsActions;