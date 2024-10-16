import routeConstants from '@utils/routeConstants';
import NotFound from '@app/containers/NotFoundPage/loadable';
import HomeContainer from '@app/containers/HomeContainer/loadable';
import Itunes from '@app/containers/Itunes/loadable';
import TrackDetails from './components/TrackDetails/index';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  iTunesPage: {
    component: Itunes,
    ...routeConstants.tracks
  },
  trackPage: {
    component: TrackDetails,
    ...routeConstants.trackDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
