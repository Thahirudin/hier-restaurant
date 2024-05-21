import RestaurantDbSource from '../../data/restaurantdb-source';
import '../../components/nav-bar';
import '../../components/hero-jumbotron';
import '../../components/resto-list';
import '../../components/footer-bar';

const Home = {
  async render() {
    return `
       <article>
        <hero-jumbotron></hero-jumbotron>
      </article>
      <article id="daftarResto">
        <div class="container">
          <h2>Daftar Restaurant</h2>
          <div class="data-resto"></div>
        </div>
      </article>
    `;
  },

  async afterRender() {
    const listResto = await RestaurantDbSource.getAll();
    const restoContainer = document.querySelector('.data-resto');
    listResto.forEach((resto) => {
      const restoList = document.createElement('resto-list');
      restoList.data = resto;
      restoContainer.appendChild(restoList);
    });
  },
};
export default Home;
