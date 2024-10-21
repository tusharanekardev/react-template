/**
 *
 * Tests for TrackPlayer
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderProvider, renderWithIntl } from '@utils/testUtils';
import TrackPlayer from '../index';
import { itunesTypes } from '@app/containers/Itunes/reducer';
import { mapDispatchToProps } from '@app/containers/Itunes/index';

describe('<TrackPlayer />', () => {

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackPlayer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackPlayer component', () => {
    const { getAllByTestId } = renderProvider(<TrackPlayer />);
    expect(getAllByTestId('track-player').length).toBe(1);
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchTracksSerachSpy = jest.fn()
    const trackName = 'Beatles'
    const actions = {
      dispatchIsPlaying: {type: itunesTypes.TOGGLE_IS_PLAYING}
    }

    const props = mapDispatchToProps(dispatchTracksSerachSpy)
    props.dispatchIsPlaying()
    expect(dispatchTracksSerachSpy).toHaveBeenCalledWith(actions.dispatchIsPlaying)

    props.dispatchIsPlaying()
  })
});
