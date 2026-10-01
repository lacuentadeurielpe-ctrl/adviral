// Genera los 12 anuncios (1080x1350, formato 4:5 para feed) con las páginas reales de cada producto.
// Uso: NODE_PATH=$(npm root -g) node generar.js
// Las páginas de producto/ salen de los PDF con: pdftoppm -png -r 150 <archivo.pdf> <prefijo>
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'png');
const HTML = path.join(__dirname, 'html');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(HTML, { recursive: true });

const RATIO = 1754 / 1240; // alto/ancho de una página A4 renderizada

// Página real del PDF. h = alto visible (recorta el blanco de abajo); top = fracción de la página a saltar.
const pg = (file, w, h, { top = 0, rot = 0, style = '' } = {}) =>
  `<div class="pg" style="width:${w}px;height:${h ?? Math.round(w * RATIO)}px;transform:rotate(${rot}deg);${style}">` +
  `<img src="../producto/${file}" style="width:${w}px;margin-top:-${Math.round(top * w * RATIO)}px"></div>`;

const base = `
<link rel="stylesheet" href="../fonts/fonts.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;overflow:hidden;font-family:'Montserrat',sans-serif}
.ad{position:relative;width:1080px;height:1350px;overflow:hidden;padding:64px 70px 56px;display:flex;flex-direction:column}
.pg{overflow:hidden;border-radius:6px;box-shadow:0 24px 50px rgba(0,0,0,.35);background:#fff;flex:none}
.pg img{display:block}
.cta{display:flex;align-items:center;justify-content:center;gap:18px;background:#25D366;color:#fff;font-weight:900;
  font-size:40px;border-radius:999px;padding:28px 40px;box-shadow:0 12px 30px rgba(0,0,0,.25);letter-spacing:.5px;font-family:'Montserrat'}
.cta small{font-weight:700;font-size:28px;opacity:.95}
.pay{text-align:center;font-weight:700;font-size:23px;margin-top:14px;opacity:.85}
.spacer{flex:1}
.check li{list-style:none;display:flex;gap:16px;align-items:flex-start;margin:0 0 16px}
.check li:before{content:'✓';flex:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:24px}
.tag{display:inline-block;padding:10px 20px;border-radius:999px;font-weight:800;font-size:24px}
</style>`;

const cta = (txt, sub = '') =>
  `<div class="cta"><span>💬</span><span>${txt}</span>${sub ? `<small>${sub}</small>` : ''}</div>`;
const pay = (color, txt = 'Paga con Yape o Plin · Recibe el PDF al instante por WhatsApp') =>
  `<div class="pay" style="color:${color}">${txt}</div>`;

/* ======================= EXPEDIENTE BARRANCO ======================= */
const juegoCss = `<style>
.j{background:radial-gradient(circle at 30% 15%,#2a2420,#14110f 70%);color:#f3ead7}
.j .kick{font-family:'Special Elite';color:#e05a52;font-size:28px;letter-spacing:4px;text-transform:uppercase}
.j h1{font-family:'Playfair Display';font-weight:900;font-size:76px;line-height:1.04;margin-top:14px}
.j h1 em{color:#e05a52;font-style:italic}
.j .check li:before{background:#c0392b;color:#fff}
.stamp{font-family:'Special Elite';color:#c0392b;border:6px solid #c0392b;padding:6px 22px;font-size:40px;letter-spacing:4px;display:inline-block;transform:rotate(-8deg);background:rgba(250,245,235,.92)}
.j .facts{display:flex;gap:14px;flex-wrap:wrap}
.j .facts span{border:2px solid rgba(243,234,215,.35);border-radius:999px;padding:10px 22px;font-weight:700;font-size:25px}
</style>`;

