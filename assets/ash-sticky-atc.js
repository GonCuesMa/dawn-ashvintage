/*
 * AshVintage: barra de compra fija (móvil) en la ficha de producto.
 * Aparece cuando el botón principal "Añadir al carrito" sale de pantalla por arriba.
 * No gestiona el carrito: al pulsar, activa el botón original, así que se conservan
 * variantes, validaciones y el aviso de carrito de Dawn. Refleja precio y estado del botón.
 */
(function () {
  if (customElements.get('sticky-atc')) return;

  customElements.define(
    'sticky-atc',
    class StickyAtc extends HTMLElement {
      connectedCallback() {
        var section = this.dataset.section;
        this.submit = document.getElementById('ProductSubmitButton-' + section);
        this.priceBox = document.getElementById('price-' + section);
        this.button = this.querySelector('[data-sticky-submit]');
        this.price = this.querySelector('[data-sticky-price]');
        if (!this.submit || !this.button) return;

        this.button.addEventListener('click', () => {
          if (!this.submit.disabled) this.submit.click();
        });

        var sync = this.sync.bind(this);
        this.observer = new MutationObserver(sync);
        this.observer.observe(this.submit, { attributes: true, childList: true, subtree: true, characterData: true });
        if (this.priceBox) this.observer.observe(this.priceBox, { childList: true, subtree: true, characterData: true });
        sync();

        this.visibility = new IntersectionObserver((entries) => {
          var entry = entries[0];
          this.toggle(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        });
        this.visibility.observe(this.submit);
      }

      disconnectedCallback() {
        if (this.observer) this.observer.disconnect();
        if (this.visibility) this.visibility.disconnect();
      }

      toggle(show) {
        this.classList.toggle('is-visible', show);
      }

      sync() {
        var label = this.submit.querySelector('span');
        this.button.textContent = ((label && label.textContent) || this.submit.textContent).trim();
        this.button.disabled = this.submit.disabled;

        if (this.price && this.priceBox) {
          var item =
            this.priceBox.querySelector('.price--on-sale .price-item--sale') ||
            this.priceBox.querySelector('.price-item--regular');
          this.price.textContent = item ? item.textContent.trim() : '';
        }
      }
    }
  );
})();
