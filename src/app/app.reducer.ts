
import * as fromUI from './components/shared/ui.reducer';
import * as fromAuth from './components/auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State;
    authUser: fromAuth.AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.UIreducer,
    authUser: fromAuth.AuthReducer
};