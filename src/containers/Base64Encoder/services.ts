export function transform(value: string | undefined, encoded: boolean): string {
  if (!value) {
    return '';
  }

  try {
    if (encoded) {
      return window.btoa(value);
    } else {
      return window.atob(value);
    }
  } catch (e) {
    return JSON.stringify(e);
  }
}
