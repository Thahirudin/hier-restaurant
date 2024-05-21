import '../../components/nav-bar';
import '../../components/detail-resto';
import '../../components/footer-bar';
import '../../components/indicator-loading';
import '../../components/customer-reviews';
import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const loading = document.querySelector('#loading');
const showloading = () => {
  loading.style.display = 'block';
};
const hideloading = () => {
  loading.style.display = 'none';
};

const Detail = {
  async render() {
    return `
     <article>
      <section id="loading">
      <indicator-loading></indicator-loading>
    </section>
      <div id="resto" class="container">

      </div>
      <div id="likeButtonContainer"></div>
    </article>
    `;
  },

  async afterRender() {
    try {
      showloading();
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const getResto = await RestaurantDbSource.detail(url.id);
      const restoContainer = document.querySelector('#resto');
      const restoList = document.createElement('detail-resto');
      if (getResto.error) {
        // eslint-disable-next-line no-alert
        alert(getResto.message);
      } else {
        restoList.data = getResto;
        restoContainer.appendChild(restoList);
        LikeButtonPresenter.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          favoriteRestaurants: FavoriteRestaurantIdb,
          restaurant: {
            id: getResto.id,
            name: getResto.name,
            description: getResto.description,
            city: getResto.city,
            address: getResto.address,
            pictureId: getResto.pictureId,
            rating: getResto.rating,
          },
        });
      }
    } catch (error) {
      showloading();
      // eslint-disable-next-line no-alert
      alert(error.message);
    } finally {
      hideloading();
    }
  },
};

export default Detail;
