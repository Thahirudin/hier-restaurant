class ModalSection extends HTMLElement {
  _emptyContent() {
    this.innerHTML = '';
  }

  set dataSet(data) {
    this._data = data;
    this._state = true;
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

  connectedCallback() {
    this.render();
    const closeButton = this.querySelector('.modal-close');
    closeButton.addEventListener('click', () => {
      this.remove();
    });
  }

  render() {
    this.innerHTML = `
        <section id="modal" tabindex="1">
        <div class="modal-card">
          <div class="modal-header">
            <div class="modal-img">
              <img
                src="${this._data.pictureId}"
                alt="${this._data.name}"
              />
            </div>
            <div class="modal-city">${this._data.city}</div>
              <button class="modal-close" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
                  />
                </svg>
              </button>
          </div>
          <div class="modal-body">
            <div class="modal-title"><h3>${this._data.name}</h3></div>
            <div class="modal-rating">${this._data.rating} ${this.constructor.displayRating(this._data.rating)}</div>
            <div class="modal-description">
              <p>
                ${this._data.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('modal-section', ModalSection);
