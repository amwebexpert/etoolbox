import { quicktype, InputData, jsonInputForTargetLanguage } from 'quicktype-core';
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
            'lombok': 'true',
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
        // eslint-disable-next-line no-eval
        eval(`window.eToolBoxTemp = ${data.source}`);
        const jsonData = JSON.stringify((window as any).eToolBoxTemp, null, 4);
        const newData: ConvertionContext = { ...data, sourceType: 'json', source: jsonData };
        return transform(newData);
    } catch (e) {
        return e.toString();
    }
}

async function transformJSON(data: ConvertionContext): Promise<string> {
    try {
        const { lines } = await quicktypeJSON(data.targetLanguage, data.rootClassName, data.source);
        return lines.join('\n');
    } catch (e) {
        return e.toString();
    }
}
