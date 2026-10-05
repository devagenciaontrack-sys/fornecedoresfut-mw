const groupLinks = document.querySelectorAll('.group-link');
const instagramLinks = document.querySelectorAll('.instagram-link');

function track(eventName) {
  if (typeof window.gtag === 'function') window.gtag('event', eventName);
  window.dispatchEvent(new CustomEvent(eventName));
}

groupLinks.forEach((link) => link.addEventListener('click', () => track('fornecedores_group_click')));
instagramLinks.forEach((link) => link.addEventListener('click', () => track('fornecedores_instagram_click')));

document.querySelectorAll('[data-video]').forEach((container) => {
  const button = container.querySelector('.video-cover');
  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/jcesguEg7XI?autoplay=1&rel=0';
    frame.title = 'Convite ao Grupo VIP da Fornecedores Fut';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    container.append(frame);
    button.remove();
    track('fornecedores_video_play');
  }, { once: true });
});
