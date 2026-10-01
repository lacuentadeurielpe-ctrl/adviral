// Genera los 12 anuncios (1080x1350, formato 4:5 para feed) como HTML y PNG.
// Uso: node generar.js   (requiere playwright; Chromium ya instalado en el entorno)
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'png');
const HTML = path.join(__dirname, 'html');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(HTML, { recursive: true });

const base = `
<link rel="stylesheet" href="../fonts/fonts.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;overflow:hidden;font-family:'Montserrat',sans-serif}
.ad{position:relative;width:1080px;height:1350px;overflow:hidden;padding:70px 70px 60px;display:flex;flex-direction:column}
.cta{display:flex;align-items:center;justify-content:center;gap:18px;background:#25D366;color:#fff;font-weight:900;
  font-size:40px;border-radius:999px;padding:30px 40px;box-shadow:0 12px 30px rgba(0,0,0,.25);letter-spacing:.5px}
.cta small{font-weight:700;font-size:26px;opacity:.95}
.pay{text-align:center;font-weight:700;font-size:24px;margin-top:16px;opacity:.85}
.spacer{flex:1}
.check li{list-style:none;display:flex;gap:18px;align-items:flex-start;margin:0 0 18px}
.check li:before{content:'✓';flex:none;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:26px}
</style>`;

const cta = (txt = 'Escríbenos por WhatsApp', sub = '') =>
  `<div class="cta"><span>💬</span><span>${txt}</span>${sub ? `<small>${sub}</small>` : ''}</div>`;
const pay = (color = 'inherit') => `<div class="pay" style="color:${color}">Paga con Yape o Plin · Recíbelo al instante en tu WhatsApp</div>`;

/* ============================== MISTERIO ============================== */
const misterioCss = `<style>
.m{background:radial-gradient(circle at 30% 20%,#1d2433,#0b0e14 70%);color:#f3ead7}
.m .kick{font-family:'Special Elite';color:#e0433a;font-size:30px;letter-spacing:4px;text-transform:uppercase}
.m h1{font-family:'Playfair Display';font-weight:900;font-size:84px;line-height:1.02;margin-top:18px}
.m h1 em{color:#e0433a;font-style:italic}
.folder{position:relative;background:#c9a46a;border-radius:6px 18px 10px 10px;box-shadow:0 30px 60px rgba(0,0,0,.6);transform:rotate(-3deg)}
.folder:before{content:'';position:absolute;top:-34px;left:0;width:300px;height:40px;background:#c9a46a;border-radius:14px 14px 0 0}
.stamp{font-family:'Special Elite';color:#b3201a;border:6px solid #b3201a;padding:6px 22px;font-size:44px;letter-spacing:4px;display:inline-block;transform:rotate(-8deg);opacity:.9}
.paper{background:#f4ecd8;color:#2a2018;font-family:'Special Elite';box-shadow:0 10px 20px rgba(0,0,0,.35)}
.polaroid{background:#fff;padding:14px 14px 50px;box-shadow:0 10px 25px rgba(0,0,0,.5);position:absolute}
.polaroid div{width:150px;height:150px;background:#333;display:flex;align-items:center;justify-content:center;font-size:90px}
.polaroid span{position:absolute;bottom:10px;left:0;right:0;text-align:center;font-family:'Caveat';font-size:30px;color:#222}
</style>`;

