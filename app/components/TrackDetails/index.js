/**
 *
 * TrackDetails
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

// import PropTypes from 'prop-types'
// import styled from 'styled-components'
import PropTypes from 'prop-types';
import { selectItunesData } from '@app/containers/Itunes/selectors';
import { itunesCreators } from '@app/containers/Itunes/reducer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import styled from '@emotion/styled';

const TrackDetailsDiv = styled.div`
  padding: 2rem;
`;

const AudioPlayerDiv = styled.div`
  margin-top: 2rem;
  max-width: 345px;
`;

const CustomAudio = styled.audio`
  width: 100%;
`;

/**
 * TrackDetails component fetches and displays the details of a track using the trackId from the URL parameters.
 *
 * It retrieves data like track name, artist name, collection name, track price, and artwork image from the `tracksData` prop.
 * If no track data is found or available, it triggers a dispatch to fetch the track details by its trackId.
 *
 * @component
 *
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.tracksData - Data containing the list of tracks.
 * @param {Array} props.tracksData.results - The array of track objects containing details.
 * @param {function} props.dispatchItunesTrackById - Function to dispatch an action to fetch track details by ID.
 *
 * @returns {JSX.Element} A card component displaying track details such as name, artist, collection, price, and country.
 *
 * @example
 * // Example usage of TrackDetails component
 * <TrackDetails tracksData={mockTracksData} dispatchItunesTrackById={mockDispatchFunction} />
 */
function TrackDetails({ tracksData, dispatchItunesTrackById }) {
  const { trackId } = useParams();
  const [isAudioPlayer, setIsAudioPlayer] = useState(false);

  const track = tracksData?.results?.find((item) => item?.trackId === parseInt(trackId));

  const {
    artworkUrl100 = '',
    collectionName = 'Unknown Collection',
    artistName = 'Unknown Artist',
    trackName = 'Unknown Track',
    trackPrice = 0,
    country = 'Unknown Country',
    previewUrl = ''
  } = track || {};

  /**
   * Toggles the state of the audio player.
   *
   * This function updates the `isAudioPlayer` state, switching it
   * between `true` and `false`. If `isAudioPlayer` is `true`, the audio
   * player will be visible; if `false`, the audio player will be hidden.
   *
   * @function
   * @returns {void} Does not return a value, but toggles the state internally.
   */
  function handleCardClick() {
    setIsAudioPlayer((prevIsAudioPlayer) => !prevIsAudioPlayer);
  }

  useEffect(() => {
    if (!trackId || !track || !tracksData?.results?.length) {
      dispatchItunesTrackById(trackId);
    }
  }, []);

  return (
    <TrackDetailsDiv data-testid="track-details">
      <Card sx={{ maxWidth: 345 }} data-testid="card-details" onClick={handleCardClick}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={artworkUrl100} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Track Name: {trackName}
            </Typography>
            <Typography component="p" variant="body1">
              Artist Name: {artistName}
            </Typography>
            <Typography component="p" variant="body1">
              Collection Name: {collectionName}
            </Typography>
            <Typography component="p" variant="body1">
              Track Price: {trackPrice}
            </Typography>
            <Typography component="p" variant="body1">
              Country: {country}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {isAudioPlayer && (
        <AudioPlayerDiv data-testid="audio-player">
          <CustomAudio controls>
            <source src={previewUrl} />
          </CustomAudio>
        </AudioPlayerDiv>
      )}
    </TrackDetailsDiv>
  );
}

TrackDetails.propTypes = {
  tracksData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  dispatchItunesTrackById: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  tracksData: selectItunesData()
});

/**
 * Maps dispatch actions to component props, enabling the component to dispatch actions to the Redux store.
 *
 * Specifically, this function returns an object containing a function `dispatchItunesTrackById`, which dispatches
 * an action to fetch the iTunes track details by a given trackId.
 *
 * @function
 * @param {function} dispatch - The Redux `dispatch` function used to dispatch actions to the store.
 *
 * @returns {Object} An object containing:
 * - `dispatchItunesTrackById`: A function that takes a trackId and dispatches the `requestGetItunesTrackById` action.
 */
export function mapDispatchToProps(dispatch) {
  const { requestGetItunesTrackById } = itunesCreators;
  return {
    dispatchItunesTrackById: (trackId) => dispatch(requestGetItunesTrackById(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(TrackDetails);
