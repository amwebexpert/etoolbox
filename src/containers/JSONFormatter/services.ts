// Spec http://www.ecma-international.org/ecma-262/6.0/#sec-json.stringify
const replacer = (_key: string, value: any) =>
  value instanceof Object && !(value instanceof Array)
    ? Object.keys(value)
      .sort()
      .reduce((sorted: any, key: string) => {
        sorted[key] = value[key];
        return sorted;
      }, {})
    : value;

export function prettifyJson(value?: string): string {
  return formatJson(4, value);
}

export function formatJson(space: number, value?: string): string {
  if (!value) {
    return '';
  }

  try {
    const obj = JSON.parse(value);
    return JSON.stringify(obj, replacer, space);
  } catch (_e) {
    //  do nothing user may still be typing...
    return value;
  }
}

export function minifyJson(value?: string): string {
  return formatJson(0, value)
}
