import { quicktype, InputData, jsonInputForTargetLanguage } from 'quicktype-core';

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

export async function transform(jsonString: string | undefined, targetLanguage: string): Promise<string> {
    if (!jsonString) {
        return '';
    }

    try {
        const { lines } = await quicktypeJSON(targetLanguage, 'GeneratedParentNode', jsonString);
        return lines.join('\n');
    } catch (e) {
        return e.toString();
    }
}
