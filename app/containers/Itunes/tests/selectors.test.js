import { initialState } from '../reducer';
import { selectItunes, selectItunesData, selectItunesDomain, selectTrackData, selectTrackError, selectTrackId, selectTrackName, selectTracksError } from '../selectors';

describe('Itunes selector tests', () => {
  let mockedState
  let trackName
  let tracksData
  let tracksError
  let trackId
  let trackData
  let trackError

  beforeEach(() => {
    trackName = 'beatles'
    tracksData = {totalCount: 1, items: [{trackName}]}
    tracksError = 'There was some error while fetching the track details'
    trackId = 1234
    trackData = {resultCount: 1, results: [{trackId}]}
    trackError = 'There was some error while fetching track by id'

    mockedState = {
      itunesContainer: {
        trackName,
        tracksData,
        tracksError,
        trackId,
        trackData,
        trackError
      }
    }
  })

  it('should select the trackName', () => {
    const itunesSelector = selectTrackName();
    expect(itunesSelector(mockedState)).toEqual(trackName);
  });

  it('should select tracksData', () => {
    const itunesDataSelector = selectItunesData()
    expect(itunesDataSelector(mockedState)).toEqual(tracksData)
  })

  it('should select the tracksError', () => {
    const tracksErrorSelector = selectTracksError()
    expect(tracksErrorSelector(mockedState)).toEqual(tracksError)
  })

  it('should select the global state', () => {
    const selector = selectItunesDomain(initialState)
    expect(selector).toEqual(initialState)
  })

  //trackById

  it('should select the trackId', () => {
    const itunesSelector = selectTrackId();
    expect(itunesSelector(mockedState)).toEqual(trackId);
  });
  it('should select trackData', () => {
    const itunesDataSelector = selectTrackData()
    expect(itunesDataSelector(mockedState)).toEqual(trackData)
  })
  it('should select the trackError', () => {
    const tracksErrorSelector = selectTrackError()
    expect(tracksErrorSelector(mockedState)).toEqual(trackError)
  })
});
