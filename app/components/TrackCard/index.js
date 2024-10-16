/**
 *
 * TrackCard
 *
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
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
export function TrackCard({ artistName, collectionName, previewUrl, artworkUrl100, trackId }) {
  const history = useHistory();

  /**
   * Navigates to the track details page based on the provided trackId.
   *
   * This function uses the `history.push` method to redirect the user to a URL that includes the track's ID.
   * The target URL follows the pattern `/tracks/{trackId}`.
   *
   * @function
   * @param {number} trackId - The ID of the track to navigate to.
   * @param {Object} history - The history object provided by the `react-router-dom` for navigation.
   */
  function handleClick() {
    history.push(`/tracks/${trackId}`);
  }

  return (
    <CustomCard data-testid="track-card" onClick={handleClick}>
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
  artworkUrl100: PropTypes.string,
  trackId: PropTypes.number
};

export default TrackCard;
