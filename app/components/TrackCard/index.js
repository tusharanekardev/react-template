/**
 *
 * TrackCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types'
// import styled from 'styled-components'
import styled from '@emotion/styled';
import { Card } from '@mui/material';

const CustomCard = styled(Card)`
  && {
    margin: 1rem 0;
    padding: 1rem;
  }
`;

/**
 * A functional component that renders a card displaying track information.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.artistName - The name of the artist.
 * @param {string} props.collectionName - The name of the music collection (album).
 * @param {string} props.previewUrl - URL for previewing the track.
 * @param {string} props.artworkUrl100 - URL for the track's artwork (image).
 *
 * @returns {JSX.Element} A JSX element representing the track card.
 */
export function TrackCard({ artistName, collectionName, previewUrl, artworkUrl100 }) {
  return (
    <CustomCard data-testid="track-card">
      <img src={artworkUrl100} alt={collectionName} />
      <p>{artistName}</p>
      <p>{collectionName}</p>
    </CustomCard>
  );
}

TrackCard.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  previewUrl: PropTypes.string,
  artworkUrl100: PropTypes.string
};

export default TrackCard;
