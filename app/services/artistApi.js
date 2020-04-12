import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('itunes');

export const getArtists = searchTerm =>
  repoApi.get(`/search?term=${searchTerm}`);
