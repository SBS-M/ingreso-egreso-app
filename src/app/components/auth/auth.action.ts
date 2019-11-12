import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';


export const AUTH_USER = '[Auth] Usuario logueado';
export const UNSET_USER = '[Auth] Usuario deslogueado';

export class AuthUserAction implements Action{
    readonly type = AUTH_USER;

    constructor( public user: User){}
}

export class UnSetUserAction implements Action{
    readonly type = UNSET_USER;
}

export type authActions = AuthUserAction | UnSetUserAction;