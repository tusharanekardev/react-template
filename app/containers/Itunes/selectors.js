import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the itunes state domain
 */

export const selectItunesDomain = (state) => state.itunesContainer || initialState;

export const selectItunesData = () => createSelector(selectItunesDomain, (substate) => get(substate, 'tracksData'));

export const selectLoading = () => createSelector(selectItunesDomain, (substate) => get(substate, 'loading'));

export const selectTracksError = () => createSelector(selectItunesDomain, (substate) => get(substate, 'tracksError'));

export const selectTrackName = () => createSelector(selectItunesDomain, (substate) => get(substate, 'trackName'));
