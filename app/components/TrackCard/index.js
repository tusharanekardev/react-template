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
 * MediaItemCard component that displays information about a Media item (like a song).
 * It shows the repository's name, full name, and star count.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} props - The component props.
 * @param {string} props.trackName - The name of the track.
 * @param {string} props.collectionName - The name of the collection.
 * @param {string} props.artistName - The name of the artist.
 * @param {string} props.country - The name of the country the media is from
 * @param {string} props.primaryGenreName - Genre name
 * @param {string} props.thumbnailSrc - thumbnail of the media
 * @returns {JSX.Element} The RepoCard component displaying the repository information.
 */
export function TrackCard({ artistName, collectionName, previewUrl, artworkUrl60 }) {
  return (
    <CustomCard data-testid="track-card">
      <p>{artistName}</p>
      <p>{collectionName}</p>
      <p>{artistName}</p>
      <p>{artistName}</p>
    </CustomCard>
  );
}

TrackCard.propTypes = {
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  previewUrl: PropTypes.string,
  artworkUrl60: PropTypes.string
};

export default TrackCard;
