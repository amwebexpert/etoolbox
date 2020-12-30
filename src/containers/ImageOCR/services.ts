import { createWorker } from 'tesseract.js';

export function clipboardToDataURL(items: DataTransferItemList, onLoad: (ev: ProgressEvent<FileReader>) => void): void {
    if (!items) {
        return;
    }

    for (let i = 0; i < items.length; i++) {
        const item: DataTransferItem = items[i];
        if (item.type.startsWith('image')) {
            const reader = new FileReader();
            reader.onload = onLoad;
            reader.readAsDataURL(item.getAsFile() as Blob);
            break;
        }
    }
}

export async function processOCR(
    language: string,
    imageBuffer: Buffer,
    logger: (log: any) => void,
    onCompleted: (text: string) => void) {

    const worker = createWorker({ logger });
    await worker.load();
    await worker.loadLanguage(language);
    await worker.initialize(language);

    const result = await worker.recognize(imageBuffer);
    onCompleted(result.data.text);

    await worker.terminate();
}
