/* ============================================================
   NOTIFICATIONS.JS — toasts simples reutilizáveis em todo o site
   Uso: Notificar.mostrar("Meta adicionada!", "sucesso")
   Tipos: 'sucesso' | 'info' | 'erro'
   ============================================================ */

const Notificar = (() => {
  const container = () => document.getElementById('notificacoes-container');

  const cores = {
    sucesso: 'linear-gradient(135deg, rgba(74,222,128,.22), rgba(255,255,255,.04))',
    info: 'linear-gradient(135deg, rgba(var(--cor-principal-rgb),.28), rgba(255,255,255,.04))',
    erro: 'linear-gradient(135deg, rgba(248,113,113,.25), rgba(255,255,255,.04))',
  };
  const icones = { sucesso: '✓', info: '✦', erro: '✕' };

  function mostrar(mensagem, tipo = 'info', duracaoMs = 3200){
    const el = document.createElement('div');
    el.className = 'notificacao glass';
    el.style.background = cores[tipo] || cores.info;
    el.innerHTML = `<span>${icones[tipo] || '✦'}</span><span>${mensagem}</span>`;
    container().appendChild(el);

    setTimeout(() => {
      el.classList.add('saindo');
      setTimeout(() => el.remove(), 400);
    }, duracaoMs);
  }

  return { mostrar };
})();
