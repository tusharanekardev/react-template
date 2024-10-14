import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { createStructuredSelector } from 'reselect';
import { For } from '@components/For';
import { compose } from 'redux';
import styled from '@emotion/styled';
import { injectSaga } from 'redux-injectors';
import { OutlinedInput } from '@mui/material';
import { selectItunesData, selectLoading, selectTrackName } from './selectors';
import itunesSaga from './saga';
import { itunesCreators } from './reducer';
import { translate } from '@app/utils';
import { TrackCard } from '@components/TrackCard';

const Container = styled.div`
  && {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }
`;
const StyledOutlinedInput = styled(OutlinedInput)`
  legend {
    display: none;
  }
  > fieldset {
    top: 0;
  }
`;

/**
 * Itunes component that handles searching and displaying iTunes tracks.
 * It includes input handling for track searches, loading state management,
 * and rendering of the track list using the TrackCard component.
 *
 * The component fetches track data based on user input and displays the results
 * in a grid layout. It also debounces input changes to optimize API calls.
 *
 * @component
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} props - The component props.
 * @param {Function} props.dispatchItunesTracks - Function to dispatch the action for fetching iTunes tracks based on the provided track name.
 * @param {boolean} props.loading - Indicates whether the tracks are currently being loaded.
 * @param {string} props.trackName - The current track name input by the user for searching tracks.
 * @param {Object} props.tracksData - The data object containing the results of the fetched iTunes tracks.
 * @param {number} props.tracksData.resultCount - The total number of results fetched from the iTunes API.
 * @param {Array} props.tracksData.results - The array of track objects fetched from the iTunes API.
 *
 * @returns {JSX.Element} The rendered Itunes component.
 */
export function Itunes({ dispatchItunesTracks, loading, trackName, tracksData }) {
  useEffect(() => {
    if (trackName && !tracksData?.results?.length) {
      dispatchItunesTracks(trackName);
    }
  }, []);

  const searchTracks = (tName) => {
    dispatchItunesTracks(tName);
  };

  const handleOnChange = (tName) => {
    if (!isEmpty(tName)) {
      searchTracks(tName);
    } else {
      // dispatchClearGithubRepos();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <div>
      <StyledOutlinedInput
        inputProps={{ 'data-testid': 'search-bar' }}
        onChange={(event) => debouncedHandleOnChange(event.target.value)}
        fullWidth
        defaultValue={trackName}
        placeholder={translate('default_template')}
      />

      <For
        of={tracksData?.results}
        ParentComponent={Container}
        renderItem={(item, index) => <TrackCard key={index} {...item} />}
      />
    </div>
  );
}

Itunes.propTypes = {
  dispatchItunesTracks: PropTypes.func,
  loading: PropTypes.bool,
  trackName: PropTypes.string,
  tracksData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  })
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  tracksData: selectItunesData(),
  trackName: selectTrackName()
});

/**
 * Maps dispatch actions to props for the Itunes component.
 * This function binds the action creator for fetching iTunes tracks
 * to the component's props, allowing the component to dispatch
 * actions to the Redux store.
 *
 * @function
 * @param {Function} dispatch - The Redux dispatch function.
 * @returns {Object} An object containing the dispatch functions to be used in the component.
 * @returns {Function} return.dispatchItunesTracks - Function to dispatch the requestGetItunesTracks action
 *    with the specified track name.
 */
export function mapDispatchToProps(dispatch) {
  const { requestGetItunesTracks } = itunesCreators;
  return {
    dispatchItunesTracks: (trackName) => dispatch(requestGetItunesTracks(trackName))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo, injectSaga({ key: 'itunes', saga: itunesSaga }))(Itunes);

export const ItunesTest = compose()(Itunes);
