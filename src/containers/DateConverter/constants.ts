export const SAMPLE_DATEFNS_TZ_CONVERT = `import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

// Obtain a Date instance that will render the equivalent Berlin time for the UTC date
const date = new Date('#utc_value#');
const timeZone = 'Europe/Berlin';
const zonedDate = utcToZonedTime(date, timeZone);`;

export const SAMPLE_DATEFNS_FORMAT = `import { format } from "date-fns";

const date = new Date('#utc_value#');
const formattedDate = format(date, "yyyy-MM-dd-HH-mm-ss");`