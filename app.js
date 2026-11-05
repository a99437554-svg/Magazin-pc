/* =====================================================
   НАСТРОЙКИ МАГАЗИНА — меняйте здесь
   ===================================================== */
const CONFIG = {
  brand: 'TechNova',
  phone: '992409022222',            // номер для WhatsApp и звонков (код страны 992 + номер)
  phoneShow: '+992 409 022 222',    // как номер выглядит на сайте
  address: 'г. Душанбе, Бозори Корвон, 3-дарвоза',
  hours: 'Ежедневно 09:00–21:00',
  currency: '$',
  siteUrl: ''                       // после публикации впишите адрес сайта, например 'https://technova.netlify.app'
};

/* =====================================================
   КАРТИНКИ ТОВАРОВ — рисуются как SVG (у каждого товара свои цвета и вид)
   ===================================================== */
const scene = (v, x, y, w, h) => {
  const k = v % 3;
  if (k === 0) return `<circle cx="${x + w * .72}" cy="${y + h * .3}" r="${h * .13}" fill="#fff" opacity=".85"/><path d="M${x} ${y + h * .72}Q${x + w * .25} ${y + h * .45} ${x + w * .5} ${y + h * .7}T${x + w} ${y + h * .58}V${y + h}H${x}Z" fill="#000" opacity=".25"/><path d="M${x} ${y + h * .86}Q${x + w * .3} ${y + h * .66} ${x + w * .6} ${y + h * .84}T${x + w} ${y + h * .76}V${y + h}H${x}Z" fill="#000" opacity=".35"/>`;
  if (k === 1) return [0, 1, 2, 3, 4, 5].map(i => `<rect x="${x + w * .08 + (i % 3) * w * .05}" y="${y + h * .12 + i * h * .13}" width="${w * (.25 + ((i * 37) % 45) / 100)}" height="${h * .055}" rx="3" fill="#fff" opacity="${.35 + (i % 3) * .15}"/>`).join('');
  return [0, 1, 2, 3, 4, 5, 6].map(i => { const bh = h * (.18 + ((i * 53) % 50) / 100 * .55); return `<rect x="${x + w * .1 + i * w * .115}" y="${y + h * .85 - bh}" width="${w * .075}" height="${bh}" rx="3" fill="#fff" opacity=".6"/>`; }).join('');
};
const grad = (id, c1, c2) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
const svg = (inner) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" class="w-full h-full" role="img">${inner}</svg>`;
const shadow = (rx = 150) => `<ellipse cx="200" cy="283" rx="${rx}" ry="10" fill="#000" opacity=".4"/>`;

