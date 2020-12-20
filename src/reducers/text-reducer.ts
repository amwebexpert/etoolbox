import { TextInputsAction, TextInputActionTypes } from './../actions/text-actions';

export interface TextInputsState {
    map: Map<string, string>;
}

const initalState: TextInputsState = {
    map: new Map()
}

function reducer(state: TextInputsState = initalState, action: TextInputsAction) {
    switch (action.type) {
        case TextInputActionTypes.SET_INPUT_TEXT: {
            const map = new Map(state.map);
            map.set(action.name, action.value);
            return { map };
        }

        default:
            return state;
    }
}

export default reducer;
