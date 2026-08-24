'use client'

/* Efectos visuales: chispas, bandera, flash, confeti — port directo del original */

function anima(el, fr, op, ms) {
  try {
    if (el.animate) { el.animate(fr, op).onfinish = () => el.remove(); return }
  } catch (q) {}
  setTimeout(() => el.remove(), ms || 1000)
}

export function chispas(x, y) {
  const col = ['#22D3EE', '#34E39B', '#FFC531', '#fff']
  for (let i = 0; i < 22; i++) {
    const d = document.createElement('div')
    d.className = 'chispa'
    const s = 5 + Math.random() * 7
    d.style.cssText = `left:${x}px;top:${y}px;width:${s}px;height:${s}px;background:${col[i % col.length]};transform:translate(-50%,-50%)`
    document.body.appendChild(d)
    const a = Math.random() * Math.PI * 2, di = 60 + Math.random() * 110
    anima(d,
      [{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
       { transform: `translate(calc(-50% + ${(Math.cos(a) * di) | 0}px),calc(-50% + ${(Math.sin(a) * di) | 0}px)) scale(.2)`, opacity: 0 }],
      { duration: 650 + Math.random() * 450, easing: 'cubic-bezier(.2,.7,.4,1)' }, 1200)
  }
}

export function bandera(t) {
  const b = document.getElementById('bandera')
  if (!b) return
  document.getElementById('banderaTxt').textContent = t
  b.classList.remove('ver'); void b.offsetWidth; b.classList.add('ver')
  setTimeout(() => b.classList.remove('ver'), 1400)
}

export function flash() {
  const f = document.getElementById('flash')
  if (!f) return
  f.classList.remove('go'); void f.offsetWidth; f.classList.add('go')
}

export function confeti() {
  const col = ['#22D3EE', '#34E39B', '#FFC531', '#FF6B9D', '#fff']
  for (let i = 0; i < 60; i++) {
    const d = document.createElement('div'), s = 6 + Math.random() * 8
    d.style.cssText = `position:fixed;top:-20px;left:${Math.random() * 100}vw;width:${s}px;height:${s}px;background:${col[i % col.length]};z-index:82;border-radius:2px;pointer-events:none;`
    document.body.appendChild(d)
    anima(d,
      [{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(105vh) rotate(${540 + Math.random() * 360}deg)`, opacity: .9 }],
      { duration: 2300 + Math.random() * 1800, easing: 'cubic-bezier(.3,.7,.5,1)' }, 4300)
  }
}