const ART = {
  laptop: ({ id, c1, c2, v }) => svg(`<defs>${grad('s' + id, c1, c2)}<linearGradient id="b${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cbd5e1"/><stop offset="1" stop-color="#64748b"/></linearGradient></defs>${shadow(170)}
    <rect x="72" y="36" width="256" height="172" rx="14" fill="#0f172a" stroke="#334155" stroke-width="3"/>
    <rect x="84" y="48" width="232" height="148" rx="7" fill="url(#s${id})"/>${scene(v, 84, 48, 232, 148)}
    <circle cx="200" cy="42" r="2" fill="#475569"/>
    <path d="M44 212H356L376 252Q378 262 366 262H34Q22 262 24 252Z" fill="url(#b${id})"/>
    <rect x="164" y="214" width="72" height="8" rx="4" fill="#475569"/>`),

  tower: ({ id, c1, c2 }) => {
    const fan = (cy) => `<g class="fan"><circle cx="176" cy="${cy}" r="27" fill="none" stroke="${c1}" stroke-width="3"/>${[0, 1, 2, 3, 4].map(k => `<ellipse cx="176" cy="${cy - 13}" rx="6.5" ry="13" fill="${c1}" opacity=".75" transform="rotate(${k * 72} 176 ${cy})"/>`).join('')}</g>`;
    return svg(`<defs>${grad('t' + id, c1, c2)}</defs>${shadow(120)}
    <g class="rgb"><rect x="118" y="20" width="164" height="256" rx="16" fill="#0b1020" stroke="url(#t${id})" stroke-width="4"/>
    <rect x="262" y="40" width="7" height="150" rx="3.5" fill="url(#t${id})"/></g>
    <rect x="130" y="32" width="140" height="232" rx="8" fill="#0f1830"/>
    ${fan(72)}${fan(130)}
    <g class="rgb"><rect x="138" y="178" width="124" height="38" rx="6" fill="#1e293b" stroke="url(#t${id})" stroke-width="2"/>
    <circle cx="170" cy="197" r="12" fill="none" stroke="${c2}" stroke-width="2"/><circle cx="230" cy="197" r="12" fill="none" stroke="${c2}" stroke-width="2"/></g>
    <rect x="138" y="228" width="90" height="4" rx="2" fill="#334155"/><rect x="138" y="238" width="60" height="4" rx="2" fill="#334155"/>
    <circle cx="200" cy="268" r="3" fill="${c1}"/><rect x="130" y="276" width="14" height="6" rx="2" fill="#475569"/><rect x="256" y="276" width="14" height="6" rx="2" fill="#475569"/>`);
  },

  monitor: ({ id, c1, c2, v, wide }) => {
    const [x, y, w, h] = wide ? [12, 52, 376, 150] : [30, 30, 340, 190];
    return svg(`<defs>${grad('s' + id, c1, c2)}</defs>${shadow(120)}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#0f172a" stroke="#334155" stroke-width="3"/>
    <rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h - 20}" rx="5" fill="url(#s${id})"/>${scene(v, x + 10, y + 10, w - 20, h - 20)}
    <path d="M178 ${y + h}h44l12 ${wide ? 50 : 36}h-68z" fill="#475569"/><rect x="136" y="${y + h + (wide ? 48 : 34)}" width="128" height="10" rx="5" fill="#64748b"/>`);
  },

  keyboard: ({ id, c1, c2 }) => {
    const acc = ['0-0', '1-2', '2-1', '2-2', '2-3'];
    let keys = '';
    [14, 14, 13, 12].forEach((n, r) => { for (let i = 0; i < n; i++) keys += `<rect x="${41 + i * 23}" y="${88 + r * 28}" width="20" height="22" rx="4" fill="${acc.includes(r + '-' + i) ? c1 : '#1e293b'}" ${acc.includes(r + '-' + i) ? 'opacity=".9"' : ''}/>`; });
    const sp = [[60, 20], [83, 20], [106, 20], [129, 135], [267, 20], [290, 20], [313, 20]].map(([x, w]) => `<rect x="${x}" y="200" width="${w}" height="22" rx="4" fill="#1e293b"/>`).join('');
    return svg(`<defs>${grad('g' + id, c1, c2)}</defs>${shadow(170)}
    <rect x="22" y="70" width="356" height="170" rx="16" fill="#0b1020" stroke="#334155" stroke-width="3"/>${keys}${sp}
    <rect x="22" y="236" width="356" height="6" rx="3" fill="url(#g${id})" class="rgb"/>`);
  },

  mouse: ({ id, c1, c2 }) => svg(`<defs>${grad('g' + id, c1, c2)}<linearGradient id="m${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e293b"/><stop offset="1" stop-color="#0b1020"/></linearGradient></defs>${shadow(80)}
    <ellipse cx="200" cy="268" rx="78" ry="11" fill="url(#g${id})" opacity=".85" class="rgb"/>
    <path d="M200 26C262 26 296 82 296 154C296 232 258 272 200 272C142 272 104 232 104 154C104 82 138 26 200 26Z" fill="url(#m${id})" stroke="#334155" stroke-width="3"/>
    <path d="M200 28V132M106 140Q200 162 294 140" stroke="#334155" stroke-width="3" fill="none"/>
    <rect x="190" y="58" width="20" height="48" rx="10" fill="url(#g${id})" class="rgb"/>
    <circle cx="200" cy="124" r="5" fill="${c1}"/>
    <path d="M128 206Q200 250 272 206" stroke="url(#g${id})" stroke-width="5" fill="none" stroke-linecap="round" class="rgb"/>`),

  speakers: ({ id, c1, c2 }) => {
    const sp = (x) => `<rect x="${x}" y="46" width="132" height="222" rx="16" fill="#0f172a" stroke="#334155" stroke-width="3"/>
    <circle cx="${x + 66}" cy="86" r="17" fill="#0b1020" stroke="${c1}" stroke-width="3"/><circle cx="${x + 66}" cy="86" r="7" fill="${c1}"/>
    <circle cx="${x + 66}" cy="182" r="50" fill="#111827" stroke="url(#g${id})" stroke-width="5"/>
    <g class="spk"><circle cx="${x + 66}" cy="182" r="32" fill="#0b1020"/><circle cx="${x + 66}" cy="182" r="15" fill="url(#g${id})"/></g>`;
    return svg(`<defs>${grad('g' + id, c1, c2)}</defs>${shadow(150)}${sp(40)}${sp(228)}`);
  },

  soundbar: ({ id, c1, c2 }) => svg(`<defs>${grad('g' + id, c1, c2)}</defs>${shadow(170)}
    <rect x="24" y="100" width="352" height="96" rx="48" fill="#0f172a" stroke="#334155" stroke-width="3"/>
    ${Array.from({ length: 22 }, (_, i) => [0, 1, 2].map(r => `<circle cx="${64 + i * 12.5}" cy="${126 + r * 16}" r="2.6" fill="#334155"/>`).join('')).join('')}
    <rect x="56" y="190" width="288" height="5" rx="2.5" fill="url(#g${id})" class="rgb"/>
    <circle cx="352" cy="148" r="5" fill="${c1}"/>
    <path d="M70 70Q200 30 330 70" stroke="url(#g${id})" stroke-width="4" fill="none" stroke-linecap="round" opacity=".55" class="rgb"/><path d="M96 54Q200 22 304 54" stroke="url(#g${id})" stroke-width="3" fill="none" stroke-linecap="round" opacity=".35" class="rgb"/>`),

  headphones: ({ id, c1, c2 }) => svg(`<defs>${grad('g' + id, c1, c2)}</defs>${shadow(110)}
    <path d="M92 196C92 56 308 56 308 196" stroke="#1e293b" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="M104 190C104 74 296 74 296 190" stroke="url(#g${id})" stroke-width="4" fill="none" class="rgb"/>
    <rect x="66" y="164" width="58" height="100" rx="26" fill="#0f172a" stroke="#334155" stroke-width="3"/><rect x="78" y="180" width="34" height="68" rx="17" fill="url(#g${id})" class="rgb"/>
    <rect x="276" y="164" width="58" height="100" rx="26" fill="#0f172a" stroke="#334155" stroke-width="3"/><rect x="288" y="180" width="34" height="68" rx="17" fill="url(#g${id})" class="rgb"/>`)
};
const art = (p, pre = 'c') => ART[p.art]({ ...p, id: pre + p.id });

