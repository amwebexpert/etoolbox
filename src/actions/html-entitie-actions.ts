export interface HtmlEntity {
    character: string;
    entityName: string;
    entityNumber: string;
    description: string;
}

export enum HtmlEntityActionTypes {
    APPLY_FILTER = 'HtmlEntityActionTypes.APPLY_FILTER',
    APPLY_FILTER_SUCCEEDED = 'HtmlEntityActionTypes.APPLY_FILTER_SUCCEEDED',
}

export interface HtmlEntityApplyFilterAction {
    type: HtmlEntityActionTypes.APPLY_FILTER;
    searchTerm: string;
}

export interface HtmlEntityApplyFilterSucceededAction {
    type: HtmlEntityActionTypes.APPLY_FILTER_SUCCEEDED;
    elements: HtmlEntity[];
}

export function applyHtmlEntitiesFilter(searchTerm: string): HtmlEntityApplyFilterAction {
    return {
        type: HtmlEntityActionTypes.APPLY_FILTER,
        searchTerm
    }
}

export function applyHtmlEntitiesFilterSucceeded(elements: HtmlEntity[]): HtmlEntityApplyFilterSucceededAction {
    return {
        type: HtmlEntityActionTypes.APPLY_FILTER_SUCCEEDED,
        elements
    }
}

export type HtmlEntityAction = HtmlEntityApplyFilterAction | HtmlEntityApplyFilterSucceededAction;