const juego = [
  {
    id: 'juego-1-el-caso',
    angulo: 'Gancho del caso (curiosidad + escenario limeño)',
    html: `<div class="ad j">
  <div class="kick">// Caso abierto · N.º 0412</div>
  <h1>La familia dice que fue un infarto. <em>La necropsia dice cianuro.</em></h1>
  <div style="position:relative;height:620px;margin-top:40px">
    ${pg('juego-03.png', 500, 600, { rot: -4, style: 'position:absolute;left:0;top:10px' })}
    ${pg('juego-06.png', 460, 540, { rot: 5, style: 'position:absolute;right:0;top:40px' })}
    <div class="stamp" style="position:absolute;left:320px;bottom:20px">CIANURO</div>
  </div>
  <div style="font-size:31px;font-weight:700;text-align:center;margin-top:26px;line-height:1.35">Una fiesta en una casona de Barranco. 5 sospechosos.<br>Todos mienten en algo. ¿Quién mató a Rodrigo Salas?</div>
  <div class="spacer"></div>
  ${cta('Quiero resolver el caso', '→ WhatsApp')}
  ${pay('#f3ead7')}
</div>`,
  },
  {
    id: 'juego-2-cita-en-casa',
    angulo: 'Plan de pareja / cita en casa',
    html: `<div class="ad j" style="background:radial-gradient(circle at 70% 20%,#3a2230,#14110f 70%)">
  <div class="kick">// Plan para este sábado</div>
  <h1>Pisco sour, canchita… <em>y un asesinato por resolver.</em></h1>
  <div style="display:flex;gap:36px;margin-top:44px;align-items:center">
    <div style="position:relative;width:440px;height:600px;flex:none">${pg('juego-04.png', 380, 520, { rot: 7, style: 'position:absolute;right:0;top:50px' })}${pg('juego-01.png', 400, 420, { top: 0.25, rot: -4, style: 'position:absolute;left:0;top:30px;outline:3px solid #6b5a4e' })}</div>
    <div>
      <div style="font-family:'Playfair Display';font-style:italic;font-size:44px;color:#e9c46a;line-height:1.15">La cita en casa que no se siente como “otra noche más de Netflix”.</div>
      <ul class="check" style="font-size:28px;font-weight:700;margin-top:30px">
        <li>Modo pareja: compañeros detectives con 90 min en el reloj</li>
        <li>Sin niñera, sin tráfico, sin cuenta de restaurante</li>
        <li>Se juega en pijama</li>
      </ul>
    </div>
  </div>
  <div class="spacer"></div>
  <div class="facts" style="justify-content:center;margin-bottom:26px"><span>👥 1 a 6 detectives</span><span>⏱ 90–120 min</span><span>🔞 +16 años</span></div>
  ${cta('Pedir nuestro caso', '→ WhatsApp')}
  ${pay('#f3ead7')}
</div>`,
  },
  {
    id: 'juego-3-que-incluye',
    angulo: 'Qué incluye (demostración con las páginas reales)',
    html: `<div class="ad j" style="background:#14110f">
  <div class="kick" style="text-align:center">// Lo que recibes</div>
  <h1 style="text-align:center;font-size:70px">El expediente completo, <em>listo para imprimir</em></h1>
  <div style="position:relative;height:560px;margin-top:40px">
    ${pg('juego-01.png', 330, 467, { rot: -9, style: 'position:absolute;left:0;top:50px' })}
    ${pg('juego-04.png', 330, 467, { rot: -2, style: 'position:absolute;left:200px;top:20px' })}
    ${pg('juego-06.png', 330, 467, { rot: 4, style: 'position:absolute;left:410px;top:40px' })}
    ${pg('juego-03.png', 330, 467, { rot: 10, style: 'position:absolute;right:0;top:70px' })}
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;column-gap:30px;margin-top:10px">
    <ul class="check" style="font-size:27px;font-weight:700"><li>El caso + datos clave</li><li>5 sospechosos con declaración</li><li>12 pruebas para recortar</li></ul>
    <ul class="check" style="font-size:27px;font-weight:700"><li>Hoja de acusación</li><li>Pistas de ayuda si se traban</li><li>Solución en archivo aparte</li></ul>
  </div>
  <div class="spacer"></div>
  ${cta('Lo quiero', '→ WhatsApp')}
  ${pay('#f3ead7', 'Se imprime a color o en blanco y negro · 1 a 6 detectives')}
</div>`,
  },
  {
    id: 'juego-4-como-funciona',
    angulo: 'Objeción: cómo lo recibo / lo juego hoy mismo',
    html: `<div class="ad j" style="background:linear-gradient(180deg,#14110f,#2a2420)">
  <div class="kick">// ¿Y cómo lo recibo?</div>
  <h1>Lo pides hoy.<br><em>Lo juegas esta noche.</em></h1>
  <div style="display:flex;gap:40px;margin-top:44px;align-items:center">
    <div style="width:400px;height:720px;flex:none;background:#0a0a0a;border-radius:54px;padding:16px;box-shadow:0 30px 60px rgba(0,0,0,.6)">
      <div style="height:100%;border-radius:40px;background:#efe7dd;overflow:hidden">
        <div style="background:#075e54;color:#fff;padding:24px 22px;font-weight:700;font-size:22px">🔎 Expediente Barranco</div>
        <div style="padding:16px;display:flex;flex-direction:column;gap:12px;font-size:19px;color:#111">
          <div style="align-self:flex-end;background:#dcf8c6;padding:11px 15px;border-radius:14px;max-width:85%">Hola! Quiero el caso para jugar hoy 🙌</div>
          <div style="background:#fff;padding:11px 15px;border-radius:14px;max-width:85%">¡Hola, detective! Te paso el Yape 👇</div>
          <div style="align-self:flex-end;background:#dcf8c6;padding:11px 15px;border-radius:14px;max-width:85%">Listo, ya yapeé ✅</div>
          <div style="background:#fff;padding:11px 15px;border-radius:14px;max-width:85%">¡Gracias! Aquí tu expediente 🕵️</div>
          <div style="background:#fff;padding:8px;border-radius:14px;width:250px">
            ${pg('juego-01.png', 234, 150, { top: 0.32, style: 'box-shadow:none;border-radius:8px' })}
            <div style="display:flex;gap:8px;align-items:center;margin-top:8px"><span style="background:#e05a52;color:#fff;font-weight:900;padding:6px 7px;border-radius:5px;font-size:14px">PDF</span><span style="font-weight:700;font-size:16px">Expediente_Barranco.pdf</span></div>
          </div>
          <div style="background:#fff;padding:10px;border-radius:14px;display:flex;gap:8px;align-items:center;width:250px"><span style="background:#555;color:#fff;font-weight:900;padding:6px 7px;border-radius:5px;font-size:14px">PDF</span><span style="font-weight:700;font-size:16px">SOLUCIÓN.pdf 🔒</span></div>
        </div>
      </div>
    </div>
    <div style="font-size:32px;font-weight:700;line-height:1.3">
      <div style="margin-bottom:34px"><span style="color:#e05a52;font-weight:900;font-size:58px">1</span><br>Nos escribes por WhatsApp</div>
      <div style="margin-bottom:34px"><span style="color:#e05a52;font-weight:900;font-size:58px">2</span><br>Yapeas o plineas</div>
      <div><span style="color:#e05a52;font-weight:900;font-size:58px">3</span><br>Te llega el PDF en minutos. Imprimes, recortas las pruebas y a jugar.</div>
    </div>
  </div>
  <div class="spacer"></div>
  ${cta('Quiero jugar hoy')}
  ${pay('#f3ead7', 'Sin envíos ni esperas · Para cita en pareja, reunión con amigos o cumpleaños')}
</div>`,
  },
];