/* =====================================================
   ТОВАРЫ — меняйте названия, цены и описания здесь
   ===================================================== */
const P = (id, name, cat, artType, price, old, spec, c1, c2, v = 0, extra = {}) => ({ id, name, cat, art: artType, price, old, spec, c1, c2, v, ...extra });
const PRODUCTS = [
  P(1, 'AeroBook Pro 14', 'laptops', 'laptop', 1299, 1499, 'Core Ultra 7 · 16 ГБ · 512 ГБ SSD · OLED 2.8K', '#8b5cf6', '#22d3ee', 0, { badge: 'Хит', featured: true }),
  P(2, 'SlimBook Air 13', 'laptops', 'laptop', 899, null, 'Ryzen 5 · 16 ГБ · 512 ГБ · всего 1.1 кг', '#ec4899', '#f59e0b', 1),
  P(3, 'WorkStation Z16', 'laptops', 'laptop', 1799, 1999, 'Core i9 · 32 ГБ · 1 ТБ · RTX 4070', '#10b981', '#06b6d4', 2),
  P(4, 'StudentBook 15', 'laptops', 'laptop', 549, 629, 'Core i3 · 8 ГБ · 256 ГБ · 15.6" Full HD', '#3b82f6', '#6366f1', 0),
  P(5, 'Phantom RTX 4090', 'gaming', 'tower', 3299, 3599, 'Core i9 · 64 ГБ DDR5 · 2 ТБ NVMe · RTX 4090', '#8b5cf6', '#22d3ee', 0, { badge: 'Топ', featured: true }),
  P(6, 'Falcon RTX 4070', 'gaming', 'tower', 1899, 2099, 'Ryzen 7 · 32 ГБ · 1 ТБ · RTX 4070 Super', '#ec4899', '#8b5cf6'),
  P(7, 'Viper Starter PC', 'gaming', 'tower', 899, null, 'Ryzen 5 · 16 ГБ · 1 ТБ · RTX 4060', '#22c55e', '#06b6d4'),
  P(8, 'Titan White RGB', 'gaming', 'tower', 2399, 2599, 'Core i7 · 32 ГБ · 2 ТБ · RTX 4070 Ti', '#f59e0b', '#ef4444', 0, { badge: 'Новинка' }),
  P(9, 'UltraView 27" 4K', 'monitors', 'monitor', 349, 429, 'IPS · 3840×2160 · 144 Гц · HDR400', '#06b6d4', '#3b82f6', 0, { featured: true }),
  P(10, 'CurveX 32" 165 Гц', 'monitors', 'monitor', 429, 499, 'Изогнутый VA · 2K · 165 Гц · 1 мс', '#a855f7', '#ec4899', 1),
  P(11, 'ProView 24" FHD', 'monitors', 'monitor', 159, null, 'IPS · 1920×1080 · 75 Гц · для офиса', '#22c55e', '#14b8a6', 2),
  P(12, 'UltraWide 34"', 'monitors', 'monitor', 599, 699, 'Ультраширокий · 3440×1440 · 144 Гц', '#f97316', '#ef4444', 0, { wide: true, badge: 'Новинка' }),
  P(13, 'Клавиатура K8 RGB', 'keyboards', 'keyboard', 89, 109, 'Механическая · Hot-swap · RGB · Bluetooth', '#8b5cf6', '#22d3ee'),
  P(14, 'Клавиатура Slim Air', 'keyboards', 'keyboard', 69, null, 'Тонкая · беспроводная · тихие клавиши', '#ec4899', '#f59e0b'),
  P(15, 'Клавиатура Pro TKL', 'keyboards', 'keyboard', 119, 139, 'Без цифрового блока · оптические свитчи', '#22c55e', '#06b6d4'),
  P(16, 'Мышь Pulse X', 'mice', 'mouse', 59, null, '26 000 DPI · 58 г · беспроводная 2.4 ГГц', '#22d3ee', '#8b5cf6', 0, { badge: 'Хит' }),
  P(17, 'Мышь Viper Mini', 'mice', 'mouse', 39, 49, '12 000 DPI · компактная · RGB', '#ec4899', '#f43f5e'),
  P(18, 'Мышь Glide Pro', 'mice', 'mouse', 79, null, 'Эргономичная · 8 кнопок · до 90 ч работы', '#f59e0b', '#22c55e'),
  P(19, 'Колонки Bass 2.0', 'audio', 'speakers', 49, 59, 'Стерео 2.0 · 20 Вт · USB + AUX', '#8b5cf6', '#ec4899'),
  P(20, 'Колонки Studio 2.1', 'audio', 'speakers', 99, 119, 'С сабвуфером · 60 Вт · Bluetooth 5.3', '#22d3ee', '#3b82f6', 0, { featured: true }),
  P(21, 'Саундбар RGB', 'audio', 'soundbar', 129, null, '2.0 · 40 Вт · RGB-подсветка · HDMI ARC', '#a855f7', '#22d3ee'),
  P(22, 'Наушники Wave Pro', 'audio', 'headphones', 129, 159, 'Шумоподавление · 40 ч · микрофон', '#ec4899', '#8b5cf6')
];
const CATS = [['laptops', '💻 Ноутбуки'], ['gaming', '🎮 Игровые ПК'], ['monitors', '🖥️ Мониторы'], ['keyboards', '⌨️ Клавиатуры'], ['mice', '🖱️ Мышки'], ['audio', '🔊 Колонки и звук']];
const PERKS = {
  laptops: ['Гарантия 2 года', 'Бесплатная настройка Windows', 'Рассрочка 0%'],
  gaming: ['Тест 24 часа перед выдачей', 'Гарантия 3 года', 'Сборка и апгрейд на заказ'],
  monitors: ['Проверка на битые пиксели', 'Гарантия 2 года', 'Крепление в подарок'],
  keyboards: ['Гарантия 1 год', 'Можно проверить в магазине', 'Бесплатная замена при браке'],
  mice: ['Гарантия 1 год', 'Можно проверить в магазине', 'Бесплатная замена при браке'],
  audio: ['Проверка звука при покупке', 'Гарантия 1 год', 'Доставка по городу']
};

