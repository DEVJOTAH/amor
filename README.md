# nós — site romântico do casal

Site 100% HTML + CSS + JavaScript puro (sem frameworks, sem build,
sem backend). Basta abrir `index.html` num navegador ou hospedar
os arquivos em qualquer servidor estático (Netlify, Vercel,
GitHub Pages, Hostinger, etc.).

## Estrutura de pastas

```
site-casal/
├── index.html              → estrutura de todas as páginas
├── gerar-lista-galeria.js  → script opcional (Node) p/ galeria automática
├── css/
│   ├── themes.css          → cores e variáveis de tema
│   └── style.css           → layout, componentes, animações
├── js/
│   ├── config.js           → ⭐ ÚNICO arquivo que você mexe no dia a dia
│   ├── main.js              → inicializa tudo
│   ├── router.js            → navegação entre páginas
│   ├── gallery.js           → pilha de fotos
│   ├── player.js            → player de música
│   ├── videos.js            → grade de vídeos
│   ├── timeline.js          → linha do tempo
│   ├── letters.js           → cartinhas
│   ├── goals.js             → metas do casal
│   ├── calendar.js          → datas importantes
│   ├── places.js            → lugares para conhecer
│   ├── games.js              → quiz, memória, ppt
│   ├── settings.js          → tema/cor/efeitos
│   ├── particles.js         → fundo animado (estrelas/corações/neve)
│   ├── cursor.js, sounds.js, notifications.js, modal.js, loading.js
├── Galeria/                 → suas fotos entram aqui
├── music/                   → suas músicas entram aqui
├── videos/                  → seus vídeos entram aqui
├── icons/, fonts/, img/     → recursos visuais extras (opcional)
```

## Como editar o conteúdo

Praticamente tudo que muda com frequência (nomes, data de início do
namoro, fotos, músicas, vídeos, linha do tempo, perguntas do quiz)
fica centralizado em **`js/config.js`**. Você não precisa tocar em
HTML/CSS para isso.

## Sobre a Galeria "automática" — leia isto

Por segurança do próprio navegador, **nenhum site feito apenas em
HTML/CSS/JS consegue "enxergar" sozinho o conteúdo de uma pasta** no
computador — isso só é possível com um servidor rodando por trás
(Node, PHP, etc.), o que fugiria do pedido de "HTML/CSS/JS puro".

A solução implementada é a mais próxima possível do automático:

1. Você joga as fotos dentro de `/Galeria`.
2. Você roda, uma vez, no terminal, dentro da pasta do projeto:
   ```
   node gerar-lista-galeria.js
   ```
   (é necessário ter o [Node.js](https://nodejs.org) instalado —
   grátis, leva 2 minutos para instalar).
3. O script varre a pasta e atualiza sozinho a lista de fotos dentro
   de `js/config.js`. Pronto — nenhuma edição manual de código.

Se preferir não usar o Node.js, também é possível adicionar cada
foto manualmente em uma linha só, dentro de `js/config.js`:
```js
galeria: [
  "foto1.jpg",
  "praia-2024.png",
]
```

## Sons, cursor, tema, partículas

Tudo isso é ajustável pela própria página **Configurações** do site,
e as escolhas ficam salvas no navegador (localStorage) — ou seja,
persistem entre visitas, sem precisar de conta ou servidor.

## Dados salvos pelo navegador (localStorage)

Cartinhas, metas, datas, lugares, favoritos e configurações ficam
guardados no `localStorage` do navegador usado. Isso significa que,
se abrir o site em outro dispositivo ou navegador, esses dados não
aparecerão automaticamente lá (é uma limitação de qualquer site sem
banco de dados/backend). Para compartilhar entre os dois, o ideal é
que ambos usem o mesmo link hospedado e o mesmo navegador salvo, ou
que futuramente se adicione um backend simples (ex: Firebase).

## Extensão futura

O código foi organizado em módulos independentes (um arquivo JS por
funcionalidade), então adicionar uma nova página é só:
1. Criar a `<section class="pagina" data-page="nome">` no `index.html`.
2. Criar o botão de navegação `<button data-pagina="nome">`.
3. (Opcional) Criar `js/nome.js` com um `init()` e chamá-lo em `main.js`.

Feito com carinho 💜
