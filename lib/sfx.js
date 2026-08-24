'use client'

/* Motor de efectos de sonido — port directo del original */
const sfx = (() => {
  let x = null, mute = false
  const ac = () => {
    if (!x) { try { x = new (window.AudioContext || window.webkitAudioContext)() } catch (q) {} }
    if (x && x.state === 'suspended') x.resume().catch(() => {})
    return x
  }
  const t = (f, d, ty, v, w) => {
    const a = ac()
    if (!a || mute) return
    const s = a.currentTime + (w || 0), o = a.createOscillator(), g = a.createGain()
    o.type = ty || 'sine'
    o.frequency.setValueAtTime(f, s)
    g.gain.setValueAtTime(0, s)
    g.gain.linearRampToValueAtTime(v || .14, s + .012)
    g.gain.exponentialRampToValueAtTime(.0001, s + d)
    o.connect(g).connect(a.destination)
    o.start(s); o.stop(s + d + .02)
  }
  const ch = (fs, d, ty, v) => fs.forEach((f, i) => t(f, d, ty, v, i * .07))
  return {
    init: () => ac(),
    mute: v => { mute = v },
    muted: () => mute,
    tap: () => t(620, .05, 'square', .07),
    mal: () => { t(180, .2, 'sawtooth', .11); t(130, .26, 'sawtooth', .09, .06) },
    bien: () => ch([523, 784, 1046, 1318], .5, 'triangle', .13),
    foto: () => { t(1150, .03, 'square', .08); t(760, .05, 'square', .08, .045) },
    tic: () => t(1500, .03, 'square', .05),
    fin: () => { t(170, .3, 'sawtooth', .12); t(120, .36, 'sawtooth', .1, .08) },
    gana: () => ch([523, 659, 784, 1046, 1318, 1568], .8, 'triangle', .13)
  }
})()

export default sfx
