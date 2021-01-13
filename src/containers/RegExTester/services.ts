import regexParser from 'regex-parser';

export function transform(regularExpression: string | undefined, inputText: string | undefined): string {
    if (!regularExpression || !inputText) {
        return '';
    }

    const text = inputText.replaceAll('\n', '<br />')

    try {
        const regex = regexParser(regularExpression);
        if (regex.global) {
            return text.replaceAll(regex, replacer);
        } else {
            return text.replace(regex, replacer);
        }
    } catch (e) {
        return e.toString();
    }
}

export function extract(regularExpression: string | undefined, inputText: string | undefined): string {
    let extracted = '';
    const extratedItemsList = [];

    if (!regularExpression || !inputText) {
        return extracted;
    }

    try {
        const regex = regexParser(regularExpression);

        let result;
        while ((result = regex.exec(inputText)) !== null) {
            extracted += `${result[0]}, `;
            extratedItemsList.push(result[0]);
        }

        // Return result without last line feed
        const set = new Set(extratedItemsList);
        console.log(`List contains ${extratedItemsList.length} items. Unique count: ${set.size}`, [...set].join(', '));
        return extracted.slice(0, -2);
    } catch (e) {
        return e.toString();
    }
}

function replacer(match: string, capture: string): string {
    console.log(`match: ${match}, at position ${capture}`);
    return `<span>${match}</span>`;
}