/* ======================= JUEGA Y AVANZA ======================= */
const kitCss = `<style>
.k{background:linear-gradient(160deg,#e3f2ec,#fbf6ea);color:#1f4e46;font-family:'Nunito',sans-serif}
.k .kick{font-weight:900;font-size:27px;color:#2a9d8f;letter-spacing:2px;text-transform:uppercase}
.k h1{font-family:'Playfair Display';font-weight:900;font-size:74px;line-height:1.05;margin-top:14px}
.k h1 em{font-style:italic;color:#e07a5f}
.k .check li:before{background:#2a9d8f;color:#fff}
.k .pg{box-shadow:0 22px 44px rgba(31,78,70,.22)}
.k .disc{text-align:center;font-size:20px;opacity:.65;margin-top:10px;font-weight:700}
.area{border-radius:22px;padding:22px 16px;text-align:center;font-weight:900;font-size:25px;line-height:1.15;color:#1f4e46}
.area b{display:block;font-size:44px;margin-bottom:6px}
</style>`;

const kit = [
  {
    id: 'kit-1-materiales-caseros',
    angulo: 'Sin gastar: actividades con materiales que ya tienes en casa',
    html: `<div class="ad k">
  <div class="kick">Para niños de 2 a 8 años</div>
  <h1>Ganchos de ropa, menestras y cinta masking. <em>Eso es todo lo que necesitas.</em></h1>
  <div style="display:flex;gap:34px;margin-top:40px;align-items:center">
    ${pg('kit-03.png', 470, 560, { rot: -2 })}
    <ul class="check" style="font-size:29px;font-weight:700;line-height:1.25">
      <li>48 actividades de 10 a 20 minutos</li>
      <li>Cada ficha dice para qué sirve, materiales y cómo se juega</li>
      <li>Versión más fácil y más difícil para adaptarla a tu niño</li>
      <li>Nada de materiales caros</li>
    </ul>
  </div>
  <div class="spacer"></div>
  <div style="text-align:center;font-family:'Playfair Display';font-style:italic;font-size:40px;margin-bottom:26px">Juego, no tarea. Y con lo que hay en la cocina.</div>
  ${cta('Quiero el kit', '→ WhatsApp')}
  ${pay('#1f4e46')}
</div>`,
  },
  {
    id: 'kit-2-plan-4-semanas',
    angulo: 'Mamás y papás: “no sé qué hacer con él en casa” → plan de 4 semanas',
    html: `<div class="ad k" style="background:linear-gradient(160deg,#fdf0e6,#e3f2ec)">
  <div class="kick">Para mamás y papás</div>
  <h1>¿Qué hago hoy con él en casa? <em>Ya no tienes que pensarlo.</em></h1>
  <div style="font-size:30px;font-weight:700;margin-top:18px">El plan de 4 semanas te dice qué 3 fichas tocan cada día: una de movimiento, una de manos y una de calma.</div>
  <div style="margin-top:40px;display:flex;justify-content:center">
    ${pg('kit-16.png', 900, 370, { top: 0.03, style: 'border-radius:18px' })}
  </div>
  <div style="display:flex;gap:16px;justify-content:center;margin-top:36px;flex-wrap:wrap">
    <span class="tag" style="background:#f6cfb3">🏃 Movimiento</span><span class="tag" style="background:#bfe3da">✋ Manos</span><span class="tag" style="background:#f3e08a">🧘 Calma</span>
  </div>
  <div style="text-align:center;font-size:28px;font-weight:700;margin-top:26px">Incluye registro semanal para anotar qué le gusta y qué le cuesta,<br>y llevarlo a su profesor o terapeuta.</div>
  <div class="spacer"></div>
  ${cta('Quiero el plan', '→ WhatsApp')}
  <div class="disc">Material de juego y estimulación. No reemplaza la evaluación ni la terapia de un profesional.</div>
</div>`,
  },
  {
    id: 'kit-3-que-incluye',
    angulo: 'Qué incluye (6 áreas + 3 bonos)',
    html: `<div class="ad k">
  <div class="kick" style="text-align:center">Kit imprimible · Juega y Avanza</div>
  <h1 style="text-align:center;font-size:68px">48 actividades en <em>6 áreas de desarrollo</em></h1>
  <div style="display:flex;gap:30px;margin-top:40px;align-items:center">
    <div style="position:relative;width:380px;height:520px;flex:none">
      ${pg('kit-05.png', 320, 452, { rot: 7, style: 'position:absolute;right:0;top:40px' })}
      ${pg('kit-01.png', 340, 481, { rot: -4, style: 'position:absolute;left:0;top:0' })}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;flex:1">
      ${[
        ['✂️', 'Motricidad fina', '#f6cfb3'],
        ['🤸', 'Motricidad gruesa', '#bfe3c8'],
        ['🖐️', 'Exploración sensorial', '#bcd9f2'],
        ['🧘', 'Calma y emociones', '#d9c8ef'],
        ['🧩', 'Atención y planificación', '#f3e08a'],
        ['👕', 'Autonomía diaria', '#f4b6b0'],
      ].map(([e, t, c]) => `<div class="area" style="background:${c}"><b>${e}</b>${t}</div>`).join('')}
    </div>
  </div>
  <div style="background:#fff;border-radius:24px;padding:22px 28px;margin-top:34px;font-size:27px;font-weight:800;box-shadow:0 12px 30px rgba(31,78,70,.12)">
    🎁 <span style="color:#e07a5f">+3 bonos:</span> registro semanal · plan de 4 semanas · kit de calma para la refri
  </div>
  <div class="spacer"></div>
  ${cta('Pedir el kit', '→ WhatsApp')}
  ${pay('#1f4e46', 'Para mamás, papás, docentes y terapeutas · PDF listo para imprimir')}
</div>`,
  },
  {
    id: 'kit-4-kit-de-calma',
    angulo: 'Momento de dolor concreto: el berrinche → kit de calma para la refri',
    html: `<div class="ad k" style="background:linear-gradient(160deg,#ece6f6,#fbf6ea)">
  <div class="kick">Cuando llega el berrinche…</div>
  <h1>…tener un plan a la vista <em>te cambia la tarde.</em></h1>
  <div style="font-size:30px;font-weight:700;margin-top:18px">6 estrategias de calma con dibujos, para recortar y pegar en la refrigeradora.</div>
  <div style="margin-top:40px;display:flex;justify-content:center;position:relative">
    ${pg('kit-16.png', 940, 530, { top: 0.325, style: 'border-radius:18px' })}
    <div style="position:absolute;bottom:-24px;right:30px;background:#e07a5f;color:#fff;font-weight:900;font-size:24px;padding:10px 20px;border-radius:999px;transform:rotate(4deg)">📌 Bono incluido</div>
  </div>
  <div style="text-align:center;font-size:28px;font-weight:700;margin-top:30px;line-height:1.4">Sopla la vela · Abrazo de oso · Modo tortuga<br>Agua fría · Empuja la pared · Tararea</div>
  <div style="text-align:center;font-size:26px;font-weight:700;margin-top:18px;opacity:.85">+ 48 actividades sensoriales y motoras para niños de 2 a 8 años</div>
  <div class="spacer"></div>
  ${cta('Quiero el kit', '→ WhatsApp')}
  <div class="disc">Material de juego y estimulación. No reemplaza la evaluación ni la terapia de un profesional.</div>
</div>`,
  },
];

