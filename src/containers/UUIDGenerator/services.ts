import { v1, v4 } from 'uuid';

export function generate(version: number, quantity: number): string {
    const uuidGenerator = version === 1 ? v1 : v4;

    let result = '';
    for (let i = 0; i < quantity; i++) {
        result += `${uuidGenerator()}\n`;
    }

    // Return result without last line feed
    return result.slice(0, -1);
}
