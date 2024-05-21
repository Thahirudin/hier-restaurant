import CONFIG from '../globals/config';
import RestaurantDbSource from '../data/restaurantdb-source';

class detailResto extends HTMLElement {
  constructor() {
    super();
    this.data = [];
  }

  setDetailResto(value) {
    this.data = value;
    this.render();
  }

  setCustomerReviews(value) {
    this.data.customerReviews = value;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  static displayRating(rate) {
    const rating = parseFloat(rate);
    let starSVG = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars;
    for (let i = 0; i < fullStars; i += 1) {
      starSVG += `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
    </svg>`;
    }
    if (halfStar > 0) {
      starSVG += `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L288.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L288.1 439.8 159.8 508.3C149 514 135.9 513.1 126 506s-14.9-19.3-12.9-31.3L137.8 329 33.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L195 150.3 259.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L438.5 329l24.6 145.7z"/></svg>`;
    }
    return starSVG;
  }

  static displayFoods(foods) {
    const display = foods.map((food) => `<li>${food.name}</li>`).join('');
    return display;
  }

  static displayDrinks(drinks) {
    const display = drinks.map((drink) => `<li>${drink.name}</li>`).join('');
    return display;
  }

  displayCategory() {
    const listCategories = this.data.categories;
    const categoryContainer = document.querySelector('.detail__category');
    categoryContainer.innerHTML = '';
    const categoryNames = listCategories.map((category) => category.name);
    const categoryString = categoryNames.join(', ');
    const categorySpan = document.createElement('span');
    categorySpan.textContent = categoryString;
    categoryContainer.appendChild(categorySpan);
  }

  displayUlasan() {
    const ulasanContainer = document.querySelector('.ulasan__data');
    const list = this.data.customerReviews;
    list.forEach((ulasan) => {
      const ulasanList = document.createElement('customer-reviews');
      ulasanList.data = ulasan;
      ulasanContainer.appendChild(ulasanList);
    });
  }

  render() {
    this._emptyContent();
    this.innerHTML = `
     <div class="detail">
          <div class="detail__img">
            <img class="lazyload"
              data-src="${`${CONFIG.SMALL_IMAGE_URL}/${this.data.pictureId}`}" alt="${this.data.name}"
            />
          </div>
          <div class="detail__body">
            <div class="detail__title"><h2>${this.data.name}</h2></div>
            <div class="detail__rating">
              <p>${this.data.rating}</p>
              <div>
                ${detailResto.displayRating(this.data.rating)}
              </div>
            </div>
            <div class="detail__address"><p>${this.data.address}, ${this.data.city}</p></div>
            <div class="detail__category"></div>
            <div class="detail__description">
              <p>
                ${this.data.description}
              </p>
            </div>
          </div>
          <div class="detail__menu">
            <div class="detail__food">
              <div><h3>Foods</h3></div>
              <ol>
               ${detailResto.displayFoods(this.data.menus.foods)}
              </ol>
            </div>
            <div class="detail__drink">
              <div><h3>Drinks</h3></div>
              <ol>
                ${detailResto.displayDrinks(this.data.menus.drinks)}
              </ol>
            </div>
          </div>
        </div>
        <div id="ulasan" class="ulasan">
          <form>
          <div class="alert-error">Name and Review cannot be empty.</div>
            <div class="form__ulasan">
              <h2>Masukkan Ulasan Anda</h2>
              <div class="form__control">
                <label for="name">Name</label>
                <input
                  type="text"
                  placeholder="Input Your Name"
                  name="name"
                  id="name"
                  class="form__input"
                />
              </div>
              <div class="form__control">
                <label for="review">Review</label>
                <textarea name="review" id="review" class="form__input"></textarea>
              </div>
               <button class="form__submit" type="submit">Submit</button>
            </div>
          </form>
          <div class="ulasan__body">
            <div class="ulasan__title"><h2>Ulasan</h2></div>
             <div class="ulasan__data"></div>
          </div>
        </div>
    `;
    this.displayCategory();
    this.displayUlasan();
    const loading = document.querySelector('#loading');
    const showloading = () => {
      loading.style.display = 'block';
    };
    const hideloading = () => {
      loading.style.display = 'none';
    };
    const formElement = document.querySelector('form');
    formElement.addEventListener('submit', async (event) => {
      event.preventDefault();
      try {
        showloading();
        const nameInput = formElement.querySelector('#name');
        const reviewInput = formElement.querySelector('#review');
        const errorStateForm = document.querySelector('.alert-error');
        errorStateForm.classList.remove('show');
        if (nameInput.value.trim() !== '' && reviewInput.value.trim() !== '') {
          const ulasan = {
            name: nameInput.value.trim(),
            review: reviewInput.value.trim(),
            id: this.data.id,
          };
          nameInput.value = '';
          reviewInput.value = '';

          const result = await RestaurantDbSource.addFeedback(ulasan);
          const ulasanContainer = document.querySelector('.ulasan__data');
          const detailresto = document.querySelector('detail-resto');
          ulasanContainer.innerHTML = '';
          const list = result.customerReviews;
          detailresto.setCustomerReviews(list);
          list.forEach((ulasanData) => {
            const ulasanList = document.createElement('customer-reviews');
            ulasanList.data = ulasanData;
            ulasanContainer.appendChild(ulasanList);
          });
          // eslint-disable-next-line no-alert
          alert('Berhasil Menambahkan Data');
        } else {
          errorStateForm.classList.add('show');
        }
      } catch (error) {
        showloading();
        // eslint-disable-next-line no-alert
        alert(error.message);
      } finally {
        hideloading();
      }
    });
  }
}

customElements.define('detail-resto', detailResto);
