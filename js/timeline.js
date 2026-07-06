/* ============================================================
   TIMELINE.JS — linha do tempo do relacionamento
   Dados vêm de CONFIG.timeline (edite lá para adicionar marcos)
   ============================================================ */

const Timeline = (() => {
  function formatarData(iso){
    return new Date(iso + 'T00:00:00').toLocaleDateString('pt-BR', { day:'2-digit', month:'short', year:'numeric' });
  }

  function render(){
    const container = document.getElementById('timeline-lista');
    const eventos = [...CONFIG.timeline].sort((a,b) => new Date(a.data) - new Date(b.data));

    if (!eventos.length){
      container.innerHTML = `<div class="estado-vazio">Adicione marcos importantes em <code>js/config.js</code>, no array <code>timeline</code>.</div>`;
      return;
    }

    container.innerHTML = eventos.map(ev => `
      <div class="timeline-item">
        <div class="timeline-data">${formatarData(ev.data)}</div>
        <h3 class="timeline-titulo">${ev.titulo}</h3>
        <p class="timeline-texto">${ev.texto}</p>
      </div>
    `).join('');
  }

  return { init: render };
})();
