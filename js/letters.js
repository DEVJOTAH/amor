/* ============================================================
   LETTERS.JS — cartinhas românticas criadas pelo navegador
   Persistência via localStorage (funciona sem servidor/backend)
   ============================================================ */

const Cartas = (() => {
  const CHAVE = 'nos_cartas';

  function carregarTodas(){
    const salvas = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    if (salvas) return salvas;
    // Primeira vez: usa as cartas iniciais do config.js, se existirem
    const iniciais = (CONFIG.cartasIniciais || []).map((c,i) => ({ id: 'c'+i, ...c, favorita:false }));
    salvarTodas(iniciais);
    return iniciais;
  }
  function salvarTodas(lista){ localStorage.setItem(CHAVE, JSON.stringify(lista)); }

  function render(){
    const grade = document.getElementById('grade-cartas');
    const cartas = carregarTodas();

    if (!cartas.length){
      grade.innerHTML = `<div class="estado-vazio">Nenhuma carta ainda. Clique em "Escrever nova carta" para começar.</div>`;
      return;
    }

    // Favoritas primeiro
    const ordenadas = [...cartas].sort((a,b) => (b.favorita?1:0) - (a.favorita?1:0));

    grade.innerHTML = ordenadas.map(c => `
      <div class="cartao-carta glass" data-id="${c.id}">
        <button class="fav-carta botao-icone" data-acao="favoritar" title="Favoritar">${c.favorita ? '💖' : '🤍'}</button>
        <h4>${c.titulo}</h4>
        <p>${c.texto}</p>
        <span class="data-carta">${new Date(c.data).toLocaleDateString('pt-BR')}</span>
      </div>
    `).join('');

    grade.querySelectorAll('.cartao-carta').forEach(cartao => {
      cartao.addEventListener('click', (e) => {
        const id = cartao.dataset.id;
        if (e.target.closest('[data-acao="favoritar"]')){
          e.stopPropagation();
          alternarFavorita(id);
          return;
        }
        abrirLeitura(id);
      });
    });
  }

  function alternarFavorita(id){
    const cartas = carregarTodas();
    const c = cartas.find(x => x.id === id);
    if (c){ c.favorita = !c.favorita; salvarTodas(cartas); render(); }
  }

  function abrirLeitura(id){
    const carta = carregarTodas().find(x => x.id === id);
    if (!carta) return;

    Modal.abrir(`
      <button class="modal-fechar" data-fechar>✕</button>
      <h3>${carta.titulo}</h3>
      <div class="modal-leitura" id="texto-digitando"></div>
      <div style="margin-top:1.4rem; display:flex; gap:.6rem;">
        <button class="botao-fantasma" id="btn-excluir-carta" data-id="${id}">Excluir carta</button>
      </div>
    `);

    // Efeito de digitação
    const alvo = document.getElementById('texto-digitando');
    let i = 0;
    const texto = carta.texto;
    alvo.textContent = '';
    const digitando = setInterval(() => {
      alvo.textContent += texto[i] || '';
      i++;
      if (i >= texto.length) clearInterval(digitando);
    }, 22);

    document.getElementById('btn-excluir-carta').addEventListener('click', () => {
      const restantes = carregarTodas().filter(x => x.id !== id);
      salvarTodas(restantes);
      Modal.fechar();
      render();
      Notificar.mostrar('Carta excluída.', 'info');
    });
  }

  function abrirCriacao(){
    Modal.abrir(`
      <button class="modal-fechar" data-fechar>✕</button>
      <h3>Nova cartinha</h3>
      <input type="text" id="input-titulo-carta" placeholder="Título da carta" maxlength="60">
      <textarea id="input-texto-carta" placeholder="Escreva o que está sentindo..."></textarea>
      <button class="botao-primario" id="btn-salvar-carta">Guardar carta</button>
    `);

    document.getElementById('btn-salvar-carta').addEventListener('click', () => {
      const titulo = document.getElementById('input-titulo-carta').value.trim();
      const texto = document.getElementById('input-texto-carta').value.trim();
      if (!titulo || !texto){
        Notificar.mostrar('Escreva um título e um texto antes de guardar.', 'erro');
        return;
      }
      const cartas = carregarTodas();
      cartas.push({ id: 'c' + Date.now(), titulo, texto, data: new Date().toISOString(), favorita:false });
      salvarTodas(cartas);
      Modal.fechar();
      render();
      Notificar.mostrar('Carta guardada com carinho 💌', 'sucesso');
    });
  }

  function init(){
    render();
    document.getElementById('btn-nova-carta').addEventListener('click', abrirCriacao);
  }

  return { init };
})();
