

const btnEnviar = document.getElementById('btnEnviar');

function validarEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarCampo(campo) {
  if (!campo.value.trim()) {
    campo.classList.add('is-invalid');
    campo.classList.remove('is-valid');
    return false;
  }

  if (campo.id === 'inputEmail' && !validarEmail(campo.value)) {
    campo.classList.add('is-invalid');
    campo.classList.remove('is-valid');
    return false;
  }

  campo.classList.remove('is-invalid');
  campo.classList.add('is-valid');
  return true;
}

['inputNome', 'inputEmail', 'inputDestino', 'inputMensagem'].forEach(id => {
  const campo = document.getElementById(id);
  if (!campo) return;

  campo.addEventListener('input', () => validarCampo(campo));
  campo.addEventListener('blur', () => validarCampo(campo)); // ao sair do campo
});

if (btnEnviar) {
  btnEnviar.addEventListener('click', () => {
    const nome     = document.getElementById('inputNome');
    const email    = document.getElementById('inputEmail');
    const destino  = document.getElementById('inputDestino');
    const mensagem = document.getElementById('inputMensagem');

    const tudo_ok = [nome, email, destino, mensagem].every(validarCampo);

    if (!tudo_ok) return;

    btnEnviar.innerHTML = '✓ Mensagem enviada!';
    btnEnviar.style.background = '#1a6b3a';

    setTimeout(() => {
      [nome, email, destino, mensagem].forEach(c => {
        c.value = '';
        c.classList.remove('is-valid', 'is-invalid');
      });
      btnEnviar.innerHTML = 'Enviar Mensagem <i class="bi bi-send ms-2"></i>';
      btnEnviar.style.background = '';
    }, 3000);
  });
}
