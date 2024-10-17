/**
 *
 * Tests for TrackDetails
 *
 */

import React from 'react';
import {screen, fireEvent } from '@testing-library/dom';
import { renderProvider} from '@utils/testUtils';
import TrackDetails from '../index';

describe('<TrackDetails />', () => {
  let submitSpy

  beforeEach(() => {
    submitSpy = jest.fn()
  })

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackDetails dispatchItunesTrackById={submitSpy}/>);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackDetails component', () => {
    const { getAllByTestId } = renderProvider(<TrackDetails />);
    expect(getAllByTestId('track-details').length).toBe(1);
  });

  it('should toggle the audio player on button click', () => {
    renderProvider(<TrackDetails />)
    expect(screen.queryByTestId('audio-player')).not.toBeInTheDocument()

    const button = screen.getByTestId('card-details')
    fireEvent.click(button)
    expect(screen.queryByTestId('audio-player')).toBeInTheDocument()

    fireEvent.click(button)
    expect(screen.queryByTestId('audio-player')).not.toBeInTheDocument()
  })
});
