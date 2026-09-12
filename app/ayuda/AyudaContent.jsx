'use client'

import Link from 'next/link'
import { Rich, MENSAJES } from '@/lib/mensajes'
import { NIVELES } from '@/lib/data'

export default function AyudaContent() {
  const A = MENSAJES.ui.ayuda
  return (
    <div className="ayuda-container">
      <div className="ayuda-hero">
        <div className="ayuda-hero-alerta mono">{A.hero.alerta}</div>
        <h1 className="ayuda-hero-tit">{A.hero.titulo}</h1>
        <p className="ayuda-hero-sub">{A.hero.sub}</p>
      </div>

      <section className="ayuda-seccion">
        <h2 className="ayuda-seccion-tit">
          <span className="ayuda-seccion-ico">{A.mision.ico}</span>
          {A.mision.titulo}
        </h2>
        <div className="ayuda-mision">
          <Rich s={A.mision.texto} />
        </div>
      </section>

      <section className="ayuda-seccion">
        <h2 className="ayuda-seccion-tit">
          <span className="ayuda-seccion-ico">{A.pasosTitulo.ico}</span>
          {A.pasosTitulo.titulo}
        </h2>
        <div className="ayuda-pasos">
          {A.pasos.map(p => (
            <div key={p.num} className="ayuda-paso">
              <div className="ayuda-paso-num mono">{p.num}</div>
              <div className="ayuda-paso-ico">{p.icono}</div>
              <div className="ayuda-paso-info">
                <div className="ayuda-paso-tit">{p.titulo}</div>
                <div className="ayuda-paso-desc">{p.desc}</div>
                <div className="ayuda-paso-detalle">{p.detalle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ayuda-seccion">
        <h2 className="ayuda-seccion-tit">
          <span className="ayuda-seccion-ico">{A.nivelesTitulo.ico}</span>
          {A.nivelesTitulo.titulo}
        </h2>
        <div className="ayuda-niveles">
          {NIVELES.map(n => (
            <div key={n.n} className="ayuda-nivel">
              <div className="ayuda-nivel-n mono">{n.n}</div>
              <div className="ayuda-nivel-ico">{n.ico}</div>
              <div className="ayuda-nivel-info">
                <div className="ayuda-nivel-tit">{n.titulo}</div>
                <div className="ayuda-nivel-reto">{n.reto}</div>
                <div className="ayuda-nivel-pieza">{n.piezaNom}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ayuda-seccion">
        <h2 className="ayuda-seccion-tit">
          <span className="ayuda-seccion-ico">{A.consejosTitulo.ico}</span>
          {A.consejosTitulo.titulo}
        </h2>
        <div className="ayuda-consejos">
          {A.consejos.map((c, i) => (
            <div className="ayuda-consejo" key={i}>
              <span className="ayuda-consejo-ico">{c.ico}</span>
              <div><Rich s={c.texto} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="ayuda-seccion">
        <h2 className="ayuda-seccion-tit">
          <span className="ayuda-seccion-ico">{A.armadura.ico}</span>
          {A.armadura.titulo}
        </h2>
        <div className="ayuda-armadura">
          <p><Rich s={A.armadura.intro} /></p>
          <div className="ayuda-armadura-lista">
            {NIVELES.map(n => (
              <div className="ayuda-arm-item" key={n.pieza}><span>{n.ico}</span> {n.piezaNom}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="ayuda-footer">
        <Link href="/" className="ayuda-volver">{A.volver}</Link>
      </div>
    </div>
  )
}