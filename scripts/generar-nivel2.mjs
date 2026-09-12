import QRCode from 'qrcode'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

/* ============================================================
   NIVEL 2 · ESCANEA LA MENTIRA — páginas de palabras + QRs
   Genera 4 páginas HTML (fondo matriz cian, palabra desordenada
   en blanco al centro) y los QR imprimibles (png/svg) que
   apuntan a cada página con la palabra desordenada en el fragmento.
   ============================================================ */

const BASE_URL = 'https://hbvcorporativo-hash.github.io/educacioncristiana'

const ESTACIONES = [
  { codigo: 'sector-alfa',   palabra: 'AMADO',     etiqueta: 'Sector Alfa' },
  { codigo: 'sector-beta',   palabra: 'ESCOGIDO',  etiqueta: 'Sector Beta' },
  { codigo: 'sector-gamma',  palabra: 'PERDONADO', etiqueta: 'Sector Gamma' },
  { codigo: 'sector-delta',  palabra: 'PROPOSITO', etiqueta: 'Sector Delta' }
]

// 1ra y última letra fijas; el medio queda invertido (desorden determinista)
function desordenar(palabra) {
  if (palabra.length < 4) return palabra
  return palabra[0] + palabra.slice(1, -1).split('').reverse().join('') + palabra[palabra.length - 1]
}

const CIAN = '#00E5FF'
const CHARS = 'アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const COLUMNAS = 14
const TAM_QR = 600

function columna(seed) {
  let s = ''
  for (let i = 0; i < 180; i++) s += CHARS[(seed + i * 17 + i * i) % CHARS.length] + ' '
  return s.trim()
}

function paginaHtml(estacion, desordenada) {
  const letras = desordenada.split('').map((l, i) =>
    `<span style="animation-delay:${(i * 0.14).toFixed(2)}s">${l}</span>`
  ).join('')
  const lluvia = Array.from({ length: COLUMNAS }, (_, i) =>
    `<span>${columna(i * 7 + 3)}</span>`
  ).join('')
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<title>${estacion.etiqueta} · Nivel 2</title>
<style>
  :root { --cian:${CIAN}; }
  * { box-sizing:border-box; margin:0; padding:0; }
  html, body { height:100%; }
  body {
    background:#000;
    font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Consolas,monospace;
    overflow:hidden;
  }
  .lluvia {
    position:absolute; inset:-15%;
    display:flex; justify-content:space-around;
    overflow:hidden; opacity:.42;
    color:var(--cian); font-size:17px; line-height:1.15;
    white-space:pre; filter:drop-shadow(0 0 5px var(--cian));
    pointer-events:none;
  }
  .lluvia span { writing-mode:vertical-rl; animation:caer 3.8s linear infinite; }
  @keyframes caer { from { transform:translateY(-35%); } to { transform:translateY(35%); } }
  body::after {
    content:""; position:absolute; inset:0; pointer-events:none;
    background:repeating-linear-gradient(0deg, rgba(0,229,255,.035) 0 1px, transparent 1px 4px);
  }
  .palabra {
    position:absolute; inset:0; z-index:1;
    display:flex; align-items:center; justify-content:center; gap:.16em;
    padding:0 6vw;
    font-size:clamp(52px, 17vw, 170px);
    font-weight:700; letter-spacing:.08em;
    color:#fff;
    text-align:center;
    text-shadow:0 0 16px rgba(0,229,255,.9), 0 0 44px rgba(0,229,255,.5), 0 0 90px rgba(0,229,255,.25);
  }
  .palabra span { animation:latido 2.8s ease-in-out infinite; }
  @keyframes latido { 0%,100% { opacity:1; } 50% { opacity:.5; } }
  @media print {
    body { background:#fff; overflow:visible; }
    .lluvia, body::after { display:none; }
    .palabra { color:#000; text-shadow:none; position:static; padding:20vh 0; }
  }
</style>
</head>
<body>
  <div class="lluvia" aria-hidden="true">${lluvia}</div>
  <div class="palabra">${letras}</div>
</body>
</html>
`
}

async function generarQR(payload, base) {
  const opts = {
    margin: 2,
    color: { dark: '#000000', light: CIAN },
    errorCorrectionLevel: 'M'
  }
  await QRCode.toFile(base + '.png', payload, { ...opts, type: 'png', width: TAM_QR })
  await QRCode.toFile(base + '.svg', payload, { ...opts, type: 'svg' })
}

async function main() {
  const dirPaginas = join(import.meta.dirname, '..', 'public', 'nivel2')
  const dirQr = join(dirPaginas, 'qr')
  mkdirSync(dirQr, { recursive: true })

  const resumen = []
  for (const est of ESTACIONES) {
    const desordenada = desordenar(est.palabra)
    const archivoHtml = join(dirPaginas, `${est.codigo}.html`)
    writeFileSync(archivoHtml, paginaHtml(est, desordenada))
    console.log(`✓ ${est.codigo}.html  (${est.palabra} → ${desordenada})`)

    const payload = `${BASE_URL}/nivel2/${est.codigo}.html#${desordenada}`
    await generarQR(payload, join(dirQr, est.codigo))
    console.log(`✓ ${est.codigo}.png / .svg  →  ${payload}`)
    resumen.push({ codigo: est.codigo, palabra: est.palabra, desordenada, payload })
  }

  console.log('\n===== RESUMEN PARA EL DOCENTE =====')
  for (const r of resumen) {
    console.log(`${r.codigo}  |  palabra: ${r.palabra}  |  mostrada: ${r.desordenada}  |  ${r.payload}`)
  }
  console.log(`\nTotal: ${ESTACIONES.length} páginas + ${ESTACIONES.length * 2} QRs`)
}

main().catch(err => { console.error(err); process.exit(1) })