// moomedia – menu, lightbox, project filters, headline rotator
(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  document.querySelectorAll('.sub-toggle').forEach(function (b) {
    b.addEventListener('click', function () {
      var li = b.parentElement;
      var open = li.classList.toggle('open');
      b.setAttribute('aria-expanded', open);
    });
  });

  // Lightbox for images and videos
  var lb = document.querySelector('.lightbox');
  var inner = lb && lb.querySelector('.lb-inner');
  var cap = lb && lb.querySelector('.lb-caption');
  var lastFocus = null;
  function close() {
    lb.hidden = true; inner.innerHTML = ''; document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('[data-video],[data-image]');
    if (!t || !lb) return;
    ev.preventDefault();
    lastFocus = t;
    if (t.dataset.video) {
      inner.innerHTML = '<div class="video"><iframe src="' + t.dataset.video + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + (t.dataset.title || 'Video') + '"></iframe></div>';
    } else {
      inner.innerHTML = '<img src="' + t.dataset.image + '" alt="' + (t.dataset.title || '') + '">';
    }
    cap.textContent = t.dataset.title || '';
    lb.hidden = false; document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  });
  if (lb) {
    lb.addEventListener('click', function (ev) { if (ev.target === lb || ev.target.classList.contains('lb-close')) close(); });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !lb.hidden) close(); });
  }

  // Work page filters
  var filters = document.querySelector('.filters');
  if (filters) {
    filters.addEventListener('click', function (ev) {
      var b = ev.target.closest('button'); if (!b) return;
      filters.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
      var f = b.dataset.filter;
      document.querySelectorAll('#work-grid .project').forEach(function (c) {
        c.classList.toggle('hide', f !== '*' && c.dataset.cat !== f);
      });
    });
  }

  // Rotating hero headline
  var rot = document.querySelector('.rotator');
  if (rot && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var words = rot.dataset.words.split('|'), i = 0;
    setInterval(function () {
      rot.classList.add('fade');
      setTimeout(function () { i = (i + 1) % words.length; rot.textContent = words[i]; rot.classList.remove('fade'); }, 350);
    }, 3200);
  }
  // Contact form: send via Web3Forms, then go to the thank-you page
  var form = document.querySelector('.contact-form');
  if (form && window.fetch) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var status = form.querySelector('.form-status');
      btn.disabled = true; btn.textContent = 'Sending…'; if (status) status.textContent = '';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data && data.success) { window.location.href = '/thank-you/'; return; }
          throw new Error((data && data.message) || 'Send failed');
        })
        .catch(function () {
          btn.disabled = false; btn.textContent = 'Send message';
          if (status) status.innerHTML = 'Sorry, your message didn\u2019t send. Please try again, or call us on <a href="tel:+61352298647">(03) 5229 8647</a>.';
        });
    });
  }
})();
