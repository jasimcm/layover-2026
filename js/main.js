(function () {
  // Scroll-in reveal for elements marked [data-reveal] (currently just the ticket).
  try {
    var mq = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (mq.matches && 'IntersectionObserver' in window) {
      var els = document.querySelectorAll('[data-reveal]');
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('reveal'); obs.unobserve(e.target); }
        });
      }, { threshold: .15 });
      els.forEach(function (el) { obs.observe(el); });
    } else {
      document.querySelectorAll('[data-reveal]').forEach(function (el) { el.classList.add('reveal'); });
    }
  } catch (e) {}

  // The "cool flight" fun element: tap/click/Enter on the hero plane doodle
  // sends it looping across the screen (CSS handles the actual path via
  // vw/vh, so it scales the same way on phones and desktops). Purely
  // decorative, so it fails silently and is a no-op under reduced motion.
  try {
    var plane = document.querySelector('.plane-doodle');
    if (!plane) return;
    var inner = plane.querySelector('.plane-inner') || plane;
    var FLY_MS = 2400;
    var flyTimer = null;

    function flyLoop() {
      plane.classList.remove('flying');
      inner.classList.remove('flying');
      void inner.offsetWidth; // force reflow so the animation can restart
      plane.classList.add('flying');
      inner.classList.add('flying');
      window.clearTimeout(flyTimer);
      flyTimer = window.setTimeout(function () {
        plane.classList.remove('flying');
        inner.classList.remove('flying');
      }, FLY_MS);
    }

    plane.addEventListener('click', flyLoop);
    plane.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flyLoop(); }
    });
  } catch (e) {}
})();
