/* ============================================================
   SETTINGS.JS — configurações do site, persistidas em localStorage
   ============================================================ */

const Configuracoes = (() => {
  const CHAVE = 'nos_config';

  function carregar(){
    return { ...CONFIG.padroes, ...JSON.parse(localStorage.getItem(CHAVE) || '{}') };
  }
  function salvar(cfg){ localStorage.setItem(CHAVE, JSON.stringify(cfg)); }

  function hexParaRgb(hex){
    const v = hex.replace('#','');
    const num = parseInt(v.length === 3 ? v.split('').map(c=>c+c).join('') : v, 16);
    return `${(num>>16)&255},${(num>>8)&255},${num&255}`;
  }

  function aplicar(cfg){
    document.documentElement.dataset.tema = cfg.tema;
    document.documentElement.dataset.animacoes = cfg.animacoesAtivas ? 'on' : 'off';
    document.documentElement.style.setProperty('--cor-principal', cfg.corPrincipal);
    document.documentElement.style.setProperty('--cor-principal-rgb', hexParaRgb(cfg.corPrincipal));
    Particulas.setModo(cfg.efeitoFundo);
    Sons.setAtivo(cfg.somCliqueAtivo);

    // Reflete visualmente os controles da própria página de configurações
    document.querySelectorAll('#config-tema .chip-opcao').forEach(b => b.classList.toggle('ativo', b.dataset.tema === cfg.tema));
    document.querySelectorAll('#config-efeito .chip-opcao').forEach(b => b.classList.toggle('ativo', b.dataset.efeito === cfg.efeitoFundo));
    document.querySelectorAll('.bolha-cor').forEach(b => b.classList.toggle('ativo', b.dataset.cor.toLowerCase() === cfg.corPrincipal.toLowerCase()));
    document.getElementById('config-animacoes').checked = cfg.animacoesAtivas;
    document.getElementById('config-sons').checked = cfg.somCliqueAtivo;
    document.getElementById('config-musica-fundo').checked = cfg.musicaFundoAtiva;
  }

  function init(){
    let cfg = carregar();
    aplicar(cfg);

    document.querySelectorAll('#config-tema .chip-opcao').forEach(btn => {
      btn.addEventListener('click', () => { cfg.tema = btn.dataset.tema; salvar(cfg); aplicar(cfg); Notificar.mostrar('Tema atualizado!', 'sucesso'); });
    });

    document.querySelectorAll('#config-efeito .chip-opcao').forEach(btn => {
      btn.addEventListener('click', () => { cfg.efeitoFundo = btn.dataset.efeito; salvar(cfg); aplicar(cfg); });
    });

    document.querySelectorAll('.bolha-cor').forEach(btn => {
      btn.addEventListener('click', () => { cfg.corPrincipal = btn.dataset.cor; salvar(cfg); aplicar(cfg); });
    });

    document.getElementById('config-cor-custom').addEventListener('input', (e) => {
      cfg.corPrincipal = e.target.value; salvar(cfg); aplicar(cfg);
    });

    document.getElementById('config-animacoes').addEventListener('change', (e) => {
      cfg.animacoesAtivas = e.target.checked; salvar(cfg); aplicar(cfg);
    });
    document.getElementById('config-sons').addEventListener('change', (e) => {
      cfg.somCliqueAtivo = e.target.checked; salvar(cfg); aplicar(cfg);
    });
    document.getElementById('config-musica-fundo').addEventListener('change', (e) => {
      cfg.musicaFundoAtiva = e.target.checked; salvar(cfg);
      if (e.target.checked) Player.tocarPausar(true);
    });

    document.getElementById('btn-resetar-config').addEventListener('click', () => {
      cfg = { ...CONFIG.padroes };
      salvar(cfg);
      aplicar(cfg);
      Notificar.mostrar('Configurações restauradas.', 'info');
    });
  }

  return { init, carregar };
})();
