import { format, formatDistanceToNow, formatISO } from "date-fns";

import {
  SAMPLE_DATE_FNS_RELATIVE,
  SAMPLE_DATEFNS_FORMAT,
  SAMPLE_DATEFNS_TZ_CONVERT,
  type DateFormat,
  type EpochUnit,
} from "./date-converter.constants";

// Helper to safely get timezone offset in hours
const getTimezoneOffsetHours = (date: Date): number => {
  return date.getTimezoneOffset() / 60;
};

// Helper to get timezone name
const getTimezoneName = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// All available date formats for display
export const DATE_FORMATS: DateFormat[] = [
  {
    id: "iso",
    label: "ISO 8601 / JSON",
    description: "Standard ISO 8601 format, commonly used in APIs and JSON",
    getValue: (date) => date.toISOString(),
  },
  {
    id: "epoch-ms",
    label: "Epoch (milliseconds)",
    description: "Unix timestamp in milliseconds since January 1, 1970",
    getValue: (date) => String(date.getTime()),
  },
  {
    id: "epoch-sec",
    label: "Epoch (seconds)",
    description: "Unix timestamp in seconds since January 1, 1970",
    getValue: (date) => String(Math.floor(date.getTime() / 1000)),
  },
  {
    id: "locale",
    label: "Locale Date & Time",
    description: "Date formatted according to your browser locale settings",
    getValue: (date) => `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
  },
  {
    id: "utc",
    label: "UTC String",
    description: "Human-readable UTC format",
    getValue: (date) => date.toUTCString(),
  },
  {
    id: "relative",
    label: "Relative Time",
    description: "Human-readable relative time (e.g., '2 hours ago')",
    getValue: (date) => formatDistanceToNow(date, { addSuffix: true }),
  },
  {
    id: "timezone",
    label: "Timezone Info",
    description: "Current timezone offset and name",
    getValue: (date) =>
      `${getTimezoneName()} (UTC${date.getTimezoneOffset() <= 0 ? "+" : "-"}${Math.abs(getTimezoneOffsetHours(date))}h)`,
  },
  {
    id: "date-only",
    label: "Date Only (YYYY-MM-DD)",
    description: "ISO date without time component",
    getValue: (date) => format(date, "yyyy-MM-dd"),
  },
  {
    id: "time-only",
    label: "Time Only (HH:mm:ss)",
    description: "Time in 24-hour format",
    getValue: (date) => format(date, "HH:mm:ss"),
  },
  {
    id: "rfc2822",
    label: "RFC 2822",
    description: "Email date format (used in HTTP headers)",
    getValue: (date) => date.toUTCString().replace("GMT", "+0000"),
  },
  {
    id: "js-epoch",
    label: "JavaScript (epoch)",
    description: "JavaScript code using epoch timestamp",
    getValue: (_date, epochValue) => `new Date(${epochValue})`,
    getCode: (_date, epochValue) => `const date = new Date(${epochValue});`,
    showCode: true,
  },
  {
    id: "js-iso",
    label: "JavaScript (ISO)",
    description: "JavaScript code using ISO string",
    getValue: (date) => `new Date('${date.toISOString()}')`,
    getCode: (date) => `const date = new Date('${date.toISOString()}');`,
    showCode: true,
  },
];

// Code example type
export interface CodeExample {
  id: string;
  label: string;
  description: string;
  getCode: (date: Date) => string;
}

// Code examples for syntax highlighting
export const CODE_EXAMPLES: CodeExample[] = [
  {
    id: "datefns-tz",
    label: "date-fns timezone conversion",
    description: "Convert UTC date to a different timezone using date-fns-tz",
    getCode: (date: Date) => SAMPLE_DATEFNS_TZ_CONVERT.replace("#utc_value#", date.toISOString()),
  },
  {
    id: "datefns-format",
    label: "date-fns format example",
    description: "Format a date using date-fns format function",
    getCode: (date: Date) => SAMPLE_DATEFNS_FORMAT.replace("#utc_value#", date.toISOString()),
  },
  {
    id: "datefns-relative",
    label: "date-fns relative time",
    description: "Display relative time using date-fns formatDistanceToNow",
    getCode: (date: Date) => SAMPLE_DATE_FNS_RELATIVE.replace("#utc_value#", date.toISOString()),
  },
];

interface ParseEpochArgs {
  epochValue: string;
  epochUnit: EpochUnit;
}

export const parseEpochToDate = ({ epochValue, epochUnit }: ParseEpochArgs): Date | null => {
  if (!epochValue || epochValue.trim() === "") {
    return null;
  }

  const numValue = Number(epochValue);
  if (isNaN(numValue)) {
    return null;
  }

  const milliseconds = epochUnit === "seconds" ? numValue * 1000 : numValue;
  const date = new Date(milliseconds);

  // Validate the date is valid
  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
};

interface DateToEpochArgs {
  date: Date;
  epochUnit: EpochUnit;
}

export const dateToEpoch = ({ date, epochUnit }: DateToEpochArgs): string => {
  const milliseconds = date.getTime();
  return epochUnit === "seconds" ? String(Math.floor(milliseconds / 1000)) : String(milliseconds);
};

export const isValidEpochInput = (value: string): boolean => {
  if (!value || value.trim() === "") {
    return true; // Empty is considered valid (just not set)
  }
  const numValue = Number(value);
  return !isNaN(numValue);
};

export const getCurrentEpoch = (epochUnit: EpochUnit): string => {
  const now = Date.now();
  return epochUnit === "seconds" ? String(Math.floor(now / 1000)) : String(now);
};

export const getStartOfDay = (epochUnit: EpochUnit): string => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return dateToEpoch({ date: now, epochUnit });
};

export const getEndOfDay = (epochUnit: EpochUnit): string => {
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  return dateToEpoch({ date: now, epochUnit });
};

export const getStartOfWeek = (epochUnit: EpochUnit): string => {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
  now.setDate(diff);
  now.setHours(0, 0, 0, 0);
  return dateToEpoch({ date: now, epochUnit });
};

export const getStartOfMonth = (epochUnit: EpochUnit): string => {
  const now = new Date();
  now.setDate(1);
  now.setHours(0, 0, 0, 0);
  return dateToEpoch({ date: now, epochUnit });
};

export const getStartOfYear = (epochUnit: EpochUnit): string => {
  const now = new Date();
  now.setMonth(0, 1);
  now.setHours(0, 0, 0, 0);
  return dateToEpoch({ date: now, epochUnit });
};

interface FormatDateForInputArgs {
  date: Date;
  type: "date" | "time" | "datetime";
}

export const formatDateForInput = ({ date, type }: FormatDateForInputArgs): string => {
  switch (type) {
    case "date":
      return format(date, "yyyy-MM-dd");
    case "time":
      return format(date, "HH:mm:ss");
    case "datetime":
      return formatISO(date, { representation: "complete" });
    default:
      return date.toISOString();
  }
};

interface ExportAllFormatsArgs {
  date: Date;
  epochValue: number;
}

export const exportAllFormats = ({ date, epochValue }: ExportAllFormatsArgs): string => {
  const lines: string[] = ["Date Converter Export", "=".repeat(50), ""];

  DATE_FORMATS.forEach((format) => {
    lines.push(`${format.label}:`);
    lines.push(`  ${format.getValue(date, epochValue)}`);
    lines.push("");
  });

  lines.push("Code Examples");
  lines.push("-".repeat(50));
  lines.push("");

  CODE_EXAMPLES.forEach((example) => {
    lines.push(`${example.label}:`);
    lines.push(example.getCode(date));
    lines.push("");
  });

  return lines.join("\n");
};
