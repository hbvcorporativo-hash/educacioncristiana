'use client'

import { VOCES } from './data'
import { publicAsset } from './assets'
import * as musica from './musica'

let audio = null
let texto = ''
let vozId = null
let volumenVoz = 0.85
let agente = 'principal'
let reproduccion = 0

let onTexto = null
let onHabla = null

function recurso(nombre) {
  return publicAsset('/' + nombre)
}

function carpetaAgente() {
  return agente === 'mujer' ? 'sara' : 'leo'
}

function textoAgente(t) {
  return agente === 'mujer' ? t.replace(/Leo/g, 'Sara').replace(/aliado/g, 'aliada') : t
}

function hablando(v) {
  if (onHabla) onHabla(v)
  musica.agachar(v)
}

function finalizar(token, fin) {
  if (token !== reproduccion) return
  if (audio) {
    audio.onended = null
    audio.onerror = null
  }
  hablando(false)
  if (fin) fin()
}

function parar() {
  reproduccion++
  if (audio) {
    try { audio.pause() } catch (q) {}
    audio.onended = null
    audio.onerror = null
  }
  hablando(false)
}

function sonar(id, fin) {
  parar()
  const token = ++reproduccion
  const a = audio || new Audio()
  a.pause()
  a.src = recurso('voces/' + carpetaAgente() + '/' + id + '.mp3')
  a.preload = 'auto'
  a.volume = volumenVoz
  a.onended = () => finalizar(token, fin)
  a.onerror = () => finalizar(token, fin)
  audio = a
  hablando(true)
  a.play().catch(() => finalizar(token, fin))
}

export function registrarUI({ setTexto, setHabla }) {
  onTexto = setTexto
  onHabla = setHabla
}

export function getTexto() { return texto }
export function getVozId() { return vozId }

export function hablar(id, fin) {
  const t = textoAgente(VOCES[id] || '')
  texto = t
  vozId = id
  if (onTexto) onTexto(t)
  sonar(id, fin)
}

export function repetir() { if (vozId) sonar(vozId) }
export function pararVoz() { parar() }

export function seleccionarAgente(nombre) {
  if (['principal', 'sistema', 'mujer'].includes(nombre)) {
    agente = nombre
    parar()
  }
}

export function agenteActual() { return agente }

export function volumenDeVoz(v) {
  volumenVoz = Math.max(0, Math.min(1, v))
  if (audio) audio.volume = volumenVoz
}
