'use client'

/* Música de fondo continua — port directo del original */
const FUENTES = [
  'canciones/revolution.mp3',
  'revolution.mp3',
  'canciones/principal.mp3',
  'principal.mp3',
  'canciones/1.mp3',
  '1.mp3'
]

let a = null, vol = .07, listo = false, agachada = false, rampId = null, idx = 0

function recurso(nombre) {
  return new URL(nombre, document.baseURI).href
}

function setVol(v) { if (a) a.volume = v }

export function rampTo(target, duration = 2500) {
  if (!a) return
  clearInterval(rampId)
  const start = a.volume
  const diff = target - start
  if (Math.abs(diff) < 0.001) { setVol(target); return }
  const startTime = performance.now()
  rampId = setInterval(() => {
    const elapsed = performance.now() - startTime
    const t = Math.min(1, elapsed / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    setVol(start + diff * eased)
    if (t >= 1) { clearInterval(rampId); rampId = null }
  }, 16)
}

function crear() {
  if (idx >= FUENTES.length) {
    a = null
    listo = false
    idx = 0
    return
  }
  a = new Audio(recurso(FUENTES[idx]))
  a.loop = true
  a.volume = vol
  a.addEventListener('error', () => { idx++; crear(); if (a) a.play().catch(() => {}) }, { once: true })
}

export function iniciar() {
  if (listo && a) {
    a.play().catch(() => {})
    return
  }
  listo = true
  idx = 0
  crear()
  if (a) a.play().catch(() => { listo = false })
}

export function parar() {
  if (a) { try { a.pause() } catch (q) {} }
  clearInterval(rampId); rampId = null
  listo = false; idx = 0; a = null
}

export function volumen(v) {
  vol = Math.max(0, Math.min(1, v))
  if (a && !agachada) setVol(vol)
}

export function agachar(v) {
  agachada = v
  if (!a) return
  if (v) {
    setVol(vol * 0.03 / 0.07)
  } else {
    rampTo(vol, 3000)
  }
}

export function sonando() { return !!(a && !a.paused) }
