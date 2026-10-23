import { useEffect, useState } from 'react'
import icono from '../assets/dragon-icono.png'

const enlaces = [
  { href: '#planes', texto: 'Planes' },
  { href: '#entrenadores', texto: 'Entrenadores' },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const [solido, setSolido] = useState(false)

  // La barra se vuelve sólida al bajar, para que el texto siempre se lea
  useEffect(() => {
    const alBajar = () => setSolido(window.scrollY > 40)
    alBajar()
    window.addEventListener('scroll', alBajar, { passive: true })
    return () => window.removeEventListener('scroll', alBajar)
  }, [])

  const cerrar = () => setAbierto(false)

  return (
    <header className={`gd-nav${solido || abierto ? ' es-solido' : ''}`}>
      <div className="gd-nav__fila">
        <a className="gd-marca" href="#inicio" onClick={cerrar}>
          <img src={icono} alt="" width="52" height="40" />
          <span>GYM <b>DRAGÓN</b></span>
        </a>

        <nav className="gd-nav__links" aria-label="Principal">
          {enlaces.map((e) => <a key={e.href} href={e.href}>{e.texto}</a>)}
        </nav>

        <div className="gd-nav__acciones">
          <a className="gd-btn gd-btn--nav gd-btn--borde" href="#registro">Regístrate</a>
          <a className="gd-btn gd-btn--nav" href="#login">Iniciar sesión</a>
        </div>

        <button
          type="button"
          className="gd-nav__menu"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <nav id="menu-movil" className="gd-nav__movil" hidden={!abierto} aria-label="Menú móvil">
        {enlaces.map((e) => <a key={e.href} href={e.href} onClick={cerrar}>{e.texto}</a>)}
        <a className="gd-btn gd-btn--borde" href="#registro" onClick={cerrar}>Regístrate</a>
        <a className="gd-btn" href="#login" onClick={cerrar}>Iniciar sesión</a>
      </nav>
    </header>
  )
}
