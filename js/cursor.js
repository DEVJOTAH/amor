/* ============================================================
   CURSOR.JS — cursor customizado (ponto + anel com atraso elástico)
   Desativado automaticamente em telas touch via CSS (@media hover:none)
   ============================================================ */

(function initCursor(){
  const ponto = document.getElementById('cursor-ponto');
  const anel = document.getElementById('cursor-anel');
  if (!ponto || !anel) return;

  let mx = 0, my = 0;       // posição real do mouse
  let ax = 0, ay = 0;       // posição (com atraso) do anel

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    ponto.style.left = mx + 'px';
    ponto.style.top = my + 'px';
  });

  function animar(){
    // interpolação suave (easing) para o anel "perseguir" o ponto
    ax += (mx - ax) * 0.18;
    ay += (my - ay) * 0.18;
    anel.style.left = ax + 'px';
    anel.style.top = ay + 'px';
    requestAnimationFrame(animar);
  }
  animar();

  // Destaca o cursor ao passar sobre elementos clicáveis
  const seletorInterativo = 'button, a, input, [data-ir-para], .foto-carta, .cartao-carta, .item-playlist';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(seletorInterativo)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(seletorInterativo)) document.body.classList.remove('cursor-hover');
  });
})();
