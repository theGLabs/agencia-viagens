/* =============================
   NAVBAR SCROLL
   ============================= */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* =============================
   DARK MODE
   ============================= */
const btnDarkMode   = document.getElementById('btnDarkMode');
const iconeDarkMode = document.getElementById('iconeDarkMode');
const textoDarkMode = document.getElementById('textoDarkMode');
const flashOverlay  = document.getElementById('flash-overlay');

if (localStorage.getItem('darkMode') === 'ativo') {
  document.body.classList.add('dark-mode');
  iconeDarkMode.className = 'bi bi-sun-fill';
  textoDarkMode.textContent = 'Claro';
}

btnDarkMode.addEventListener('click', () => {
  const viraDark = !document.body.classList.contains('dark-mode');

  // cor do flash: branco ao ligar escuro, preto ao voltar pro claro
  flashOverlay.style.background = viraDark ? '#ffffff' : '#000000';
  flashOverlay.style.animation  = 'none';
  flashOverlay.offsetHeight; // força reflow
  flashOverlay.style.animation  = 'flashAnim 0.35s ease-out forwards';

  // troca o tema no meio do flash (pico da opacidade)
  setTimeout(() => {
    document.body.classList.toggle('dark-mode', viraDark);
    if (viraDark) {
      iconeDarkMode.className   = 'bi bi-sun-fill';
      textoDarkMode.textContent = 'Claro';
      localStorage.setItem('darkMode', 'ativo');
    } else {
      iconeDarkMode.className   = 'bi bi-moon-fill';
      textoDarkMode.textContent = 'Escuro';
      localStorage.setItem('darkMode', 'inativo');
    }
  }, 90);
});

/* =============================
   FILTRO DE DESTINOS
   ============================= */
const btnsFiltro    = document.querySelectorAll('.btn-filter');
const cardsDestinos = document.querySelectorAll('.card-item');

btnsFiltro.forEach(btn => {
  btn.addEventListener('click', () => {
    btnsFiltro.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtro = btn.dataset.filter;

    cardsDestinos.forEach(card => {
      const categoria = card.dataset.categoria;
      const mostrar   = filtro === 'todos' || categoria === filtro;

      card.style.transition = 'opacity 0.3s, transform 0.3s';

      if (mostrar) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

/* =============================
   ANIMAÇÃO AO SCROLL
   ============================= */
const fadeEls = document.querySelectorAll(
  '.dest-card, .pkg-card, .stat-box, .section-title, .contact-card, .calc-card'
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

/* =============================
   CALCULADORA DE ORÇAMENTO
   ============================= */
const dadosDestinos = {
  noronha: { nome: 'Fernando de Noronha', hospDia: 650,  passagem: 1200, alimentacaoDia: 150 },
  chapada: { nome: 'Chapada Diamantina',  hospDia: 280,  passagem: 600,  alimentacaoDia: 100 },
  gramado: { nome: 'Gramado, RS',          hospDia: 380,  passagem: 700,  alimentacaoDia: 130 },
  paris:   { nome: 'Paris, França',        hospDia: 1200, passagem: 6500, alimentacaoDia: 400 },
  toquio:  { nome: 'Tóquio, Japão',        hospDia: 1100, passagem: 8000, alimentacaoDia: 350 },
  ny:      { nome: 'Nova York, EUA',       hospDia: 950,  passagem: 5500, alimentacaoDia: 320 },
};

const multiplicadorCategoria = {
  economico: 0.65,
  conforto:  1.0,
  luxo:      1.8,
};

document.getElementById('btnCalcular').addEventListener('click', () => {
  const destinoKey = document.getElementById('calcDestino').value;
  const pessoas    = parseInt(document.getElementById('calcPessoas').value) || 1;
  const dias       = parseInt(document.getElementById('calcDias').value)    || 1;
  const categoria  = document.getElementById('calcCategoria').value;

  if (!destinoKey) {
    document.getElementById('calcDestino').focus();
    document.getElementById('calcDestino').style.borderColor = '#dc3545';
    setTimeout(() => {
      document.getElementById('calcDestino').style.borderColor = '';
    }, 2000);
    return;
  }

  const dest  = dadosDestinos[destinoKey];
  const mult  = multiplicadorCategoria[categoria];

  const custoPassagem     = dest.passagem * pessoas * mult;
  const custoHospedagem   = dest.hospDia  * dias    * mult;
  const custoAlimentacao  = dest.alimentacaoDia * dias * pessoas * mult;
  const custoExtras       = (custoPassagem + custoHospedagem + custoAlimentacao) * 0.1;
  const total             = custoPassagem + custoHospedagem + custoAlimentacao + custoExtras;

  const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  document.getElementById('resTotal').textContent = fmt(total);
  document.getElementById('resBreakdown').innerHTML = `
    ✈️ Passagens (${pessoas} pessoa${pessoas > 1 ? 's' : ''}): <strong>${fmt(custoPassagem)}</strong><br>
    🏨 Hospedagem (${dias} dia${dias > 1 ? 's' : ''}): <strong>${fmt(custoHospedagem)}</strong><br>
    🍽️ Alimentação: <strong>${fmt(custoAlimentacao)}</strong><br>
    🎒 Extras (passeios, traslados): <strong>${fmt(custoExtras)}</strong>
  `;

  const resultado = document.getElementById('resultado-orcamento');
  resultado.style.display = 'block';
  resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
