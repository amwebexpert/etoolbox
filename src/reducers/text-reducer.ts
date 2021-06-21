import { TextInputActionTypes, TextInputsAction } from './../actions/text-actions';

export interface TextInputsState {
    [key: string]: string;
}

const DEFAULT_MAP = new Map<string, string>();
DEFAULT_MAP.set('lastUrlParserValue', 'https://codesandbox.io/dashboard/home?lastProject=WowWWW&name=Smith');
DEFAULT_MAP.set('lastUrlEncoderValue', 'The chief export of Chuck Norris is pain.');
DEFAULT_MAP.set('lastJSONFormatterValue', '{ "firstName": "Chuck", "lastName": "Norris" }');
DEFAULT_MAP.set('lastBase64EncoderValue', 'Chuck Norris recently had the idea to sell his pee as a canned beverage. It is now called Red Bull.');
DEFAULT_MAP.set('lastRegEx', '/([A-Z]+-\\d+)/g');
DEFAULT_MAP.set('lastRegExTextSample', 'Since [AC-1940], the year Chuck Norris was born, roundhouse kick related deaths have increased 13,000 percent.');
DEFAULT_MAP.set('lastJWT', 'eyJhbGciOiJSUzUxMiJ9.eyJpc3MiOiJTdXJ2YXRhIiwiYXVkIjoic3RhZ2luZyIsInN1YiI6ImFuZHJlLm1hc3NvbkBzdXJ2YXRhLmNvbSIsImlkIjoidTpHU3hBLXJoQlY0R1Y5S3BRVUNLbU5JMTE2RlkiLCJmdWxsTmFtZSI6IkFuZHJlIE1hc3NvbiIsImZpcnN0TmFtZSI6IkFuZHJlIiwibGFzdE5hbWUiOiJNYXNzb24iLCJncm91cHMiOlsiZzp1cHdhdmVjYyJdfQ.lu8walBHTVsEJmKwdmT_LEY193y6FgMlVR4UC4Uwpo9HuKl-IOCAAWR9MXYKl501hI50D4vwEuxvwgqSf9z-8GZFpAxswc2hoS5GqbcFsnTtw8BpDi0nsAJOt1CpBjwB3Bv8HObPKXNccojopjwicsjrgDBEWTTKCISa1_MxY-O8BHZA2ut_FnD7aIuyrMz8ChbyQLXT_iWvcHJ6Q78EByXNQhGAC52ixwZznZGcjwntrKysUbwz42lmBFyjhBiF42XYEu5sRwB5kBmBWTMA9KCHlTrBEdbUD8ldY4j9MvVzTP10t0Y73mh1x9SltFS9nCTrZtslCHRf_le_p0xlFi3QQxZizF08sL1GETP8EkPYusA4FDSIeYuHj717VKUP1hVSU9xuvk8BbWvtUfEModNuykpKywgNt6SlVwPgpoh5ixN_6V10Y_KUzHxVFr9i1MffropAmX2W9iHFFFAWuUbKQhbIVdITTmrwVrUt8dvQm5mPzUb4Uqr-63j-yeniG_3bGMp_Qw-JdTbSmJBEH7Q9d0WWSA3ipdbMXEDo9R5tW6Eughmdc2NAnEJ8lOaF8upxVdjrgzj51kL6ZXIKsVSQlmFEWSBfGPtu_5j0ofbv-tYCsucAAPWM-MLyYB0hsxUrwELVsnV6DvVZ2TN0BP81Upqib0ASyB-rkC0Xo-s');
DEFAULT_MAP.set('lastQRCodeTextValue', 'Chuck Norris appeared in the ‘Street Fighter II’ video game, but was removed by Beta Testers because every button caused him to do a roundhouse kick. When asked bout this “glitch,” Chuck Norris replied, “That’s no glitch.”');
DEFAULT_MAP.set('lastQRCodeOptions', '');
DEFAULT_MAP.set('lastSearchValue', '');
DEFAULT_MAP.set('lastGithubUsernameValue', '');
DEFAULT_MAP.set('lastJSON2Convert', '{ "firstName": "Chuck", "lastName": "Norris" }');
DEFAULT_MAP.set('lastJSON2ConvertOptionSource', 'json');
DEFAULT_MAP.set('lastJSON2ConvertOptionTarget', 'csharp');
DEFAULT_MAP.set('lastJSON2ConvertOptionRootClassname', 'RootClass');

const initalState: TextInputsState = loadFromLocalStorage();

function loadFromLocalStorage(): TextInputsState {
    const state: TextInputsState = {};

    const keys = [...DEFAULT_MAP.keys()];
    keys.forEach(key => {
        state[key] = localStorage.getItem(key) || DEFAULT_MAP.get(key) || '';
    });

    return state;
}

function reducer(state: TextInputsState = initalState, action: TextInputsAction) {
    switch (action.type) {
        case TextInputActionTypes.SET_INPUT_TEXT: {
            const newState = { ...state };
            newState[action.name] = action.value;
            localStorage.setItem(action.name, action.value);
            return newState;
        }

        default:
            return state;
    }
}

export default reducer;
