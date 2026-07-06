/* ============================================================
   GALLERY.JS — pilha de fotografias
   ------------------------------------------------------------
   Lê a lista de arquivos em CONFIG.galeria (pasta /Galeria).
   A foto do topo fica visível; ao clicar, ela desliza para fora
   e a próxima assume o topo. Ao chegar na última, recomeça —
   um ciclo infinito, como folhear um álbum de verdade.
   ============================================================ */

const Galeria = (() => {
  const CHAVE_FAVORITOS = 'nos_favoritos_fotos';
  let ordemAtual = [];      // índices na ordem de exibição
  let indiceTopo = 0;       // posição (na ordemAtual) que está no topo agora

  function carregarFavoritos(){
    return JSON.parse(localStorage.getItem(CHAVE_FAVORITOS) || '[]');
  }
  function salvarFavoritos(lista){
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(lista));
  }
  function alternarFavorito(arquivo){
    const favs = carregarFavoritos();
    const idx = favs.indexOf(arquivo);
    if (idx >= 0) favs.splice(idx,1); else favs.push(arquivo);
    salvarFavoritos(favs);
    return favs.includes(arquivo);
  }

  function montarPilhaDOM(){
    const container = document.getElementById('pilha-fotos');
    const fotos = CONFIG.galeria;

    document.getElementById('galeria-contador').textContent = fotos.length;

    if (!fotos.length){
      container.innerHTML = `
        <div class="pilha-vazia" id="pilha-vazia">
          <p>Nenhuma foto ainda.</p>
          <p class="pilha-vazia-dica">Coloque imagens na pasta <code>/Galeria</code> e adicione o nome do arquivo em <code>js/config.js</code>.</p>
        </div>`;
      return;
    }

    ordemAtual = fotos.map((_, i) => i);
    indiceTopo = 0;
    container.innerHTML = '';

    // Renderiza até 5 cartas por vez (topo + algumas "atrás", por performance)
    renderizarVisiveis();
  }

  function renderizarVisiveis(){
    const container = document.getElementById('pilha-fotos');
    const fotos = CONFIG.galeria;
    const favoritos = carregarFavoritos();
    container.innerHTML = '';

    const visiveisMax = Math.min(4, fotos.length);
    for (let camada = visiveisMax - 1; camada >= 0; camada--){
      const posOrdem = (indiceTopo + camada) % ordemAtual.length;
      const idxFoto = ordemAtual[posOrdem];
      const arquivo = fotos[idxFoto];
      const ehTopo = camada === 0;

      const carta = document.createElement('div');
      carta.className = 'foto-carta';
      carta.style.transform = `translateY(${camada * 10}px) scale(${1 - camada * 0.035}) rotate(${camada === 0 ? 0 : (camada % 2 === 0 ? 1 : -1) * camada}deg)`;
      carta.style.zIndex = String(visiveisMax - camada);
      carta.dataset.arquivo = arquivo;

      const ehFavorita = favoritos.includes(arquivo);
      carta.innerHTML = `
        <img src="Galeria/${arquivo}" alt="Foto do casal" loading="lazy">
        ${ehTopo ? `<button class="foto-favorito" title="Favoritar">${ehFavorita ? '💖' : '🤍'}</button>` : ''}
      `;

      if (ehTopo){
        carta.addEventListener('click', (e) => {
          if (e.target.closest('.foto-favorito')){
            e.stopPropagation();
            const agora = alternarFavorito(arquivo);
            e.target.closest('.foto-favorito').textContent = agora ? '💖' : '🤍';
            return;
          }
          passarProximaFoto(carta);
        });
      }

      container.appendChild(carta);
    }
  }

  function passarProximaFoto(cartaTopo){
    cartaTopo.classList.add('saindo');
    Sons.suave();
    setTimeout(() => {
      indiceTopo = (indiceTopo + 1) % ordemAtual.length; // ciclo infinito
      renderizarVisiveis();
    }, 380);
  }

  function init(){
    montarPilhaDOM();
  }

  return { init };
})();
