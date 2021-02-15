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

    // Current version only handle JSON:
    // TODO handle data.sourceType

    try {
        const { lines } = await quicktypeJSON(data.targetLanguage, data.rootClassName, data.source);
        return lines.join('\n');
    } catch (e) {
        return e.toString();
    }
}
