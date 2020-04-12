import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import ArtistContainer from '@containers/ArtistContainer/Loadable';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    route: '/',
    // add props to pass to HomeContainer
    props: {
      maxwidth: 1000,
      padding: 20
    },
    exact: true
  },
  artists: {
    component: ArtistContainer,
    route: '/artists',
    // add props to pass to HomeContainer
    props: {
      padding: 0
    },
    exact: true
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
