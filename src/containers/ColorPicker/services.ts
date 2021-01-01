
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

interface ClickCoordinates {
    px: number;
    py: number;
    width: number;
    height: number;
}

export function retrieveClickedColor(event: MouseEvent, image: HTMLImageElement): string {
    const coordinates = computeImageClickCoordinates(event);

    // Create a canvas with same image dimension and draw the image on it
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = coordinates.width;
    canvas.height = coordinates.height;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    context.drawImage(image, 0, 0);

    // Get the clicked pixel info
    const p = context.getImageData(coordinates.px, coordinates.py, 1, 1).data;
    const hex = '#' + ('000000' + rgbToHex(p[0], p[1], p[2])).slice(-6);

    return hex;
}

function rgbToHex(r: number, g: number, b: number): string {
    if (r > 255 || g > 255 || b > 255) {
        throw new Error('Invalid color component');
    }

    return ((r << 16) | (g << 8) | b).toString(16);
}


/**
 * Compute clicked pixel coordinates based on natural image size
 * 
 * @see https://stackoverflow.com/questions/34867066/javascript-mouse-click-coordinates-for-image
 * @see https://stackoverflow.com/a/288731/1497139
 *
 * @param event {MouseEvent}
 */
export function computeImageClickCoordinates(event: MouseEvent): ClickCoordinates {
    const image = event.target as HTMLImageElement;
    const bounds = image.getBoundingClientRect();

    const left = bounds.left;
    const top = bounds.top;
    const x = event.pageX - left;
    const y = event.pageY - top;
    const cw = image.clientWidth;
    const ch = image.clientHeight;
    const iw = image.naturalWidth;
    const ih = image.naturalHeight;

    const px = Math.round(x / cw * iw);
    const py = Math.round(y / ch * ih);

    return {
        px,
        py,
        width: iw,
        height: ih
    };
}