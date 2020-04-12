/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';
import _ from 'lodash';

export const {
  Types: artistContainerTypes,
  Creators: artistContainerCreators
} = createActions({
  requestGetArtists: ['artistName'],
  successGetArtists: ['data'],
  failureGetArtists: ['error']
});

export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
export const artistContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case artistContainerTypes.REQUEST_GET_ARTISTS:
        return initialState.set('artistName', action.artistName);
      case artistContainerTypes.SUCCESS_GET_ARTISTS:
        return state.set('tracksData', action.data);
      case artistContainerTypes.FAILURE_GET_ARTISTS:
        return state.set(
          'tracksError',
          _.get(action.error, 'message', 'something_went_wrong')
        );
    }
    return state;
  });

export default artistContainerReducer;
