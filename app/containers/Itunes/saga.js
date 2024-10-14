import { put, call, takeLatest } from 'redux-saga/effects';
import { itunesCreators, itunesTypes } from './reducer';
import { getTracks } from '@app/services/trackApi';

const { REQUEST_GET_ITUNES_TRACKS } = itunesTypes;
const { successGetItunesTracks, failureGetItunesTracks } = itunesCreators;

// Individual exports for testing
/**
 * A saga that handles fetching GitHub repositories based on a given repository name.
 * On success, it dispatches a success action with the fetched data.
 * On failure, it dispatches a failure action with the error data.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} action - The action object containing the repository name.
 * @yields {Effect} The effect of calling the API, and then either the success or failure action.
 */
export function* getItunesTracks(action) {
  const response = yield call(getTracks, action.trackName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItunesTracks(data));
  } else {
    yield put(failureGetItunesTracks(data));
  }
}

/**
 * registering events
 * @date 04/03/2024 - 12:57:49
 *
 * @export
 * @returns {{}}
 */
export default function* itunesSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_TRACKS, getItunesTracks);
}
