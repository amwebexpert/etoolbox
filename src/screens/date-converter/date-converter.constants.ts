// Types
export type EpochUnit = "milliseconds" | "seconds";

export interface DateFormat {
  id: string;
  label: string;
  description: string;
  getValue: (date: Date, epochValue: number) => string;
  getCode?: (date: Date, epochValue: number) => string;
  showCode?: boolean;
}

// Constants
export const DEFAULT_EPOCH_VALUE = "";
export const DEFAULT_EPOCH_UNIT: EpochUnit = "milliseconds";

export const EPOCH_UNIT_OPTIONS = [
  { value: "milliseconds" as EpochUnit, label: "Milliseconds" },
  { value: "seconds" as EpochUnit, label: "Seconds" },
];

export const SAMPLE_DATEFNS_TZ_CONVERT = `import { utcToZonedTime } from 'date-fns-tz';

// Convert UTC date to Berlin timezone
const utcValue = '#utc_value#';
const date = new Date(utcValue);
const timezone = 'Europe/Berlin';
const result = utcToZonedTime(date, timezone);`;

export const SAMPLE_DATEFNS_FORMAT = `import { format } from "date-fns";

const utcValue = '#utc_value#';
const date = new Date(utcValue);
const formatPattern = 'yyyy-MM-dd-HH-mm-ss';
const formattedDate = format(date, formatPattern);`;

export const SAMPLE_DATE_FNS_RELATIVE = `import { formatDistanceToNow } from "date-fns";

const date = new Date('#utc_value#');
const relative = formatDistanceToNow(date, { addSuffix: true });
// Example: "2 hours ago" or "in 3 days"`;
