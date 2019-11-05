import { Action } from "@ngrx/store";

export const ACTIVATE_LOADING = '[UI] Cargando';
export const DESACTIVATE_LOADING = '[UI] Fin de la carga';

export class ActivateLoadingAction implements Action {
    readonly type = ACTIVATE_LOADING;
}

export class DesactivateLoadingAction implements Action {
    readonly type = DESACTIVATE_LOADING;
}

export type acciones = ActivateLoadingAction | DesactivateLoadingAction;