(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* mobile menu */
  var btn = document.querySelector('.burger'), menu = document.getElementById('menu');
  function toggle(open) { btn.setAttribute('aria-expanded', open); menu.classList.toggle('open', open); }
  btn.addEventListener('click', function () { toggle(btn.getAttribute('aria-expanded') !== 'true'); });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') toggle(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });

  /* footer year */
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* scroll reveal (sections and cards) */
  var items = document.querySelectorAll('section.wrap:not(.hero) > h2, .card, .timeline li, .facts div');
  items.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  /* role typewriter */
  var roleEl = document.getElementById('role');
  if (roleEl && !reduce) {
    var roles = ['Odoo Developer & IT Support Engineer', 'Python & Blockchain Builder', 'Windows Server & Networking Learner'];
    var r = 0, c = roles[0].length, del = true;
    (function tick() {
      var word = roles[r];
      c += del ? -1 : 1;
      roleEl.textContent = word.slice(0, c);
      var wait = 55;
      if (!del && c === word.length) { del = true; wait = 1800; }
      else if (del && c === 0) { del = false; r = (r + 1) % roles.length; wait = 300; }
      setTimeout(tick, wait);
    })();
  }

  /* particle network background */
  var cv = document.getElementById('net');
  if (!cv || reduce || !cv.getContext) return;
  var ctx = cv.getContext('2d'), W, H, dpr, pts = [], mouse = { x: -999, y: -999 }, running = true;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    var n = Math.min(70, Math.floor(innerWidth * innerHeight / 22000));
    pts = [];
    for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35 * dpr, vy: (Math.random() - .5) * .35 * dpr });
  }
  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    var max = 130 * dpr;
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.fillStyle = 'rgba(77,225,255,.7)';
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.6 * dpr, 0, 6.283); ctx.fill();
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < max) { ctx.strokeStyle = 'rgba(155,140,255,' + (0.28 * (1 - d / max)) + ')'; ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
      var mx = p.x - mouse.x * dpr, my = p.y - mouse.y * dpr, md = Math.sqrt(mx * mx + my * my);
      if (md < 160 * dpr) { ctx.strokeStyle = 'rgba(77,225,255,' + (0.4 * (1 - md / (160 * dpr))) + ')'; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x * dpr, mouse.y * dpr); ctx.stroke(); }
    }
    requestAnimationFrame(frame);
  }
  addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  addEventListener('resize', size);
  document.addEventListener('visibilitychange', function () { running = !document.hidden; if (running) frame(); });
  size(); frame();
})();
