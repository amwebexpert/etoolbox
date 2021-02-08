import { FileRejection } from 'react-dropzone';
import prettyBytes from 'pretty-bytes';

export interface EncodedFile {
    name: string;
    size: number;
    encoded: string;
}

export interface ErrorFile {
    name: string;
    size: number;
    error: string;
}

export const MAX_FILE_SIZE_BYTES = 250000;

export function loadFile(file: File): Promise<EncodedFile> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const base = {
            name: file.name,
            size: file.size,
        }

        reader.addEventListener('abort', e => reject(`File upload aborted: ${e}`));
        reader.addEventListener('error', e => reject(`File upload error: ${e}`));
        reader.addEventListener('load', () => resolve({
            ...base,
            encoded: reader.result as string
        }), false);

        reader.readAsDataURL(file);
    });
}

export function rejectFiles(fileRejections: FileRejection[]): ErrorFile[] {
    return fileRejections.map(rejection => ({
        name: rejection.file.name,
        size: rejection.file.size,
        error: `Exceeds size limit: ${prettyBytes(MAX_FILE_SIZE_BYTES)}`
    }));
}
