'use client'

import { VOCES } from './data'
import * as musica from './musica'

/* Voz de Leo: MP3 con fallback a speechSynthesis — port directo del original */

let audio = null
let texto = ''
let vozId = null
let volumenVoz = 0.85
let vocesDisponibles = []

function recurso(nombre) {
  return new URL(nombre, document.baseURI).href
}

function actualizarVoces() {
  vocesDisponibles = 'speechSynthesis' in window ? speechSynthesis.getVoices() : []
  return vocesDisponibles
}

// Callbacks que la UI registra para reaccionar (globo + animación habla)
let onTexto = null
let onHabla = null

export function registrarUI({ setTexto, setHabla }) {
  onTexto = setTexto
  onHabla = setHabla
}

export function getTexto() { return texto }
export function getVozId() { return vozId }

function hablando(v) {
  if (onHabla) onHabla(v)
  musica.agachar(v)
}

function parar() {
  if (audio) { try { audio.pause() } catch (q) {} audio = null }
  if ('speechSynthesis' in window) speechSynthesis.cancel()
}

function sonar(id, t, fin) {
  parar()
  hablando(true)
  let cayo = false, listo = false
  const ok = () => { if (listo) return; listo = true; hablando(false); if (fin) fin() }
  const fb = () => { if (cayo) return; cayo = true; vozNav(t, ok) }
  try {
    const a = new Audio(recurso('voces/' + id + '.mp3'))
    a.volume = volumenVoz
    audio = a
    a.addEventListener('ended', ok)
    a.addEventListener('error', fb)
    a.play().then(() => {}).catch(fb)
  } catch (q) { fb() }
}

function vozNav(t, fin) {
  if (!('speechSynthesis' in window)) { hablando(false); if (fin) fin(); return }
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(t)
  u.lang = 'es-ES'
  u.volume = volumenVoz
  const v = (vocesDisponibles.length ? vocesDisponibles : actualizarVoces()).find(z => /^es([_-]|$)/i.test(z.lang))
  if (v) u.voice = v
  u.rate = 1.04; u.pitch = 1.12
  u.onend = () => { hablando(false); if (fin) fin() }
  u.onerror = () => { hablando(false); if (fin) fin() }
  speechSynthesis.speak(u)
}

export function hablar(id, fin) {
  const t = VOCES[id] || ''
  texto = t
  vozId = id
  if (onTexto) onTexto(t)
  sonar(id, t, fin)
}

export function repetir() { if (vozId) sonar(vozId, texto) }
export function pararVoz() { parar() }

export function volumenDeVoz(v) {
  volumenVoz = Math.max(0, Math.min(1, v))
  if (audio) audio.volume = volumenVoz
}

export function initVoces() {
  if (!('speechSynthesis' in window)) return
  actualizarVoces()
  speechSynthesis.onvoiceschanged = actualizarVoces
}
