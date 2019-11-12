
import * as fromAuth from './auth.action';
import { User } from 'src/app/models/user.model';


export interface AuthState {
    user: User
}

const estadoInicial: AuthState = {
    user: null
}

export function AuthReducer(state = estadoInicial, action: fromAuth.authActions): AuthState {

    switch (action.type) {
        case fromAuth.AUTH_USER:

            return {
                user: { ...action.user }
            };
        case fromAuth.UNSET_USER:
            return {
                user: null
            };
        default:
            return state;
    }
}