/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import TrackCard from '../index';

describe('<TrackCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackCard component', () => {
    const { getAllByTestId } = renderProvider(<TrackCard />);
    expect(getAllByTestId('track-card').length).toBe(1);
  });
});