/* ===== помощники ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => CONFIG.currency + n.toLocaleString('en-US');
const current = (location.pathname.split('/').pop() || 'index.html');
const WA_ICON = '<svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0012.04 2zm5.8 14.17c-.25.69-1.45 1.32-2 1.37-.51.05-1.15.07-1.86-.12-.43-.13-.98-.32-1.69-.62-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.84 2.06.91 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.05 1.13 1.01 2.09 1.32 2.39 1.47.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.18 1.41z"/></svg>';
const waLink = text => `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(text)}`;
const siteBase = () => (CONFIG.siteUrl ? CONFIG.siteUrl.replace(/\/$/, '') + '/' : new URL('.', location.href).href);
const productUrl = p => siteBase() + 'catalog.html?p=' + p.id;
const waProduct = p => waLink(`Здравствуйте! Меня интересует товар:\n${p.name} — ${money(p.price)}\nСсылка: ${productUrl(p)}`);
const find = id => PRODUCTS.find(p => p.id == id);

/* ===== корзина ===== */
let cart = {};
try { cart = JSON.parse(localStorage.getItem('cart') || '{}'); } catch (e) { cart = {}; }
const saveCart = () => { try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {} updateCart(); };
const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast fixed bottom-24 left-1/2 z-[150] glass bg-slate-900/90 rounded-2xl px-5 py-3 text-sm font-medium shadow-2xl max-w-[90vw] text-center';
  t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1; saveCart();
  const b = $('#cartBadge'); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
  toast('✅ В корзине: ' + find(id).name);
}
function updateCart() {
  const count = cartCount();
  const badge = $('#cartBadge');
  if (badge) { badge.textContent = count; badge.style.display = count ? 'flex' : 'none'; }
  const list = $('#cartItems'); if (!list) return;
  const ids = Object.keys(cart);
  if (!ids.length) { list.innerHTML = '<div class="text-center text-slate-400 py-16"><div class="text-6xl mb-4">🛒</div>Корзина пока пуста</div>'; $('#cartTotal').textContent = money(0); return; }
  let total = 0;
  list.innerHTML = ids.map(id => {
    const p = find(id), q = cart[id]; total += p.price * q;
    return `<div class="glass rounded-2xl p-3 flex items-center gap-3">
      <div class="w-20 h-16 rounded-xl bg-slate-800/60 p-1 shrink-0">${art(p, 'k')}</div>
      <div class="flex-1 min-w-0"><div class="text-sm font-semibold truncate">${p.name}</div><div class="text-cyan-300 text-sm">${money(p.price)}</div></div>
      <div class="flex items-center gap-2">
        <button data-dec="${id}" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20">−</button><span class="w-5 text-center text-sm">${q}</span><button data-inc="${id}" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20">+</button>
      </div></div>`;
  }).join('');
  $('#cartTotal').textContent = money(total);
}
function checkoutWhatsApp() {
  const ids = Object.keys(cart); if (!ids.length) return toast('Корзина пуста');
  let total = 0;
  const lines = ids.map((id, i) => { const p = find(id), q = cart[id]; total += p.price * q; return `${i + 1}. ${p.name} × ${q} — ${money(p.price * q)}\n${productUrl(p)}`; });
  window.open(waLink(`Здравствуйте! Хочу оформить заказ:\n\n${lines.join('\n\n')}\n\nИтого: ${money(total)}`), '_blank');
}

