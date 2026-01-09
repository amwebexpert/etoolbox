import { v1, v4, v6, v7 } from "uuid";

import { getResultRows, type ResponsiveContext } from "~/utils/responsive.utils";

export type UuidVersion = 1 | 4 | 6 | 7;

export const DEFAULT_VERSION: UuidVersion = 4;
export const DEFAULT_QUANTITY = 5;
export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 9999;

export const UUID_VERSION_OPTIONS: Array<{ value: UuidVersion; label: string; description: string }> = [
  { value: 1, label: "v1", description: "Time-based (MAC address + timestamp)" },
  { value: 4, label: "v4", description: "Random (cryptographically secure)" },
  { value: 6, label: "v6", description: "Time-ordered (reordered v1)" },
  { value: 7, label: "v7", description: "Unix epoch time-based" },
];

interface GenerateUuidsArgs {
  version: UuidVersion;
  quantity: number;
}

export const generateUuids = ({ version, quantity }: GenerateUuidsArgs): string => {
  const uuidGenerator = getUuidGenerator(version);
  const clampedQuantity = Math.min(Math.max(quantity, MIN_QUANTITY), MAX_QUANTITY);

  const uuids: string[] = [];
  for (let i = 0; i < clampedQuantity; i++) {
    uuids.push(uuidGenerator());
  }

  return uuids.join("\n");
};

const getUuidGenerator = (version: UuidVersion): (() => string) => {
  switch (version) {
    case 1:
      return v1;
    case 4:
      return v4;
    case 6:
      return v6;
    case 7:
      return v7;
    default:
      return v4;
  }
};

export const isValidQuantity = (value: number): boolean => {
  return Number.isInteger(value) && value >= MIN_QUANTITY && value <= MAX_QUANTITY;
};

export const getQuantityValidationMessage = (value: number): string | null => {
  if (!Number.isInteger(value)) {
    return "Quantity must be a whole number";
  }

  if (value < MIN_QUANTITY || value > MAX_QUANTITY) {
    return `Quantity must be between ${MIN_QUANTITY} and ${MAX_QUANTITY}`;
  }

  return null;
};

export const getRows = (ctx: ResponsiveContext): number => {
  return getResultRows(ctx);
};
