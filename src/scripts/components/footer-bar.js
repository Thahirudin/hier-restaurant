class footerBar extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer>
      <p><span>Copyright &copy; 2024</span> - Hier Restaurant</p>
    </footer>
    `;
  }
}

customElements.define('footer-bar', footerBar);
