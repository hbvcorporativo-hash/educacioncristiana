'use client'

import Link from 'next/link'

const PASOS = [
  {
    num: '01',
    titulo: 'Inicia la Misión',
    desc: 'Toca el botón INICIAR MISIÓN en la pantalla de inicio. Se activarán los sonidos y la música de fondo.',
    icono: '🚀',
    detalle: 'Lee la explicación del virus COMPARACIÓN. Este virus te dice que vales menos que los demás. Tu misión es hackearlo.'
  },
  {
    num: '02',
    titulo: 'Crea tu Operador',
    desc: 'Escribe tu nombre, elige un estilo visual y selecciona tu personaje.',
    icono: '🧑‍💻',
    detalle: 'Tu avatar es tu identidad dentro del juego. Con cada nivel que completes, le equiparás una pieza de la armadura de Dios.'
  },
  {
    num: '03',
    titulo: 'Explora el Mapa',
    desc: 'El mapa muestra 6 niveles. Solo el primero está disponible al inicio.',
    icono: '🗺️',
    detalle: 'Cada nivel desbloquea una pieza de armadura y una verdad bíblica. Los niveles se abren en orden: 1 → 2 → 3 → 4 → 5 → 6.'
  },
  {
    num: '04',
    titulo: 'Haz el Reto',
    desc: 'Escucha las instrucciones, realiza la actividad física en el salón.',
    icono: '⚔️',
    detalle: 'Leo o Sara te explican qué hacer. Lee el "Informe del virus" y el "Reto en físico". Puedes tocar Repetir para volver a escuchar o Pista si necesitas ayuda.'
  },
  {
    num: '05',
    titulo: 'Toma Foto y Escribe el Código',
    desc: 'Captura evidencia del reto completado y escribe el código que descubriste.',
    icono: '📸',
    detalle: 'La foto es opcional. Si no tienes cámara o permisos, puedes escribir directamente el código. El código acepta espacios, mayúsculas y tildes sin problema.'
  },
  {
    num: '06',
    titulo: '¡Hackea el Virus!',
    desc: 'Presiona HACKEAR EL VIRUS. Si es correcto, desbloqueas la pieza de armadura.',
    icono: '🔓',
    detalle: 'Si el código es correcto, verás una animación y ganarás puntos. Si es incorrecto, puedes intentar de nuevo sin penalización.'
  },
  {
    num: '07',
    titulo: 'Tu Identidad Desbloqueada',
    desc: 'Después de completar los 6 niveles, escribe tu reflexión y descarga tu tarjeta.',
    icono: '🌟',
    detalle: 'Escribe: Mi Poder, La Verdad que necesito recordar, y Mi Propósito. Descarga tu tarjeta como recuerdo.'
  }
]

const NIVELES = [
  { n: 1, titulo: 'CONTRASEÑA', reto: 'Separar tarjetas de situaciones y mentiras', pieza: 'Cinturón de la Verdad', ico: '🎗️' },
  { n: 2, titulo: 'ESCANEA LA MENTIRA', reto: 'Escanear QRs y encontrar palabras', pieza: 'Coraza de Justicia', ico: '🦺' },
  { n: 3, titulo: 'ERROR 404', reto: 'Separar descripciones de verdades', pieza: 'Yelmo de la Salvación', ico: '⛑️' },
  { n: 4, titulo: 'CONTRACORRIENTE', reto: 'Caminar en sentido contrario + responder', pieza: 'Calzado de la Paz', ico: '🥾' },
  { n: 5, titulo: 'FIREWALL', reto: 'Declarar una verdad sin quebrarse', pieza: 'Escudo de la Fe', ico: '🛡️' },
  { n: 6, titulo: 'DESBLOQUEO FINAL', reto: 'Encontrar el versículo correcto', pieza: 'Espada del Espíritu', ico: '⚔️' }
]

