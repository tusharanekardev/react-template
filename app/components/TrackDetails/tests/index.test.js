/**
 *
 * Tests for TrackDetails
 *
 */

import React from 'react';
import { renderProvider, renderWithIntl } from '@utils/testUtils';
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
});
