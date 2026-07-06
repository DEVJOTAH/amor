/* ============================================================
   CALENDAR.JS — datas importantes do casal
   ============================================================ */

const CalendarioDatas = (() => {
  const CHAVE = 'nos_datas';

  function carregar(){
    const salvas = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    if (salvas) return salvas;
    const iniciais = (CONFIG.datasIniciais || []).map((d,i) => ({ id:'d'+i, ...d }));
    salvar(iniciais);
    return iniciais;
  }
  function salvar(lista){ localStorage.setItem(CHAVE, JSON.stringify(lista)); }

  // Calcula a próxima ocorrência de uma data (considera repetição anual)
  function proximaOcorrencia(dataISO, repetirAnual){
    const hoje = new Date(); hoje.setHours(0,0,0,0);
    let data = new Date(dataISO + 'T00:00:00');
    if (repetirAnual){
      data.setFullYear(hoje.getFullYear());
      if (data < hoje) data.setFullYear(hoje.getFullYear() + 1);
    }
    return data;
  }

  function diasRestantes(data){
    const hoje = new Date(); hoje.setHours(0,0,0,0);
    return Math.round((data - hoje) / 86400000);
  }

  function render(){
    const ul = document.getElementById('lista-datas');
    const datas = carregar();
    if (!datas.length){
      ul.innerHTML = `<div class="estado-vazio">Nenhuma data cadastrada ainda.</div>`;
      return;
    }

    const comCalculo = datas.map(d => ({ ...d, proxima: proximaOcorrencia(d.data, d.repetirAnual) }))
                             .sort((a,b) => a.proxima - b.proxima);

    ul.innerHTML = comCalculo.map((d,i) => {
      const restantes = diasRestantes(d.proxima);
      const texto = restantes === 0 ? 'é hoje! 🎉' : restantes === 1 ? 'falta 1 dia' : restantes > 0 ? `faltam ${restantes} dias` : 'já passou';
      return `
        <li class="item-data" data-id="${d.id}">
          <div class="item-data-info">
            <b>${d.titulo}</b>
            <span>${d.proxima.toLocaleDateString('pt-BR')} · ${texto}</span>
          </div>
          ${i === 0 ? '<span class="badge-proxima">próxima</span>' : ''}
          <button class="btn-remover" data-acao="remover" title="Remover">✕</button>
        </li>`;
    }).join('');

    ul.querySelectorAll('.item-data').forEach(li => {
      li.querySelector('[data-acao="remover"]').addEventListener('click', () => {
        salvar(carregar().filter(x => x.id !== li.dataset.id));
        render();
      });
    });
  }

  function init(){
    render();
    document.getElementById('form-nova-data').addEventListener('submit', (e) => {
      e.preventDefault();
      const titulo = document.getElementById('input-titulo-data').value.trim();
      const valor = document.getElementById('input-valor-data').value;
      const repetir = document.getElementById('input-repetir-anual').checked;
      if (!titulo || !valor) return;

      const datas = carregar();
      datas.push({ id: 'd' + Date.now(), titulo, data: valor, repetirAnual: repetir });
      salvar(datas);
      e.target.reset();
      render();
      Notificar.mostrar('Data importante salva!', 'sucesso');
    });
  }

  return { init };
})();
