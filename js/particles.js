/* ============================================================
   PARTICLES.JS — fundo animado configurável
   Modos: 'estrelas' (padrão), 'coracoes', 'neve', 'nenhum'
   Controlado pela página de Configurações (ver settings.js)
   ============================================================ */

const Particulas = (() => {
  const canvas = document.getElementById('fundo-particulas');
  const ctx = canvas.getContext('2d');
  let particulas = [];
  let modo = 'estrelas';
  let animando = false;
  let larguraCSS = 0, alturaCSS = 0;

  function redimensionar(){
    larguraCSS = window.innerWidth;
    alturaCSS = window.innerHeight;
    canvas.width = larguraCSS * devicePixelRatio;
    canvas.height = alturaCSS * devicePixelRatio;
    canvas.style.width = larguraCSS + 'px';
    canvas.style.height = alturaCSS + 'px';
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    criarParticulas();
  }

  function quantidadePorModo(){
    const base = Math.min(90, Math.floor((larguraCSS * alturaCSS) / 16000));
    return modo === 'nenhum' ? 0 : base;
  }

  function criarParticulas(){
    const n = quantidadePorModo();
    particulas = Array.from({ length: n }, criarParticula);
  }

  function criarParticula(){
    const comum = {
      x: Math.random() * larguraCSS,
      y: Math.random() * alturaCSS,
    };
    if (modo === 'estrelas'){
      return { ...comum, r: Math.random() * 1.6 + .3, brilho: Math.random(), vel: Math.random() * 0.015 + 0.005 };
    }
    if (modo === 'coracoes'){
      return { ...comum, tam: Math.random() * 10 + 8, vy: Math.random() * 0.35 + 0.15, vx: (Math.random()-.5)*0.2, rot: Math.random()*360, opac: Math.random()*.5+.15 };
    }
    if (modo === 'neve'){
      return { ...comum, r: Math.random()*2.4+1, vy: Math.random()*0.6+0.25, vx: (Math.random()-.5)*0.4, opac: Math.random()*.6+.3 };
    }
    return comum;
  }

  function desenharCoracao(x, y, tam, opac){
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opac;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--cor-principal') || '#b06ab3';
    ctx.beginPath();
    const s = tam / 16;
    ctx.moveTo(0, 4*s);
    ctx.bezierCurveTo(0, 2*s, -2*s, 0, -6*s, 0);
    ctx.bezierCurveTo(-12*s, 0, -12*s, 8*s, -12*s, 8*s);
    ctx.bezierCurveTo(-12*s, 13*s, -6*s, 17*s, 0, 22*s);
    ctx.bezierCurveTo(6*s, 17*s, 12*s, 13*s, 12*s, 8*s);
    ctx.bezierCurveTo(12*s, 8*s, 12*s, 0, 6*s, 0);
    ctx.bezierCurveTo(2*s, 0, 0, 2*s, 0, 4*s);
    ctx.fill();
    ctx.restore();
  }

  function passo(){
    ctx.clearRect(0, 0, larguraCSS, alturaCSS);

    if (modo === 'estrelas'){
      particulas.forEach(p => {
        p.brilho += p.vel;
        const alpha = Math.abs(Math.sin(p.brilho)) * 0.8 + 0.15;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
    } else if (modo === 'coracoes'){
      particulas.forEach(p => {
        p.y -= p.vy; p.x += p.vx;
        if (p.y < -20){ p.y = alturaCSS + 10; p.x = Math.random()*larguraCSS; }
        desenharCoracao(p.x, p.y, p.tam, p.opac);
      });
    } else if (modo === 'neve'){
      particulas.forEach(p => {
        p.y += p.vy; p.x += p.vx;
        if (p.y > alturaCSS + 5){ p.y = -5; p.x = Math.random()*larguraCSS; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.opac})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
    }

    if (animando) requestAnimationFrame(passo);
  }

  function iniciar(){
    if (animando) return;
    animando = true;
    passo();
  }
  function parar(){ animando = false; ctx.clearRect(0,0,larguraCSS,alturaCSS); }

  function setModo(novoModo){
    modo = novoModo;
    criarParticulas();
    if (modo === 'nenhum') parar(); else iniciar();
  }

  window.addEventListener('resize', redimensionar);

  return { init(modoInicial){ modo = modoInicial || 'estrelas'; redimensionar(); iniciar(); }, setModo };
})();
