/* Lizzy's African Restaurant — site behavior (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile navigation ---------- */
  var toggle = doc.querySelector('[data-nav-toggle]');
  var list = doc.getElementById('nav-list');
  var label = doc.querySelector('[data-nav-label]');
  function setNav(open) {
    if (!toggle || !list) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    list.classList.toggle('open', open);
    if (label) label.textContent = open ? 'Close menu' : 'Open menu';
  }
  if (toggle && list) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
    list.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 960) setNav(false);
    });
  }

  /* ---------- header shadow on scroll ---------- */
  var header = doc.querySelector('[data-header]');
  function onScrollHeader() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }

  /* ---------- open-now (America/New_York) ---------- */
  // [openHour, closeHour] in 24h; null = closed. Index 0 = Sunday.
  var HOURS = [[13, 20], null, [11, 20], [11, 20], [11, 20], [11, 20], [11, 20]];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function fmtHour(h) {
    var suffix = h >= 12 ? 'PM' : 'AM';
    var hh = h % 12 === 0 ? 12 : h % 12;
    return hh + ' ' + suffix;
  }
  function nyNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
      }).formatToParts(new Date());
      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });
      var dayIdx = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday);
      var hour = parseInt(map.hour, 10) % 24;
      return { day: dayIdx, mins: hour * 60 + parseInt(map.minute, 10) };
    } catch (err) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  function statusText() {
    var now = nyNow();
    var today = HOURS[now.day];
    if (today && now.mins >= today[0] * 60 && now.mins < today[1] * 60) {
      var left = today[1] * 60 - now.mins;
      return { state: 'open', text: (left <= 60 ? 'Open now, closing soon' : 'Open now') + ' · until ' + fmtHour(today[1]), day: now.day };
    }
    if (today && now.mins < today[0] * 60) {
      return { state: 'closed', text: 'Closed now · opens today at ' + fmtHour(today[0]), day: now.day };
    }
    for (var i = 1; i <= 7; i++) {
      var idx = (now.day + i) % 7;
      if (HOURS[idx]) {
        var when = i === 1 ? 'tomorrow' : DAYS[idx];
        return { state: 'closed', text: 'Closed now · opens ' + when + ' at ' + fmtHour(HOURS[idx][0]), day: now.day };
      }
    }
    return { state: 'closed', text: 'Closed now', day: now.day };
  }
  function renderStatus() {
    var s = statusText();
    doc.querySelectorAll('[data-open-status]').forEach(function (el) {
      el.setAttribute('data-state', s.state);
      var t = el.querySelector('[data-status-text]');
      if (t) t.textContent = s.text;
    });
    doc.querySelectorAll('[data-hours] tr').forEach(function (tr) {
      tr.classList.toggle('today', tr.getAttribute('data-day') === DAYS[s.day]);
    });
  }
  renderStatus();
  setInterval(renderStatus, 60000);

  /* ---------- reveal on scroll + kente weave ---------- */
  var targets = doc.querySelectorAll('.reveal, .kente');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- scroll-linked: hero plate turns, seal spins ---------- */
  var plate = doc.querySelector('[data-spin] img');
  var sealText = doc.querySelector('.seal text');
  var ticking = false;
  function onScrollMotion() {
    var y = window.scrollY;
    var vh = window.innerHeight;
    if (y < vh * 1.5) {
      if (plate) plate.style.transform = 'scale(1.06) rotate(' + (y * 0.045).toFixed(2) + 'deg)';
      if (sealText) sealText.style.transform = 'rotate(' + (y * -0.12).toFixed(2) + 'deg)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    onScrollHeader();
    if (!reduceMotion && !ticking) {
      ticking = true;
      window.requestAnimationFrame(onScrollMotion);
    }
  }, { passive: true });
  onScrollHeader();

  /* ---------- active chip on long pages ---------- */
  var chipLinks = doc.querySelectorAll('.chips a[href^="#"]');
  if (chipLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    chipLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var chipIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          chipLinks.forEach(function (a) { a.classList.remove('active'); });
          var a = byId[entry.target.id];
          if (a) {
            a.classList.add('active');
            var bar = a.closest('.chips');
            if (bar) {
              var left = a.offsetLeft - bar.clientWidth / 2 + a.clientWidth / 2;
              bar.scrollTo({ left: left, behavior: reduceMotion ? 'auto' : 'smooth' });
            }
          }
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(byId).forEach(function (id) {
      var sec = doc.getElementById(id);
      if (sec) chipIo.observe(sec);
    });
  }

  /* ---------- footer year ---------- */
  doc.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
