'use client'

import { useState, useRef, useEffect } from 'react'
import { VOCES, NIVELES, SEGUNDOS, PTS, BONO, N, ESTILOS, norm, rnd, urlAvatar } from '@/lib/data'
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
  const [av, setAv] = useState({ estilo: 'adventurer', seed: 'inicio', nombre: 'Operador' })
  const [seeds, setSeeds] = useState([])
  const [puntos, setPuntos] = useState(0)
  const [actual, setActual] = useState(null)
  const [nuevaPieza, setNuevaPieza] = useState(null)
  const [matrixTipo, setMatrixTipo] = useState(null)
  const matrixTimer = useRef(null)

  const [globo, setGlobo] = useState('…')
  const [leoHabla, setLeoHabla] = useState(false)
  const [aviso, setAviso] = useState({ t: '', k: '' })
  const [claveVal, setClaveVal] = useState('')
  const [claveMal, setClaveMal] = useState(false)
  const [muteSfx, setMuteSfx] = useState(false)

  const [relojResta, setRelojResta] = useState(SEGUNDOS)
  const relojId = useRef(null)
  const restaRef = useRef(SEGUNDOS)

  const [revelar, setRevelar] = useState(null) // {eti,ico,nom,ver,dec,pts}
  const [capaMusica, setCapaMusica] = useState(false)
  const [capaGuion, setCapaGuion] = useState(false)
  const [btnPlayTxt, setBtnPlayTxt] = useState('▶ REPRODUCIR CANCIÓN')
  const [volMus, setVolMus] = useState(100)
  const [volVoz, setVolVoz] = useState(85)
  const [agente, setAgente] = useState('principal')

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
      setGlobo('Sector ya descontaminado. Pueden revisar su evidencia o volver al mapa.')
      return
    }
    setGlobo(VOCES[x.voz] || '…')
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
        avisar('se acabó el tiempo — pueden seguir, sin bono', 'tip')
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
  function avisar(t, k) { setAviso({ t, k: k || '' }) }

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
    avisar('', '')
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
      setCamaraError(error.name === 'NotAllowedError' ? 'Permiso de cámara denegado. Puedes seleccionar una imagen.' : 'No se pudo abrir la cámara. Puedes seleccionar una imagen.')
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
    avisar('✔ evidencia guardada', 'ok')
    sfx.foto(); flash()
  }

  function onFoto(ev) {
    const f = ev.target.files && ev.target.files[0]
    if (!f || actual === null) return
    avisar('procesando imagen...', 'tip')
    miniatura(f, u => {
      if (u) {
        setNv(prev => prev.map((y, j) => j === actual ? { ...y, foto: u } : y))
        avisar('✔ evidencia guardada', 'ok')
        sfx.foto(); flash()
      } else avisar('no se pudo leer la imagen', 'mal')
    })
    ev.target.value = ''
  }

  function hackear() {
    const x = nv[actual]
    const v = claveVal
    if (!v.trim()) { avisar('introduce el código', 'mal'); return }
    if (!x.foto) { avisar('toma la foto de evidencia antes de validar', 'mal'); return }
    if (norm(v) !== norm(x.clave)) {
      avisar('✖ ACCESS DENIED — código incorrecto', 'mal')
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
        eti: 'ADN ' + Math.round(nHechos / N * 100) + '% restaurado',
        ico: x.ico, nom: x.piezaNom,
        ver: '📖 ' + x.verso,
        dec: '"' + x.decl + '"',
        pts: '+' + gan + ' pts' + (bono > 0 ? '  ⚡ bono +' + bono : '')
      })
      setNv(nivelesSiguientes)
      setNuevaPieza(x.pieza)
    })
  }

  function pista() {
    sfx.tap()
    voz.hablar(nv[actual].pista)
    avisar(`💡 escucha la pista de ${agente === 'mujer' ? 'Sara' : 'Leo'}`, 'tip')
  }

  function cerrarRevelar() {
    const nivel = nv[actual]
    const completados = nv.map((x, i) => i === actual ? { ...x, hecho: true } : x)
    setRevelar(null)
    verPantalla('pMapa')
    setTimeout(() => {
      const a = document.getElementById('avatarMini')
      if (a) { const r = a.getBoundingClientRect(); chispas(r.left + r.width / 2, r.top + r.height / 2) }
      bandera('◆ ' + nivel.piezaNom.toUpperCase() + ' EQUIPADO')
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
      g.fillStyle = '#22D3EE'; g.font = '600 22px monospace'; g.fillText('TARJETA DE IDENTIDAD', 56, 92)
      g.fillStyle = '#fff'; g.font = '700 46px sans-serif'; g.fillText((av.nombre || 'Operador').slice(0, 18), 56, 148)
      const campos = [
        ['IDENTIDAD', 'Hijo/a de Dios', '#34E39B'],
        ['MI PODER', document.getElementById('tiPoder').value || '—', '#DCE9F5'],
        ['VERDAD QUE NECESITO RECORDAR', document.getElementById('tiVerdad').value || '—', '#DCE9F5'],
        ['MI PROPOSITO', document.getElementById('tiProp').value || '—', '#DCE9F5'],
        ['VERSICULO DESBLOQUEADO', 'Juan 1:12', '#FFC531']
      ]
      let y = 640
      campos.forEach(f => {
        g.fillStyle = '#7C93AE'; g.font = '400 18px monospace'; g.fillText(f[0], 56, y)
        g.fillStyle = f[2]; g.font = '700 30px sans-serif'; g.fillText(String(f[1]).slice(0, 34), 56, y + 38)
        y += 92
      })
      g.fillStyle = '#7C93AE'; g.font = '400 17px monospace'
      g.fillText('ADN restaurado 100% · armadura completa · Efesios 6', 56, H - 64)
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
    } catch (q) { bandera('Toma una captura de pantalla') }
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
      a.download = 'mi-identidad-adn.png'
      a.href = c.toDataURL('image/png')
      a.click()
    } catch (q) { bandera('Toma una captura de pantalla') }
  }

  function otraVez() {
    pararReloj()
    musica.parar()
    setBtnPlayTxt('▶ REPRODUCIR CANCIÓN')
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
    if (musica.sonando()) { musica.parar(); setBtnPlayTxt('▶ REPRODUCIR CANCIÓN') }
    else { musica.iniciar(); setBtnPlayTxt('⏸ PAUSAR CANCIÓN') }
  }

  /* ===== DERIVADOS RELOJ ===== */
  const rf = relojResta / SEGUNDOS
  const relojCls = 'reloj' + (rf <= .4 && rf > .15 ? ' medio' : '') + (rf <= .15 ? ' poco' : '')
  const relojTxt = Math.floor(relojResta / 60) + ':' + String(relojResta % 60).padStart(2, '0')

  const nivelX = actual !== null ? nv[actual] : null

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
          <div className="alerta mono">● AMENAZA DETECTADA</div>
          <h1 className="tit-hack">ANTIVIRUS ADN</h1>
          <div className="tit-sub">Hackea el virus · recupera tu identidad</div>
          <div className="brief">
            Hoy sus identidades están siendo atacadas por un virus. El virus se llama <b>COMPARACIÓN</b>. Se mete por las redes, los comentarios, el colegio, los amigos y hasta por nuestros propios pensamientos.<br /><br />
            Su misión: superar <b>6 niveles</b>, detectar las mentiras y recuperar el código de su verdadera identidad.
          </div>
          <div className="terminal mono">
            {'>'} escaneando ADN...<br />
            {'>'} <b>archivo:</b> identidad.adn<br />
            {'>'} <b>estado:</b> <span style={{ color: '#FF3B5C' }}>CORRUPTO (0% restaurado)</span><br />
            {'>'} <b>armadura:</b> 0/6 piezas<br />
            {'>'} esperando operador...
          </div>
          <button
            className="bt cian"
            onClick={() => { sfx.init(); sfx.tap(); ejecutarConHackeo('inicio', () => verPantalla('pAvatar')) }}
          >INICIAR MISIÓN</button>
          <div style={{ fontSize: 12, color: 'var(--gris)' }}>Toca para activar el audio</div>
        </div></div>
      </div>

      {/* ===== AVATAR ===== */}
      <div className={'pantalla' + (pantalla === 'pAvatar' ? ' on' : '')} id="pAvatar">
        <div className="scroll" ref={el => (scrollRefs.current['pAvatar'] = el)}><div className="col">
          <div style={{ alignSelf: 'center' }}><ADN md fraccion={fraccion} /></div>
          <div className="tit-sub">Paso 1 de 2</div>
          <h2 style={{ fontSize: 24 }}>Crea tu operador</h2>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--gris)' }}>
            Este eres tú dentro del sistema. Con cada nivel vas a equiparlo con una pieza de la armadura de Efesios 6.
          </p>
          <div className="av-caja"><AvatarView av={av} niveles={nv} xl /></div>
          <input
            id="nombreAv"
            type="text"
            placeholder="Nombre de tu operador"
            maxLength={18}
            autoComplete="off"
            value={av.nombre}
            onChange={e => setAv(a => ({ ...a, nombre: e.target.value }))}
          />
          <div className="op-grupo"><div className="op-tit">Estilo</div>
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
          <div className="op-grupo"><div className="op-tit">Elige tu personaje</div>
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
            >🎲 VER OTROS</button>
          </div>
          <button
            className="bt verde" id="btnAvatarListo"
            onClick={() => {
              const nombre = (av.nombre || '').trim() || 'Operador'
              setAv(a => ({ ...a, nombre }))
               sfx.tap()
               musica.iniciar()
               voz.hablar('intro')
               ejecutarConHackeo('avatar', () => {
                 verPantalla('pMapa')
               })
            }}
          >ENTRAR AL SISTEMA</button>
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
              <div className="est-nom">{av.nombre || 'Operador'}</div>
              <div className="est-sub">identidad.adn · {hechos}/{N} restaurado</div>
              <div className="barra-inf"><div className="barra-fill" style={{ width: (hechos / N * 100) + '%' }}></div></div>
              <div className="armadura" id="armadura">
                {nv.map(x => (
                  <div key={x.pieza} className={'arm' + (x.hecho ? ' on' : '')} title={x.piezaNom}>{x.ico}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="tit-sub">Niveles de descontaminación</div>
          <div id="listaNiveles" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {nv.map((x, i) => {
              const libre = i === 0 || nv[i - 1].hecho
              const est = x.hecho ? 'hecho' : (libre ? 'libre' : 'bloq')
              const cara = x.hecho ? '✓' : (libre ? x.n : '🔒')
              const sub = x.hecho ? 'Sector limpio' : (libre ? 'Disponible · toquen para entrar' : 'Bloqueado')
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
                    <span className="nv-eti mono">Nivel {x.n}</span>
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
              <div className="fc-tit">¡Identidad desbloqueada!</div>
              <div className="fc-sub">Toquen para ver su tarjeta</div>
            </div>
          ) : (
            <div className="final-card" id="finalCard">
              <div className="fc-ico">🔒</div>
              <div className="fc-tit">Identidad bloqueada</div>
              <div className="fc-sub">Supera los 6 niveles para desbloquearla</div>
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
              >←</button>
              <span className="top-tit mono">NIVEL {nivelX.n} / {N}</span>
            </div>
            {!nivelX.hecho && <div className="denied mono">🔴 ACCESS DENIED</div>}
            <h2 style={{ fontSize: 23 }}>{nivelX.titulo}</h2>
            {!nivelX.hecho && (
              <div className={relojCls}>
                <div className="reloj-bar"><div className="reloj-fill" style={{ width: (rf * 100) + '%' }}></div></div>
                <div className="reloj-txt mono">{relojTxt}</div>
              </div>
            )}
            <div className="caja" style={{ borderLeft: '3px solid var(--virus)' }}>
              <div className="eti">Informe del virus</div>
              <p>{nivelX.brief}</p>
            </div>
            <div className={'leo' + (leoHabla ? ' habla' : '')}>
              <div className="leo-av"><LeoAvatar /></div>
              <div className="globo">{globo}</div>
            </div>
            <div className="fila">
              <button className="mini" onClick={() => { sfx.tap(); voz.repetir() }}>▶ Repetir</button>
              {!nivelX.hecho && <button className="mini" onClick={pista}>💡 Pista</button>}
            </div>
            <div className="caja">
              <div className="eti">Reto en físico</div>
              <p>{nivelX.reto}</p>
              <div className="tarjetas">
                {(nivelX.tarjetas || []).map((t, i) => (
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
              <div className="eti">📸 Evidencia del equipo (obligatoria)</div>
              <div className={'foto-caja' + (nivelX.foto ? ' foto-ok' : '')} id="fotoCaja">
                {nivelX.foto
                  ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={nivelX.foto} alt="evidencia" />
                  )
                   : <div className="foto-vacia">Tomen la foto del reto terminado (obligatoria)</div>}
              </div>
              {!nivelX.hecho && (
                <button className="bt ghost" id="btnFoto" onClick={abrirCamara}>
                  {nivelX.foto ? '🔄 CAMBIAR FOTO' : '📸 TOMAR FOTO'}
                </button>
              )}
            </div>
            {!nivelX.hecho && (
              <div id="zonaClave">
                <div className="eti" style={{ textAlign: 'center' }}>Introduce el código de acceso</div>
                <input
                  id="clave"
                  type="text"
                  placeholder="Escribe el código…"
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
            {nivelX.hecho && <div className="hecho-caja" id="cajaHecho">✔ NIVEL DESCONTAMINADO</div>}
            <div className={'aviso mono ' + aviso.k} id="aviso">{aviso.t}</div>
            {!nivelX.hecho && (
              <button className="bt verde" id="btnHackear" onClick={hackear}>HACKEAR EL VIRUS</button>
            )}
          </div></div>
        )}
      </div>

      {/* ===== FINAL ===== */}
      <div className={'pantalla' + (pantalla === 'final' ? ' on' : '')} id="final">
        <div className="scroll" ref={el => (scrollRefs.current['final'] = el)}><div className="col">
          <div className="alerta mono" style={{ color: 'var(--verde)', borderColor: 'var(--verde)', background: 'rgba(52,227,155,.1)' }}>● VIRUS ELIMINADO</div>
          <h2 style={{ fontSize: 26 }}>Identidad restaurada</h2>
          <ADN xl fraccion={fraccion} />
          <JesusBox />
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#C9DCEE' }}>
            El virus mentía. Esta es la verdad: no tienes que compararte con nadie, porque Él ya te escogió.
          </p>
          <div className="tarjeta-id" id="tarjetaId">
            <div className="ti-top">
              <AvatarView av={av} niveles={nv} sm />
              <div>
                <div className="ti-tit mono">Tarjeta de identidad</div>
                <div className="ti-nom">{av.nombre || 'Operador'}</div>
              </div>
            </div>
            <div className="ti-campo"><span className="ti-lab mono">❤️ IDENTIDAD</span><div className="ti-fijo">Hijo/a de Dios</div></div>
            <div className="ti-campo"><span className="ti-lab mono">⚡ MI PODER</span><input className="ti-in" id="tiPoder" placeholder="Escríbelo…" maxLength={42} /></div>
            <div className="ti-campo"><span className="ti-lab mono">🛡️ VERDAD QUE NECESITO RECORDAR</span><input className="ti-in" id="tiVerdad" placeholder="Escríbelo…" maxLength={42} /></div>
            <div className="ti-campo"><span className="ti-lab mono">🎯 MI PROPÓSITO</span><input className="ti-in" id="tiProp" placeholder="Escríbelo…" maxLength={42} /></div>
            <div className="ti-campo" style={{ marginBottom: 0 }}><span className="ti-lab mono">🔓 VERSÍCULO DESBLOQUEADO</span><div className="ti-ver">Juan 1:12</div></div>
          </div>
          <button className="bt oro" id="btnDescargar" onClick={() => { sfx.tap(); descargarTarjeta() }}>⬇ DESCARGAR MI TARJETA</button>
          <button className="bt ghost" id="btnOtra" onClick={otraVez}>↻ NUEVA MISIÓN</button>
        </div></div>
      </div>

      {/* ===== MODAL MÚSICA ===== */}
      {capaMusica && (
        <div className="capa on" id="capaMusica" onClick={ev => { if (ev.target.id === 'capaMusica') setCapaMusica(false) }}>
          <div className="hoja">
            <div className="hoja-top"><h3>🎵 Música NXTWAVE</h3>
              <button className="hud-ico" onClick={() => setCapaMusica(false)}>✕</button></div>
            <div className="hoja-int">
              Pon las canciones de NXTWAVE en una carpeta <code>canciones/</code>, con estos nombres. Sonarán de fondo en cada nivel. Si un archivo no existe, ese nivel va sin música.
            </div>
            <div style={{ padding: '13px 17px 0' }}>
              <button className="bt cian" id="btnPlay" onClick={togglePlay}>{btnPlayTxt}</button>
            </div>
            <div className="vol">
              <span style={{ fontSize: 13 }}>Música MP3 (máx 7%)</span>
              <input type="range" min="0" max="100" value={volMus} aria-label="Volumen de música MP3"
                onChange={e => { const v = +e.target.value; setVolMus(v); musica.volumen(v / 100 * 0.07) }} />
              <span className="mono" style={{ fontSize: 12, width: 34, textAlign: 'right' }}>{volMus}</span>
            </div>
            <div className="hoja-cuerpo" id="cuerpoMusica">
              <div className="linea">
                <div className="f mono">canciones/revolution.mp3</div>
                <div className="t">Canción principal — suena continua durante todo el juego.<br /><b>We Are The Revolution</b> · Nxtwave (WATR)</div>
              </div>
              <div className="linea">
                <div className="f mono">revolution.mp3</div>
                <div className="t">También funciona si el archivo queda suelto, al lado de la app.</div>
              </div>
              <div className="linea">
                <div className="t" style={{ color: 'var(--gris)' }}>La música baja sola cuando Leo habla y vuelve a subir al terminar.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL GUION ===== */}
      {capaGuion && (
        <div className="capa on" id="capaGuion" onClick={ev => { if (ev.target.id === 'capaGuion') setCapaGuion(false) }}>
          <div className="hoja">
            <div className="hoja-top"><h3>🎙 Voces de {agente === 'mujer' ? 'Sara' : 'Leo'}</h3>
              <button className="hud-ico" onClick={() => setCapaGuion(false)}>✕</button></div>
            <div className="hoja-int">
              Cada línea requiere un MP3 estéreo colombiano en <code>public/voces/{agente === 'mujer' ? 'sara' : 'leo'}/</code>. Leo usa la misma colección para voz natural y de sistema.
            </div>
            <div className="agent-picker">
              <div className="op-tit">Agente de voz</div>
              <div className="fila">
                {[['principal', 'Leo · voz natural'], ['sistema', 'Leo · voz del sistema'], ['mujer', 'Sara · voz femenina']].map(([id, nombre]) => (
                  <button key={id} className="mini" data-sel={agente === id ? '1' : '0'} onClick={() => { setAgente(id); voz.seleccionarAgente(id); sfx.tap() }}>{nombre}</button>
                ))}
              </div>
            </div>
            <div className="vol">
              <span style={{ fontSize: 13 }}>Voces de {agente === 'mujer' ? 'Sara' : 'Leo'}</span>
              <input type="range" min="0" max="100" value={volVoz} aria-label={`Volumen de las voces de ${agente === 'mujer' ? 'Sara' : 'Leo'}`}
                onChange={e => { const v = +e.target.value; setVolVoz(v); voz.volumenDeVoz(v / 100) }} />
              <span className="mono" style={{ fontSize: 12, width: 34, textAlign: 'right' }}>{volVoz}</span>
            </div>
            <div className="hoja-cuerpo" id="cuerpoGuion">
              {Object.entries(VOCES).map(([k, v]) => (
                <div className="linea" key={k}>
                  <div className="f mono">voces/{agente === 'mujer' ? 'sara' : 'leo'}/{k}.mp3</div>
                  <div className="t">&quot;{agente === 'mujer' ? v.replace(/Leo/g, 'Sara').replace(/aliado/g, 'aliada') : v}&quot;</div>
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
            <div className="rv-di mono">Dilo en voz alta</div>
            <div className="rv-dec">{revelar.dec}</div>
            <div className="rv-pts mono">{revelar.pts}</div>
            <button className="bt oro" id="rvBtn" onClick={() => { sfx.tap(); cerrarRevelar() }}>CONTINUAR</button>
          </div>
        </div>
      )}

      <input ref={inputFoto} type="file" accept="image/*" capture="environment" id="inputFoto" style={{ display: 'none' }} onChange={onFoto} />
      {camaraAbierta && (
        <div className="capa on camera-layer">
          <div className="camera-panel">
            <div className="hoja-top"><h3>📸 Cámara de evidencia</h3><button className="hud-ico" onClick={detenerCamara}>✕</button></div>
            <video ref={videoFoto} className="camera-video" autoPlay playsInline muted />
            <div className="camera-actions">
              <button className="bt verde" onClick={capturarFoto}>CAPTURAR FOTO</button>
              <button className="bt ghost" onClick={detenerCamara}>CANCELAR</button>
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
        <span className="hud-lab">ADN restaurado</span>
        <span className="hud-val adnPct">{pct}%</span>
      </div>
      <div className="hud-sep"></div>
      <div className="hud-chip">◆ <span className="puntosTxt">{puntos}</span></div>
      <button className="hud-ico btnMusica" onClick={onMusica}>🎵</button>
      <button className="hud-ico btnSonido" onClick={onSonido}>{muteSfx ? '🔇' : '🔊'}</button>
      <button className="hud-ico btnGuion" onClick={onGuion}>🎙</button>
      <button className="hud-ico btnAyuda" onClick={() => window.open('/ayuda', '_blank')} title="¿Cómo jugar?">?</button>
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
    img.alt = 'Jesús'
    img.src = publicAsset('/final/jesus.jpg')
  }, [])
  if (ok) {
    return (
      <div className="jesus" id="jesusBox">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={publicAsset('/final/jesus.jpg')} alt="Jesús" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    )
  }
  return (
    <div className="jesus" id="jesusBox">
      <div className="aviso-img mono">[ imagen final ]<br />Coloca tu imagen en<br /><b>public/final/jesus.jpg</b></div>
    </div>
  )
}
