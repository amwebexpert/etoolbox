import Papa, { ParseConfig, ParseResult } from 'papaparse';

export const DEFAULT_OPTIONS: any = {
	delimiter: '',	// auto-detect
	newline: undefined,	// auto-detect
	quoteChar: '"',
	escapeChar: '"',
	header: true,
	transformHeader: (header: string, index: number) => header?.trim(),
	dynamicTyping: true,
	preview: 0,
	encoding: undefined,
	worker: false,
	comments: false,
	step: undefined,
	complete: undefined,
	error: undefined,
	download: false,
	downloadRequestHeaders: undefined,
	downloadRequestBody: undefined,
	skipEmptyLines: true,
	chunk: undefined,
	chunkSize: undefined,
	fastMode: undefined,
	beforeFirstChunk: undefined,
	withCredentials: undefined,
	transform: undefined,
	delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
};

export const OPTIONS_DOC_URL = 'https://www.papaparse.com/docs#config';

type ParseConfigType = ParseConfig<any> & { download?: false | undefined; worker?: false | undefined };

// @see https://www.papaparse.com/docs#config
export async function transform(csvData: string, options: ParseConfigType = DEFAULT_OPTIONS): Promise<ParseResult<any>> {
	const csvOptions = {
		...options,
		transformHeader: (header: string, _index: number) => header?.trim(),
	 };

    return Papa.parse(csvData, csvOptions);
}
