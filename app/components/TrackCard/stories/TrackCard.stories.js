/**
 *
 * Stories for TrackCard
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { TrackCard } from '../index';

const sampleItem = {
    title: 'Sample Track',
    artist: 'Sample Artist',
    albumCover: 'https://via.placeholder.com/150',
    isPlaying: false,
  };
  
  const togglePlayPause = () => {
    console.log('Play/Pause toggled');
  };

  storiesOf('TrackCard', module)
  .add('simple', () => <TrackCard item={sampleItem} togglePlayPause={togglePlayPause} />)
  .add('playing', () => <TrackCard item={{ ...sampleItem, isPlaying: true }} togglePlayPause={togglePlayPause} />)
  .add('paused', () => <TrackCard item={{ ...sampleItem, isPlaying: false }} togglePlayPause={togglePlayPause} />);