/* ===== шапка, подвал, окна ===== */
const NAV = [['index.html', 'Главная'], ['catalog.html', 'Каталог'], ['laptops.html', 'Ноутбуки'], ['gaming.html', 'Игровые ПК'], ['monitors.html', 'Мониторы'], ['peripherals.html', 'Клавиатуры и мыши'], ['audio.html', 'Колонки и звук'], ['deals.html', 'Акции'], ['about.html', 'О нас'], ['contacts.html', 'Контакты']];
const NAV_MAIN = ['index.html', 'catalog.html', 'laptops.html', 'gaming.html', 'monitors.html', 'deals.html', 'contacts.html'];

function buildLayout() {
  document.body.insertAdjacentHTML('afterbegin', `
  <div id="loader"><div class="loader-ring"></div><div class="font-extrabold text-2xl">Tech<span class="gradient-text">Nova</span></div></div>
  <div id="progress"></div><div id="cursorGlow"></div>
  <div class="blobs"><div class="grid-bg"></div><div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div></div>`);

  const link = (h, t) => `<a href="${h}" class="nav-link px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${h === current ? 'active text-white bg-white/10' : 'text-slate-300 hover:text-white'}">${t}</a>`;
  const more = NAV.filter(n => !NAV_MAIN.includes(n[0]));
  document.body.insertAdjacentHTML('beforeend', `
  <header id="siteHeader" class="fixed top-0 inset-x-0 z-50">
    <div class="max-w-7xl mx-auto px-3 sm:px-6">
      <div class="glass rounded-2xl mt-3 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        <a href="index.html" class="flex items-center gap-2 font-extrabold text-xl shrink-0"><span class="w-9 h-9 rounded-xl grad-bg flex items-center justify-center text-lg">⚡</span><span>Tech<span class="gradient-text">Nova</span></span></a>
        <nav class="hidden lg:flex items-center gap-0.5">
          ${NAV.filter(n => NAV_MAIN.includes(n[0])).map(n => link(...n)).join('')}
          <div class="relative group"><button class="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white">Ещё ▾</button>
            <div class="absolute right-0 top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300"><div class="glass rounded-2xl p-2 w-56 bg-slate-900/95 flex flex-col">${more.map(n => link(...n)).join('')}</div></div></div>
        </nav>
        <div class="flex items-center gap-2">
          <a href="tel:+${CONFIG.phone}" class="hidden xl:flex items-center gap-2 glass rounded-xl px-3 h-11 text-sm font-semibold hover:bg-white/10 transition">📞 ${CONFIG.phoneShow}</a>
          <a href="${waLink('Здравствуйте! Хочу узнать о товарах ' + CONFIG.brand)}" target="_blank" rel="noopener" aria-label="WhatsApp" class="btn-wa hidden sm:flex w-11 h-11 rounded-xl items-center justify-center text-white">${WA_ICON}</a>
          <button id="cartBtn" aria-label="Корзина" class="relative w-11 h-11 rounded-xl glass hover:bg-white/10 flex items-center justify-center text-xl transition">🛒<span id="cartBadge" class="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-pink-500 text-xs font-bold items-center justify-center" style="display:none">0</span></button>
          <button id="burger" aria-label="Меню" class="lg:hidden w-11 h-11 rounded-xl glass flex items-center justify-center text-xl">☰</button>
        </div>
      </div>
      <div id="mobileMenu" class="lg:hidden glass bg-slate-900/90 rounded-2xl mt-2">
        <div class="p-3 grid grid-cols-2 gap-1">${NAV.map(n => link(...n)).join('')}</div>
        <div class="p-3 pt-0 grid grid-cols-2 gap-2"><a href="tel:+${CONFIG.phone}" class="btn-primary rounded-xl py-3 text-center text-sm font-semibold">📞 Позвонить</a><a href="${waLink('Здравствуйте! Хочу узнать о товарах ' + CONFIG.brand)}" target="_blank" rel="noopener" class="btn-wa rounded-xl py-3 text-center text-sm font-semibold">WhatsApp</a></div>
      </div>
    </div>
  </header>

  <div id="cartOverlay" class="fixed inset-0 bg-black/60 z-[60]"></div>
  <aside id="cartDrawer" class="fixed top-0 right-0 h-full w-full max-w-sm z-[70] bg-slate-900 border-l border-white/10 flex flex-col">
    <div class="p-5 flex items-center justify-between border-b border-white/10"><h3 class="text-xl font-bold">Корзина</h3><button id="cartClose" class="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20">✕</button></div>
    <div id="cartItems" class="flex-1 overflow-y-auto p-4 space-y-3"></div>
    <div class="p-5 border-t border-white/10">
      <div class="flex justify-between text-lg font-bold mb-4"><span>Итого</span><span id="cartTotal" class="text-cyan-300">$0</span></div>
      <button id="checkout" class="btn-wa w-full rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2">${WA_ICON} Заказать через WhatsApp</button>
    </div>
  </aside>

  <div id="modal"><div id="modalOverlay" class="absolute inset-0 bg-black/75 backdrop-blur-sm"></div><div id="modalBox" class="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/10 shadow-2xl"></div></div>

  <a id="callFab" class="fab" href="tel:+${CONFIG.phone}" aria-label="Позвонить"><svg viewBox="0 0 24 24" class="w-6 h-6" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.600 10.800z"/></svg></a>
  <a id="waFab" class="fab" href="${waLink('Здравствуйте! Хочу узнать о товарах ' + CONFIG.brand)}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" class="w-8 h-8" fill="currentColor">${WA_ICON.match(/<path.*<\/path>|<path[^>]*\/>/)[0]}</svg></a>

  <footer class="mt-24 border-t border-white/10 bg-slate-950/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div><div class="flex items-center gap-2 font-extrabold text-xl mb-4"><span class="w-9 h-9 rounded-xl grad-bg flex items-center justify-center">⚡</span>${CONFIG.brand}</div>
        <p class="text-slate-400 text-sm leading-relaxed">Игровые компьютеры, ноутбуки, мониторы, клавиатуры, мыши и колонки с гарантией. Поможем выбрать технику под ваш бюджет.</p></div>
      <div><h4 class="font-semibold mb-4">Магазин</h4><ul class="space-y-2 text-sm text-slate-400">${NAV.slice(1, 7).map(n => `<li><a class="hover:text-cyan-300 hover:pl-1 transition-all" href="${n[0]}">${n[1]}</a></li>`).join('')}</ul></div>
      <div><h4 class="font-semibold mb-4">Компания</h4><ul class="space-y-2 text-sm text-slate-400">${NAV.slice(7).map(n => `<li><a class="hover:text-cyan-300 hover:pl-1 transition-all" href="${n[0]}">${n[1]}</a></li>`).join('')}</ul></div>
      <div><h4 class="font-semibold mb-4">Контакты</h4><ul class="space-y-3 text-sm text-slate-400">
        <li>📞 <a class="hover:text-cyan-300" href="tel:+${CONFIG.phone}">${CONFIG.phoneShow}</a></li>
        <li>📍 ${CONFIG.address}</li><li>🕘 ${CONFIG.hours}</li>
        <li><a href="${waLink('Здравствуйте! Хочу узнать о товарах ' + CONFIG.brand)}" target="_blank" rel="noopener" class="btn-wa inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white font-semibold">${WA_ICON} Написать в WhatsApp</a></li></ul></div>
    </div>
    <div class="border-t border-white/10 py-5 text-center text-xs text-slate-500">© ${new Date().getFullYear()} ${CONFIG.brand}. Все права защищены.</div>
  </footer>`);
}

