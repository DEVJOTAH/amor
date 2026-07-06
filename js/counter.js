/* ============================================================
   COUNTER.JS — contador de tempo de relacionamento em tempo real
   A data de início vem de CONFIG.casal.inicioRelacionamento
   ============================================================ */

const Contador = (() => {
  let intervalo = null;

  function calcular(inicio){
    const agora = new Date();
    let anos = agora.getFullYear() - inicio.getFullYear();
    let meses = agora.getMonth() - inicio.getMonth();
    let dias = agora.getDate() - inicio.getDate();
    let horas = agora.getHours() - inicio.getHours();
    let minutos = agora.getMinutes() - inicio.getMinutes();
    let segundos = agora.getSeconds() - inicio.getSeconds();

    if (segundos < 0){ segundos += 60; minutos--; }
    if (minutos < 0){ minutos += 60; horas--; }
    if (horas < 0){ horas += 24; dias--; }
    if (dias < 0){
      const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
      dias += ultimoDiaMesAnterior; meses--;
    }
    if (meses < 0){ meses += 12; anos--; }

    return { anos, meses, dias, horas, minutos, segundos };
  }

  function formatarDataExtenso(data){
    return data.toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' });
  }

  function atualizar(){
    const inicio = new Date(CONFIG.casal.inicioRelacionamento);
    const t = calcular(inicio);

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('c-anos', t.anos);
    set('c-meses', t.meses);
    set('c-dias', t.dias);
    set('c-horas', String(t.horas).padStart(2,'0'));
    set('c-minutos', String(t.minutos).padStart(2,'0'));
    set('c-segundos', String(t.segundos).padStart(2,'0'));

    const desde = document.getElementById('contador-desde');
    if (desde) desde.textContent = `desde ${formatarDataExtenso(inicio)} — e contando...`;

    // Mini contador da capa (Início): mostra só o essencial
    const mini = document.getElementById('capa-mini-contador');
    if (mini){
      mini.innerHTML = `
        <div><b>${t.anos}</b>anos</div>
        <div><b>${t.meses}</b>meses</div>
        <div><b>${t.dias}</b>dias</div>
        <div><b>${String(t.horas).padStart(2,'0')}:${String(t.minutos).padStart(2,'0')}:${String(t.segundos).padStart(2,'0')}</b>agora</div>
      `;
    }
  }

  function init(){
    atualizar();
    intervalo = setInterval(atualizar, 1000);
  }

  return { init };
})();
