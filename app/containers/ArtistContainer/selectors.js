import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectArtistContainerDomain = state =>
  (state.artistContainer || initialState).toJS();

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () =>
  createSelector(
    selectArtistContainerDomain,
    substate => substate
  );

export const selectTracksData = () =>
  createSelector(
    selectArtistContainerDomain,
    substate => _.get(substate, 'tracksData', null)
  );

export const selectTracksError = () =>
  createSelector(
    selectArtistContainerDomain,
    substate => _.get(substate, 'tracksError', null)
  );

export const selectArtistName = () =>
  createSelector(
    selectArtistContainerDomain,
    substate => _.get(substate, 'artistName', null)
  );

export default selectArtistContainerDomain;
