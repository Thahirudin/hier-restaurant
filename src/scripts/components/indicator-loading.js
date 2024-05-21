class IndicatorLoading extends HTMLElement {
  _shadowRoot = null;

  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
    #loading{
      dispaly : none;
    }
      @keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#loadingIndicator {
  position: fixed;
  top: 50%;
  left: 50%;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
      <div id="loadingIndicator"></div>
    `;
  }
}
customElements.define('indicator-loading', IndicatorLoading);
