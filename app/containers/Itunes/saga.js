import { put, call, takeLatest } from 'redux-saga/effects';
import { itunesCreators, itunesTypes } from './reducer';
import { getTrack, getTracks } from '@app/services/trackApi';

const { REQUEST_GET_ITUNES_TRACKS, REQUEST_GET_ITUNES_TRACK_BY_ID } = itunesTypes;
const { successGetItunesTracks, failureGetItunesTracks, successGetItunesTrackById, failureGetItunesTrackById } =
  itunesCreators;

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
 * Saga to handle fetching iTunes track details by trackId.
 *
 * This function performs the following steps:
 * 1. Calls the `getTrack` API with the provided `trackId` from the action.
 * 2. If the API call is successful (`ok`), it dispatches the `successGetItunesTrackById` action with the retrieved track data.
 * 3. If the API call fails, it dispatches the `failureGetItunesTrackById` action with the error data.
 *
 * @generator
 * @param {Object} action - The action object dispatched from a Redux action.
 * @param {number} action.trackId - The ID of the track to fetch from the iTunes API.
 * @yields {Object} - Yields the result of the `call` effect to fetch track details and `put` effects to dispatch success or failure actions.
 * @returns {void}
 */
export function* getItunesTrackById(action) {
  const response = yield call(getTrack, action.trackId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetItunesTrackById(data));
  } else {
    yield put(failureGetItunesTrackById(data));
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
  yield takeLatest(REQUEST_GET_ITUNES_TRACK_BY_ID, getItunesTrackById);
}
