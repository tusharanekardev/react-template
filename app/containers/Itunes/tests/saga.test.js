/**
 * Test itunes sagas
 */

import { takeLatest ,call, put } from 'redux-saga/effects';
import itunesSaga, { getItunesTrackById, getItunesTracks } from '../saga';
import { itunesTypes } from '../reducer';
import { getTracks, getTrack } from '@app/services/trackApi';
import { apiResponseGenerator } from '@app/utils/testUtils';

describe('Itunes saga tests', () => {
  const generator = itunesSaga();
  const trackName = 'beatles'
  const trackId = 1234
  let getItunesTracksGenerator = getItunesTracks({trackName})
  let getItunesTrackByIdGenerator = getItunesTrackById({trackId})
  
  it('should start task to watch for REQUEST_GET_ITUNES_TRACKS action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesTypes.REQUEST_GET_ITUNES_TRACKS,getItunesTracks))
  })

  it('should ensure that the action FAILURE_GET_ITUNES_TRACKS is dispatched when the api call fails', () => {
    const res = getItunesTracksGenerator.next().value
    expect(res).toEqual(call(getTracks, trackName))
    const errorResponse = {
      errorMessage: 'There was an error while fetching tracks.'
    }
    expect(getItunesTracksGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesTypes.FAILURE_GET_ITUNES_TRACKS,
        error: errorResponse
      })
    )
  })

  it('should ensure that the action SUCCESS_GET_ITUNES_TRACKS is dispatched when the api call succeeds', () => {
    getItunesTracksGenerator = getItunesTracks({trackName})
    const res = getItunesTracksGenerator.next().value
    expect(res).toEqual(call(getTracks, trackName))
    const tracksResponse = {
      totalCount: 1,
      items: [{itunesTrackName: trackName}]
    }
    expect(getItunesTracksGenerator.next(apiResponseGenerator(true, tracksResponse)).value).toEqual(
      put({
        type: itunesTypes.SUCCESS_GET_ITUNES_TRACKS,
        data: tracksResponse
      })
    )
  })

  //trackByID

  it('should start task to watch for REQUEST_GET_ITUNES_TRACK_BY_ID action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesTypes.REQUEST_GET_ITUNES_TRACK_BY_ID,getItunesTrackById))
  })

  it('should ensure that the action FAILURE_GET_ITUNES_TRACK_BY_ID is dispatched when the api call fails', () => {
    const res = getItunesTrackByIdGenerator.next().value
    expect(res).toEqual(call(getTrack, trackId))
    const errorResponse = {
      errorMessage: 'something went wrong'
    }
    expect(getItunesTrackByIdGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesTypes.FAILURE_GET_ITUNES_TRACK_BY_ID,
        trackError: errorResponse
      })
    )
  })

  it('should ensure that the action SUCCESS_GET_ITUNES_TRACK_BY_ID is dispatched when the api call succeeds', () => {
    getItunesTrackByIdGenerator = getItunesTrackById({trackId})
    const res = getItunesTrackByIdGenerator.next().value
    expect(res).toEqual(call(getTrack, trackId))
    const tracksResponse = {
      totalCount: 1,
      items: [{itunesTrackId: trackId}]
    }
    expect(getItunesTrackByIdGenerator.next(apiResponseGenerator(true, tracksResponse)).value).toEqual(
      put({
        type: itunesTypes.SUCCESS_GET_ITUNES_TRACK_BY_ID,
        trackData: tracksResponse
      })
    )
  })

});