/* ======================= NUESTRO GRAN DÍA ======================= */
const plannerCss = `<style>
.b{background:radial-gradient(circle at 50% 30%,#fbf3ee,#f1e0d6);color:#5b3a2e}
.b .kick{color:#b07d62;font-weight:800;font-size:25px;letter-spacing:5px;text-transform:uppercase}
.b h1{font-family:'Playfair Display';font-weight:900;font-size:76px;line-height:1.05;margin-top:14px}
.b h1 em{color:#b07d62}
.b .check li:before{background:#c99178;color:#fff}
.b .pg{box-shadow:0 22px 44px rgba(120,80,60,.22)}
.note{background:#fff8e7;font-family:Caveat;font-size:34px;line-height:1.2;color:#6a5a52;padding:24px 26px;box-shadow:0 14px 30px rgba(120,80,60,.2)}
</style>`;

const planner = [
  {
    id: 'planner-1-abrumada',
    angulo: 'Dolor: sentirse abrumada (adaptación del gancho de Bliss & Bone)',
    html: `<div class="ad b">
  <div class="kick">Si estás organizando tu matrimonio…</div>
  <h1>…y sientes que todo se te va de las manos, <em>para un momento.</em></h1>
  <div style="position:relative;height:620px;margin-top:40px">
    <div class="note" style="position:absolute;left:0;top:30px;width:400px;transform:rotate(-5deg)">
      <div style="font-family:Montserrat;font-weight:900;font-size:22px;color:#a0897c;margin-bottom:10px">HOY 😵‍💫</div>
      ¿cuánto cobra el DJ?<br>¿y la hora loca?<br>falta confirmar a la tía 🤯<br>¿qué papeles pide la muni?<br>notas en 4 chats<br>¿cuánto llevamos gastado??
    </div>
    ${pg('planner-01.png', 420, 594, { rot: 4, style: 'position:absolute;right:0;top:0;outline:2px solid #d8bfb0' })}
    <div style="position:absolute;left:400px;top:420px;font-size:80px">➜</div>
  </div>
  <div style="text-align:center;font-family:'Playfair Display';font-style:italic;font-size:42px;margin-top:10px">Todo tu matrimonio organizado en un solo lugar.</div>
  <div class="spacer"></div>
  ${cta('Quiero mi planner', '→ WhatsApp')}
  ${pay('#7a6a62')}
</div>`,
  },
  {
    id: 'planner-2-hecho-para-peru',
    angulo: 'Diferencial: hecho para matrimonios en Perú (trámites, soles, hora loca)',
    html: `<div class="ad b">
  <div class="kick">No es una plantilla gringa traducida</div>
  <h1>Un planner hecho para <em>casarse en el Perú</em> 🇵🇪</h1>
  <div style="display:flex;gap:34px;margin-top:40px;align-items:center">
    ${pg('planner-06.png', 480, 620, { rot: -3 })}
    <ul class="check" style="font-size:28px;font-weight:700;line-height:1.25">
      <li>Checklist de trámites del civil (municipalidad) y del religioso (parroquia)</li>
      <li>Presupuesto en soles, con adelantos y saldos</li>
      <li>Hora loca, padrinos y canciones clave</li>
      <li>Cronograma del día para darle a cada proveedor</li>
    </ul>
  </div>
  <div class="spacer"></div>
  <div style="text-align:center;font-size:28px;font-weight:700;margin-bottom:26px">Checklist · Presupuesto · Trámites · Invitados · Proveedores · Mesas</div>
  ${cta('Quiero mi planner', '→ WhatsApp')}
  ${pay('#7a6a62')}
</div>`,
  },
  {
    id: 'planner-3-checklist',
    angulo: 'Demostración: checklist mes a mes',
    html: `<div class="ad b" style="background:#f6ece5">
  <div class="kick">¿No sabes por dónde empezar?</div>
  <h1 style="font-size:66px">Qué hacer <em>cada mes</em>, desde 12 meses antes hasta el gran día</h1>
  <div style="margin-top:40px;display:flex;justify-content:center;position:relative">
    ${pg('planner-04.png', 940, 520, { top: 0.03, style: 'border-radius:16px' })}
    <div style="position:absolute;bottom:-26px;right:24px;background:#5b3a2e;color:#fff;font-weight:800;font-size:24px;padding:12px 22px;border-radius:999px">+ recta final: 1 mes, 1 semana y 1 día antes</div>
  </div>
  <div style="text-align:center;font-size:28px;font-weight:700;margin-top:52px">Marca, avanza y deja de preguntarte “¿me estoy olvidando de algo?”</div>
  <div class="spacer"></div>
  ${cta('Quiero mi checklist', '→ WhatsApp')}
  ${pay('#7a6a62', 'PDF imprimible · Recíbelo al instante por WhatsApp')}
</div>`,
  },
  {
    id: 'planner-4-presupuesto',
    angulo: 'Miedo a gastar de más: cómo repartir el presupuesto',
    html: `<div class="ad b" style="background:#3a2a24;color:#fbf1ea">
  <div class="kick" style="color:#e2b49a">Pregunta incómoda</div>
  <h1 style="color:#fbf1ea">¿Cuánto de tu presupuesto debería ir <em style="color:#e2b49a">al catering?</em></h1>
  <div style="font-size:30px;margin-top:16px;opacity:.9">El planner trae el % guía de cada rubro para que repartas tu presupuesto en soles sin adivinar.</div>
  <div style="margin-top:36px;display:flex;justify-content:center;position:relative">
    ${pg('planner-03.png', 940, 560, { top: 0.086, style: 'border-radius:16px' })}
    <div style="position:absolute;left:72px;top:138px;width:262px;height:46px;border:5px solid #e07a5f;border-radius:12px"></div>
  </div>
  <div style="text-align:center;font-size:28px;font-weight:700;margin-top:30px">Presupuesto · costo real · adelanto · saldo · fecha de pago<br><span style="opacity:.8">y un 6 % reservado para imprevistos</span></div>
  <div class="spacer"></div>
  ${cta('Quiero mi planner', '→ WhatsApp')}
  ${pay('#e9d8cc')}
</div>`,
  },
];

const all = [
  ...juego.map((a) => ({ ...a, css: juegoCss })),
  ...kit.map((a) => ({ ...a, css: kitCss })),
  ...planner.map((a) => ({ ...a, css: plannerCss })),
];

(async () => {
  const { chromium } = require('playwright');
  for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f));
  for (const f of fs.readdirSync(HTML)) fs.unlinkSync(path.join(HTML, f));
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
