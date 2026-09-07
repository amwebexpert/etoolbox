import { isNotBlank } from "@lichens-innovation/ts-common";

export const shouldConfirmBeforeImport = (currentMarkdown: string): boolean => isNotBlank(currentMarkdown);
