/* ============================================================
   CONFIG.JS
   ------------------------------------------------------------
   Este é o ÚNICO arquivo que vocês devem editar no dia a dia.
   Aqui ficam os dados "de conteúdo" do site: nomes, data de
   início do relacionamento, listas de fotos/músicas/vídeos,
   perguntas do quiz, etc.

   Nenhuma outra parte do código precisa ser tocada quando você
   for apenas trocar um texto, adicionar uma música ou um vídeo.
   ============================================================ */

const CONFIG = {

  /* ---------- Identidade do casal ---------- */
  casal: {
    nomeA: "Jonatas",
    nomeB: "vivian",
    fraseCapa: "duas cidades, um só céu",
    // Data/hora em que o relacionamento começou (usada no contador)
    inicioRelacionamento: "2026-07-02T00:12:24",
  },

  /* ------------------------------------------------------------
     GALERIA DE FOTOS
     ------------------------------------------------------------
     Como o navegador NÃO consegue "ler" sozinho o conteúdo de uma
     pasta no seu computador (isso é uma limitação de segurança de
     qualquer site puramente HTML/CSS/JS, sem um servidor por trás),
     a forma mais próxima de "automático" é:

     1) Você joga a foto dentro da pasta /Galeria
     2) Você adiciona o NOME do arquivo nesta lista abaixo
        (uma linha só, não precisa mexer em HTML)

     Se preferir 100% automático, use o script incluso
     "gerar-lista-galeria.js" (explicado no README.md) — ele varre
     a pasta Galeria e reescreve essa lista sozinho.
     ------------------------------------------------------------ */
  galeria: [
    /* GALERIA_AUTO_INICIO */
    "WhatsApp Image 2026-07-05 at 11.23.42 PM.jpeg",
    "amor.jpeg",
    "amor0.jpeg",
    "amor02.jpeg",
    "amor10.jpeg",
    "amor11.jpeg",
    "amor12.jpeg",
    "amor13.jpeg",
    "amor14.jpeg",
    "amor15.jpeg",
    "amor3.jpeg",
    "amor4.jpeg",
    "amor5.jpeg",
    "amor6.jpeg",
    "amor7.jpeg",
    "amor8.jpeg",
    "vivian.jpg",
    /* GALERIA_AUTO_FIM */
  ],

  /* ---------- Vídeos (coloque os arquivos em /videos) ---------- */
  videos: [
    // { arquivo: "reveillon.mp4", titulo: "Réveillon 2024", data: "01/01/2024" },
    { arquivo: "amorzin.mp4", titulo: "ela", data: "06/07/2026" }
  ],

  /* ---------- Playlist (coloque os arquivos em /music) ---------- */
  playlist: [
    // { arquivo: "nossa-musica.mp3", titulo: "Nossa Música", artista: "Artista" },
    { arquivo: "vem_ca.mp3", titulo: "Nossa Música", artista: "Artista" },
  ],

  /* ---------- Nossa história (linha do tempo) ---------- */
  timeline: [
    { data: "2026-07-02", titulo: "Começamos a namorar", texto: "Decidimos encarar a distância juntos, olhando pro mesmo céu." },
    { data: "2026-07-05", titulo: "discusao", texto: "Acabamos de ter nossa primeira discusao... (motivo: mal entendido)" },
  ],

  /* ---------- Cartas iniciais (opcional, além das criadas pelo site) ---------- */
  cartasIniciais: [
    // { titulo: "Pra você, hoje", texto: "...", data: "2024-01-01" }
  ],

  /* ---------- Metas do casal ---------- */
  metasIniciais: [
    { texto: "Se conhecer pessoalmente", feita: false },
  ],

  /* ---------- Datas importantes (calendário) ---------- */
  datasIniciais: [
    { titulo: "Aniversário de namoro", data: "2026-07-02", repetirAnual: true },
  ],

  /* ---------- Lugares que queremos conhecer ---------- */
  lugaresIniciais: [
    //{ nome: "Paris, França", visitado: false },
    //{ nome: "Fernando de Noronha, Brasil", visitado: false },
  ],

  /* ---------- Quiz do casal ---------- */
  quiz: [
    { pergunta: "Qual foi a primeira coisa que chamou atenção no outro?", opcoes: ["O sorriso", "O jeito de falar", "O senso de humor", "Os olhos"], correta: 2 },
    { pergunta: "Qual seria o destino dos sonhos para uma viagem a dois?", opcoes: ["Praia", "Montanha", "Cidade grande", "Outro país"], correta: 0 },
    { pergunta: "Comida favorita do casal?", opcoes: ["Pizza", "Comida japonesa", "Churrasco", "Doces"], correta: 3 },
  ],

  /* ---------- Configurações padrão ---------- */
  padroes: {
    tema: "escuro",
    corPrincipal: "#f700ff",   // roxo/rosa
    animacoesAtivas: true,
    efeitoFundo: "estrelas",  // 'estrelas' | 'coracoes' | 'neve' | 'nenhum'
    musicaFundoAtiva: false,
    somCliqueAtivo: true,
  },
};
