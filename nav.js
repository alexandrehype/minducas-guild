// nav.js — barra superior (identidade) + menu lateral (navegação), usados em todas as páginas internas
// espera <div id="topbar"></div> e <aside id="sidebar"></aside> na página

function renderTopNav(supabaseClient, profile, currentPage){
  const topbarEl = document.getElementById('topbar');
  if(topbarEl){
    topbarEl.innerHTML = `
      <img class="bannerArt" src="icones/banner.png" alt="" onerror="this.style.display='none'">
      <div class="brandText">
        <div class="flags"><span></span><span></span><span></span></div>
        <h1>Minducas</h1>
        <div class="subtitle">guilda ragnarok origin</div>
      </div>`;
  }

  const sidebarEl = document.getElementById('sidebar');
  if(!sidebarEl) return;

  const items = [
    { href:'painel.html', label:'Meu Painel', page:'painel', show:true },
    { href:'ranking.html', label:'Ranking Geral', page:'ranking', show:true },
    { href:'historico.html', label:'Histórico GvGs', page:'historico', show:true },
    { href:'staff.html', label:'Painel da Staff', page:'staff', show: !!profile.staff },
  ];

  sidebarEl.innerHTML = `
    <nav>
      ${items.filter(i => i.show).map(i =>
        `<a href="${i.href}" class="navlink${i.page === currentPage ? ' active' : ''}">${i.label}</a>`
      ).join('')}
      <button class="navlink navbtn" id="navLogoutBtn">Sair</button>
    </nav>`;

  document.getElementById('navLogoutBtn').addEventListener('click', async ()=>{
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
  });
}
