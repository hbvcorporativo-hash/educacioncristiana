'use client'

import { useEffect, useMemo, useState } from 'react'

const MENSAJES = {
  inicio: ['ESTABLECIENDO CONEXIÓN...', 'BYPASSING FIREWALL NEURAL...', 'ACCESO PERMITIDO'],
  avatar: ['CARGANDO PERFIL DE OPERADOR...', 'SINCRONIZANDO NODOS ADN...', 'PERFIL LISTO'],
  hackeo: ['ANALIZANDO CÓDIGO SECRETO...', 'DESCONTAMINANDO SECTOR...', 'ADN RESTAURADO']
}

function matriz() {
  const chars = 'アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return Array.from({ length: 180 }, (_, i) => chars[(i * 17 + i * i) % chars.length]).join(' ')
}

export default function MatrixLoader({ tipo = 'hackeo' }) {
  const [pct, setPct] = useState(0)
  const [mensaje, setMensaje] = useState(MENSAJES[tipo][0])
  const columnas = useMemo(() => Array.from({ length: 13 }, (_, i) => ({ id: i, texto: matriz(), delay: `${-(i * 0.37)}s` })), [])

  useEffect(() => {
    const inicio = performance.now()
    const timer = setInterval(() => {
      const progreso = Math.min(100, Math.round((performance.now() - inicio) / 1500 * 100))
      setPct(progreso)
      setMensaje(MENSAJES[tipo][progreso >= 72 ? 2 : progreso >= 35 ? 1 : 0])
      if (progreso >= 100) clearInterval(timer)
    }, 50)
    return () => clearInterval(timer)
  }, [tipo])

  return (
    <div className="matrix-loader" role="status" aria-live="polite" aria-label="Procesando hackeo">
      <div className="matrix-rain" aria-hidden="true">
        {columnas.map(col => <span key={col.id} style={{ animationDelay: col.delay }}>{col.texto}</span>)}
      </div>
      <div className="matrix-terminal">
        <div className="matrix-top mono"><span>root@adn:~$</span><b> SECURE_CHANNEL</b></div>
        <div className="matrix-title">{mensaje}</div>
        <div className="matrix-bar"><div style={{ width: `${pct}%` }} /></div>
        <div className="matrix-progress mono">[{('█'.repeat(Math.floor(pct / 10)) + '░'.repeat(10 - Math.floor(pct / 10)))}] {pct}%</div>
        <div className="matrix-status mono">&gt; EJECUTANDO PROTOCOLO<span className="matrix-cursor">_</span></div>
      </div>
    </div>
  )
}
