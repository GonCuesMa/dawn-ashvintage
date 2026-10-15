/*
 * AshVintage: comportamiento del menú principal en escritorio.
 * - Abre el desplegable/mega menú al pasar el ratón y lo cierra con una pequeña espera.
 * - Alinea la tarjeta con el título de la entrada de menú (la primera columna queda justo bajo "Tienda").
 * - Con ratón, pinchar el titular padre navega a su enlace (data-href).
 * En táctil o en pantallas estrechas no hace nada: se mantiene el comportamiento de Dawn.
 */
(function () {
  var desktop = window.matchMedia('(min-width: 990px) and (hover: hover)');
  var CLOSE_DELAY = 220;
  var VIEWPORT_MARGIN = 16;

  function alignContent(details) {
    var content = details.querySelector('.mega-menu__content');
    var summary = details.querySelector('summary');
    if (!content || !summary || !content.offsetParent) return;

    var parentLeft = content.offsetParent.getBoundingClientRect().left;
    var summaryRect = summary.getBoundingClientRect();
    var summaryPad = parseFloat(getComputedStyle(summary).paddingLeft) || 0;
    var contentPad = parseFloat(getComputedStyle(content).paddingLeft) || 0;

    // El texto de la primera columna queda alineado con el texto de la entrada de menú
    var left = summaryRect.left + summaryPad - contentPad - parentLeft;
    var min = VIEWPORT_MARGIN - parentLeft;
    var max = window.innerWidth - VIEWPORT_MARGIN - content.offsetWidth - parentLeft;
    left = Math.max(min, Math.min(left, Math.max(max, min)));

    content.style.setProperty('--mega-left', left + 'px');
  }

  function init() {
    var items = document.querySelectorAll('.header__inline-menu details');
    items.forEach(function (details) {
      var timer;

      details.addEventListener('toggle', function () {
        if (details.open && details.querySelector('.mega-menu__content')) alignContent(details);
      });

      details.addEventListener('mouseenter', function () {
        if (!desktop.matches) return;
        clearTimeout(timer);
        items.forEach(function (other) {
          if (other !== details && other.open) other.open = false;
        });
        if (!details.open) details.open = true;
      });

      details.addEventListener('mouseleave', function () {
        if (!desktop.matches) return;
        timer = setTimeout(function () {
          details.open = false;
        }, CLOSE_DELAY);
      });

      // Con el ratón, un clic sobre una entrada ya abierta por hover no debe cerrarla
      var summary = details.querySelector('summary');
      if (summary) {
        summary.addEventListener('click', function (event) {
          if (!desktop.matches) return;
          // Con ratón, pinchar el titular padre lleva a su página (si el menú le asigna enlace)
          var href = summary.getAttribute('data-href');
          if (href) {
            event.preventDefault();
            window.location.href = href;
            return;
          }
          if (details.open) event.preventDefault();
        });
      }
    });

    window.addEventListener('resize', function () {
      document.querySelectorAll('.header__inline-menu details[open]').forEach(alignContent);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