/* ===== карточки товаров и окно товара ===== */
function card(p, i) {
  const disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  return `<div class="reveal" data-delay="${(i % 4) * 90}"><article class="tilt glass rounded-3xl h-full flex flex-col cursor-pointer relative overflow-hidden" data-open="${p.id}">
    <div class="relative h-48 sm:h-52 bg-gradient-to-br from-slate-800/70 to-slate-950 flex items-center justify-center p-4 overflow-hidden">
      <div class="absolute inset-0" style="background:radial-gradient(circle at 50% 65%,${p.c1}55,transparent 65%)"></div>
      <div class="pimg relative w-full h-full">${art(p)}</div>
      ${disc ? `<span class="absolute top-3 left-3 bg-pink-500 text-xs font-bold px-2.5 py-1 rounded-full z-[3]">−${disc}%</span>` : ''}
      ${p.badge ? `<span class="absolute top-3 right-3 bg-amber-400 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full z-[3]">${p.badge}</span>` : ''}
    </div>
    <div class="p-5 flex-1 flex flex-col">
      <h3 class="font-bold text-lg leading-snug">${p.name}</h3>
      <p class="text-slate-400 text-sm mt-1 flex-1">${p.spec}</p>
      <div class="mt-4"><span class="text-2xl font-extrabold text-cyan-300">${money(p.price)}</span>${p.old ? `<span class="ml-2 text-xs text-slate-500 line-through">${money(p.old)}</span>` : ''}</div>
      <div class="flex gap-2 mt-3 relative z-[3]">
        <button data-add="${p.id}" class="btn-primary flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold">В корзину</button>
        <a href="${waProduct(p)}" target="_blank" rel="noopener" aria-label="Написать в WhatsApp" class="btn-wa w-11 shrink-0 rounded-xl flex items-center justify-center text-white">${WA_ICON}</a>
      </div>
    </div></article></div>`;
}

