/*
 * AshVintage: aparición suave de las secciones de la Home al hacer scroll.
 * Solo se ejecuta en la Home, respeta "reducir movimiento" y no actúa en el editor de temas.
 * Lo que ya está visible al cargar no se anima; si el script fallara, nada queda oculto
 * (los elementos solo se ocultan cuando este script los marca).
 */
(function () {
  if (document.documentElement.dataset.template !== 'index') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.Shopify && window.Shopify.designMode) return;
  if (!('IntersectionObserver' in window)) return;

  var HEADINGS = '.title-wrapper-with-link, .shop-by-model__header, .trust-guarantee__heading, .kilo-packs__header';
  var ITEMS = '.shop-by-model__list > li, .trust-guarantee__list > li, .kilo-packs__list > li, .product-grid > li, .collection-list > li';
  var COLUMNS = 4;

  function init() {
    var targets = Array.prototype.slice.call(document.querySelectorAll(HEADINGS + ', ' + ITEMS));
    var viewportBottom = window.innerHeight;

    var pending = targets.filter(function (el) {
      // Dawn ya anima los elementos con .scroll-trigger; no los duplicamos
      if (el.closest('.scroll-trigger')) return false;
      return el.getBoundingClientRect().top > viewportBottom;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );

    pending.forEach(function (el) {
      var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--ash-delay', (siblings % COLUMNS) * 110 + 'ms');
      el.setAttribute('data-ash-reveal', '');
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
