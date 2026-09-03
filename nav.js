// nav.js — barra superior (identidade) + menu lateral (navegação), usados em todas as páginas internas
// espera <div id="topbar"></div> e <aside id="sidebar"></aside> na página

function renderTopNav(supabaseClient, profile, currentPage){
  const topbarEl = document.getElementById('topbar');
  if(topbarEl){
    topbarEl.innerHTML = `
      <img class="bannerArt" src="icones/banner.png?v=3" alt="Minducas" onerror="this.style.display='none'">
      <button class="topbarLogout" id="topbarLogoutBtn">Sair</button>`;
  }

  const sidebarEl = document.getElementById('sidebar');
  if(!sidebarEl) return;

  const items = [
    { href:'painel.html', label:'Meu Painel', page:'painel', show:true },
    { href:'ranking.html', label:'Ranking Geral', page:'ranking', show:true },
    { href:'historico.html', label:'Histórico GvGs', page:'historico', show:true },
    { href:'staff.html', label:'Painel da Staff', page:'staff', show: !!profile.staff },
    { href:'fragmentos.html', label:'Fragmentos', page:'fragmentos', show:true },
  ];

  sidebarEl.innerHTML = `
    <nav>
      ${items.filter(i => i.show).map(i =>
        `<a href="${i.href}" class="navlink${i.page === currentPage ? ' active' : ''}">${i.label}</a>`
      ).join('')}
    </nav>`;

  const topbarLogoutBtn = document.getElementById('topbarLogoutBtn');
  if(topbarLogoutBtn){
    topbarLogoutBtn.addEventListener('click', async ()=>{
      await supabaseClient.auth.signOut();
      window.location.href = 'index.html';
    });
  }
}
