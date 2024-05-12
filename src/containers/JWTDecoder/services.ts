import { jwtDecode } from 'jwt-decode';

export function decode(value: string | undefined, header: boolean): string {
  if (!value) {
    return '';
  }

  try {
    const obj = jwtDecode(value, { header });
    return JSON.stringify(obj, null, 4);
  } catch (e) {
    return JSON.stringify(e);
  }
}
