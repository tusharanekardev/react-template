/**
 *
 * TrackPlayer
 *
 */

import React, { useEffect } from 'react';
// import PropTypes from 'prop-types'
// import styled from 'styled-components'
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
 *
 * @param {Object} props - The props object.
 * @param {number|string} props.playTrackId - The ID of the track currently selected for playback.
 * @param {Object} props.tracksData - An object containing track data, including an array of track results.
 * @param {boolean} props.isPlaying - A boolean indicating whether a track is currently playing.
 * @param {function} props.dispatchIsPlaying - A function to dispatch the action for toggling the play/pause state.
 *
 * @description
 * - Displays information about the current track (such as the track name, artist name, and artwork).
 * - Provides a button to toggle between playing and pausing the track.
 * - Plays the track automatically when a new `playTrackId` is provided.
 *
 * @returns {JSX.Element} The rendered TrackPlayer component.
 */
export function TrackPlayer({ playTrackId, tracksData, isPlaying, dispatchIsPlaying }) {
  /**
   * Finds the current track being played from the list of tracks.
   *
   * @constant {Object|undefined} currentTrack
   * @description
   * - Searches for the track with a `trackId` that matches the `playTrackId` in the `tracksData.results` array.
   * - If `tracksData` or `results` is undefined, it safely returns `undefined` without throwing an error.
   *
   * @param {Array<Object>} [tracksData.results] - The array of track objects from which to find the current track.
   * @param {number|string} playTrackId - The ID of the track currently being played.
   * @returns {Object|undefined} The track object with the matching `trackId`, or `undefined` if no match is found.
   */
  const currentTrack = tracksData?.results?.find((track) => track?.trackId === playTrackId);
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
  }, [playTrackId]);

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
  playTrackId: PropTypes.number,
  tracksData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  isPlaying: PropTypes.bool,
  dispatchIsPlaying: PropTypes.func
};

export default TrackPlayer;