function openModal(id) {
  const p = find(id); if (!p) return;
  const disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  $('#modalBox').innerHTML = `
    <button id="modalClose" class="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 transition" aria-label="Закрыть">✕</button>
    <div class="grid md:grid-cols-2">
      <div class="relative bg-gradient-to-br from-slate-800/70 to-slate-950 p-6 flex items-center justify-center min-h-[240px]">
        <div class="absolute inset-0" style="background:radial-gradient(circle at 50% 60%,${p.c1}66,transparent 65%)"></div>
        <div class="floaty relative w-full max-w-sm">${art(p, 'm')}</div>
      </div>
      <div class="p-6 sm:p-8 flex flex-col">
        <div class="flex gap-2 mb-2">${disc ? `<span class="bg-pink-500 text-xs font-bold px-2.5 py-1 rounded-full">−${disc}%</span>` : ''}${p.badge ? `<span class="bg-amber-400 text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full">${p.badge}</span>` : ''}</div>
        <h2 class="text-2xl sm:text-3xl font-extrabold">${p.name}</h2>
        <p class="text-slate-300 mt-2">${p.spec}</p>
        <ul class="mt-4 space-y-1.5 text-sm text-slate-300">${(PERKS[p.cat] || []).map(x => `<li>✅ ${x}</li>`).join('')}</ul>
        <div class="mt-5"><span class="text-4xl font-extrabold text-cyan-300">${money(p.price)}</span>${p.old ? `<span class="ml-3 text-slate-500 line-through">${money(p.old)}</span>` : ''}</div>
        <div class="mt-6 grid gap-3">
          <a href="${waProduct(p)}" target="_blank" rel="noopener" class="btn-wa rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 text-white">${WA_ICON} Заказать в WhatsApp</a>
          <div class="grid grid-cols-2 gap-3">
            <button data-add="${p.id}" class="btn-primary rounded-xl py-3 font-semibold">В корзину</button>
            <a href="tel:+${CONFIG.phone}" class="glass rounded-xl py-3 font-semibold text-center hover:bg-white/10 transition">📞 Позвонить</a>
          </div>
          <button data-copy="${p.id}" class="text-sm text-slate-400 hover:text-cyan-300 transition">🔗 Скопировать ссылку на товар</button>
        </div>
      </div>
    </div>`;
  $('#modal').classList.add('open'); document.body.style.overflow = 'hidden';
  try { history.replaceState(null, '', '?p=' + id); } catch (e) {}
}
function closeModal() {
  $('#modal').classList.remove('open'); document.body.style.overflow = '';
  try { history.replaceState(null, '', location.pathname); } catch (e) {}
}

function renderProducts(grid, items) {
  grid.innerHTML = items.length ? items.map(card).join('') : '<p class="col-span-full text-center text-slate-400 py-16">Ничего не найдено 😕</p>';
  observeReveal();
}
function initProducts() {
  $$('[data-products]').forEach(grid => {
    const cat = grid.dataset.cat || 'all', limit = +grid.dataset.limit || 999;
    let base = PRODUCTS;
    if (cat === 'featured') base = PRODUCTS.filter(p => p.featured);
    else if (cat === 'sale') base = PRODUCTS.filter(p => p.old);
    else if (cat !== 'all') base = PRODUCTS.filter(p => cat.split(',').includes(p.cat));
    const filters = $('#filters'), search = $('#search'), sort = $('#sort');
    if (!filters) { renderProducts(grid, base.slice(0, limit)); return; }
    let active = new URLSearchParams(location.search).get('cat') || 'all';
    $$('.chip', filters).forEach(c => c.classList.toggle('active', c.dataset.f === active));
    const apply = () => {
      let items = base.filter(p => (active === 'all' || p.cat === active) && p.name.toLowerCase().includes((search?.value || '').toLowerCase()));
      if (sort?.value === 'asc') items = [...items].sort((a, b) => a.price - b.price);
      if (sort?.value === 'desc') items = [...items].sort((a, b) => b.price - a.price);
      renderProducts(grid, items);
    };
    filters.addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (!b) return; active = b.dataset.f; $$('.chip', filters).forEach(c => c.classList.toggle('active', c === b)); apply(); });
    search?.addEventListener('input', apply); sort?.addEventListener('change', apply);
    apply();
  });
}
function initShows() {
  $$('[data-show]').forEach((el, i) => {
    const [a, c1, c2, v] = el.dataset.show.split(',');
    el.innerHTML = ART[a]({ id: 'h' + i, c1, c2, v: +v || 0, wide: el.dataset.wide !== undefined });
  });
}

