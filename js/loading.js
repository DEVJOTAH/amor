/* ============================================================
   LOADING.JS — tela de carregamento personalizada
   ============================================================ */

const TelaCarregamento = (() => {
  function iniciar(aoTerminar){
    const tela = document.getElementById('tela-carregamento');
    const barra = document.getElementById('barra-preenchimento');
    let progresso = 0;

    const intervalo = setInterval(() => {
      // avanço "orgânico": mais rápido no começo, desacelera perto do fim
      progresso += (100 - progresso) * 0.12 + 1;
      if (progresso >= 100){
        progresso = 100;
        clearInterval(intervalo);
        barra.style.width = '100%';
        setTimeout(() => {
          tela.classList.add('escondida');
          if (typeof aoTerminar === 'function') aoTerminar();
        }, 350);
        return;
      }
      barra.style.width = progresso + '%';
    }, 90);
  }
  return { iniciar };
})();
