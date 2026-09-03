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

function trendIcon(tendencia){
  if(!tendencia) return '—';
  if(tendencia.startsWith('▲')) return '▲';
  if(tendencia.startsWith('▼')) return '▼';
  if(tendencia.startsWith('▬')) return '▬';
  return tendencia === 'novo' ? '—' : tendencia;
}
