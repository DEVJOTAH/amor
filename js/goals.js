/* ============================================================
   GOALS.JS — metas do casal
   ============================================================ */

const Metas = (() => {
  const CHAVE = 'nos_metas';

  function carregar(){
    const salvas = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    if (salvas) return salvas;
    const iniciais = (CONFIG.metasIniciais || []).map((m,i) => ({ id:'m'+i, ...m }));
    salvar(iniciais);
    return iniciais;
  }
  function salvar(lista){ localStorage.setItem(CHAVE, JSON.stringify(lista)); }

  function render(){
    const ul = document.getElementById('lista-metas');
    const metas = carregar();
    if (!metas.length){
      ul.innerHTML = `<div class="estado-vazio">Nenhuma meta ainda. Adicione o primeiro sonho de vocês acima ✦</div>`;
      return;
    }
    ul.innerHTML = metas.map(m => `
      <li class="item-meta ${m.feita ? 'feita' : ''}" data-id="${m.id}">
        <input type="checkbox" ${m.feita ? 'checked' : ''} data-acao="concluir">
        <span class="texto-meta">${m.texto}</span>
        <button class="btn-remover" data-acao="remover" title="Remover">✕</button>
      </li>
    `).join('');

    ul.querySelectorAll('.item-meta').forEach(li => {
      const id = li.dataset.id;
      li.querySelector('[data-acao="concluir"]').addEventListener('change', (e) => {
        const metas = carregar();
        const m = metas.find(x => x.id === id);
        m.feita = e.target.checked;
        salvar(metas);
        render();
        if (m.feita) Notificar.mostrar('Mais uma meta realizada! 🎉', 'sucesso');
      });
      li.querySelector('[data-acao="remover"]').addEventListener('click', () => {
        salvar(carregar().filter(x => x.id !== id));
        render();
      });
    });
  }

  function init(){
    render();
    document.getElementById('form-nova-meta').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('input-nova-meta');
      const texto = input.value.trim();
      if (!texto) return;
      const metas = carregar();
      metas.push({ id: 'm' + Date.now(), texto, feita:false });
      salvar(metas);
      input.value = '';
      render();
      Notificar.mostrar('Meta adicionada!', 'sucesso');
    });
  }

  return { init };
})();
