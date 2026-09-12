import { VOCES, NIVELES } from './mensajes'

export { VOCES, NIVELES }

export const SEGUNDOS = 300
export const PTS = 100
export const BONO = 100
export const N = NIVELES.length

export const ESTILOS = [
  ['adventurer', 'Aventura'],
  ['avataaars', 'Clásico'],
  ['big-smile', 'Sonrisa'],
  ['micah', 'Moderno']
]

export const norm = s =>
  s.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Z0-9]/g, '')

export const rnd = a => a[Math.floor(Math.random() * a.length)]

export function urlAvatar(seed, estilo, px) {
  return (
    'https://api.dicebear.com/9.x/' + (estilo || 'adventurer') + '/svg?seed=' +
    encodeURIComponent(seed || 'inicio') +
    '&backgroundColor=transparent' + (px ? '&size=' + px : '')
  )
}