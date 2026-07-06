/* ============================================================
   MODAL.JS — modal genérico reutilizável
   Uso: Modal.abrir('<html interno>') / Modal.fechar()
   ============================================================ */

const Modal = (() => {
  function abrir(htmlInterno){
    const overlay = document.getElementById('modal-overlay');
    const conteudo = document.getElementById('modal-conteudo');
    conteudo.style.position = 'relative';
    conteudo.innerHTML = htmlInterno;
    overlay.classList.add('aberto');
  }
  function fechar(){
    document.getElementById('modal-overlay').classList.remove('aberto');
  }
  function init(){
    const overlay = document.getElementById('modal-overlay');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('[data-fechar]')) fechar();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
  }
  return { abrir, fechar, init };
})();
