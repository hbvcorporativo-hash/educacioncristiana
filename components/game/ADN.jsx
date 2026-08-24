'use client'

import { HUELLA } from './constantes'

/* Medidor ADN — replica .adn con disco, aro SVG y huellas */
export default function ADN({ fraccion = 0, xl = false, md = false }) {
  const cls = xl ? 'adn adn-xl' : md ? 'adn adn-md' : 'adn'
  return (
    <div className={cls} data-adn>
      <span className="disco"></span>
      <svg className="aro" viewBox="0 0 100 100">
        <circle className="base" cx="50" cy="50" r="45" strokeWidth="7" />
        <circle
          className="llena"
          cx="50" cy="50" r="45" strokeWidth="7"
          strokeDasharray="282.7"
          strokeDashoffset={(282.7 * (1 - fraccion)).toFixed(1)}
        />
      </svg>
      <span className="huellas">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="gris" src={HUELLA} alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="viva"
          src={HUELLA}
          alt="ADN"
          style={{ clipPath: `circle(${(fraccion * 75).toFixed(1)}% at 50% 50%)` }}
        />
      </span>
    </div>
  )
}
