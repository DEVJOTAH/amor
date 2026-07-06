/* ============================================================
   SOUNDS.JS — sons suaves de interface via Web Audio API
   (não depende de nenhum arquivo de áudio externo)
   ============================================================ */

const Sons = (() => {
  let ctx = null;
  let ativo = true;

  function getContexto(){
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function tocarTom({ freq = 440, duracao = 0.09, tipo = 'sine', volume = 0.05 }){
    if (!ativo) return;
    try{
      const c = getContexto();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = tipo;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duracao);
      osc.connect(gain).connect(c.destination);
      osc.start();
      osc.stop(c.currentTime + duracao);
    }catch(e){ /* silencioso: alguns navegadores exigem gesto do usuário antes do áudio */ }
  }

  return {
    clique(){ tocarTom({ freq: 620, duracao: .08, tipo:'sine', volume:.045 }); },
    sucesso(){ tocarTom({ freq: 880, duracao: .12, tipo:'triangle', volume:.05 }); },
    suave(){ tocarTom({ freq: 340, duracao: .15, tipo:'sine', volume:.035 }); },
    setAtivo(v){ ativo = v; },
    estaAtivo(){ return ativo; }
  };
})();

// Toca um clique suave em qualquer botão do site (delegação de evento)
document.addEventListener('click', (e) => {
  if (e.target.closest('button')) Sons.clique();
});
