const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const btnsFiltro = document.querySelectorAll('.btn-filter');
const cardsDestinos = document.querySelectorAll('.card-item');

btnsFiltro.forEach(btn => {
  btn.addEventListener('click', () => {
    btnsFiltro.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtro = btn.dataset.filter;

    cardsDestinos.forEach(card => {
      const categoria = card.dataset.categoria;
      const mostrar = filtro === 'todos' || categoria === filtro;

      card.style.transition = 'opacity 0.3s, transform 0.3s';

      if (mostrar) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

const fadeEls = document.querySelectorAll(
  '.dest-card, .pkg-card, .stat-box, .section-title, .contact-card'
);

fadeEls.forEach(el => el.classList.add('anim-fade'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('anim-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

const btnContato = document.querySelector('.btn-contact');
if (btnContato) {
  btnContato.addEventListener('click', () => {
    btnContato.textContent = '✓ Mensagem enviada!';
    btnContato.style.background = '#1a6b3a';
    setTimeout(() => {
      btnContato.innerHTML = 'Enviar Mensagem <i class="bi bi-send ms-2"></i>';
      btnContato.style.background = '';
    }, 3000);
  });
}