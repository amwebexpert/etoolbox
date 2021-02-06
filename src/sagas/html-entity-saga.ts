import { takeLatest, put } from 'redux-saga/effects';
import { applyHtmlEntitiesFilterSucceeded, HtmlEntityActionTypes, HtmlEntityApplyFilterAction } from '../actions/html-entitie-actions';
import { filterHtmlEntities } from '../containers/CommonLists/services';

function* filterCollection(action: HtmlEntityApplyFilterAction) {
  const elements = filterHtmlEntities(action.searchTerm);
  yield put(applyHtmlEntitiesFilterSucceeded(elements));
}

export function* htmlEntitiesSaga() {
  yield takeLatest(HtmlEntityActionTypes.APPLY_FILTER, filterCollection);
}