/* ===== анимации ===== */
let io;
function observeReveal() {
  if (!io) io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('show'), +e.target.dataset.delay || 0); io.unobserve(e.target); } }), { threshold: .1 });
  $$('.reveal:not(.show),.reveal-left:not(.show),.reveal-right:not(.show)').forEach(el => io.observe(el));
}
function initCounters() {
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; co.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
    const step = t => { const k = Math.min((t - t0) / 1800, 1); el.textContent = Math.floor(end * (1 - Math.pow(1 - k, 3))).toLocaleString('ru-RU') + suf; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: .5 });
  $$('[data-count]').forEach(el => co.observe(el));
}
function initTyping() {
  const el = $('#typing'); if (!el) return;
  const words = el.dataset.words.split('|'); let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w]; el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && c === 0) { del = false; w = (w + 1) % words.length; }
    c += del ? -1 : 1; setTimeout(tick, del ? 45 : 90);
  })();
}
function initParticles() {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const c = document.createElement('canvas'); c.className = 'absolute inset-0 w-full h-full'; $('.blobs').appendChild(c);
  const ctx = c.getContext('2d'); let W, H, pts = []; const m = { x: -999, y: -999 };
  const resize = () => { W = c.width = innerWidth; H = c.height = innerHeight; pts = Array.from({ length: Math.min(70, Math.floor(W * H / 20000)) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 1.8 + .6 })); };
  resize(); addEventListener('resize', resize);
  addEventListener('pointermove', e => { m.x = e.clientX; m.y = e.clientY; });
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = 'rgba(167,139,250,.75)'; ctx.fill(); }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) { const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y); if (d < 130) { ctx.strokeStyle = `rgba(34,211,238,${.22 * (1 - d / 130)})`; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); } }
      const dm = Math.hypot(pts[i].x - m.x, pts[i].y - m.y); if (dm < 170) { ctx.strokeStyle = `rgba(244,114,182,${.5 * (1 - dm / 170)})`; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(m.x, m.y); ctx.stroke(); }
    }
    requestAnimationFrame(loop);
  })();
}
function initPointerFX() {
  const glow = $('#cursorGlow');
  document.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
    const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
    $$('[data-depth]').forEach(el => { const d = +el.dataset.depth; el.style.transform = `translate3d(${-nx * d}px,${-ny * d}px,0)`; });
    const t = e.target.closest && e.target.closest('.tilt,.spot');
    if (t) {
      const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      t.style.setProperty('--mx', x * 100 + '%'); t.style.setProperty('--my', y * 100 + '%');
      if (t.classList.contains('tilt')) { t.style.setProperty('--ry', (x - .5) * 14 + 'deg'); t.style.setProperty('--rx', (.5 - y) * 14 + 'deg'); }
    }
  });
  document.addEventListener('pointerout', e => {
    const t = e.target.closest && e.target.closest('.tilt');
    if (t && !t.contains(e.relatedTarget)) { t.style.setProperty('--rx', '0deg'); t.style.setProperty('--ry', '0deg'); }
  });
  document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.btn-primary,.btn-wa'); if (!b) return;
    const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height), d = document.createElement('span');
    d.className = 'ripple-dot'; d.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    b.appendChild(d); setTimeout(() => d.remove(), 700);
  });
}

/* ===== старт ===== */
document.addEventListener('DOMContentLoaded', () => {
  buildLayout();
  const open = () => { $('#cartDrawer').classList.add('open'); $('#cartOverlay').classList.add('open'); };
  const close = () => { $('#cartDrawer').classList.remove('open'); $('#cartOverlay').classList.remove('open'); };
  $('#cartBtn').onclick = open; $('#cartClose').onclick = close; $('#cartOverlay').onclick = close;
  $('#burger').onclick = e => { const m = $('#mobileMenu'); m.classList.toggle('open'); e.currentTarget.textContent = m.classList.contains('open') ? '✕' : '☰'; };
  $('#checkout').onclick = checkoutWhatsApp;
  $('#modalOverlay').onclick = closeModal;
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); close(); } });
  document.addEventListener('click', e => {
    if (e.target.closest('#modalClose')) return closeModal();
    const a = e.target.closest('[data-add]'); if (a) return addToCart(a.dataset.add);
    const i = e.target.closest('[data-inc]'); if (i) { cart[i.dataset.inc]++; return saveCart(); }
    const d = e.target.closest('[data-dec]'); if (d) { if (--cart[d.dataset.dec] <= 0) delete cart[d.dataset.dec]; return saveCart(); }
    const cp = e.target.closest('[data-copy]'); if (cp) { const url = productUrl(find(cp.dataset.copy)); (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => toast('🔗 Ссылка скопирована'), () => toast(url)); return; }
    if (e.target.closest('a,button')) return;
    const o = e.target.closest('[data-open]'); if (o) openModal(o.dataset.open);
  });
  addEventListener('scroll', () => { const h = document.documentElement; $('#progress').style.width = (scrollY / (h.scrollHeight - innerHeight || 1) * 100) + '%'; }, { passive: true });
  $$('form[data-wa]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault(); const v = Object.fromEntries(new FormData(f));
    window.open(waLink(`Здравствуйте! Меня зовут ${v.name}.\nТелефон: ${v.phone}\nИнтересует: ${v.topic}\n${v.message || ''}`), '_blank');
    f.reset(); toast('✅ Открываем WhatsApp...');
  }));
  updateCart(); initShows(); initProducts(); observeReveal(); initCounters(); initTyping(); initParticles(); initPointerFX();
  const pid = new URLSearchParams(location.search).get('p'); if (pid) setTimeout(() => openModal(pid), 500);
  document.body.classList.add('page-in');
  setTimeout(() => { $('#loader').classList.add('hide'); setTimeout(() => $('#loader').remove(), 800); }, 650);
});
