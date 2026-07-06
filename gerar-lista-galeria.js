/* ============================================================
   GERAR-LISTA-GALERIA.JS
   ------------------------------------------------------------
   Um site puramente HTML/CSS/JS, aberto direto no navegador ou
   hospedado num servidor estático simples, NÃO consegue "ler"
   sozinho o conteúdo de uma pasta por segurança do navegador.

   Este script resolve isso: rode-o (com Node.js instalado)
   sempre que adicionar ou remover fotos da pasta /Galeria, e ele
   atualiza automaticamente a lista em js/config.js pra você.

   COMO USAR:
     1) Instale o Node.js (https://nodejs.org) — só precisa fazer isso uma vez.
     2) Coloque suas fotos dentro da pasta /Galeria.
     3) Abra um terminal nesta pasta do projeto e rode:
            node gerar-lista-galeria.js
     4) Pronto! js/config.js foi atualizado automaticamente.

   Dica: se quiser 100% automático sem rodar comando nenhum, seria
   necessário um servidor com backend (Node/PHP/etc). Este projeto
   foi pedido em HTML/CSS/JS puro, então este script é o caminho
   mais simples e ainda assim rápido (uma linha de comando).
   ============================================================ */

const fs = require('fs');
const path = require('path');

const PASTA_GALERIA = path.join(__dirname, 'Galeria');
const ARQUIVO_CONFIG = path.join(__dirname, 'js', 'config.js');
const EXTENSOES_VALIDAS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function listarFotos(){
  if (!fs.existsSync(PASTA_GALERIA)){
    console.error('❌ Pasta "Galeria" não encontrada.');
    process.exit(1);
  }
  return fs.readdirSync(PASTA_GALERIA)
    .filter(nome => EXTENSOES_VALIDAS.includes(path.extname(nome).toLowerCase()))
    .sort();
}

function atualizarConfig(fotos){
  let conteudo = fs.readFileSync(ARQUIVO_CONFIG, 'utf-8');

  const listaFormatada = fotos.map(f => `    "${f}",`).join('\n');
  const novoBloco = `/* GALERIA_AUTO_INICIO */\n${listaFormatada}\n    /* GALERIA_AUTO_FIM */`;

  const regex = /\/\* GALERIA_AUTO_INICIO \*\/[\s\S]*?\/\* GALERIA_AUTO_FIM \*\//;

  if (!regex.test(conteudo)){
    console.error('❌ Marcadores GALERIA_AUTO_INICIO/FIM não encontrados em js/config.js.');
    process.exit(1);
  }

  conteudo = conteudo.replace(regex, novoBloco);
  fs.writeFileSync(ARQUIVO_CONFIG, conteudo, 'utf-8');
}

const fotos = listarFotos();
atualizarConfig(fotos);
console.log(`✅ ${fotos.length} foto(s) encontrada(s) e adicionada(s) em js/config.js:`);
fotos.forEach(f => console.log('   -', f));
