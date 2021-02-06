import { takeLatest, put } from 'redux-saga/effects';
import { applyMimeTypesFilterSucceeded, MimeTypeActionTypes, MimeTypeApplyFilterAction } from '../actions/mime-type-actions';
import { filterMimeTypes } from '../containers/CommonLists/services';

function* filterCollection(action: MimeTypeApplyFilterAction) {
  const elements = filterMimeTypes(action.searchTerm);
  yield put(applyMimeTypesFilterSucceeded(elements));
}

export function* mimeTypeSaga() {
  yield takeLatest(MimeTypeActionTypes.APPLY_FILTER, filterCollection);
}
