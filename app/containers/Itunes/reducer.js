/*
 *
 * Itunes reducer
 *
 */
import { produce } from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = {
  trackName: null,
  tracksData: {},
  tracksError: null,
  loading: null,
  trackId: null,
  trackData: {},
  trackError: null,
  isPlaying: false
};

export const { Types: itunesTypes, Creators: itunesCreators } = createActions({
  requestGetItunesTracks: ['trackName'],
  successGetItunesTracks: ['data'],
  failureGetItunesTracks: ['error'],
  requestGetItunesTrackById: ['trackId'],
  successGetItunesTrackById: ['trackData'],
  failureGetItunesTrackById: ['trackError'],
  toggleIsPlaying: ['isPlaying']
});

/* eslint-disable complexity */
// Code with higher complexity
export const itunesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesTypes.REQUEST_GET_ITUNES_TRACKS:
        draft.trackName = action.trackName;
        draft.loading = true;
        break;

      case itunesTypes.SUCCESS_GET_ITUNES_TRACKS:
        draft.tracksData = action.data;
        draft.tracksError = null;
        draft.loading = false;
        break;

      case itunesTypes.FAILURE_GET_ITUNES_TRACKS:
        draft.tracksError = get(action.error, 'message', 'something went wrong');
        draft.tracksData = null;
        draft.loading = false;
        break;

      case itunesTypes.REQUEST_GET_ITUNES_TRACK_BY_ID:
        draft.trackId = action.trackId;
        draft.loading = true;
        break;

      case itunesTypes.SUCCESS_GET_ITUNES_TRACK_BY_ID:
        draft.trackData = action.data;
        draft.trackError = null;
        draft.loading = false;
        break;

      case itunesTypes.FAILURE_GET_ITUNES_TRACK_BY_ID:
        draft.trackError = get(action.error, 'message', 'something went wrong');
        draft.trackData = null;
        draft.loading = false;
        break;

      case itunesTypes.TOGGLE_IS_PLAYING:
        draft.isPlaying = !state.isPlaying;
        break;
    }
  });

export default itunesReducer;
