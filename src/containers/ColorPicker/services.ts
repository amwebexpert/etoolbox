
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
