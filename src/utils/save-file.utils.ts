import { parseDataUri } from "@lichens-innovation/ts-common/mime";
import {
  base64ToBlob,
  requestSaveFileHandle,
  type SaveBlobResult,
  saveBlobWithPicker,
} from "@lichens-innovation/ts-common/web";

interface SaveTextWithPickerArgs {
  content: string;
  fileName: string;
  mimeType?: string;
}

export const saveTextWithPicker = ({
  content,
  fileName,
  mimeType = "text/plain",
}: SaveTextWithPickerArgs): Promise<SaveBlobResult | null> =>
  saveBlobWithPicker({ blob: new Blob([content], { type: mimeType }), fileName });

interface SaveJsonWithPickerArgs {
  content: string;
  fileName?: string;
}

export const saveJsonWithPicker = ({
  content,
  fileName = "data.json",
}: SaveJsonWithPickerArgs): Promise<SaveBlobResult | null> =>
  saveTextWithPicker({ content, fileName, mimeType: "application/json" });

interface SaveDataUriWithPickerArgs {
  dataUri: string;
  fileName: string;
}

export const saveDataUriWithPicker = async ({
  dataUri,
  fileName,
}: SaveDataUriWithPickerArgs): Promise<SaveBlobResult | null> => {
  const parsed = parseDataUri(dataUri);
  if (!parsed) throw new Error("Invalid data URI");

  const blob = base64ToBlob({ base64: parsed.base64, mimeType: parsed.mimeType });
  return saveBlobWithPicker({ blob, fileName });
};

export type SaveTarget = { isCancelled: true } | { isCancelled: false; fileHandle: FileSystemFileHandle | null };

// Call first in the click handler: the picker needs the click's user activation, which expires during slow work habit-hooks-disable non-essential-comment
export const requestSaveTarget = async (suggestedName: string): Promise<SaveTarget> => {
  const pickerResult = await requestSaveFileHandle({ suggestedName });
  if (pickerResult.status === "cancelled") return { isCancelled: true };

  return { isCancelled: false, fileHandle: pickerResult.status === "picked" ? pickerResult.handle : null };
};
