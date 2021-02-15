import { quicktype, InputData, jsonInputForTargetLanguage } from 'quicktype-core';

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

export async function transform(data: ConvertionContext): Promise<string> {
    if (!data.source || data.source.trim().length === 0) {
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
