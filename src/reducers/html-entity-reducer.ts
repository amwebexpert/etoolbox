import { HtmlEntity, HtmlEntityAction, HtmlEntityActionTypes } from './../actions/html-entitie-actions';

export interface HtmlEntitiesState {
    filtering: boolean;
    elements: HtmlEntity[];
}

const initalState: HtmlEntitiesState = {
    filtering: false,
    elements: []
}

function reducer(state: HtmlEntitiesState = initalState, action: HtmlEntityAction): HtmlEntitiesState {
    switch (action.type) {
        case HtmlEntityActionTypes.APPLY_FILTER: {
            return { ...state, filtering: true };
        }

        case HtmlEntityActionTypes.APPLY_FILTER_SUCCEEDED: {
            return { filtering: false, elements: action.elements };
        }

        default:
            return state;
    }
}

export default reducer;
