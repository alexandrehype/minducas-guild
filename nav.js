// nav.js — menu superior padronizado, usado em painel.html, staff.html e importar.html
// espera um elemento <nav class="topnav" id="topNav"></nav> na página

function renderTopNav(supabaseClient, profile, currentPage){
  const navEl = document.getElementById('topNav');
  if(!navEl) return;

  const items = [
    { href:'/painel.html', label:'Meu Painel', page:'painel', show:true },
    { href:'/ranking.html', label:'Ranking Geral', page:'ranking', show:true },
    { href:'/historico.html', label:'Histórico GvGs', page:'historico', show:true },
    { href:'/staff.html', label:'Painel da Staff', page:'staff', show: !!profile.staff },
  ];

  navEl.innerHTML = items.filter(i => i.show).map(i =>
    `<a href="${i.href}" class="navlink${i.page === currentPage ? ' active' : ''}">${i.label}</a>`
  ).join('') + `<button class="navlink navbtn" id="navLogoutBtn">Sair</button>`;

  document.getElementById('navLogoutBtn').addEventListener('click', async ()=>{
    await supabaseClient.auth.signOut();
    window.location.href = '/';
  });
}
