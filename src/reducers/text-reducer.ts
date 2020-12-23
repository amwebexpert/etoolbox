import { TextInputsAction, TextInputActionTypes } from './../actions/text-actions';

export interface TextInputsState {
    map: Map<string, string>;
}

const DEFAULT_MAP = new Map<string, string>();
DEFAULT_MAP.set('lastUrlParserValue', 'https://codesandbox.io/dashboard/home?lastProject=WowWWW&name=Smith');
DEFAULT_MAP.set('lastUrlEncoderValue', 'this is a value not yet URL encoded');
DEFAULT_MAP.set('lastJSONFormatterValue', '{ "firstName": "Chuck", "lastName": "Norris" }');
DEFAULT_MAP.set('lastBase64EncoderValue', 'This is a value to Base64 encode');
DEFAULT_MAP.set('lastRegEx', '/(ing|eer|THIS)/gi');
DEFAULT_MAP.set('lastRegExTextSample', 'This is a string and engineer playing with text. A super test.');

const initalState: TextInputsState = loadFromLocalStorage();

function loadFromLocalStorage(): TextInputsState {
    const jsonData = localStorage.getItem('textInputs');
    if (!jsonData) {
        return { map: DEFAULT_MAP };
    } else {
        // https://stackoverflow.com/a/61671167/704681
        return { map: new Map<string, string>(JSON.parse(jsonData)) };
    }
}

function saveToLocalStorage(map: Map<string, string>): void {
    // https://stackoverflow.com/a/61671167/704681
    localStorage.setItem('textInputs', JSON.stringify(Array.from(map.entries())))
}

function reducer(state: TextInputsState = initalState, action: TextInputsAction) {
    switch (action.type) {
        case TextInputActionTypes.SET_INPUT_TEXT: {
            const map = new Map(state.map);
            map.set(action.name, action.value);
            saveToLocalStorage(map);
            return { map };
        }

        default:
            return state;
    }
}

export default reducer;
