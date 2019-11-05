
import * as fromUI from './components/shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.UIreducer,
};