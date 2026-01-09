import { format } from "date-fns";

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

export const formatUnixTimestamp = (timestamp: number, dateFormat: string = DEFAULT_DATE_FORMAT): string => {
  if (!timestamp) return "N/A";
  try {
    return format(new Date(timestamp * 1000), dateFormat);
  } catch {
    return "Invalid date";
  }
};

export const getCurrentUnixTimestamp = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const isExpiredTimestamp = (timestamp: number): boolean => {
  const now = getCurrentUnixTimestamp();
  return timestamp < now;
};

export const isActiveTimestamp = (timestamp: number): boolean => {
  const now = getCurrentUnixTimestamp();
  return timestamp <= now;
};
