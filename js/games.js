/* ============================================================
   GAMES.JS — mini jogos: quiz, memória e pedra-papel-tesoura
   ============================================================ */

const Jogos = (() => {
  const area = () => document.getElementById('jogo-area');

  /* ---------------- QUIZ DO CASAL ---------------- */
  function iniciarQuiz(){
    const perguntas = CONFIG.quiz;
    let indice = 0, acertos = 0;

    function renderPergunta(){
      if (indice >= perguntas.length){
        area().innerHTML = `
          <h3>Fim de jogo! 🎉</h3>
          <p style="color:var(--texto-2); margin-top:.6rem;">Vocês acertaram ${acertos} de ${perguntas.length} perguntas.</p>
          <button class="botao-primario" style="margin-top:1.2rem" id="btn-jogar-de-novo">Jogar novamente</button>
        `;
        document.getElementById('btn-jogar-de-novo').addEventListener('click', iniciarQuiz);
        return;
      }
      const p = perguntas[indice];
      area().innerHTML = `
        <div class="quiz-progresso">Pergunta ${indice+1} de ${perguntas.length}</div>
        <div class="quiz-pergunta">${p.pergunta}</div>
        <div class="quiz-opcoes">
          ${p.opcoes.map((op,i) => `<button class="quiz-opcao" data-i="${i}">${op}</button>`).join('')}
        </div>
      `;
      area().querySelectorAll('.quiz-opcao').forEach(btn => {
        btn.addEventListener('click', () => {
          const escolhida = Number(btn.dataset.i);
          area().querySelectorAll('.quiz-opcao').forEach(b => b.disabled = true);
          if (escolhida === p.correta){
            btn.classList.add('correta');
            acertos++;
            Sons.sucesso();
          } else {
            btn.classList.add('errada');
            area().querySelector(`[data-i="${p.correta}"]`).classList.add('correta');
          }
          setTimeout(() => { indice++; renderPergunta(); }, 1100);
        });
      });
    }
    renderPergunta();
  }

  /* ---------------- JOGO DA MEMÓRIA ---------------- */
  function iniciarMemoria(){
    const simbolos = ['💜','💕','☾','✦','💌','🌙','💫','☁️'];
    const cartas = [...simbolos, ...simbolos]
      .map(s => ({ s, id: Math.random() }))
      .sort(() => Math.random() - 0.5);

    let primeira = null, segunda = null, travado = false, paresEncontrados = 0;

    area().innerHTML = `
      <div class="memoria-grade" id="memoria-grade"></div>
      <p class="memoria-status" id="memoria-status">Encontre os pares ✦</p>
    `;
    const grade = document.getElementById('memoria-grade');

    grade.innerHTML = cartas.map((c, i) => `
      <div class="carta-memoria" data-i="${i}" data-simbolo="${c.s}"><span style="display:none">${c.s}</span></div>
    `).join('');

    grade.querySelectorAll('.carta-memoria').forEach(carta => {
      carta.addEventListener('click', () => {
        if (travado || carta.classList.contains('virada') || carta.classList.contains('encontrada')) return;

        virar(carta);
        if (!primeira){ primeira = carta; return; }
        segunda = carta;
        travado = true;

        const combinou = primeira.dataset.simbolo === segunda.dataset.simbolo;
        setTimeout(() => {
          if (combinou){
            primeira.classList.add('encontrada');
            segunda.classList.add('encontrada');
            paresEncontrados++;
            Sons.sucesso();
            document.getElementById('memoria-status').textContent = `${paresEncontrados} de ${simbolos.length} pares encontrados`;
            if (paresEncontrados === simbolos.length){
              document.getElementById('memoria-status').textContent = 'Vocês encontraram todos os pares! 💜';
            }
          } else {
            desvirar(primeira); desvirar(segunda);
          }
          primeira = null; segunda = null; travado = false;
        }, 700);
      });
    });

    function virar(carta){ carta.classList.add('virada'); carta.querySelector('span').style.display = 'block'; }
    function desvirar(carta){ carta.classList.remove('virada'); carta.querySelector('span').style.display = 'none'; }
  }

  /* ---------------- PEDRA, PAPEL E TESOURA ---------------- */
  function iniciarPPT(){
    const opcoes = { pedra: '✊', papel: '✋', tesoura: '✌️' };
    let placar = JSON.parse(localStorage.getItem('nos_ppt_placar') || '{"voce":0,"pc":0}');

    function render(resultadoTexto){
      area().innerHTML = `
        <div class="ppt-area">
          <p>Escolha sua jogada:</p>
          <div class="ppt-opcoes">
            ${Object.entries(opcoes).map(([k,v]) => `<button class="ppt-botao" data-op="${k}" title="${k}">${v}</button>`).join('')}
          </div>
          <div class="ppt-resultado">${resultadoTexto || ''}</div>
          <div class="ppt-placar">Você ${placar.voce} × ${placar.pc} Computador</div>
        </div>
      `;
      area().querySelectorAll('.ppt-botao').forEach(btn => {
        btn.addEventListener('click', () => jogar(btn.dataset.op));
      });
    }

    function jogar(escolhaJogador){
      const chaves = Object.keys(opcoes);
      const escolhaPc = chaves[Math.floor(Math.random()*chaves.length)];
      let resultado;

      if (escolhaJogador === escolhaPc) resultado = 'Empate! 🤝';
      else if (
        (escolhaJogador === 'pedra' && escolhaPc === 'tesoura') ||
        (escolhaJogador === 'papel' && escolhaPc === 'pedra') ||
        (escolhaJogador === 'tesoura' && escolhaPc === 'papel')
      ){
        resultado = 'Você venceu! 🎉'; placar.voce++; Sons.sucesso();
      } else {
        resultado = 'O computador venceu! 😅'; placar.pc++;
      }

      localStorage.setItem('nos_ppt_placar', JSON.stringify(placar));
      render(`Você: ${opcoes[escolhaJogador]}  ×  Computador: ${opcoes[escolhaPc]} — ${resultado}`);
    }

    render();
  }

  function init(){
    document.querySelectorAll('[data-jogo]').forEach(btn => {
      btn.addEventListener('click', () => {
        const jogo = btn.dataset.jogo;
        if (jogo === 'quiz') iniciarQuiz();
        else if (jogo === 'memoria') iniciarMemoria();
        else if (jogo === 'ppt') iniciarPPT();
        area().scrollIntoView({ behavior:'smooth', block:'nearest' });
      });
    });
  }

  return { init };
})();
