import CONFIG from './config';

const API_ENDPOINT = {
  LISTRESTO: `${CONFIG.BASE_URL}/list`,
  FAVORIT: `${CONFIG.BASE_URL}`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
};

export default API_ENDPOINT;
