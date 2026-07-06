/* ============================================================
   MAIN.JS — ponto de entrada: inicializa todos os módulos
   ============================================================ */

(function main(){

  function iniciarApp(){
    // Nomes vindos do config.js aplicados à página "Sobre nós"
    const nomeA = document.getElementById('sobre-nomeA');
    const nomeB = document.getElementById('sobre-nomeB');
    if (nomeA) nomeA.textContent = CONFIG.casal.nomeA;
    if (nomeB) nomeB.textContent = CONFIG.casal.nomeB;

    const fraseCapa = document.getElementById('capa-frase-dinamica');
    if (fraseCapa) fraseCapa.textContent = `“${CONFIG.casal.fraseCapa}”`;

    Modal.init();
    Particulas.init(Configuracoes.carregar().efeitoFundo); // liga o canvas de fundo
    Configuracoes.init();   // aplica tema/cor/efeitos salvos ANTES de tudo o mais
    Roteador.init();
    Contador.init();
    Galeria.init();
    Videos.init();
    Player.init();
    Timeline.init();
    Cartas.init();
    Metas.init();
    CalendarioDatas.init();
    Lugares.init();
    Jogos.init();

    // Botão de tela cheia
    const btnFull = document.getElementById('btn-tela-cheia');
    if (btnFull){
      btnFull.addEventListener('click', () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      });
    }

    // Revela o app com uma transição suave
    document.getElementById('app').classList.add('app-visivel');
    document.getElementById('app').classList.remove('app-oculto');
  }

  // Tela de carregamento primeiro, depois inicializa o app
  document.addEventListener('DOMContentLoaded', () => {
    TelaCarregamento.iniciar(iniciarApp);
  });

})();
