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

    if (!regularExpression || !inputText) {
        return extracted;
    }

    try {
        const regex = regexParser(regularExpression);

        let result;
        while ((result = regex.exec(inputText)) !== null) {
            extracted += `${result[0]}, `;
        }

        // Return result without last line feed
        return extracted.slice(0, -2);
    } catch (e) {
        return e.toString();
    }
}

function replacer(match: string, capture: string): string {
    console.log(`match: ${match}, at position ${capture}`);
    return `<span>${match}</span>`;
}
