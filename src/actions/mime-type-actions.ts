export enum MimeTypeActionTypes {
    APPLY_FILTER = 'MimeTypeActionTypes.APPLY_FILTER',
    APPLY_FILTER_SUCCEEDED = 'MimeTypeActionTypes.APPLY_FILTER_SUCCEEDED',
}

export interface MimeTypeApplyFilterAction {
    type: MimeTypeActionTypes.APPLY_FILTER;
    searchTerm: string;
}

export interface MimeTypeApplyFilterSucceededAction {
    type: MimeTypeActionTypes.APPLY_FILTER_SUCCEEDED;
    elements: Map<string, string[]>;
}

export function applyMimeTypesFilter(searchTerm: string): MimeTypeApplyFilterAction {
    return {
        type: MimeTypeActionTypes.APPLY_FILTER,
        searchTerm
    }
}

export function applyMimeTypesFilterSucceeded(elements: Map<string, string[]>): MimeTypeApplyFilterSucceededAction {
    return {
        type: MimeTypeActionTypes.APPLY_FILTER_SUCCEEDED,
        elements
    }
}

export type MimeTypeAction = MimeTypeApplyFilterAction | MimeTypeApplyFilterSucceededAction;
