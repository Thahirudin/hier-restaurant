class heroJumbotron extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <section id="hero">
        <div class="container">
          <div class="hero-content">
            <div class="content">
              <h2>Hier Restaurant</h2>
              <p>
                Selamat datang di Hier Restoran, tempat eksplorasi hierarki cita
                rasa dalam suasana mewah dengan menu beragam dan layanan
                berkualitas tinggi.
              </p>
            </div>
          </div>
          <picture>
        <source media="(max-width: 600px)" srcset="./images/heros/hero-image_1-small.jpg">
          <img data-src="./images/heros/hero-image_1-large.jpg" class="lazyload" alt="Hero background" />
      </picture>
        </div>
      </section>
        `;
  }
}
customElements.define('hero-jumbotron', heroJumbotron);
