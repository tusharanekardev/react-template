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
  loading: null
};

export const { Types: itunesTypes, Creators: itunesCreators } = createActions({
  requestGetItunesTracks: ['trackName'],
  successGetItunesTracks: ['data'],
  failureGetItunesTracks: ['error']
});

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
    }
  });

export default itunesReducer;
