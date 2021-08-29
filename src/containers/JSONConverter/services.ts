import { quicktype, InputData, jsonInputForTargetLanguage } from 'quicktype-core';
import beautify from 'js-beautify';
import * as StringUtils from '../../services/string-utils';

export interface ConvertionContext {
    source: string;
    sourceType: string;
    targetLanguage: string;
    rootClassName: string;
}

async function quicktypeJSON(targetLanguage: string, typeName: string, jsonString: string) {
    // We could add multiple samples for the same desired
    // type, or many sources for other types. Here we're
    // just making one type from one piece of sample JSON.
    const jsonInput = jsonInputForTargetLanguage(targetLanguage);
    await jsonInput.addSource({ name: typeName, samples: [jsonString] });

    const inputData = new InputData();
    inputData.addInput(jsonInput);

    return await quicktype({
        inputData,
        lang: targetLanguage,
        rendererOptions: {
            'just-types': 'true',
            'acronym-style': 'original',
            lombok: 'false',
        },
    });
}

function isValid(data: ConvertionContext) {
    if (StringUtils.isBlank(data.source)) {
        return false;
    }
    if (StringUtils.isBlank(data.sourceType)) {
        return false;
    }
    if (StringUtils.isBlank(data.rootClassName)) {
        return false;
    }
    if (StringUtils.isBlank(data.targetLanguage)) {
        return false;
    }

    return true;
}

export async function transform(data: ConvertionContext): Promise<string> {
    if (!isValid(data)) {
        return '';
    }

    if (data.sourceType === data.targetLanguage) {
        return data.source;
    }

    switch (data.sourceType) {
        case 'json':
            return transformJSON(data);

        case 'jsObject':
            return transformJsObject(data);

        default:
            return data.source;
    }
}

async function transformJsObject(data: ConvertionContext): Promise<string> {
    try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(`return ${data.source}`);
        const result = fn();
        const jsonData = JSON.stringify(result, null, 4);
        const newData: ConvertionContext = { ...data, sourceType: 'json', source: jsonData };
        return transform(newData);
    } catch (e) {
        return JSON.stringify(e);
    }
}

async function transformJSON(data: ConvertionContext): Promise<string> {
    if (data.targetLanguage === 'javascript') {
        const jsCode = objToSource(JSON.parse(data.source));
        return beautify(jsCode, { indent_size: 2, space_in_empty_paren: true });
    }

    try {
        const { lines } = await quicktypeJSON(data.targetLanguage, data.rootClassName, data.source);
        return lines.join('\n');
    } catch (e) {
        return JSON.stringify(e);
    }
}

function objToSource(o: any): string {
    if (!o) {
        return 'null';
    }

    let key = '';
    let notAnArray = typeof o.length == 'undefined' ? 1 : 0;
    let str = '';
    for (var p in o) {
        if (notAnArray) {
            if (p.indexOf(' ') === -1) {
                key = p + ': ';
            } else {
                key = "'" + p + "': ";
            }
        }

        if (typeof o[p] == 'string') {
            str += key + "'" + o[p] + "',";
        } else if (typeof o[p] == 'object') {
            str += key + objToSource(o[p]) + ',';
        } else {
            str += key + o[p] + ',';
        }
    }

    if (notAnArray) {
        return '{' + str.slice(0, -1) + '}';
    } else {
        return '[' + str.slice(0, -1) + ']';
    }
}
