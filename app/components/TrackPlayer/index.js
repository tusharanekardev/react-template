/**
 *
 * TrackPlayer
 *
 */

import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const TrackPlayerDiv = styled.div`
  position: fixed;
  bottom: 0;
  width: 600px;
  background-color: #d3d3d3;
  display: flex;
  padding: 0.5rem;
  border-radius: 10px;
  gap: 1rem;
  height: 80px;
  left: 50%;
  transform: translateX(-50%);
`;

/**
 * TrackPlayer component that renders the current track's information
 * and provides play/pause functionality.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.currentTrack - The current track object containing information about the track.
 * @param {string} [props.currentTrack.artistName=''] - The name of the track's artist.
 * @param {string} [props.currentTrack.previewUrl=''] - The URL for the track's preview audio.
 * @param {string} [props.currentTrack.artworkUrl100=''] - The URL for the track's artwork image (100x100).
 * @param {string | number} [props.currentTrack.trackId=''] - The unique identifier of the track.
 * @param {string} [props.currentTrack.trackName=''] - The name of the track.
 * @param {boolean} props.isPlaying - Boolean indicating whether the track is currently playing.
 * @param {Function} props.dispatchIsPlaying - Function to dispatch an action that toggles the play/pause state.
 *
 * @description
 * - Renders a track player with controls to play/pause a track.
 * - Displays the track's artwork, name, and artist.
 * - Uses an HTML `<audio>` element to play a preview of the track.
 * - Automatically plays a new track when `currentTrack` changes.
 *
 * @returns {JSX.Element} The rendered TrackPlayer component.
 */
export function TrackPlayer({ currentTrack, isPlaying, dispatchIsPlaying }) {
  const { artistName = '', previewUrl = '', artworkUrl100 = '', trackId = '', trackName = '' } = currentTrack || {};
  let audio = document.getElementById('audio_tag');

  /**
   * Toggles the play/pause state of a track.
   *
   * @function togglePlayPause
   * @param {string | number} trackId - The ID of the track to be played or paused.
   * @description
   * - Sets the currently playing track using `setPlayTrackId`.
   * - If the track is not already playing, dispatches an action to start playing by calling `dispatchIsPlaying`.
   */
  function handleTogglePlayPause() {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    dispatchIsPlaying();
  }

  useEffect(() => {
    audio = document.getElementById('audio_tag');
    if (audio) {
      audio.play();
    }
  }, [currentTrack]);

  return (
    <TrackPlayerDiv data-testid="track-player">
      {trackId ? (
        <>
          <img src={artworkUrl100} alt={`${trackName} cover`} />
          <div>
            <p>{trackName}</p>
            <p>{artistName}</p>
          </div>
          <button onClick={handleTogglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <audio id="audio_tag" src={previewUrl} />
        </>
      ) : (
        <p>Select song to play</p>
      )}
    </TrackPlayerDiv>
  );
}

TrackPlayer.propTypes = {
  currentTrack: PropTypes.shape({
    wrapperType: PropTypes.string,
    kind: PropTypes.string,
    artistId: PropTypes.number,
    collectionId: PropTypes.number,
    trackId: PropTypes.number,
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    trackName: PropTypes.string,
    collectionCensoredName: PropTypes.string,
    trackCensoredName: PropTypes.string,
    artistViewUrl: PropTypes.string,
    collectionViewUrl: PropTypes.string,
    trackViewUrl: PropTypes.string,
    previewUrl: PropTypes.string,
    artworkUrl30: PropTypes.string,
    artworkUrl60: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionPrice: PropTypes.number,
    trackPrice: PropTypes.number,
    releaseDate: PropTypes.string,
    collectionExplicitness: PropTypes.string,
    trackExplicitness: PropTypes.string,
    discCount: PropTypes.number,
    discNumber: PropTypes.number,
    trackCount: PropTypes.number,
    trackNumber: PropTypes.number,
    trackTimeMillis: PropTypes.number,
    country: PropTypes.string,
    currency: PropTypes.string,
    primaryGenreName: PropTypes.string,
    isStreamable: PropTypes.bool
  }),
  isPlaying: PropTypes.bool,
  dispatchIsPlaying: PropTypes.func
};

export default TrackPlayer;
