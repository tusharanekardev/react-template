import { generateApiClient } from '@utils/apiUtils';
const repoApi = generateApiClient('itunes');

/**
 * @see https://github.com/elbywan/wretch?tab=readme-ov-file#http-methods-
 */
export const getTracks = (trackName) => repoApi.get(`search?term=${trackName}`);
