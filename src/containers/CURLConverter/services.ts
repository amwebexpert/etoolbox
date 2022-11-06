import * as cURLConverter from 'curlconverter';

const CONVERTERS: Map<string, (data: string) => string> = new Map([
  ['Ansible', cURLConverter.toAnsible],
  ['Browser', cURLConverter.toBrowser],
  ['CFML', cURLConverter.toCFML],
  ['CSharp', cURLConverter.toCSharp],
  ['Dart', cURLConverter.toDart],
  ['Elixir', cURLConverter.toElixir],
  ['Go', cURLConverter.toGo],
  ['Java', cURLConverter.toJava],
  ['Javascript', cURLConverter.toJavaScript],
  ['JSON String', cURLConverter.toJsonString],
  ['MATLAB', cURLConverter.toMATLAB],
  ['Node', cURLConverter.toNode],
  ['Node Axios', cURLConverter.toNodeAxios],
  ['Node Fetch', cURLConverter.toNodeFetch],
  ['Node Request', cURLConverter.toNodeRequest],
  ['PHP', cURLConverter.toPhp],
  ['PHP Requests', cURLConverter.toPhpRequests],
  ['Python', cURLConverter.toPython],
  ['R', cURLConverter.toR],
  ['Ruby', cURLConverter.toRuby],
  ['Rust', cURLConverter.toRust],
  ['Strest', cURLConverter.toStrest],
]);

// TODO Merge this with the previous CONVERTERS map so they will be in sync
export const LANGUAGE_2_SYNTAX: Map<string, string> = new Map([
  ['Ansible', 'shell'],
  ['Browser', 'browser'],
  ['CFML', 'cfml'],
  ['CSharp', 'csharp'],
  ['Dart', 'dart'],
  ['Elixir', 'elixir'],
  ['Go', 'go'],
  ['Java', 'java'],
  ['Javascript', 'javascript'],
  ['JSON String', 'json'],
  ['MATLAB', 'matlab'],
  ['Node', 'javascript'],
  ['Node Axios', 'javascript'],
  ['Node Fetch', 'javascript'],
  ['Node Request', 'javascript'],
  ['PHP', 'php'],
  ['PHP Requests', 'php'],
  ['Python', 'python'],
  ['R', 'r'],
  ['Ruby', 'ruby'],
  ['Rust', 'rust'],
  ['Strest', 'strest'],
]);

export const CONVERTERS_LIST = [...CONVERTERS.keys()];

export function transform(value?: string, targetLanguage = 'Javascript'): string {
  if (!value) {
    return '';
  }

  const curlCommand = value.replaceAll('\n', ' ');
  const converter = CONVERTERS.get(targetLanguage);
  return converter ? converter(curlCommand) : `Warning: no converter found matching "${targetLanguage}"`;
}
