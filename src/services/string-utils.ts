export function isBlank(str: string | undefined | null) {
  if (!str || str.trim().length === 0) {
    return true;
  }

  return false;
}

export function isNotBlank(str: string | undefined | null) {
  return !isBlank(str);
}

export function isNumeric(val = ''): boolean {
  if (isBlank(val)) {
    return false;
  }

  if (isNaN(Number(val))) {
    return false;
  }

  return true;
}
