import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import '../../components/nav-bar';
import '../../components/resto-list';
import '../../components/modal-section';
import '../../components/footer-bar';

const Favorit = {
  async render() {
    return `
       <article id="daftarResto">
        <div class="container">
          <h2>Daftar Restaurant</h2>
          <div class="data-resto" id="dataresto"></div>
        </div>
      </article>
    `;
  },

  async afterRender() {
    const listResto = await FavoriteRestaurantIdb.getAllRestaurants();
    const restoContainer = document.querySelector('.data-resto');
    if (listResto.length === 0) {
      restoContainer.innerHTML = '<div class="no-restaurant-text"><p>Belum ada Restaurant favorit.</p></div>';
    } else {
      listResto.forEach((resto) => {
        const restoList = document.createElement('resto-list');
        restoList.data = resto;
        restoContainer.appendChild(restoList);
      });
    }
  },
};

export default Favorit;
