(function () {
  // Eventos vão para o dataLayer (GTM) e, se existirem na página, para gtag, Meta Pixel e TikTok Pixel.
  window.dataLayer = window.dataLayer || [];
  function track(name, params) {
    params = params || {};
    window.dataLayer.push(Object.assign({ event: name }, params));
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', name, params);
    if (window.ttq && typeof window.ttq.track === 'function') window.ttq.track(name, params);
  }
  window.trackEvent = track;

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    // Enquanto o link real do Grupo VIP / Instagram não chega, o botão fica no lugar sem navegar.
    if ((el.hasAttribute('data-group') || el.hasAttribute('data-instagram')) && el.getAttribute('href') === '#') e.preventDefault();
    track(el.getAttribute('data-track'), { location: el.getAttribute('data-location') || '' });
  });

  // Vídeo leve: só carrega o player do YouTube no clique (sem autoplay com áudio ao abrir a página).
  function loadVideo(box) {
    var btn = box.querySelector('.video-poster');
    if (!btn) return;
    var id = box.getAttribute('data-video-id');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&playsinline=1&rel=0';
    iframe.title = btn.getAttribute('aria-label') || 'Vídeo';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    box.innerHTML = '';
    box.appendChild(iframe);
    track(box.getAttribute('data-track-play'), { video_id: id });
  }
  document.querySelectorAll('[data-video-id]').forEach(function (box) {
    var btn = box.querySelector('.video-poster');
    if (btn) btn.addEventListener('click', function () { loadVideo(box); }, { once: true });
  });

  // "Entenda em menos de um minuto": leva até o vídeo do topo e começa a tocar.
  document.querySelectorAll('[data-play-video]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var box = document.getElementById('video');
      if (!box) return;
      e.preventDefault();
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (box.querySelector('.video-poster')) loadVideo(box);
    });
  });
})();
