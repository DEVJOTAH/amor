/* ============================================================
   VIDEOS.JS — grade de vídeos (arquivos em /videos, listados em config.js)
   ============================================================ */

const Videos = (() => {
  function render(){
    const grade = document.getElementById('grade-videos');
    const lista = CONFIG.videos;

    if (!lista.length){
      grade.innerHTML = `<div class="estado-vazio">Nenhum vídeo ainda. Coloque arquivos em <code>/videos</code> e liste-os em <code>js/config.js</code> (array <code>videos</code>).</div>`;
      return;
    }

    grade.innerHTML = lista.map(v => `
      <div class="cartao-video">
        <video controls preload="metadata" src="videos/${v.arquivo}"></video>
        <div class="cartao-video-info">
          <h4>${v.titulo || v.arquivo}</h4>
          <span>${v.data || ''}</span>
        </div>
      </div>
    `).join('');
  }

  return { init: render };
})();
