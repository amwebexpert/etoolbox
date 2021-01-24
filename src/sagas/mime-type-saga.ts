import { debounce, put } from 'redux-saga/effects';
import { applyMimeTypesFilterSucceeded, MimeTypeActionTypes, MimeTypeApplyFilterAction } from '../actions/mime-type-actions';
import { filterMimeTypes } from '../containers/CommonLists/services';

function* filterCollection(action: MimeTypeApplyFilterAction) {
  const elements = filterMimeTypes(action.searchTerm);
  yield put(applyMimeTypesFilterSucceeded(elements));
}

export function* mimeTypeSaga() {
  yield debounce(300, MimeTypeActionTypes.APPLY_FILTER, filterCollection);
}
