/* ============================================================
   ROUTER.JS — navegação entre "páginas" da SPA
   Cada página é uma <section class="pagina" data-page="x">.
   Adicionar uma nova página no futuro = criar a section + um
   botão de navegação com o mesmo data-pagina. Nada mais.
   ============================================================ */

const Roteador = (() => {
  const paginas = () => document.querySelectorAll('.pagina');
  const itensNav = () => document.querySelectorAll('.nav-item');

  // callbacks registrados por outros módulos, executados ao entrar numa página
  const aoEntrar = {};

  function registrarAoEntrar(pagina, callback){
    if (!aoEntrar[pagina]) aoEntrar[pagina] = [];
    aoEntrar[pagina].push(callback);
  }

  function irPara(pagina){
    paginas().forEach(p => p.classList.toggle('ativa', p.dataset.page === pagina));
    itensNav().forEach(b => b.classList.toggle('ativo', b.dataset.pagina === pagina));
    document.getElementById('conteudo-principal').scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = pagina;

    (aoEntrar[pagina] || []).forEach(cb => cb());
  }

  function init(){
    // Clique em qualquer botão de navegação (desktop ou mobile)
    document.addEventListener('click', (e) => {
      const btnNav = e.target.closest('[data-pagina]');
      if (btnNav){ irPara(btnNav.dataset.pagina); return; }

      const btnAtalho = e.target.closest('[data-ir-para]');
      if (btnAtalho){ irPara(btnAtalho.dataset.irPara); }
    });

    // Duplica os itens de navegação na barra mobile automaticamente
    const navMobile = document.getElementById('nav-mobile');
    document.querySelectorAll('#nav-lista .nav-item').forEach(item => {
      const clone = item.cloneNode(true);
      navMobile.appendChild(clone);
    });

    // Página inicial: hash da URL ou 'inicio'
    const inicial = window.location.hash.replace('#','') || 'inicio';
    irPara(document.querySelector(`.pagina[data-page="${inicial}"]`) ? inicial : 'inicio');
  }

  return { init, irPara, registrarAoEntrar };
})();
