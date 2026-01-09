// Types
export interface WorkerStatus {
  workerId: string;
  jobId: string;
  status: string;
  progress: number;
}

export interface OcrContext {
  imageDataUrl: string;
  language: string;
}

export interface OcrResult {
  text: string;
  confidence: number;
  wordCount: number;
  characterCount: number;
  processingTime: number;
}

export interface LanguageOption {
  value: string;
  label: string;
}

// Constants
export const INITIAL_WORKER_STATUS: WorkerStatus = {
  workerId: "",
  jobId: "",
  status: "",
  progress: 0,
};

export const DEFAULT_LANGUAGE = "eng";
export const DEFAULT_IMAGE_DATA_URL = "";
export const DEFAULT_EXTRACTED_TEXT = "";

/**
 * Tesseract.js supported languages
 * Full list: https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016
 */
export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "eng", label: "English" },
  { value: "fra", label: "French" },
  { value: "spa", label: "Spanish" },
  { value: "deu", label: "German" },
  { value: "ita", label: "Italian" },
  { value: "por", label: "Portuguese" },
  { value: "nld", label: "Dutch" },
  { value: "pol", label: "Polish" },
  { value: "rus", label: "Russian" },
  { value: "jpn", label: "Japanese" },
  { value: "chi_sim", label: "Chinese (Simplified)" },
  { value: "chi_tra", label: "Chinese (Traditional)" },
  { value: "kor", label: "Korean" },
  { value: "ara", label: "Arabic" },
  { value: "hin", label: "Hindi" },
  { value: "tur", label: "Turkish" },
  { value: "vie", label: "Vietnamese" },
  { value: "tha", label: "Thai" },
  { value: "ukr", label: "Ukrainian" },
  { value: "ces", label: "Czech" },
  { value: "dan", label: "Danish" },
  { value: "fin", label: "Finnish" },
  { value: "ell", label: "Greek" },
  { value: "heb", label: "Hebrew" },
  { value: "hun", label: "Hungarian" },
  { value: "ind", label: "Indonesian" },
  { value: "nor", label: "Norwegian" },
  { value: "ron", label: "Romanian" },
  { value: "swe", label: "Swedish" },
];

export const PERSISTED_STORE_NAME = "etoolbox-image-ocr";
