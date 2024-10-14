import { initialState } from '../reducer';
import { selectItunes, selectItunesData, selectItunesDomain, selectTrackName, selectTracksError } from '../selectors';

describe('Itunes selector tests', () => {
  let mockedState
  let trackName
  let tracksData
  let tracksError

  beforeEach(() => {
    trackName = 'beatles'
    tracksData = {totalCount: 1, items: [{trackName}]}
    tracksError = 'There was some error while fetching the repo details'

    mockedState = {
      itunesContainer: {
        trackName,
        tracksData,
        tracksError
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
});
