// helpers.js — funções e mapas compartilhados entre as páginas do site

const CLASSES = ['Lord Knight','Paladin','Creator','High Priest','Clown','Gypsy','High Wizard','Professor','Sniper','Assassin Cross','Stalker','Champion','Whitesmith','Gunslinger','Summoner'];

const CLASS_GROUP = {
  'Lord Knight':'Versatil','Paladin':'Versatil','Creator':'Versatil',
  'High Priest':'Suporte','Clown':'Suporte','Gypsy':'Suporte',
  'High Wizard':'Ataque','Professor':'Ataque','Sniper':'Ataque','Assassin Cross':'Ataque',
  'Stalker':'Ataque','Champion':'Ataque','Whitesmith':'Ataque','Gunslinger':'Ataque','Summoner':'Ataque'
};

const CLASS_ICON_MAP = {
  'Lord Knight': 'lorde-removebg-preview.png',
  'Paladin': 'paladino-removebg-preview.png',
  'High Priest': 'sumosacerdote-removebg-preview.png',
  'Champion': 'mestre-removebg-preview.png',
  'Professor': 'professor-removebg-preview.png',
  'High Wizard': 'arquimago-removebg-preview.png',
  'Assassin Cross': 'algoz-removebg-preview.png',
  'Stalker': 'desordeiro-removebg-preview.png',
  'Whitesmith': 'mestreferreiro-removebg-preview.png',
  'Creator': 'criador-removebg-preview.png',
  'Sniper': 'atiradordeelite-removebg-preview.png',
  'Clown': 'menestrel-removebg-preview.png',
  'Summoner': 'invocador-removebg-preview.png',
  'Gypsy': 'cigana-removebg-preview.png',
};

function classIcon(classe, sizePx){
  const PT_ALIASES = {
    'Algoz':'Assassin Cross', 'Arquimago':'High Wizard', 'Atirador de Elite':'Sniper',
    'Cigana':'Gypsy', 'Criador':'Creator', 'Desordeiro':'Stalker', 'Invocador':'Summoner',
    'Lorde':'Lord Knight', 'Mestre':'Champion', 'Mestre-Ferreiro':'Whitesmith',
    'Paladino':'Paladin', 'Sumo Sacerdote':'High Priest', 'Menestrel':'Clown',
  };
  const key = CLASS_ICON_MAP[classe] ? classe : (PT_ALIASES[classe] || classe);
  const file = CLASS_ICON_MAP[key];
  const style = sizePx ? ` style="width:${sizePx}px;height:${sizePx}px;"` : '';
  return file ? `<img src="icones/classes/${file}" alt="${key}" class="classIconImg"${style} onerror="this.style.display='none'">` : '';
}

function groupTag(g){
  if(!g) return '';
  const label = g === 'Versatil' ? 'Versátil' : g;
  return `<span class="tag g-${g}">${label}</span>`;
}

function arenaTag(arena){
  const key = arena === 'secundaria' ? 'secundaria' : 'primaria';
  const label = key === 'secundaria' ? 'Secundária' : 'Primária';
  return `<span class="arena-tag arena-${key}">${label}</span>`;
}

const FORMAT_LABELS = {
  marcas_monstros: { text:'Marca + Monstro', cls:'fmt-marca' },
  monstros_chefe: { text:'Monstro + Chefe', cls:'fmt-chefe' },
  ocupacao: { text:'Ocupação S/A/B', cls:'fmt-occ' },
};
function formatTag(formato){
  if(formato === 'misto') return `<span class="format-tag fmt-mixed">Misto</span>`;
  const info = FORMAT_LABELS[formato];
  if(!info) return `<span class="format-tag fmt-none">—</span>`;
  return `<span class="format-tag ${info.cls}">${info.text}</span>`;
}

// mostra outros nicks (in-game) já vinculados a esse mesmo jogador, diferentes do nick atual da conta
async function renderAliases(client, containerEl, playerId, currentNick){
  if(!playerId){ containerEl.style.display = 'none'; return; }
  const { data } = await client
    .from('gvg_session_players')
    .select('nick')
    .eq('player_id', playerId);

  const nicks = [...new Set((data || []).map(r => r.nick))]
    .filter(n => n.toLowerCase() !== (currentNick || '').toLowerCase());

  if(nicks.length){
    containerEl.style.display = 'block';
    containerEl.textContent = `Também jogou como: ${nicks.join(', ')}`;
  } else {
    containerEl.style.display = 'none';
  }
}

function trendIcon(tendencia){
  if(!tendencia) return '—';
  if(tendencia.startsWith('▲')) return '▲';
  if(tendencia.startsWith('▼')) return '▼';
  if(tendencia.startsWith('▬')) return '▬';
  return tendencia === 'novo' ? '—' : tendencia;
}

// desenha um gráfico de linha simples (SVG) com até 5 pontos, sempre preenchendo 5 posições
// entries: array cronológico (mais antigo -> mais recente) de {label, pontos, abates, assistencias, mortes}
function renderScoreChart(containerEl, entries, metric){
  const slots = 5;
  const padded = Array(Math.max(0, slots - entries.length)).fill(null).concat(entries).slice(-slots);
  const values = padded.map(e => e ? Number(e[metric]) || 0 : 0);
  const maxVal = Math.max(1, ...values);

  const width = 560, height = 190, padX = 34, topPad = 30, bottomPad = 34;
  const chartH = height - topPad - bottomPad;
  const stepX = (width - padX * 2) / (slots - 1);

  const points = padded.map((e, i) => {
    const val = values[i];
    const x = padX + i * stepX;
    const y = topPad + (chartH - (maxVal > 0 ? (val / maxVal) * chartH : 0));
    return { x, y, val, label: e ? e.label : '—', filled: !!e };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  let dots = '', labels = '';
  points.forEach(p => {
    dots += `<circle cx="${p.x}" cy="${p.y}" r="5" fill="${p.filled ? 'var(--gold)' : 'var(--line)'}"></circle>`;
    labels += `
      <text x="${p.x}" y="${p.y - 14}" text-anchor="middle" font-size="13" font-weight="700"
        font-family="'JetBrains Mono',ui-monospace,monospace" fill="${p.filled ? 'var(--gold)' : 'var(--muted)'}">${p.val}</text>
      <text x="${p.x}" y="${height - 12}" text-anchor="middle" font-size="10"
        font-family="'JetBrains Mono',ui-monospace,monospace" fill="var(--muted)">${p.label}</text>`;
  });

  containerEl.innerHTML = `<svg viewBox="0 0 ${width} ${height}" style="width:100%; height:auto; display:block;">
    <path d="${pathD}" fill="none" stroke="var(--gold)" stroke-width="2.5" opacity="0.9"></path>
    ${dots}
    ${labels}
  </svg>`;

  const noteEl = containerEl.parentElement?.querySelector('.chartEmptyNote');
  if(noteEl) noteEl.style.display = entries.length === 0 ? 'block' : 'none';
}
