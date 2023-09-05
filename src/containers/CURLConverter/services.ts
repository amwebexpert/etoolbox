import * as cURLConverter from 'curlconverter';

type CurlConverterFnc = (data: string) => string;
type CurlConverterType = {
  transform: CurlConverterFnc;
  syntaxHighlither: string;
};

export const CONVERTERS: Map<string, CurlConverterType> = new Map([
  ['Ansible', { syntaxHighlither: 'ansible', transform: cURLConverter.toAnsible }],
  ['Browser', { syntaxHighlither: 'browser', transform: cURLConverter.toBrowser }],
  ['CFML', { syntaxHighlither: 'cfml', transform: cURLConverter.toCFML }],
  ['CSharp', { syntaxHighlither: 'csharp', transform: cURLConverter.toCSharp }],
  ['Dart', { syntaxHighlither: 'dart', transform: cURLConverter.toDart }],
  ['Elixir', { syntaxHighlither: 'elixir', transform: cURLConverter.toElixir }],
  ['Go', { syntaxHighlither: 'go', transform: cURLConverter.toGo }],
  ['Java', { syntaxHighlither: 'java', transform: cURLConverter.toJava }],
  ['Javascript', { syntaxHighlither: 'javascript', transform: cURLConverter.toJavaScript }],
  ['JSON String', { syntaxHighlither: 'json', transform: cURLConverter.toJsonString }],
  ['MATLAB', { syntaxHighlither: 'mathlab', transform: cURLConverter.toMATLAB }],
  ['Node', { syntaxHighlither: 'javascript', transform: cURLConverter.toNode }],
  ['Node Axios', { syntaxHighlither: 'javascript', transform: cURLConverter.toNodeAxios }],
  ['Node Fetch', { syntaxHighlither: 'javascript', transform: cURLConverter.toNodeFetch }],
  ['Node Request', { syntaxHighlither: 'javascript', transform: cURLConverter.toNodeRequest }],
  ['PHP', { syntaxHighlither: 'php', transform: cURLConverter.toPhp }],
  ['PHP Requests', { syntaxHighlither: 'php', transform: cURLConverter.toPhpRequests }],
  ['Python', { syntaxHighlither: 'python', transform: cURLConverter.toPython }],
  ['R', { syntaxHighlither: 'r', transform: cURLConverter.toR }],
  ['Ruby', { syntaxHighlither: 'ruby', transform: cURLConverter.toRuby }],
  ['Rust', { syntaxHighlither: 'rust', transform: cURLConverter.toRust }],
]);

export const CONVERTERS_LIST = [...CONVERTERS.keys()];

export function transform(value?: string, targetLanguage = 'Javascript'): string {
  if (!value) {
    return '';
  }

  const curlCommand = value.replaceAll(/(\r\n|\n|\r)/gm, ' ');
  const converter = CONVERTERS.get(targetLanguage);
  return converter ? converter.transform(curlCommand) : `Warning: no converter found matching "${targetLanguage}"`;
}
