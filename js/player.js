/* ============================================================
   PLAYER.JS — player de música (arquivos em /music, listados em config.js)
   ============================================================ */

const Player = (() => {
  let audio, faixaAtual = 0, tocando = false;

  function formatarTempo(segundos){
    if (!isFinite(segundos)) return '0:00';
    const m = Math.floor(segundos / 60);
    const s = Math.floor(segundos % 60).toString().padStart(2,'0');
    return `${m}:${s}`;
  }

  function renderLista(){
    const ul = document.getElementById('lista-playlist');
    const lista = CONFIG.playlist;
    if (!lista.length){
      ul.innerHTML = `<div class="estado-vazio">Nenhuma música ainda. Coloque arquivos em <code>/music</code> e liste-os em <code>js/config.js</code> (array <code>playlist</code>).</div>`;
      return;
    }
    ul.innerHTML = lista.map((m, i) => `
      <li class="item-playlist ${i === faixaAtual ? 'tocando' : ''}" data-indice="${i}">
        <span class="item-playlist-num">${String(i+1).padStart(2,'0')}</span>
        <div class="item-playlist-info"><b>${m.titulo}</b><span>${m.artista || ''}</span></div>
        <span>${i === faixaAtual && tocando ? '♪' : ''}</span>
      </li>
    `).join('');

    ul.querySelectorAll('.item-playlist').forEach(li => {
      li.addEventListener('click', () => carregarFaixa(Number(li.dataset.indice), true));
    });
  }

  function carregarFaixa(indice, autoPlay){
    const lista = CONFIG.playlist;
    if (!lista.length) return;
    faixaAtual = (indice + lista.length) % lista.length;
    const musica = lista[faixaAtual];

    audio.src = `music/${musica.arquivo}`;
    document.getElementById('player-titulo').textContent = musica.titulo;
    document.getElementById('player-artista').textContent = musica.artista || '';
    renderLista();

    if (autoPlay) tocarPausar(true);
  }

  function tocarPausar(forcarTocar){
    const lista = CONFIG.playlist;
    if (!lista.length) return;
    const deveTocar = forcarTocar !== undefined ? forcarTocar : audio.paused;

    if (deveTocar){
      audio.play().catch(()=>{});
      tocando = true;
    } else {
      audio.pause();
      tocando = false;
    }
    document.getElementById('player-play').textContent = tocando ? '⏸' : '▶';
    renderLista();
  }

  function init(){
    audio = document.getElementById('audio-player');
    audio.volume = 0.7;

    if (CONFIG.playlist.length) carregarFaixa(0, false);

    document.getElementById('player-play').addEventListener('click', () => tocarPausar());
    document.getElementById('player-proxima').addEventListener('click', () => carregarFaixa(faixaAtual + 1, tocando));
    document.getElementById('player-anterior').addEventListener('click', () => carregarFaixa(faixaAtual - 1, tocando));

    audio.addEventListener('ended', () => carregarFaixa(faixaAtual + 1, true));

    audio.addEventListener('timeupdate', () => {
      const barra = document.getElementById('player-barra');
      if (audio.duration){
        barra.value = (audio.currentTime / audio.duration) * 100;
        document.getElementById('player-tempo-atual').textContent = formatarTempo(audio.currentTime);
        document.getElementById('player-tempo-total').textContent = formatarTempo(audio.duration);
      }
    });

    document.getElementById('player-barra').addEventListener('input', (e) => {
      if (audio.duration) audio.currentTime = (e.target.value / 100) * audio.duration;
    });

    document.getElementById('player-volume').addEventListener('input', (e) => {
      audio.volume = Number(e.target.value);
    });

    renderLista();
  }

  return { init, tocarPausar };
})();
