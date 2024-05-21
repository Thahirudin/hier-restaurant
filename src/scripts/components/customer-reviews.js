class customerReviews extends HTMLElement {
  constructor() {
    super();
    this.data = [];
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  setData(data) {
    this.data = data;
    this.render();
  }

  render() {
    this._emptyContent();
    this.innerHTML = `
        <div class="ulasan__list">
          <div class="ulasan__head">
            <div class="ulasan__name">
              <h3>${this.data.name}</h3>
            </div>
            <div class="ulasan__date">${this.data.date}</div>
          </div>
          <div class="ulasan__review">
            <p>
             ${this.data.review}
            </p>
          </div>
        </div>
    `;
  }
}

customElements.define('customer-reviews', customerReviews);
