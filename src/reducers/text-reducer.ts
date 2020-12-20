import { TextInputsAction, TextInputActionTypes } from './../actions/text-actions';

export interface TextInputsState {
    map: Map<string, string>;
}

const map = new Map();
map.set('lastUrlParserValue', 'https://codesandbox.io/dashboard/home?lastProject=WowWWW&name=Smith');
map.set('lastUrlEncoderValue', 'this is a value not yet URL encoded');
map.set('lastJSONFormatterValue', '{ "firstName": "Chuck", "lastName": "Norris" }');
map.set('lastBase64EncoderValue', 'This is a value to Base64 encode');

const initalState: TextInputsState = {
    map
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
