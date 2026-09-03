// nav.js — menu lateral padronizado, usado em todas as páginas internas do site
// espera um elemento <aside id="sidebar"></aside> na página

function renderTopNav(supabaseClient, profile, currentPage){
  const el = document.getElementById('sidebar');
  if(!el) return;

  const items = [
    { href:'painel.html', label:'Meu Painel', page:'painel', show:true },
    { href:'ranking.html', label:'Ranking Geral', page:'ranking', show:true },
    { href:'historico.html', label:'Histórico GvGs', page:'historico', show:true },
    { href:'staff.html', label:'Painel da Staff', page:'staff', show: !!profile.staff },
  ];

  el.innerHTML = `
    <div class="brand">
      <div class="flags"><span></span><span></span><span></span></div>
      <h1>Minducas</h1>
      <div class="subtitle">guilda ragnarok origin</div>
    </div>
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
