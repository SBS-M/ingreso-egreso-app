
import * as fromUI from './ui.accions';

export interface State {
    isLoading: boolean
}

const initState: State = {
    isLoading: false
}

export function UIreducer(state = initState, action: fromUI.acciones): State {

    switch (action.type) {
        case fromUI.ACTIVATE_LOADING:
            return {
                isLoading: true
            };
        case fromUI.DESACTIVATE_LOADING:
            return {
                isLoading: false
            };
        default:
            return state;
    }

}