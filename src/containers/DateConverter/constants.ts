export const SAMPLE_DATEFNS_TZ_CONVERT = `import { utcToZonedTime } from 'date-fns-tz';

// Obtain a Date instance that will render the
// equivalent Berlin time for the UTC date
const utcValue = '#utc_value#';
const date = new Date(utcValue);
const timezone = 'Europe/Berlin';
const result = utcToZonedTime(date, timezone);`;

export const SAMPLE_DATEFNS_FORMAT = `import { format } from "date-fns";

const utcValue = '#utc_value#';
const date = new Date(utcValue);
const format = 'yyyy-MM-dd-HH-mm-ss';
const formattedDate = format(date, format);`
