import { itunesReducer, itunesTypes, initialState } from '../reducer';

describe('Itunes reducer tests', () => {
  let state
  beforeEach(() => {
    state = initialState
  })

  it('should return the initial state', () => {
    expect(itunesReducer(undefined, {})).toEqual(state)
  })

  it('should ensure that the trackName is present and loading=true when REQUEST_GET_ITUNES_TRACKS is dispatched', () => {
    const trackName = 'Beatles'
    const expectedResult = {...state, trackName, loading: true}
    expect(
      itunesReducer(state, {
        type: itunesTypes.REQUEST_GET_ITUNES_TRACKS,
        trackName
      })
    ).toEqual(expectedResult)
  })

  it('should ensure that the track data is present and loading = false when SUCCESS_GET_ITUNES_TRACKS is dispatched', () => {
    const data = {name: 'Beatles'}
    const expectedResult = {...state, tracksData: data, loading: false}
    expect(
      itunesReducer(state, {
        type: itunesTypes.SUCCESS_GET_ITUNES_TRACKS,
        data
      })
    ).toEqual(expectedResult)
  })

  it('should ensure that the trackErrorMessage has some data loading=false when FAILURE_GET_ITUNES_TRACKS', () => {
    const error = 'something went wrong'
    const expectedResult = {...state, tracksError: error, tracksData: null, loading: false}
    expect(
      itunesReducer(state, {
        type: itunesTypes.FAILURE_GET_ITUNES_TRACKS,
        error
      })
    ).toEqual(expectedResult)
  })
  
});