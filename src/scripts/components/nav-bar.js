class navBar extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
             <nav>
        <div class="nav-head">
          <h1 class="brand">Hier Restaurant</h1>
          <a href="#mainContent" class="skipToContent">Skip To Content</a>
          <button id="hamburger"
            ><svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div class="nav-menu">
          <ul>
            <li><a href="#/home">Home</a></li>
            <li><a href="#/favorit">Favorite</a></li>
            <li><a href="https://www.linkedin.com/in/thahirudin/">About Us</a></li>
          </ul>
        </div>
      </nav>
        `;
  }
}

customElements.define('nav-bar', navBar);