const misterio = [
  {
    id: 'misterio-1-precio',
    angulo: 'Comparación de precio (escape room vs. en casa)',
    html: `<div class="ad m">
  <div class="kick">// Plan de fin de semana</div>
  <h1>La experiencia de un <em>escape room</em>… sin salir de casa.</h1>
  <div style="display:flex;gap:30px;margin-top:60px">
    <div class="paper" style="flex:1;padding:36px;transform:rotate(-2deg);opacity:.85">
      <div style="font-size:30px">ESCAPE ROOM</div>
      <div style="font-size:26px;margin-top:20px;line-height:1.5">Entrada por persona<br>+ taxi ida y vuelta<br>+ horario fijo<br>+ 60 min y se acabó</div>
      <div style="font-family:Montserrat;font-weight:900;font-size:64px;margin-top:20px;text-decoration:line-through;text-decoration-color:#b3201a;text-decoration-thickness:8px">S/ 200+</div>
      <div style="font-size:22px">(grupo de 4)</div>
    </div>
    <div class="paper" style="flex:1;padding:36px;transform:rotate(2deg);background:#fff7e6;outline:6px solid #e0433a">
      <div style="font-size:30px;color:#b3201a">NOCHE DE MISTERIO</div>
      <div style="font-size:26px;margin-top:20px;line-height:1.5">Para 2 a 6 jugadores<br>En tu sala, en pijama<br>A la hora que quieras<br>2 horas de juego</div>
      <div style="font-family:Montserrat;font-weight:900;font-size:64px;margin-top:20px;color:#b3201a">S/ 24.90</div>
      <div style="font-size:22px">(todo el grupo)</div>
    </div>
  </div>
  <div class="spacer"></div>
  <div style="text-align:center;font-size:32px;font-weight:700;margin-bottom:28px">Imprimes el caso, sirves algo rico y… ¿quién fue? 🔎</div>
  ${cta('Quiero el caso', '→ WhatsApp')}
  ${pay('#f3ead7')}
</div>`,
  },
  {
    id: 'misterio-2-pareja',
    angulo: 'Plan en pareja / papás (gancho adaptado de Murder in Prague)',
    html: `<div class="ad m" style="background:radial-gradient(circle at 70% 30%,#2b2140,#0b0e14 70%)">
  <div class="kick">// Para papás que no salen hace meses</div>
  <h1>¿El bebé por fin se durmió? 👶💤</h1>
  <div style="font-family:'Playfair Display';font-style:italic;font-size:54px;margin-top:20px;color:#e9c46a">Su cita de hoy: resolver un asesinato.</div>
  <div style="position:relative;height:560px;margin-top:50px">
    <div class="folder" style="position:absolute;left:60px;top:60px;width:820px;height:460px;padding:50px">
      <div class="paper" style="padding:30px 36px;width:520px;transform:rotate(1deg)">
        <div style="font-size:30px">EXPEDIENTE N.º 07</div>
        <div style="font-size:24px;margin-top:14px;line-height:1.55">Víctima: el dueño de la hacienda.<br>Sospechosos: 5.<br>Coartadas: todas falsas.<br>Tiempo estimado: 2 horas.</div>
      </div>
      <div class="stamp" style="position:absolute;right:50px;bottom:60px">CONFIDENCIAL</div>
    </div>
    <div class="polaroid" style="right:30px;top:0;transform:rotate(8deg)"><div>🕯️</div><span>la escena</span></div>
  </div>
  <div class="spacer"></div>
  <div style="text-align:center;font-size:30px;font-weight:700;margin-bottom:26px">Sin niñera. Sin tráfico. Sin gastar en salir.</div>
  ${cta('Pedir mi caso por WhatsApp')}
  ${pay('#f3ead7')}
</div>`,
  },
  {
    id: 'misterio-3-incluye',
    angulo: 'Qué incluye (demostración del producto)',
    html: `<div class="ad m" style="background:#14100c">
  <div class="kick" style="text-align:center">// Lo que recibes</div>
  <h1 style="text-align:center;font-size:74px">Todo el caso, listo para imprimir 🗂️</h1>
  <div style="display:flex;gap:40px;margin-top:50px;align-items:center">
    <div style="position:relative;width:420px;height:560px;flex:none">
      <div class="paper" style="position:absolute;inset:40px 0 0 40px;transform:rotate(6deg)"></div>
      <div class="paper" style="position:absolute;inset:20px 20px 20px 20px;transform:rotate(-4deg)"></div>
      <div class="paper" style="position:absolute;inset:0 40px 40px 0;padding:34px">
        <div style="font-size:28px;border-bottom:3px solid #2a2018;padding-bottom:10px">SOSPECHOSO #3</div>
        <div style="width:150px;height:150px;background:#ccc2ab;margin:24px 0;display:flex;align-items:center;justify-content:center;font-size:90px">🕵️</div>
        <div style="font-size:22px;line-height:1.6">Nombre: R. Valdivia<br>Motivo: herencia<br>Coartada: “estaba en el jardín”</div>
        <div class="stamp" style="font-size:30px;margin-top:20px">PISTA 4</div>
      </div>
    </div>
    <ul class="check" style="font-size:31px;font-weight:700;line-height:1.3">
      <li>Historia del crimen para leer en voz alta</li>
      <li>Fichas de 5 sospechosos</li>
      <li>12 pistas: cartas, fotos y documentos</li>
      <li>Hoja de detective para cada jugador</li>
      <li>Solución en sobre “no abrir”</li>
    </ul>
  </div>
  <style>.m .check li:before{background:#e0433a;color:#fff}</style>
  <div class="spacer"></div>
  <div style="text-align:center;font-size:30px;font-weight:700;margin-bottom:26px">PDF en A4 · Para 2 a 6 jugadores · Desde 12 años</div>
  ${cta('Pedir por WhatsApp', '· S/ 24.90')}
  ${pay('#f3ead7')}
</div>`,
  },
  {
    id: 'misterio-4-como-funciona',
    angulo: 'Objeción: cómo funciona / entrega inmediata',
    html: `<div class="ad m" style="background:linear-gradient(180deg,#0b0e14,#1d2433)">
  <div class="kick">// ¿Y cómo lo recibo?</div>
  <h1>Lo pides hoy.<br><em>Lo juegas hoy.</em></h1>
  <div style="display:flex;gap:44px;margin-top:56px;align-items:center">
    <div style="width:390px;height:700px;flex:none;background:#111;border-radius:52px;padding:18px;box-shadow:0 30px 60px rgba(0,0,0,.6)">
      <div style="height:100%;border-radius:38px;background:#efe7dd;overflow:hidden;font-family:Montserrat">
        <div style="background:#075e54;color:#fff;padding:24px 22px;font-weight:700;font-size:22px">🔎 Noche de Misterio</div>
        <div style="padding:18px;display:flex;flex-direction:column;gap:14px;font-size:19px;color:#111">
          <div style="align-self:flex-end;background:#dcf8c6;padding:12px 16px;border-radius:14px;max-width:85%">Hola! Quiero el caso para jugar hoy 🙌</div>
          <div style="background:#fff;padding:12px 16px;border-radius:14px;max-width:85%">¡Hola! Son S/ 24.90. Te paso el Yape 👇</div>
          <div style="align-self:flex-end;background:#dcf8c6;padding:12px 16px;border-radius:14px;max-width:85%">Listo, ya yapeé ✅</div>
          <div style="background:#fff;padding:12px 16px;border-radius:14px;max-width:85%">¡Gracias! Aquí tu caso 🕵️</div>
          <div style="background:#fff;padding:12px;border-radius:14px;max-width:85%;display:flex;gap:10px;align-items:center"><span style="background:#e0433a;color:#fff;font-weight:900;padding:10px 8px;border-radius:6px;font-size:16px">PDF</span><span style="font-weight:700">Expediente_07.pdf</span></div>
        </div>
      </div>
    </div>
    <div style="font-size:34px;font-weight:700;line-height:1.35">
      <div style="margin-bottom:36px"><span style="color:#e0433a;font-weight:900;font-size:60px">1</span><br>Escríbenos por WhatsApp</div>
      <div style="margin-bottom:36px"><span style="color:#e0433a;font-weight:900;font-size:60px">2</span><br>Pagas con Yape o Plin</div>
      <div><span style="color:#e0433a;font-weight:900;font-size:60px">3</span><br>Te llega el PDF en minutos. Imprimes y a jugar.</div>
    </div>
  </div>
  <div class="spacer"></div>
  ${cta('Quiero jugar hoy')}
  <div class="pay" style="color:#f3ead7">Sin envíos ni esperas · Sirve para cumpleaños, reuniones y citas</div>
</div>`,
  },
];

