import { v1, v4 } from 'uuid';

const GENERATORS_MAP = new Map<Number, Function>();
GENERATORS_MAP.set(1, v1);
GENERATORS_MAP.set(4, v4);

export function generate(version: number, quantity: number): string {
    const uuidGenerator = GENERATORS_MAP.get(version)!;

    let result = '';
    for (let i = 0; i < quantity; i++) {
        result += `${uuidGenerator()}\n`;
    }

    // Return result without last line feed
    return result.slice(0, -1);
}