export default function AyudaContent() {
  return (
    <div className="ayuda-container">
      <div className="ayuda-hero">
        <div className="ayuda-hero-alerta mono">● GUÍA RÁPIDA</div>
        <h1 className="ayuda-hero-tit">ANTIVIRUS ADN</h1>
        <p className="ayuda-hero-sub">Cómo jugar y superar los 6 niveles</p>
      </div>

      <section className="ayuda-seccion">
        <h2 className="ayuda-seccion-tit">
          <span className="ayuda-seccion-ico">🎯</span>
          Tu Misión
        </h2>
        <div className="ayuda-mision">
          Un virus llamado <b>COMPARACIÓN</b> ha infectado tu ADN de identidad. Te susurra que vales menos, que no encajas, que alguien es mejor que tú. Tu misión: hackearlo en <b>6 niveles</b>, completar retos y recuperar tu verdadera identidad.
        </div>
      </section>

      <section className="ayuda-seccion">
        <h2 className="ayuda-seccion-tit">
          <span className="ayuda-seccion-ico">📋</span>
          Paso a Paso
        </h2>
        <div className="ayuda-pasos">
          {PASOS.map(p => (
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
          <span className="ayuda-seccion-ico">🗺️</span>
          Los 6 Niveles
        </h2>
        <div className="ayuda-niveles">
          {NIVELES.map(n => (
            <div key={n.n} className="ayuda-nivel">
              <div className="ayuda-nivel-n mono">{n.n}</div>
              <div className="ayuda-nivel-ico">{n.ico}</div>
              <div className="ayuda-nivel-info">
                <div className="ayuda-nivel-tit">{n.titulo}</div>
                <div className="ayuda-nivel-reto">{n.reto}</div>
                <div className="ayuda-nivel-pieza">{n.pieza}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ayuda-seccion">
        <h2 className="ayuda-seccion-tit">
          <span className="ayuda-seccion-ico">💡</span>
          Consejos Importantes
        </h2>
        <div className="ayuda-consejos">
          <div className="ayuda-consejo">
            <span className="ayuda-consejo-ico">📷</span>
            <div><b>La foto es opcional.</b> Te ayuda como evidencia, pero si no tienes cámara puedes escribir el código directamente.</div>
          </div>
          <div className="ayuda-consejo">
            <span className="ayuda-consejo-ico">⌨️</span>
            <div><b>El código es flexible.</b> Mayúsculas, espacios y tildes no importan. "Juan 1:12" es igual a "juan112".</div>
          </div>
          <div className="ayuda-consejo">
            <span className="ayuda-consejo-ico">🔒</span>
            <div><b>No se saltan niveles.</b> Debes completar el 1 para abrir el 2, y así sucesivamente.</div>
          </div>
          <div className="ayuda-consejo">
            <span className="ayuda-consejo-ico">⏱️</span>
            <div><b>El cronómetro es tu amigo.</b> Si terminas rápido, ganas puntos extra. Si te tardas, no pasa nada.</div>
          </div>
          <div className="ayuda-consejo">
            <span className="ayuda-consejo-ico">🔄</span>
            <div><b>Si fallas, reintentas.</b> No hay penalización por equivocarse. ¡Intenta de nuevo!</div>
          </div>
          <div className="ayuda-consejo">
            <span className="ayuda-consejo-ico">🔊</span>
            <div><b>Ajusta el volumen.</b> Usa los botones de la barra superior para música, voces y sonidos.</div>
          </div>
        </div>
      </section>

      <section className="ayuda-seccion">
        <h2 className="ayuda-seccion-tit">
          <span className="ayuda-seccion-ico">🛡️</span>
          La Armadura de Dios
        </h2>
        <div className="ayuda-armadura">
          <p>Cada nivel desbloquea una pieza de la armadura descrita en <b>Efesios 6:10-18</b>:</p>
          <div className="ayuda-armadura-lista">
            <div className="ayuda-arm-item"><span>🎗️</span> Cinturón de la Verdad</div>
            <div className="ayuda-arm-item"><span>🦺</span> Coraza de Justicia</div>
            <div className="ayuda-arm-item"><span>⛑️</span> Yelmo de la Salvación</div>
            <div className="ayuda-arm-item"><span>🥾</span> Calzado de la Paz</div>
            <div className="ayuda-arm-item"><span>🛡️</span> Escudo de la Fe</div>
            <div className="ayuda-arm-item"><span>⚔️</span> Espada del Espíritu</div>
          </div>
        </div>
      </section>

      <div className="ayuda-footer">
        <Link href="/" className="ayuda-volver">← Volver al Juego</Link>
      </div>
    </div>
  )
}
