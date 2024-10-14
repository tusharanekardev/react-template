/**
 *
 * Tests for Itunes container
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { timeout, renderProvider } from '@utils/testUtils';
import { ItunesTest as Itunes, mapDispatchToProps} from '../index';
import { itunesTypes } from '../reducer';

describe('<Itunes /> container tests', () => {
  let submitSpy

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Itunes dispatchItunesTracks={submitSpy}/>);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchItunesTracks on change and after enter', async () => {
    const trackName = 'Beatles'
    const {getByTestId} = renderProvider(<Itunes dispatchItunesTracks={submitSpy}/>)
    const searchBar = getByTestId('search-bar')
    fireEvent.change(searchBar, {
      target: {value: trackName}
    })
    await timeout(500)
    expect(submitSpy).toBeCalledWith(trackName)

    fireEvent.keyDown(searchBar, {
      key: 'Enter',
      code: 13,
      charCode: 13
    })
    expect(submitSpy).toBeCalledWith(trackName)
  })

  it('should dispatchGithubRepos on update on mount if repoName is already persisted', async () => {
    const trackName = 'Beatles'
    renderProvider(<Itunes trackName={trackName} tracksData={null} dispatchItunesTracks={submitSpy}/>)

    await timeout(500)
    expect(submitSpy).toBeCalledWith(trackName)
  })

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchTracksSerachSpy = jest.fn()
    const trackName = 'Beatles'
    const actions = {
      dispatchItunesTracks: {trackName,type: itunesTypes.REQUEST_GET_ITUNES_TRACKS}
    }

    const props = mapDispatchToProps(dispatchTracksSerachSpy)
    props.dispatchItunesTracks(trackName)
    expect(dispatchTracksSerachSpy).toHaveBeenCalledWith(actions.dispatchItunesTracks)

    await timeout(500)
    props.dispatchItunesTracks()
    // expect(dispatchTracksSerachSpy).toHaveBeenCalledWith(actions.dispatchClearItunesTracks)
  })

  it('should render the data when loading becomes false', () => {
    // const tracksData = {items: [{trackOne: 'track-template'}]}
    const tracksData = {
      results: [
        {
          "wrapperType": "track",
          "kind": "feature-movie",
          "trackId": 202239124,
          "artistName": "Nancy Meyers",
          "trackName": "The Parent Trap (1998)",
          "trackCensoredName": "The Parent Trap (1998)",
          "trackViewUrl": "https://itunes.apple.com/us/movie/the-parent-trap-1998/id202239124?uo=4",
          "previewUrl": "https://video-ssl.itunes.apple.com/itunes-assets/Video128/v4/c0/44/fe/c044fe32-00c8-0a6a-377d-d491fb6db5fd/mzvf_2673221347607646006.640x476.h264lc.U.p.m4v",
          "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music/de/47/a8/mzi.vofvfjjb.jpg/30x30bb.jpg",
          "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music/de/47/a8/mzi.vofvfjjb.jpg/60x60bb.jpg",
          "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music/de/47/a8/mzi.vofvfjjb.jpg/100x100bb.jpg",
          "collectionPrice": 17.99,
          "trackPrice": 17.99,
          "trackRentalPrice": 3.99,
          "collectionHdPrice": 17.99,
          "trackHdPrice": 17.99,
          "trackHdRentalPrice": 3.99,
          "releaseDate": "1998-07-29T07:00:00Z",
          "collectionExplicitness": "notExplicit",
          "trackExplicitness": "notExplicit",
          "trackTimeMillis": 7694360,
          "country": "USA",
          "currency": "USD",
          "primaryGenreName": "Kids & Family",
          "contentAdvisoryRating": "PG",
          "longDescription": "What if you spent your whole life wishing for something you didn't know you already had? Hallie Parker and Annie James are about to find out. From Walt Disney Pictures and the creators of Father of the Bride comes the hilariously fresh and contemporary retelling of the classic hit The Parent Trap. Hallie is a cool girl from California. Annie is a fair rose from London. When the two accidentally meet at summer camp, they think they have nothing in common except ... they're identical twins (both played by Lindsay Lohan)! Now they're up to their freckles in schemes and dreams to switch places, get their parents (Dennis Quaid and Natasha Richardson) back together, and have the family they've always wished for! This charming, heartwarming, and delightfully clever comedy adventure will enchant your entire family."
      }
      ]
    }
    const {getByTestId} = renderProvider(<Itunes tracksData={tracksData} dispatchItunesTracks={submitSpy}/>)
    expect(getByTestId('for')).toBeInTheDocument()
  })

  it('should render exact number of TrackCards as per totalCount in result', () => {
    const resultCount = 2
    const tracksData = {
      resultCount,
      results: [
        {
          name: 'beatles-template',
          fullName: 'beatles/beatles-template',
        },
        {
          name: 'beatles-template2',
          fullName: 'beatles/beatles-template2',
        }
      ]
    }
    const {getAllByTestId} = renderProvider(<Itunes tracksData={tracksData} dispatchItunesTracks={submitSpy}/>)
    expect(getAllByTestId('track-card').length).toBe(resultCount)
  })
});
