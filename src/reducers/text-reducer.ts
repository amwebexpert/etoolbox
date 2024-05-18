import { TextInputActionTypes, TextInputsAction } from './../actions/text-actions';

export interface TextInputsState {
  [key: string]: string;
}

const CURL_EXAMPLE = `curl 'http://en.wikipedia.org/'
    -H 'Accept-Encoding: gzip, deflate, sdch'
    -H 'Accept-Language: en-US,en;q=0.8'
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    -H 'Referer: http://www.wikipedia.org/'
    -H 'Connection: keep-alive' --compressed
`;

const DEFAULT_MAP = new Map<string, string>();
DEFAULT_MAP.set('lastUrlParserValue', 'https://codesandbox.io/dashboard/home?lastProject=WowWWW&name=Smith');
DEFAULT_MAP.set('lastUrlEncoderValue', 'The chief export of Chuck Norris is pain.');
DEFAULT_MAP.set('lastJSONFormatterValue', '{ "firstName": "Chuck", "lastName": "Norris" }');
DEFAULT_MAP.set(
  'lastBase64EncoderValue',
  'Chuck Norris recently had the idea to sell his pee as a canned beverage. It is now called Red Bull.'
);
DEFAULT_MAP.set('lastRegEx', '/([A-Z]+-\\d+)/g');
DEFAULT_MAP.set(
  'lastRegExTextSample',
  'Since [AC-1940], the year Chuck Norris was born, roundhouse kick related deaths have increased 13,000 percent.'
);
DEFAULT_MAP.set(
  'lastJWT',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
);
DEFAULT_MAP.set(
  'lastQRCodeTextValue',
  'Chuck Norris appeared in the ‘Street Fighter II’ video game, but was removed by Beta Testers because every button caused him to do a roundhouse kick. When asked bout this “glitch,” Chuck Norris replied, “That’s no glitch.”'
);
DEFAULT_MAP.set('lastQRCodeOptions', '');
DEFAULT_MAP.set('lastSearchValue', '');
DEFAULT_MAP.set('lastGithubUsernameValue', '');
DEFAULT_MAP.set('lastJSON2Convert', '{ "firstName": "Chuck", "lastName": "Norris" }');
DEFAULT_MAP.set('lastJSON2ConvertOptionSource', 'json');
DEFAULT_MAP.set('lastJSON2ConvertOptionTarget', 'csharp');
DEFAULT_MAP.set('lastJSON2ConvertOptionRootClassname', 'RootClass');
DEFAULT_MAP.set('lastEpochValue', '1630238149875');
DEFAULT_MAP.set('lastCSVInputContent', '');
DEFAULT_MAP.set('lastCSVInputContentEncoding', 'utf-8');
DEFAULT_MAP.set('lastCSVInputOptions', '');
DEFAULT_MAP.set('lastPokerPlanningHostName', '');
DEFAULT_MAP.set('lastPokerPlanningRoomName', 'butter-sneaky-waitress.glitch.me');
DEFAULT_MAP.set('lastPokerPlanningUsername', '');
DEFAULT_MAP.set('lastPokerCardsListingCategoryName', '');
DEFAULT_MAP.set('lastCurlValue', CURL_EXAMPLE);
DEFAULT_MAP.set('lastCurlTargetLanguage', 'Javascript');

const initalState: TextInputsState = loadFromLocalStorage();

function loadFromLocalStorage(): TextInputsState {
  const state: TextInputsState = {};

  const keys = [...DEFAULT_MAP.keys()];
  keys.forEach((key) => {
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
