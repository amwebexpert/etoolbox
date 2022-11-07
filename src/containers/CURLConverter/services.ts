import * as cURLConverter from 'curlconverter';

type CurlConverterFnc = (data: string) => string;
type CurlConverterType = {
  transform: CurlConverterFnc;
  syntaxHighliter: string;
};

export const CONVERTERS: Map<string, CurlConverterType> = new Map([
  ['Ansible', { syntaxHighliter: 'ansible', transform: cURLConverter.toAnsible }],
  ['Browser', { syntaxHighliter: 'browser', transform: cURLConverter.toBrowser }],
  ['CFML', { syntaxHighliter: 'cfml', transform: cURLConverter.toCFML }],
  ['CSharp', { syntaxHighliter: 'csharp', transform: cURLConverter.toCSharp }],
  ['Dart', { syntaxHighliter: 'dart', transform: cURLConverter.toDart }],
  ['Elixir', { syntaxHighliter: 'elixir', transform: cURLConverter.toElixir }],
  ['Go', { syntaxHighliter: 'go', transform: cURLConverter.toGo }],
  ['Java', { syntaxHighliter: 'java', transform: cURLConverter.toJava }],
  ['Javascript', { syntaxHighliter: 'javascript', transform: cURLConverter.toJavaScript }],
  ['JSON String', { syntaxHighliter: 'json', transform: cURLConverter.toJsonString }],
  ['MATLAB', { syntaxHighliter: 'mathlab', transform: cURLConverter.toMATLAB }],
  ['Node', { syntaxHighliter: 'javascript', transform: cURLConverter.toNode }],
  ['Node Axios', { syntaxHighliter: 'javascript', transform: cURLConverter.toNodeAxios }],
  ['Node Fetch', { syntaxHighliter: 'javascript', transform: cURLConverter.toNodeFetch }],
  ['Node Request', { syntaxHighliter: 'javascript', transform: cURLConverter.toNodeRequest }],
  ['PHP', { syntaxHighliter: 'php', transform: cURLConverter.toPhp }],
  ['PHP Requests', { syntaxHighliter: 'php', transform: cURLConverter.toPhpRequests }],
  ['Python', { syntaxHighliter: 'python', transform: cURLConverter.toPython }],
  ['R', { syntaxHighliter: 'r', transform: cURLConverter.toR }],
  ['Ruby', { syntaxHighliter: 'ruby', transform: cURLConverter.toRuby }],
  ['Rust', { syntaxHighliter: 'rust', transform: cURLConverter.toRust }],
  ['Strest', { syntaxHighliter: 'strest', transform: cURLConverter.toStrest }],
]);

export const CONVERTERS_LIST = [...CONVERTERS.keys()];

export function transform(value?: string, targetLanguage = 'Javascript'): string {
  if (!value) {
    return '';
  }

  const curlCommand = value.replaceAll('\n', ' ');
  const curlConverter = CONVERTERS.get(targetLanguage);
  return curlConverter
    ? curlConverter.transform(curlCommand)
    : `Warning: no converter found matching "${targetLanguage}"`;
}
