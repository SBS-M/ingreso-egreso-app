import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';


export const AUTH_USER = '[Auth] Usuario logueado';


export class AuthUserAction implements Action{
    readonly type = AUTH_USER;

    constructor( public user: User){}
}

export type authActions = AuthUserAction;