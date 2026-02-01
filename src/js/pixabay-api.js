import axios from 'axios';

export function getImagesByQuery(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';

  const params = {
    key: '54460164-6af4a3dc8428f1e90ebc46cf5',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  return axios.get(BASE_URL, { params }).then(response => response.data);
}
