import QRCode from 'qrcode'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const OUT = join(import.meta.dirname, '..', 'public', 'qr')
mkdirSync(OUT, { recursive: true })

const CYAN = '#00E5FF'
const SIZE = 400

const preguntas = [
  { id: 1, completa: 'Tu amigo publica una foto y recibe 300 likes. Tú recibes 12. ¿Quién vale más?', abreviada: '¿Quién vale más?' },
  { id: 2, completa: 'Alguien te dice: "Nunca vas a cambiar". ¿Qué haces con esa frase?', abreviada: '¿Qué haces con esa frase?' },
  { id: 3, completa: 'Cometiste un error delante de todos. ¿Tu error define quién eres?', abreviada: '¿Tu error define quién eres?' },
  { id: 4, completa: 'Completa: "Mi identidad depende de ______".', abreviada: 'Mi identidad depende de...' }
]

async function generarPNG(texto, archivo) {
  const buffer = await QRCode.toBuffer(texto, {
    type: 'png',
    width: SIZE,
    margin: 2,
    color: { dark: '#000000', light: CYAN },
    errorCorrectionLevel: 'M'
  })
  writeFileSync(archivo, buffer)
}

async function generarSVG(texto, archivo) {
  const svg = await QRCode.toString(texto, {
    type: 'svg',
    margin: 2,
    color: { dark: '#000000', light: CYAN },
    errorCorrectionLevel: 'M'
  })
  writeFileSync(archivo, svg)
}

async function main() {
  for (const q of preguntas) {
    const num = q.id

    // Versión preguntas completas
    const nomComp = `qr${num}-completo`
    await generarPNG(q.completa, join(OUT, `${nomComp}.png`))
    await generarSVG(q.completa, join(OUT, `${nomComp}.svg`))
    console.log(`✓ ${nomComp}.png / .svg`)

    // Versión preguntas abreviadas
    const nomAbr = `qr${num}-abreviado`
    await generarPNG(q.abreviada, join(OUT, `${nomAbr}.png`))
    await generarSVG(q.abreviada, join(OUT, `${nomAbr}.svg`))
    console.log(`✓ ${nomAbr}.png / .svg`)
  }
  console.log(`\nTotal: 16 archivos generados en ${OUT}`)
}

main().catch(err => { console.error(err); process.exit(1) })
