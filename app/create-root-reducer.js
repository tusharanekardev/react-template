/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import LanguageProviderReducer from '@containers/LanguageProvider/reducer';
import HomeContainerReducer from '@containers/HomeContainer/reducer';
import { itunesReducer } from './containers/Itunes/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createRootReducer(injectedReducer = {}) {
  return combineReducers({
    ...injectedReducer,
    language: LanguageProviderReducer,
    homeContainer: HomeContainerReducer,
    itunesContainer: itunesReducer
  });
}
