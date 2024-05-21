import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestaurantDbSource {
  static async getAll() {
    const response = await fetch('https://restaurant-api.dicoding.dev/list');
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async favorit() {
    const response = await fetch(API_ENDPOINT.FAVORIT);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async detail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async addFeedback(data) {
    const option = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${CONFIG.BASE_URL}/review`, option);

    const responseJson = await response.json();
    return responseJson;
  }
}

export default RestaurantDbSource;
