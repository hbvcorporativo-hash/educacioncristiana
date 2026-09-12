'use client'

import { useState, useRef, useEffect } from 'react'
import { VOCES, NIVELES, SEGUNDOS, PTS, BONO, N, ESTILOS, norm, rnd, urlAvatar } from '@/lib/data'
import { t, aviso, Rich, paraAgente, MENSAJES } from '@/lib/mensajes'
import sfx from '@/lib/sfx'
import * as musica from '@/lib/musica'
import * as voz from '@/lib/voz'
import ADN from './ADN'
import AvatarView from './AvatarView'
import MatrixLoader from './MatrixLoader'
import { chispas, bandera, flash, confeti } from './efectos'
import { publicAsset } from '@/lib/assets'

const LOGO = publicAsset('/logo.png')

export default function Game() {
  /* ===== STATE ===== */
  const [pantalla, setPantalla] = useState('intro')
  const [nv, setNv] = useState(() => NIVELES.map(x => ({ ...x, hecho: false, foto: null })))
  const [av, setAv] = useState({ estilo: 'adventurer', seed: 'inicio', nombre: t('ui.jugador.nombre') })
  const [seeds, setSeeds] = useState([])
  const [puntos, setPuntos] = useState(0)
  const [actual, setActual] = useState(null)
  const [nuevaPieza, setNuevaPieza] = useState(null)
  const [tarjetasVistas, setTarjetasVistas] = useState(0)
  const [matrixTipo, setMatrixTipo] = useState(null)
  const matrixTimer = useRef(null)

  const [globo, setGlobo] = useState(t('ui.jugador.globo'))
  const [leoHabla, setLeoHabla] = useState(false)
  const [avisoEst, setAvisoEst] = useState({ t: '', k: '' })
  const [claveVal, setClaveVal] = useState('')
  const [claveMal, setClaveMal] = useState(false)
  const [muteSfx, setMuteSfx] = useState(false)

  const [relojResta, setRelojResta] = useState(SEGUNDOS)
  const relojId = useRef(null)
  const restaRef = useRef(SEGUNDOS)

  const [revelar, setRevelar] = useState(null) // {eti,ico,nom,ver,dec,pts}
  const [capaMusica, setCapaMusica] = useState(false)
  const [capaGuion, setCapaGuion] = useState(false)
  const [btnPlayTxt, setBtnPlayTxt] = useState(t('ui.audio.play'))
  const [volMus, setVolMus] = useState(100)
  const [volVoz, setVolVoz] = useState(85)
  const [agente, setAgente] = useState('principal')

  const cfgAgente = (MENSAJES.ui.modales.guion.agentes.find(a => a.id === agente) || MENSAJES.ui.modales.guion.agentes[0])
  const agenteNom = cfgAgente.corto
  const agenteDir = cfgAgente.dir

  const inputFoto = useRef(null)
  const videoFoto = useRef(null)
  const streamFoto = useRef(null)
  const scrollRefs = useRef({})
  const [camaraAbierta, setCamaraAbierta] = useState(false)
  const [camaraError, setCamaraError] = useState('')

  const hechos = nv.filter(x => x.hecho).length
  const fraccion = hechos / N
  const pct = Math.round(fraccion * 100)

  /* ===== INIT ===== */
  useEffect(() => {
    nuevasSeeds()
    voz.registrarUI({ setTexto: t => setGlobo(t), setHabla: v => setLeoHabla(v) })
    return () => { pararReloj(); detenerCamara(); voz.pararVoz(); musica.parar() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (pantalla !== 'pNivel' || actual === null) return
    const x = nv[actual]
    if (!x) return
    if (x.hecho) {
      voz.pararVoz()
      setGlobo(t('ui.jugador.sectorListo'))
      return
    }
    setGlobo(VOCES[x.voz] || t('ui.jugador.globo'))
    voz.hablar(x.voz)
  }, [pantalla, actual])

  function nuevasSeeds() {
    const s = Array.from({ length: 8 }, () => Math.random().toString(36).slice(2, 9))
    setSeeds(s)
    setAv(a => ({ ...a, seed: s[0] }))
  }

  /* ===== RELOJ ===== */
  function verRelojSide(f) {} // clases derivadas en render

  function arrancarReloj() {
    pararReloj()
    restaRef.current = SEGUNDOS
    setRelojResta(SEGUNDOS)
    relojId.current = setInterval(() => {
      let r = restaRef.current - 1
      if (r <= 10 && r > 0) sfx.tic()
      if (r <= 0) {
        r = 0
        restaRef.current = r
        setRelojResta(r)
        sfx.fin()
        avisar(aviso('ui.avisos.tiempo'))
        pararReloj()
        return
      }
      restaRef.current = r
      setRelojResta(r)
    }, 1000)
  }
  function pararReloj() {
    if (relojId.current) { clearInterval(relojId.current); relojId.current = null }
  }

  /* ===== AVISO ===== */
  function avisar(a) { setAvisoEst(a) }

  /* ===== NAVEGACIÓN ===== */
  function verPantalla(id) {
    setPantalla(id)
    setTimeout(() => {
      const el = scrollRefs.current[id]
      if (el) el.scrollTop = 0
    }, 0)
  }

  function ejecutarConHackeo(tipo, accion, duracion = 1550) {
    if (matrixTimer.current) clearTimeout(matrixTimer.current)
    setMatrixTipo(tipo)
    matrixTimer.current = setTimeout(() => {
      setMatrixTipo(null)
      matrixTimer.current = null
      accion()
    }, duracion)
  }

  /* ===== NIVEL ===== */
  function abrirNivel(i) {
    const x = nv[i]
    setActual(i)
    setClaveVal('')
    setClaveMal(false)
    setTarjetasVistas(0)
    avisar({ t: '', k: '' })
    verPantalla('pNivel')
    if (!x.hecho) arrancarReloj()
    else {
      pararReloj()
    }
  }

  function miniatura(f, cb) {
    const img = new Image()
    img.onload = () => {
      const max = 900
      let w = img.width, h = img.height
      const s = Math.min(1, max / Math.max(w, h))
      w = Math.round(w * s); h = Math.round(h * s)
      const cv = document.createElement('canvas')
      cv.width = w; cv.height = h
      cv.getContext('2d').drawImage(img, 0, 0, w, h)
      try { cb(cv.toDataURL('image/jpeg', .72)) } catch (q) { cb(null) }
    }
    img.onerror = () => cb(null)
    const fr = new FileReader()
    fr.onload = ev => { img.src = ev.target.result }
    fr.readAsDataURL(f)
  }

  function detenerCamara() {
    if (streamFoto.current) {
      streamFoto.current.getTracks().forEach(track => track.stop())
      streamFoto.current = null
    }
    if (videoFoto.current) videoFoto.current.srcObject = null
    setCamaraAbierta(false)
  }

  async function abrirCamara() {
    sfx.tap()
    setCamaraError('')
    if (!navigator.mediaDevices?.getUserMedia) {
      inputFoto.current?.click()
      return
    }
    try {
      detenerCamara()
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false
      })
      streamFoto.current = stream
      setCamaraAbierta(true)
      requestAnimationFrame(() => {
        if (videoFoto.current) {
          videoFoto.current.srcObject = stream
          videoFoto.current.play().catch(() => {})
        }
      })
    } catch (error) {
      setCamaraError(error.name === 'NotAllowedError'
        ? aviso('ui.avisos.camaraDenegada').t
        : aviso('ui.avisos.camaraError').t)
      inputFoto.current?.click()
    }
  }

  function capturarFoto() {
    const video = videoFoto.current
    if (!video || video.readyState < 2 || actual === null) return
    const canvas = document.createElement('canvas')
    const max = 900
    const escala = Math.min(1, max / Math.max(video.videoWidth, video.videoHeight))
    canvas.width = Math.round(video.videoWidth * escala)
    canvas.height = Math.round(video.videoHeight * escala)
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    const foto = canvas.toDataURL('image/jpeg', .72)
    detenerCamara()
    setNv(prev => prev.map((y, j) => j === actual ? { ...y, foto } : y))
    avisar(aviso('ui.avisos.ok'))
    sfx.foto(); flash()
  }

  function onFoto(ev) {
    const f = ev.target.files && ev.target.files[0]
    if (!f || actual === null) return
    avisar(aviso('ui.avisos.procesando'))
    miniatura(f, u => {
      if (u) {
        setNv(prev => prev.map((y, j) => j === actual ? { ...y, foto: u } : y))
        avisar(aviso('ui.avisos.ok'))
        sfx.foto(); flash()
      } else avisar(aviso('ui.avisos.sinImagen'))
    })
    ev.target.value = ''
  }

  function hackear() {
    const x = nv[actual]
    const v = claveVal
    if (!v.trim()) { avisar(aviso('ui.avisos.claveVacia')); return }
    if (norm(v) !== norm(x.clave)) {
      avisar(aviso('ui.avisos.denied'))
      sfx.mal()
      setClaveMal(true)
      setTimeout(() => setClaveMal(false), 450)
      voz.hablar(rnd(['mal-1', 'mal-2']))
      return
    }
    const bono = Math.round(BONO * (Math.max(0, restaRef.current) / SEGUNDOS))
    const gan = PTS + bono
    const nHechos = nv.filter(y => y.hecho).length + 1
    const nivelesSiguientes = nv.map((y, j) => j === actual ? { ...y, hecho: true } : y)
    pararReloj()
    voz.hablar(rnd(['bien-1', 'bien-2']))
    sfx.bien()
    ejecutarConHackeo('hackeo', () => {
      setPuntos(p => p + gan)
      setRevelar({
        eti: t('ui.revelar.eti', { pct: Math.round(nHechos / N * 100) }),
        ico: x.ico, nom: x.piezaNom,
        ver: t('ui.revelar.ver', { ver: x.verso }),
        dec: t('ui.revelar.dec', { dec: x.decl }),
        pts: t('ui.revelar.puntos', { pts: gan }) + (bono > 0 ? t('ui.revelar.bono', { bono }) : '')
      })
      setNv(nivelesSiguientes)
      setNuevaPieza(x.pieza)
    })
  }

  function pista() {
    sfx.tap()
    voz.hablar(nv[actual].pista)
    avisar(aviso('ui.avisos.pista', { agente: agenteNom }))
    setTarjetasVistas(n => Math.min(n + 1, (nv[actual].tarjetas || []).length))
  }

  function cerrarRevelar() {
    const nivel = nv[actual]
    const completados = nv.map((x, i) => i === actual ? { ...x, hecho: true } : x)
    setRevelar(null)
    verPantalla('pMapa')
    setTimeout(() => {
      const a = document.getElementById('avatarMini')
      if (a) { const r = a.getBoundingClientRect(); chispas(r.left + r.width / 2, r.top + r.height / 2) }
      bandera(t('ui.bandera.equipado', { pieza: nivel.piezaNom.toUpperCase() }))
      if (completados.every(x => x.hecho)) setTimeout(ganar, 1800)
    }, 60)
  }

  /* ===== FINAL ===== */
  function ganar() {
    verPantalla('final')
    voz.hablar('gana')
    sfx.gana()
    confeti()
  }

  function descargarTarjeta() {
    try {
      const W = 760, H = 1120
      const c = document.createElement('canvas'); c.width = W; c.height = H
      const g = c.getContext('2d')
      const grd = g.createLinearGradient(0, 0, 0, H)
      grd.addColorStop(0, '#12304F'); grd.addColorStop(1, '#060B14')
      g.fillStyle = grd; g.fillRect(0, 0, W, H)
      g.strokeStyle = '#FFC531'; g.lineWidth = 4; g.strokeRect(18, 18, W - 36, H - 36)
      g.fillStyle = '#22D3EE'; g.font = '600 22px monospace'; g.fillText(MENSAJES.ui.tarjeta.titulo, 56, 92)
      g.fillStyle = '#fff'; g.font = '700 46px sans-serif'; g.fillText((av.nombre || t('ui.jugador.nombre')).slice(0, 18), 56, 148)
      const campos = MENSAJES.ui.tarjeta.campos.map(f => [
        f.lab,
        f.input ? (document.getElementById(f.input).value || MENSAJES.ui.tarjeta.vacio) : f.val,
        f.color
      ])
      let y = 640
      campos.forEach(f => {
        g.fillStyle = '#7C93AE'; g.font = '400 18px monospace'; g.fillText(f[0], 56, y)
        g.fillStyle = f[2]; g.font = '700 30px sans-serif'; g.fillText(String(f[1]).slice(0, 34), 56, y + 38)
        y += 92
      })
      g.fillStyle = '#7C93AE'; g.font = '400 17px monospace'
      g.fillText(MENSAJES.ui.tarjeta.footer, 56, H - 64)
      dibujarInsignias(g, W)
      fetch(urlAvatar(av.seed, av.estilo, 300)).then(r => r.text()).then(t => {
        const im = new Image()
        im.onload = () => {
          g.save(); g.beginPath(); g.arc(W / 2, 340, 120, 0, Math.PI * 2); g.closePath(); g.clip()
          g.fillStyle = '#0E1B2E'; g.fillRect(W / 2 - 120, 220, 240, 240)
          g.drawImage(im, W / 2 - 120, 220, 240, 240); g.restore()
          g.strokeStyle = '#22D3EE'; g.lineWidth = 6
          g.beginPath(); g.arc(W / 2, 340, 120, 0, Math.PI * 2); g.stroke()
          bajar(c)
        }
        im.onerror = () => bajar(c)
        im.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(t)))
      }).catch(() => bajar(c))
    } catch (q) { bandera(t('ui.bandera.captura')) }
  }

  function dibujarInsignias(g, W) {
    const eq = nv.filter(x => x.hecho)
    g.font = '30px sans-serif'; g.textAlign = 'center'
    eq.forEach((x, i) => {
      const a = (-90 + i * 60) * Math.PI / 180, r = 170
      g.fillStyle = 'rgba(255,197,49,.18)'
      g.beginPath(); g.arc(W / 2 + Math.cos(a) * r, 340 + Math.sin(a) * r, 26, 0, Math.PI * 2); g.fill()
      g.strokeStyle = '#FFC531'; g.lineWidth = 2; g.stroke()
      g.fillStyle = '#fff'; g.fillText(x.ico, W / 2 + Math.cos(a) * r, 340 + Math.sin(a) * r + 10)
    })
    g.textAlign = 'left'
  }

  function bajar(c) {
    try {
      const a = document.createElement('a')
      a.download = MENSAJES.ui.tarjeta.archivo
      a.href = c.toDataURL('image/png')
      a.click()
    } catch (q) { bandera(t('ui.bandera.captura')) }
  }

  function otraVez() {
    pararReloj()
    musica.parar()
    setBtnPlayTxt(t('ui.audio.play'))
    setNv(NIVELES.map(x => ({ ...x, hecho: false, foto: null })))
    setPuntos(0)
    setActual(null)
    setRevelar(null)
    verPantalla('pMapa')
    voz.hablar('intro')
  }

  /* ===== AUDIO CONTROLES ===== */
  function toggleSonido() {
    const silenciado = !sfx.muted()
    sfx.mute(silenciado)
    setMuteSfx(silenciado)
    if (!silenciado) {
      sfx.init()
      sfx.tap()
    }
  }
  function togglePlay() {
    sfx.tap()
    if (musica.sonando()) { musica.parar(); setBtnPlayTxt(t('ui.audio.play')) }
    else { musica.iniciar(); setBtnPlayTxt(t('ui.audio.pausa')) }
  }

  /* ===== DERIVADOS RELOJ ===== */
  const rf = relojResta / SEGUNDOS
  const relojCls = 'reloj' + (rf <= .4 && rf > .15 ? ' medio' : '') + (rf <= .15 ? ' poco' : '')
  const relojTxt = Math.floor(relojResta / 60) + ':' + String(relojResta % 60).padStart(2, '0')

  const nivelX = actual !== null ? nv[actual] : null
  const totalTarjetas = (nivelX?.tarjetas || []).length
  const tarjetasMostradas = nivelX?.hecho ? totalTarjetas : tarjetasVistas

  /* ===== RENDER ===== */
  return (
    <>
      <div className="grid-bg"></div>
      {matrixTipo && <MatrixLoader tipo={matrixTipo} />}

      {/* ===== INTRO ===== */}
      <div className={'pantalla' + (pantalla === 'intro' ? ' on' : '')} id="intro">
        <div className="scroll" ref={el => (scrollRefs.current['intro'] = el)}><div className="col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <ADN xl fraccion={fraccion} />
          <div className="alerta mono">{t('ui.intro.alerta')}</div>
          <h1 className="tit-hack">{t('ui.intro.titulo')}</h1>
          <div className="tit-sub">{t('ui.intro.sub')}</div>
          <div className="brief">
            <Rich s={t('ui.intro.brief.0')} /><br /><br />
            <Rich s={t('ui.intro.brief.1')} />
          </div>
          <div className="terminal mono">
            <Rich s={t('ui.intro.terminal.0')} /><br />
            <Rich s={t('ui.intro.terminal.1')} /><br />
            <Rich s={t('ui.intro.terminal.2')} /><span style={{ color: '#FF3B5C' }}>{t('ui.intro.terminalCorrupto')}</span><br />
            <Rich s={t('ui.intro.terminal.3')} /><br />
            <Rich s={t('ui.intro.terminal.4')} />
          </div>
          <button
            className="bt cian"
            onClick={() => { sfx.init(); sfx.tap(); ejecutarConHackeo('inicio', () => verPantalla('pAvatar')) }}
          >{t('ui.intro.btnIniciar')}</button>
          <div style={{ fontSize: 12, color: 'var(--gris)' }}>{t('ui.intro.audioHint')}</div>
        </div></div>
      </div>

      {/* ===== AVATAR ===== */}
      <div className={'pantalla' + (pantalla === 'pAvatar' ? ' on' : '')} id="pAvatar">
        <div className="scroll" ref={el => (scrollRefs.current['pAvatar'] = el)}><div className="col">
          <div style={{ alignSelf: 'center' }}><ADN md fraccion={fraccion} /></div>
          <div className="tit-sub">{t('ui.avatar.paso')}</div>
          <h2 style={{ fontSize: 24 }}>{t('ui.avatar.titulo')}</h2>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--gris)' }}>
            {t('ui.avatar.desc')}
          </p>
          <div className="av-caja"><AvatarView av={av} niveles={nv} xl /></div>
          <input
            id="nombreAv"
            type="text"
            placeholder={t('ui.avatar.nombrePlaceholder')}
            maxLength={18}
            autoComplete="off"
            value={av.nombre}
            onChange={e => setAv(a => ({ ...a, nombre: e.target.value }))}
          />
          <div className="op-grupo"><div className="op-tit">{t('ui.avatar.estilo')}</div>
            <div className="estilos" id="estilos">
              {ESTILOS.map(e => (
                <button
                  key={e[0]}
                  className="est-bt"
                  data-e={e[0]}
                  data-sel={av.estilo === e[0] ? '1' : '0'}
                  onClick={() => { setAv(a => ({ ...a, estilo: e[0] })); sfx.tap() }}
                >{e[1]}</button>
              ))}
            </div>
          </div>
          <div className="op-grupo"><div className="op-tit">{t('ui.avatar.personaje')}</div>
            <div className="galeria" id="galeria">
              {seeds.map(sd => (
                <button
                  key={sd}
                  className="gal-op"
                  data-s={sd}
                  data-sel={av.seed === sd ? '1' : '0'}
                  onClick={() => { setAv(a => ({ ...a, seed: sd })); sfx.tap() }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={urlAvatar(sd, av.estilo, 120)} alt="" />
                </button>
              ))}
            </div>
            <button className="bt ghost" id="btnOtros" style={{ marginTop: 10 }}
              onClick={() => { sfx.tap(); nuevasSeeds() }}
            >{t('ui.avatar.verOtros')}</button>
          </div>
          <button
            className="bt verde" id="btnAvatarListo"
            onClick={() => {
              const nombre = (av.nombre || '').trim() || t('ui.jugador.nombre')
              setAv(a => ({ ...a, nombre }))
               sfx.tap()
               musica.iniciar()
               voz.hablar('intro')
               ejecutarConHackeo('avatar', () => {
                 verPantalla('pMapa')
               })
            }}
          >{t('ui.avatar.entrar')}</button>
        </div></div>
      </div>

      {/* ===== MAPA ===== */}
      <div className={'pantalla' + (pantalla === 'pMapa' ? ' on' : '')} id="pMapa">
        <HUD fraccion={fraccion} pct={pct} puntos={puntos}
          onMusica={() => setCapaMusica(true)}
          onGuion={() => setCapaGuion(true)}
          onSonido={toggleSonido} muteSfx={muteSfx} />
        <div className="scroll" ref={el => (scrollRefs.current['pMapa'] = el)}><div className="col">
          <div className="estado">
            <div id="avatarMini"><AvatarView av={av} niveles={nv} nueva={nuevaPieza} md /></div>
            <div className="est-in">
              <div className="est-nom">{av.nombre || t('ui.jugador.nombre')}</div>
              <div className="est-sub">{t('ui.mapa.subRestaurado', { hechos, N })}</div>
              <div className="barra-inf"><div className="barra-fill" style={{ width: (hechos / N * 100) + '%' }}></div></div>
              <div className="armadura" id="armadura">
                {nv.map(x => (
                  <div key={x.pieza} className={'arm' + (x.hecho ? ' on' : '')} title={x.piezaNom}>{x.ico}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="tit-sub">{t('ui.mapa.tituloNiveles')}</div>
          <div id="listaNiveles" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {nv.map((x, i) => {
              const libre = i === 0 || nv[i - 1].hecho
              const est = x.hecho ? 'hecho' : (libre ? 'libre' : 'bloq')
              const cara = x.hecho ? '✓' : (libre ? x.n : '🔒')
              const sub = x.hecho ? t('ui.mapa.sectorLimpio') : (libre ? t('ui.mapa.disponible') : t('ui.mapa.bloqueado'))
              return (
                <button
                  key={x.pieza}
                  className={'nivel ' + est}
                  disabled={est === 'bloq'}
                  onClick={() => { if (!libre && !x.hecho) return; sfx.tap(); abrirNivel(i) }}
                >
                  <span className="nv-n mono">
                    {cara}
                    {x.hecho && x.foto && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="nv-foto" src={x.foto} alt="" />
                    )}
                  </span>
                  <span className="nv-in">
                    <span className="nv-eti mono">{t('ui.mapa.nivel', { n: x.n })}</span>
                    <span className="nv-tit">{x.titulo}</span>
                    <span className="nv-sub">{sub}</span>
                    <span className="nv-arm mono">{x.ico} {x.piezaNom}</span>
                  </span>
                </button>
              )
            })}
          </div>
          {hechos === N ? (
            <div className="final-card listo" id="finalCard"
              onClick={() => { sfx.tap(); ganar() }}>
              <div className="fc-ico">🔓</div>
              <div className="fc-tit">{t('ui.mapa.finalAbierto.titulo')}</div>
              <div className="fc-sub">{t('ui.mapa.finalAbierto.sub')}</div>
            </div>
          ) : (
            <div className="final-card" id="finalCard">
              <div className="fc-ico">🔒</div>
              <div className="fc-tit">{t('ui.mapa.finalCerrado.titulo')}</div>
              <div className="fc-sub">{t('ui.mapa.finalCerrado.sub')}</div>
            </div>
          )}
        </div></div>
      </div>

      {/* ===== NIVEL ===== */}
      <div className={'pantalla' + (pantalla === 'pNivel' ? ' on' : '')} id="pNivel">
        <HUD fraccion={fraccion} pct={pct} puntos={puntos}
          onMusica={() => setCapaMusica(true)}
          onGuion={() => setCapaGuion(true)}
          onSonido={toggleSonido} muteSfx={muteSfx} />
        {nivelX && (
          <div className="scroll" ref={el => (scrollRefs.current['pNivel'] = el)}><div className="col">
            <div className="top">
              <button className="volver" id="btnVolver"
                onClick={() => { sfx.tap(); pararReloj(); voz.pararVoz(); verPantalla('pMapa') }}
              >{t('ui.nivel.volver')}</button>
              <span className="top-tit mono">{t('ui.nivel.header', { n: nivelX.n, N })}</span>
            </div>
            {!nivelX.hecho && <div className="denied mono">{t('ui.nivel.denied')}</div>}
            <h2 style={{ fontSize: 23 }}>{nivelX.titulo}</h2>
            {!nivelX.hecho && (
              <div className={relojCls}>
                <div className="reloj-bar"><div className="reloj-fill" style={{ width: (rf * 100) + '%' }}></div></div>
                <div className="reloj-txt mono">{relojTxt}</div>
              </div>
            )}
            <div className="caja" style={{ borderLeft: '3px solid var(--virus)' }}>
              <div className="eti">{t('ui.nivel.informe')}</div>
              <p>{nivelX.brief}</p>
            </div>
            <div className={'leo' + (leoHabla ? ' habla' : '')}>
              <div className="leo-av"><LeoAvatar /></div>
              <div className="globo">{globo}</div>
            </div>
            <div className="fila">
              <button className="mini" onClick={() => { sfx.tap(); voz.repetir() }}>{t('ui.nivel.repetir')}</button>
              {!nivelX.hecho && <button className="mini" onClick={pista}>{t('ui.nivel.pista')}</button>}
            </div>
            <div className="caja">
              <div className="eti">{t('ui.nivel.reto')}</div>
              <p>{nivelX.reto}</p>
              <div className="tarjetas">
                {(nivelX.tarjetas || []).slice(0, tarjetasMostradas).map((t, i) => (
                  <div key={i} className={`tj ${t[1]}`}>
                    <span className="marca mono">{t[2]}</span><span>{t[0]}</span>
                  </div>
                ))}
              </div>
              <div className="materiales" style={{ marginTop: 11 }}>
                {nivelX.mat.includes(':') ? (
                  <><b>{nivelX.mat.split(':')[0]}:</b>{nivelX.mat.split(':').slice(1).join(':')}</>
                ) : nivelX.mat}
              </div>
            </div>
            <div className="caja">
              <div className="eti">{t('ui.nivel.evidencia')}</div>
              <div className={'foto-caja' + (nivelX.foto ? ' foto-ok' : '')} id="fotoCaja">
                {nivelX.foto
                  ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={nivelX.foto} alt={t('ui.nivel.evidenciaAlt')} />
                  )
                   : <div className="foto-vacia">{t('ui.nivel.fotoVacia')}</div>}
              </div>
              {!nivelX.hecho && (
                <button className="bt ghost" id="btnFoto" onClick={abrirCamara}>
                  {nivelX.foto ? t('ui.nivel.cambiarFoto') : t('ui.nivel.tomarFoto')}
                </button>
              )}
            </div>
            {!nivelX.hecho && (
              <div id="zonaClave">
                <div className="eti" style={{ textAlign: 'center' }}>{t('ui.nivel.codigo')}</div>
                <input
                  id="clave"
                  type="text"
                  placeholder={t('ui.nivel.codigoPlaceholder')}
                  autoComplete="off"
                  spellCheck="false"
                  maxLength={40}
                  className={claveMal ? 'mal' : ''}
                  value={claveVal}
                  onChange={e => setClaveVal(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') hackear() }}
                />
              </div>
            )}
            {nivelX.hecho && <div className="hecho-caja" id="cajaHecho">{t('ui.nivel.descontaminado')}</div>}
            <div className={'aviso mono ' + avisoEst.k} id="aviso">{avisoEst.t}</div>
            {!nivelX.hecho && (
              <button className="bt verde" id="btnHackear" onClick={hackear}>{t('ui.nivel.hackear')}</button>
            )}
          </div></div>
        )}
      </div>

      {/* ===== FINAL ===== */}
      <div className={'pantalla' + (pantalla === 'final' ? ' on' : '')} id="final">
        <div className="scroll" ref={el => (scrollRefs.current['final'] = el)}><div className="col">
          <div className="alerta mono" style={{ color: 'var(--verde)', borderColor: 'var(--verde)', background: 'rgba(52,227,155,.1)' }}>{t('ui.final.alerta')}</div>
          <h2 style={{ fontSize: 26 }}>{t('ui.final.titulo')}</h2>
          <ADN xl fraccion={fraccion} />
          <JesusBox />
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#C9DCEE' }}>
            {t('ui.final.parrafo')}
          </p>
          <div className="tarjeta-id" id="tarjetaId">
            <div className="ti-top">
              <AvatarView av={av} niveles={nv} sm />
              <div>
                <div className="ti-tit mono">{t('ui.final.tarjeta')}</div>
                <div className="ti-nom">{av.nombre || t('ui.jugador.nombre')}</div>
              </div>
            </div>
            <div className="ti-campo"><span className="ti-lab mono">{t('ui.final.identidadLab')}</span><div className="ti-fijo">{t('ui.final.identidad')}</div></div>
            <div className="ti-campo"><span className="ti-lab mono">{t('ui.final.poder')}</span><input className="ti-in" id="tiPoder" placeholder={t('ui.final.escribe')} maxLength={42} /></div>
            <div className="ti-campo"><span className="ti-lab mono">{t('ui.final.verdad')}</span><input className="ti-in" id="tiVerdad" placeholder={t('ui.final.escribe')} maxLength={42} /></div>
            <div className="ti-campo"><span className="ti-lab mono">{t('ui.final.proposito')}</span><input className="ti-in" id="tiProp" placeholder={t('ui.final.escribe')} maxLength={42} /></div>
            <div className="ti-campo" style={{ marginBottom: 0 }}><span className="ti-lab mono">{t('ui.final.versoLab')}</span><div className="ti-ver">{t('ui.final.verso')}</div></div>
          </div>
          <button className="bt oro" id="btnDescargar" onClick={() => { sfx.tap(); descargarTarjeta() }}>{t('ui.final.descargar')}</button>
          <button className="bt ghost" id="btnOtra" onClick={otraVez}>{t('ui.final.nuevaMision')}</button>
        </div></div>
      </div>

      {/* ===== MODAL MÚSICA ===== */}
      {capaMusica && (
        <div className="capa on" id="capaMusica" onClick={ev => { if (ev.target.id === 'capaMusica') setCapaMusica(false) }}>
          <div className="hoja">
            <div className="hoja-top"><h3>{t('ui.modales.musica.titulo')}</h3>
              <button className="hud-ico" onClick={() => setCapaMusica(false)}>✕</button></div>
            <div className="hoja-int">
              <Rich s={t('ui.modales.musica.intro')} />
            </div>
            <div style={{ padding: '13px 17px 0' }}>
              <button className="bt cian" id="btnPlay" onClick={togglePlay}>{btnPlayTxt}</button>
            </div>
            <div className="vol">
              <span style={{ fontSize: 13 }}>{t('ui.modales.musica.volumen')}</span>
              <input type="range" min="0" max="100" value={volMus} aria-label={t('ui.modales.musica.volumenAria')}
                onChange={e => { const v = +e.target.value; setVolMus(v); musica.volumen(v / 100 * 0.07) }} />
              <span className="mono" style={{ fontSize: 12, width: 34, textAlign: 'right' }}>{volMus}</span>
            </div>
            <div className="hoja-cuerpo" id="cuerpoMusica">
              <div className="linea">
                <div className="f mono">{t('ui.modales.musica.linea1.f')}</div>
                <div className="t"><Rich s={t('ui.modales.musica.linea1.t')} /></div>
              </div>
              <div className="linea">
                <div className="f mono">{t('ui.modales.musica.linea2.f')}</div>
                <div className="t">{t('ui.modales.musica.linea2.t')}</div>
              </div>
              <div className="linea">
                <div className="t" style={{ color: 'var(--gris)' }}>{t('ui.modales.musica.ducking')}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL GUION ===== */}
      {capaGuion && (
        <div className="capa on" id="capaGuion" onClick={ev => { if (ev.target.id === 'capaGuion') setCapaGuion(false) }}>
          <div className="hoja">
            <div className="hoja-top"><h3>{t('ui.modales.guion.titulo', { agente: agenteNom })}</h3>
              <button className="hud-ico" onClick={() => setCapaGuion(false)}>✕</button></div>
            <div className="hoja-int">
              <Rich s={t('ui.modales.guion.intro', { dir: agenteDir })} />
            </div>
            <div className="agent-picker">
              <div className="op-tit">{t('ui.modales.guion.pickerTitulo')}</div>
              <div className="fila">
                {MENSAJES.ui.modales.guion.agentes.map(a => (
                  <button key={a.id} className="mini" data-sel={agente === a.id ? '1' : '0'} onClick={() => { setAgente(a.id); voz.seleccionarAgente(a.id); sfx.tap() }}>{a.nombre}</button>
                ))}
              </div>
            </div>
            <div className="vol">
              <span style={{ fontSize: 13 }}>{t('ui.modales.guion.volumen', { agente: agenteNom })}</span>
              <input type="range" min="0" max="100" value={volVoz} aria-label={t('ui.modales.guion.volumenAria', { agente: agenteNom })}
                onChange={e => { const v = +e.target.value; setVolVoz(v); voz.volumenDeVoz(v / 100) }} />
              <span className="mono" style={{ fontSize: 12, width: 34, textAlign: 'right' }}>{volVoz}</span>
            </div>
            <div className="hoja-cuerpo" id="cuerpoGuion">
              {Object.entries(VOCES).map(([k, v]) => (
                <div className="linea" key={k}>
                  <div className="f mono">{t('ui.modales.guion.lineaArchivo', { dir: agenteDir, k })}</div>
                  <div className="t">{t('ui.modales.guion.lineaTexto', { texto: paraAgente(v, agente) })}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== REVELAR ===== */}
      {revelar && (
        <div className="capa on" id="revelar">
          <div className="rv">
            <div className="rv-eti mono">{revelar.eti}</div>
            <div className="rv-ico">{revelar.ico}</div>
            <div className="rv-nom">{revelar.nom}</div>
            <div className="rv-ver mono">{revelar.ver}</div>
            <div className="rv-di mono">{t('ui.revelar.dilo')}</div>
            <div className="rv-dec">{revelar.dec}</div>
            <div className="rv-pts mono">{revelar.pts}</div>
            <button className="bt oro" id="rvBtn" onClick={() => { sfx.tap(); cerrarRevelar() }}>{t('ui.revelar.continuar')}</button>
          </div>
        </div>
      )}

      <input ref={inputFoto} type="file" accept="image/*" capture="environment" id="inputFoto" style={{ display: 'none' }} onChange={onFoto} />
      {camaraAbierta && (
        <div className="capa on camera-layer">
          <div className="camera-panel">
            <div className="hoja-top"><h3>{t('ui.modales.camara.titulo')}</h3><button className="hud-ico" onClick={detenerCamara}>✕</button></div>
            <video ref={videoFoto} className="camera-video" autoPlay playsInline muted />
            <div className="camera-actions">
              <button className="bt verde" onClick={capturarFoto}>{t('ui.modales.camara.capturar')}</button>
              <button className="bt ghost" onClick={detenerCamara}>{t('ui.modales.camara.cancelar')}</button>
            </div>
          </div>
        </div>
      )}
      {camaraError && <div className="aviso mal camera-error">{camaraError}</div>}
      <div className="bandera" id="bandera"><div className="bandera-txt mono" id="banderaTxt"></div></div>
      <div className="flash" id="flash"></div>
    </>
  )
}

/* ===== SUBCOMPONENTES ===== */

function HUD({ fraccion, pct, puntos, onMusica, onGuion, onSonido, muteSfx }) {
  return (
    <div className="hud">
      <ADN fraccion={fraccion} />
      <div className="hud-info">
        <span className="hud-lab">{t('ui.hud.adnRestaurado')}</span>
        <span className="hud-val adnPct">{pct}%</span>
      </div>
      <div className="hud-sep"></div>
      <div className="hud-chip">◆ <span className="puntosTxt">{puntos}</span></div>
      <button className="hud-ico btnMusica" onClick={onMusica}>🎵</button>
      <button className="hud-ico btnSonido" onClick={onSonido}>{muteSfx ? '🔇' : '🔊'}</button>
      <button className="hud-ico btnGuion" onClick={onGuion}>🎙</button>
      <button className="hud-ico btnAyuda" onClick={() => window.open('/ayuda', '_blank')} title={t('ui.hud.comoJugar')}>?</button>
    </div>
  )
}

function LeoAvatar() {
  return (
    <svg viewBox="0 0 96 96" width="100%" height="100%">
      <rect width="96" height="96" fill="#122741" />
      <circle cx="48" cy="44" r="19" fill="#F0C7A0" />
      <path d="M28 42 Q27 22 48 21 Q69 22 68 42 Q63 31 48 31 Q33 31 28 42Z" fill="#2A1E16" />
      <circle cx="41" cy="45" r="2.5" fill="#22303F" /><circle cx="55" cy="45" r="2.5" fill="#22303F" />
      <path d="M41 54 q7 5 14 0" stroke="#B5623F" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M20 96 Q20 70 48 70 Q76 70 76 96 Z" fill="#22D3EE" opacity=".85" />
      <path d="M62 34 l14 0 M62 40 l10 0" stroke="#34E39B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function JesusBox() {
  const [ok, setOk] = useState(null)
  useEffect(() => {
    const img = new Image()
    img.onload = () => setOk(true)
    img.onerror = () => setOk(false)
    img.alt = t('ui.jesus.alt')
    img.src = publicAsset('/final/jesus.png')
  }, [])
  if (ok) {
    return (
      <div className="jesus" id="jesusBox">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={publicAsset('/final/jesus.png')} alt={t('ui.jesus.alt')} />
      </div>
    )
  }
  return (
    <div className="jesus" id="jesusBox">
      <div className="aviso-img mono"><Rich s={t('ui.jesus.placeholder')} /></div>
    </div>
  )
}