/* ============================== BODAS ============================== */
const bodasCss = `<style>
.b{background:#fbf6f0;color:#3b2f2a}
.b .kick{color:#b07d62;font-weight:800;font-size:26px;letter-spacing:5px;text-transform:uppercase}
.b h1{font-family:'Playfair Display';font-weight:900;font-size:80px;line-height:1.05;margin-top:16px}
.b h1 em{color:#b07d62}
.sheet{background:#fff;border-radius:22px;box-shadow:0 25px 50px rgba(120,80,60,.18);border:1px solid #eadfd5}
.b .check li:before{background:#d9a58b;color:#fff}
.tab{display:flex;justify-content:space-between;padding:16px 26px;border-bottom:1px solid #f0e6dc;font-size:24px}
</style>`;

const bodas = [
  {
    id: 'bodas-1-abrumada',
    angulo: 'Dolor: sentirse abrumada (gancho adaptado de Bliss & Bone)',
    html: `<div class="ad b">
  <div class="kick">Si estás organizando tu boda…</div>
  <h1>…y sientes que todo se te va de las manos, <em>para un momento.</em></h1>
  <div style="display:flex;gap:30px;margin-top:56px;align-items:stretch">
    <div style="flex:1;background:#f1e7df;border-radius:22px;padding:30px;transform:rotate(-2deg)">
      <div style="font-weight:900;font-size:26px;color:#a0897c;margin-bottom:16px">HOY 😵‍💫</div>
      <div style="font-family:Caveat;font-size:36px;line-height:1.25;color:#6a5a52">
        ¿cuánto cobra el DJ?<br>falta confirmar a la tía 🤯<br><s>local</s> ¿adelanto?<br>notas en 4 chats<br>¿cuánto llevamos gastado??<br>¿y el fotógrafo???
      </div>
    </div>
    <div class="sheet" style="flex:1;padding:30px;transform:rotate(2deg)">
      <div style="font-weight:900;font-size:26px;color:#b07d62;margin-bottom:16px">CON TU PLANNER ✨</div>
      <ul class="check" style="font-size:26px;font-weight:700">
        <li>Todo en un solo lugar</li><li>Sabes qué toca cada mes</li><li>Presupuesto bajo control</li><li>Invitados confirmados</li>
      </ul>
    </div>
  </div>
  <div class="spacer"></div>
  <div style="text-align:center;font-family:'Playfair Display';font-style:italic;font-size:44px;margin-bottom:30px">Tu boda merece que la disfrutes, no que la sufras.</div>
  ${cta('Quiero mi planner')}
  ${pay('#7a6a62')}
</div>`,
  },
  {
    id: 'bodas-2-precio',
    angulo: 'Comparación de precio (wedding planner vs. planner digital)',
    html: `<div class="ad b" style="background:linear-gradient(180deg,#fbf6f0,#f3e3d8)">
  <div class="kick" style="text-align:center">Organiza como una profesional</div>
  <h1 style="text-align:center">Todo lo que hace una wedding planner… <em>en tus manos.</em></h1>
  <div style="display:flex;gap:30px;margin-top:60px">
    <div style="flex:1;border:3px dashed #cbb5a6;border-radius:24px;padding:40px;text-align:center;opacity:.8">
      <div style="font-size:28px;font-weight:800">Wedding planner</div>
      <div style="font-size:24px;margin-top:10px">por evento</div>
      <div style="font-family:'Playfair Display';font-weight:900;font-size:70px;margin-top:30px;text-decoration:line-through;text-decoration-color:#c0392b;text-decoration-thickness:6px">S/ 3,000+</div>
    </div>
    <div class="sheet" style="flex:1;padding:40px;text-align:center;border:4px solid #b07d62">
      <div style="font-size:28px;font-weight:800">Planner digital</div>
      <div style="font-size:24px;margin-top:10px">pago único</div>
      <div style="font-family:'Playfair Display';font-weight:900;font-size:86px;margin-top:20px;color:#b07d62">S/ 29.90</div>
    </div>
  </div>
  <ul class="check" style="font-size:30px;font-weight:700;margin-top:56px;padding-left:20px">
    <li>Checklist mes a mes hasta el gran día</li>
    <li>Presupuesto que se calcula solo</li>
    <li>Lista de invitados y proveedores</li>
  </ul>
  <div class="spacer"></div>
  ${cta('Pedir por WhatsApp')}
  ${pay('#7a6a62')}
</div>`,
  },
  {
    id: 'bodas-3-checklist',
    angulo: 'Demostración del producto (checklist mes a mes)',
    html: `<div class="ad b" style="background:#f5ede6">
  <div class="kick">¿No sabes por dónde empezar?</div>
  <h1 style="font-size:72px">💍 Te decimos qué hacer <em>cada mes</em> hasta tu boda</h1>
  <div class="sheet" style="margin-top:50px;overflow:hidden">
    <div style="background:#d9a58b;color:#fff;padding:22px 30px;font-weight:900;font-size:28px;display:flex;justify-content:space-between"><span>CHECKLIST DE MI BODA</span><span>63% ✓</span></div>
    ${[
      ['12 meses antes', 'Definir presupuesto y fecha', true],
      ['10 meses antes', 'Reservar local y catering', true],
      ['8 meses antes', 'Fotógrafo, música y vestido', true],
      ['6 meses antes', 'Enviar save the date', true],
      ['3 meses antes', 'Confirmar invitados', false],
      ['1 mes antes', 'Pruebas finales y pagos', false],
      ['El gran día', 'Cronograma hora por hora', false],
    ].map(([t, d, ok]) => `<div class="tab"><span style="font-weight:800;color:#b07d62;width:270px">${t}</span><span style="flex:1;${ok ? 'text-decoration:line-through;opacity:.55' : ''}">${d}</span><span style="font-size:28px">${ok ? '✅' : '⬜'}</span></div>`).join('')}
  </div>
  <div style="text-align:center;font-size:28px;font-weight:700;margin-top:30px">+ presupuesto · invitados · proveedores · mesas · cronograma del día</div>
  <div class="spacer"></div>
  ${cta('Quiero mi checklist')}
  <div class="pay" style="color:#7a6a62">Funciona en Google Sheets (celular o laptop) y en PDF para imprimir</div>
</div>`,
  },
  {
    id: 'bodas-4-presupuesto',
    angulo: 'Miedo a gastar de más (control del presupuesto)',
    html: `<div class="ad b" style="background:#2f2622;color:#fbf6f0">
  <div class="kick" style="color:#e2b49a">Pregunta incómoda</div>
  <h1 style="color:#fbf6f0">¿Sabes cuánto llevas gastado <em style="color:#e2b49a">en tu boda?</em></h1>
  <div style="font-size:32px;margin-top:20px;opacity:.85">Los “gastitos” suman. Y suman rápido.</div>
  <div class="sheet" style="margin-top:46px;color:#3b2f2a;overflow:hidden">
    <div class="tab" style="font-weight:900;background:#f6ece4"><span>Rubro</span><span>Presupuesto</span><span>Real</span></div>
    ${[
      ['🏛️ Local', '8,000', '8,000', 0],
      ['🍽️ Catering', '12,000', '13,500', 1],
      ['📸 Foto y video', '3,500', '3,500', 0],
      ['🎶 Música / DJ', '2,000', '2,600', 1],
      ['💐 Decoración', '2,500', '3,100', 1],
    ].map(([a, b2, c, over]) => `<div class="tab"><span style="width:330px">${a}</span><span style="width:180px;text-align:right">S/ ${b2}</span><span style="width:180px;text-align:right;font-weight:800;color:${over ? '#c0392b' : '#2e8b57'}">S/ ${c}</span></div>`).join('')}
    <div class="tab" style="font-weight:900;font-size:28px;background:#fdecea;color:#c0392b"><span>Te pasaste en</span><span>S/ 2,700 ⚠️</span></div>
  </div>
  <div style="font-size:30px;font-weight:700;margin-top:34px;text-align:center">Con el planner lo ves <u>antes</u> de que pase. Las sumas se hacen solas.</div>
  <div class="spacer"></div>
  ${cta('Quiero mi planner', '· S/ 29.90')}
  ${pay('#e9d8cc')}
</div>`,
  },
];

