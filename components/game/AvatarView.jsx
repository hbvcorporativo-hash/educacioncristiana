'use client'

import { useEffect, useState } from 'react'
import { urlAvatar, NIVELES } from '@/lib/data'

/* Avatar con disco y piezas de armadura orbitando */
export default function AvatarView({ av, niveles = NIVELES, nueva = null, xl = false, md = false, sm = false }) {
  const [imgOk, setImgOk] = useState(true)
  const avatarUrl = urlAvatar(av.seed, av.estilo)
  const eq = niveles.filter(x => x.hecho).map(x => x.pieza)

  useEffect(() => setImgOk(true), [avatarUrl])

  const cls = xl ? 'ava ava-xl' : md ? 'ava ava-md' : sm ? 'ava ava-sm' : 'ava'
  const iniciales = (av.nombre || '').trim()
    ? (av.nombre || '').trim().slice(0, 1).toUpperCase()
    : '?'

  return (
    <div className={cls}>
      <div className="ava-disc">
        {imgOk && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
             src={avatarUrl}
            alt="avatar"
            onError={() => setImgOk(false)}
          />
        )}
        {!imgOk && <span className="ava-ini">{iniciales}</span>}
      </div>
      {NIVELES.map((x, i) => (
        <div
          key={x.pieza}
          className={`ava-b ${eq.includes(x.pieza) ? 'on' : ''} ${nueva === x.pieza ? 'nueva' : ''}`}
          style={{ '--a': `${-90 + i * 60}deg` }}
          title={x.piezaNom}
        >
          {x.ico}
        </div>
      ))}
    </div>
  )
}
