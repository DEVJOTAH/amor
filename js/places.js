/* ============================================================
   PLACES.JS — lugares que o casal quer conhecer
   ============================================================ */

const Lugares = (() => {
  const CHAVE = 'nos_lugares';

  function carregar(){
    const salvos = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    if (salvos) return salvos;
    const iniciais = (CONFIG.lugaresIniciais || []).map((l,i) => ({ id:'l'+i, ...l }));
    salvar(iniciais);
    return iniciais;
  }
  function salvar(lista){ localStorage.setItem(CHAVE, JSON.stringify(lista)); }

  function render(){
    const ul = document.getElementById('lista-lugares');
    const lugares = carregar();
    if (!lugares.length){
      ul.innerHTML = `<div class="estado-vazio">Nenhum destino ainda. Adicione o primeiro lugar dos sonhos ✦</div>`;
      return;
    }
    ul.innerHTML = lugares.map(l => `
      <li class="item-lugar" data-id="${l.id}">
        <input type="checkbox" ${l.visitado ? 'checked' : ''} data-acao="visitar">
        <span class="texto-lugar" style="${l.visitado ? 'text-decoration:line-through;color:var(--texto-3)' : ''}">${l.nome}</span>
        <button class="btn-remover" data-acao="remover" title="Remover">✕</button>
      </li>
    `).join('');

    ul.querySelectorAll('.item-lugar').forEach(li => {
      const id = li.dataset.id;
      li.querySelector('[data-acao="visitar"]').addEventListener('change', (e) => {
        const lugares = carregar();
        const l = lugares.find(x => x.id === id);
        l.visitado = e.target.checked;
        salvar(lugares);
        render();
        if (l.visitado) Notificar.mostrar('Mais um lugar riscado do mapa! 🗺️', 'sucesso');
      });
      li.querySelector('[data-acao="remover"]').addEventListener('click', () => {
        salvar(carregar().filter(x => x.id !== id));
        render();
      });
    });
  }

  function init(){
    render();
    document.getElementById('form-novo-lugar').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('input-novo-lugar');
      const nome = input.value.trim();
      if (!nome) return;
      const lugares = carregar();
      lugares.push({ id: 'l' + Date.now(), nome, visitado:false });
      salvar(lugares);
      input.value = '';
      render();
      Notificar.mostrar('Destino adicionado ao mapa!', 'sucesso');
    });
  }

  return { init };
})();
