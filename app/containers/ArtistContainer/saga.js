import { put, call, takeLatest } from 'redux-saga/effects';
import { getArtists } from '@services/artistApi';
import { artistContainerTypes, artistContainerCreators } from './reducer';

const { REQUEST_GET_ARTISTS } = artistContainerTypes;
const { successGetArtists, failureGetArtists } = artistContainerCreators;

export function* getArtistsDetails(action) {
  const response = yield call(getArtists, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetArtists(data));
  } else {
    yield put(failureGetArtists(data));
  }
}

export default function* homeContainerSaga() {
  yield takeLatest(REQUEST_GET_ARTISTS, getArtistsDetails);
}
