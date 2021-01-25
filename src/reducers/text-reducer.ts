import { TextInputActionTypes, TextInputsAction } from './../actions/text-actions';

export interface TextInputsState {
    [key: string]: string;
}

const DEFAULT_MAP = new Map<string, string>();
DEFAULT_MAP.set('lastUrlParserValue', 'https://codesandbox.io/dashboard/home?lastProject=WowWWW&name=Smith');
DEFAULT_MAP.set('lastUrlEncoderValue', 'this is a value not yet URL encoded');
DEFAULT_MAP.set('lastJSONFormatterValue', '{ "firstName": "Chuck", "lastName": "Norris" }');
DEFAULT_MAP.set('lastBase64EncoderValue', 'This is a value to Base64 encode');
DEFAULT_MAP.set('lastRegEx', '/([A-Z]+-\\d+)/g');
DEFAULT_MAP.set('lastRegExTextSample', 'This is a string and engineer playing with text. A super test.');
DEFAULT_MAP.set('lastJWT', 'eyJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJTdXJ2YXRhIiwiYXVkIjoic3RhZ2luZyIsInN1YiI6ImFuZHJlLm1hc3NvbkBzdXJ2YXRhLmNvbSIsImlkIjoidTpHU3hBLXJoQlY0R1Y5S3BRVUNLbU5JMTE2RlkiLCJmdWxsTmFtZSI6IkFuZHJlIE1hc3NvbiIsImZpcnN0TmFtZSI6IkFuZHJlIiwibGFzdE5hbWUiOiJNYXNzb24iLCJncm91cHMiOlsiZzp1cHdhdmVjYyJdfQ.lu8walBHTVsEJmKwdmT_LEY193y6FgMlVR4UC4Uwpo9HuKl-IOCAAWR9MXYKl501hI50D4vwEuxvwgqSf9z-8GZFpAxswc2hoS5GqbcFsnTtw8BpDi0nsAJOt1CpBjwB3Bv8HObPKXNccojopjwicsjrgDBEWTTKCISa1_MxY-O8BHZA2ut_FnD7aIuyrMz8ChbyQLXT_iWvcHJ6Q78EByXNQhGAC52ixwZznZGcjwntrKysUbwz42lmBFyjhBiF42XYEu5sRwB5kBmBWTMA9KCHlTrBEdbUD8ldY4j9MvVzTP10t0Y73mh1x9SltFS9nCTrZtslCHRf_le_p0xlFi3QQxZizF08sL1GETP8EkPYusA4FDSIeYuHj717VKUP1hVSU9xuvk8BbWvtUfEModNuykpKywgNt6SlVwPgpoh5ixN_6V10Y_KUzHxVFr9i1MffropAmX2W9iHFFFAWuUbKQhbIVdITTmrwVrUt8dvQm5mPzUb4Uqr-63j-yeniG_3bGMp_Qw-JdTbSmJBEH7Q9d0WWSA3ipdbMXEDo9R5tW6Eughmdc2NAnEJ8lOaF8upxVdjrgzj51kL6ZXIKsVSQlmFEWSBfGPtu_5j0ofbv-tYCsucAAPWM-MLyYB0hsxUrwELVsnV6DvVZ2TN0BP81Upqib0ASyB-rkC0Xo-s');
DEFAULT_MAP.set('lastQRCodeTextValue', 'This is a value to store as QR Code');
DEFAULT_MAP.set('lastQRCodeOptions', '');
DEFAULT_MAP.set('lastSearchValue', '');

const initalState: TextInputsState = loadFromLocalStorage();

function loadFromLocalStorage(): TextInputsState {
    const state: TextInputsState = {};

    const testValue = localStorage.getItem('lastUrlParserValue');
    if (!testValue) {
        DEFAULT_MAP.forEach((value: string, key: string) => {
            state[key] = value;
        });
    } else {
        const keys = [...DEFAULT_MAP.keys()];
        keys.forEach(key => {
            state[key] = localStorage.getItem(key) || '';
        });
    }

    return state;
}

function reducer(state: TextInputsState = initalState, action: TextInputsAction) {
    switch (action.type) {
        case TextInputActionTypes.SET_INPUT_TEXT: {
            const newState = { ...state };
            newState[action.name] = action.value;
            return newState;
        }

        default:
            return state;
    }
}

export default reducer;