/* ============================== TERAPIA ============================== */
const terapiaCss = `<style>
.t{background:#fffaf0;color:#1f2a44;font-family:'Nunito',sans-serif}
.t .kick{font-weight:900;font-size:28px;color:#3a86ff;letter-spacing:2px;text-transform:uppercase}
.t h1{font-weight:900;font-size:78px;line-height:1.05;margin-top:16px}
.t h1 em{font-style:normal;background:linear-gradient(transparent 60%,#ffd166 60%)}
.card{background:#fff;border-radius:28px;box-shadow:0 18px 40px rgba(31,42,68,.12);padding:44px 20px;text-align:center;font-weight:900}
.card .e{font-size:100px;line-height:1.1}
.t .check li:before{background:#06d6a0;color:#fff}
.t .cta{font-family:'Montserrat'}
.disc{text-align:center;font-size:20px;opacity:.6;margin-top:10px;font-weight:700}
</style>`;

const terapia = [
  {
    id: 'terapia-1-terapeutas',
    angulo: 'Terapeutas: ahorro de tiempo (gancho adaptado de OT Toolkit)',
    html: `<div class="ad t">
  <div class="kick">Para terapeutas y docentes</div>
  <h1>¿Cuántas horas pierdes <em>buscando actividades</em> para tus sesiones?</h1>
  <div style="display:flex;gap:26px;margin-top:50px;align-items:stretch">
    <div style="flex:1;background:#ffe5e5;border-radius:28px;padding:30px;font-size:28px;font-weight:700;line-height:1.5">
      <div style="font-weight:900;color:#e63946;margin-bottom:10px">ANTES 😩</div>
      Domingo en la noche<br>buscando en Pinterest,<br>armando fichas una por una…
    </div>
    <div style="font-size:60px;align-self:center">➜</div>
    <div style="flex:1;background:#d8f8ec;border-radius:28px;padding:30px;font-size:28px;font-weight:700;line-height:1.5">
      <div style="font-weight:900;color:#06a77d;margin-bottom:10px">AHORA 😌</div>
      Abres la carpeta,<br>eliges el área<br>e imprimes. Listo.
    </div>
  </div>
  <div style="text-align:center;margin-top:50px">
    <div style="font-weight:900;font-size:120px;color:#3a86ff;line-height:1">+300</div>
    <div style="font-weight:900;font-size:40px">actividades listas para imprimir</div>
    <div style="font-size:28px;font-weight:700;margin-top:10px;opacity:.8">ordenadas por área y por edad</div>
  </div>
  <div class="spacer"></div>
  ${cta('Ver el kit por WhatsApp')}
  ${pay('#1f2a44')}
</div>`,
  },
  {
    id: 'terapia-2-en-casa',
    angulo: 'Mamás y papás: reforzar en casa entre sesiones',
    html: `<div class="ad t" style="background:#eef5ff">
  <div class="kick">Para mamás y papás</div>
  <h1>La terapia es 1 hora a la semana. <em>¿Y el resto de días?</em></h1>
  <div style="display:flex;gap:12px;margin-top:50px">
    ${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => `<div style="flex:1;border-radius:22px;padding:22px 0;text-align:center;font-weight:900;font-size:34px;background:${i === 1 ? '#3a86ff' : '#fff'};color:${i === 1 ? '#fff' : '#1f2a44'};box-shadow:0 10px 24px rgba(31,42,68,.1)">${d}<div style="font-size:44px;margin-top:8px">${i === 1 ? '🩺' : '🧩'}</div></div>`).join('')}
  </div>
  <div style="text-align:center;font-size:24px;font-weight:700;margin-top:14px;opacity:.7">🩺 sesión con la terapeuta · 🧩 actividades en casa</div>
  <ul class="check" style="font-size:32px;font-weight:700;margin-top:50px">
    <li>Actividades cortas de 10–15 minutos</li>
    <li>Con instrucciones simples, sin ser especialista</li>
    <li>Con materiales que ya tienes en casa</li>
    <li>Ideales para llevarlas a tu terapeuta y trabajar en equipo</li>
  </ul>
  <div class="spacer"></div>
  ${cta('Quiero el kit', '→ WhatsApp')}
  <div class="disc">Material de apoyo. No reemplaza la terapia profesional.</div>
</div>`,
  },
  {
    id: 'terapia-3-incluye',
    angulo: 'Qué incluye (áreas del kit)',
    html: `<div class="ad t">
  <div class="kick" style="text-align:center">Kit digital de actividades</div>
  <h1 style="text-align:center;font-size:72px">Todo lo que trabajas en terapia, <em>en un solo kit</em></h1>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;margin-top:50px">
    ${[
      ['✂️', 'Motricidad fina', '#ffd166'],
      ['🗣️', 'Lenguaje y comunicación', '#a0e7e5'],
      ['😊', 'Emociones', '#ffadad'],
      ['🗓️', 'Rutinas visuales', '#bdb2ff'],
      ['🧠', 'Atención y memoria', '#caffbf'],
      ['🖐️', 'Juego sensorial', '#ffc6ff'],
    ].map(([e, t, c]) => `<div class="card" style="background:${c}"><div class="e">${e}</div><div style="font-size:28px;margin-top:10px;line-height:1.15">${t}</div></div>`).join('')}
  </div>
  <div style="display:flex;justify-content:center;gap:40px;margin-top:44px;font-size:30px;font-weight:900">
    <span>📄 +300 fichas</span><span>🖨️ PDF imprimible</span><span>♾️ Acceso de por vida</span>
  </div>
  <div class="spacer"></div>
  ${cta('Pedir el kit', '· S/ 29.90')}
  ${pay('#1f2a44')}
</div>`,
  },
  {
    id: 'terapia-4-rutinas',
    angulo: 'Beneficio concreto: rutinas visuales (anticipación)',
    html: `<div class="ad t" style="background:#fff3e0">
  <div class="kick">Anticipar ayuda</div>
  <h1>Cuando puede <em>ver</em> lo que viene, el día fluye mejor.</h1>
  <div style="font-size:30px;font-weight:700;margin-top:18px;opacity:.8">Pictogramas y rutinas visuales listos para imprimir, recortar y pegar.</div>
  <div style="background:#fff;border-radius:30px;padding:30px;margin-top:44px;box-shadow:0 18px 40px rgba(31,42,68,.12)">
    <div style="font-weight:900;font-size:30px;margin-bottom:20px">☀️ MI MAÑANA</div>
    <div style="display:flex;gap:14px">
      ${[['🛏️', 'Despertar', 1], ['🚽', 'Baño', 1], ['🪥', 'Dientes', 1], ['👕', 'Vestirme', 0], ['🥣', 'Desayuno', 0], ['🎒', 'Colegio', 0]].map(([e, t, ok]) => `<div style="flex:1;border:4px solid ${ok ? '#06d6a0' : '#dfe6f0'};border-radius:20px;padding:16px 4px;text-align:center;position:relative"><div style="font-size:64px">${e}</div><div style="font-weight:900;font-size:22px;margin-top:6px">${t}</div>${ok ? '<div style="position:absolute;top:-16px;right:-10px;background:#06d6a0;color:#fff;border-radius:50%;width:40px;height:40px;font-weight:900;font-size:24px;display:flex;align-items:center;justify-content:center">✓</div>' : ''}</div>`).join('')}
    </div>
  </div>
  <ul class="check" style="font-size:30px;font-weight:700;margin-top:44px">
    <li>Rutinas de mañana, noche, baño y comida</li>
    <li>Tableros de “primero / después”</li>
    <li>Tarjetas de emociones para expresar lo que siente</li>
  </ul>
  <div class="spacer"></div>
  ${cta('Quiero las rutinas', '→ WhatsApp')}
  <div class="disc">Incluidas en el kit completo de +300 actividades · Material de apoyo, no reemplaza la terapia.</div>
</div>`,
  },
];

const all = [
  ...misterio.map((a) => ({ ...a, css: misterioCss })),
  ...bodas.map((a) => ({ ...a, css: bodasCss })),
  ...terapia.map((a) => ({ ...a, css: terapiaCss })),
];

(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const a of all) {
    const file = path.join(HTML, `${a.id}.html`);
    fs.writeFileSync(file, `<!doctype html><html lang="es"><head><meta charset="utf-8">${base}${a.css}</head><body>${a.html}</body></html>`);
    await page.goto('file://' + file);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, `${a.id}.png`) });
    console.log('ok', a.id);
  }
  await browser.close();
})();
