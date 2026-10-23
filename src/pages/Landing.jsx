import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import CarruselPlanes from '../components/CarruselPlanes.jsx'
import CarruselEntrenadores from '../components/CarruselEntrenadores.jsx'
import Registro from '../components/Registro.jsx'
import Revelar from '../components/Revelar.jsx'
import logo from '../assets/logo-gym-dragon.png'
import icono from '../assets/dragon-icono.png'
import './Landing.css'

export default function Landing() {
  const [plan, setPlan] = useState('mensual')
  const [entrenador, setEntrenador] = useState('')

  const irARegistro = () => {
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('registro')?.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth' })
    setTimeout(() => document.getElementById('reg-nombre')?.focus({ preventScroll: true }), quieto ? 0 : 600)
  }

  return (
    <div className="gd">
      <a className="gd-saltar" href="#contenido">Saltar al contenido</a>
      <Navbar />

      <main id="contenido">
        <section className="gd-hero" id="inicio">
          <div className="gd-hero__fondo" aria-hidden="true" />
          <div className="gd-hero__velo" aria-hidden="true" />

          <div className="gd-hero__texto">
            <img className="gd-hero__logo" src={icono} alt="" width="180" height="139" />
            <p className="gd-hero__bienvenida">Bienvenido a</p>
            <h1><span className="gd-hero__nombre-1">GYM</span> <span className="gd-hero__nombre-2">DRAGÓN</span></h1>
            <div className="gd-hero__acciones">
              <a className="gd-btn gd-btn--grande" href="#registro">Únete ahora</a>
              <a className="gd-btn gd-btn--grande gd-btn--vidrio" href="#planes">Ver planes</a>
            </div>
            <p className="gd-hero__horario">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              <span><b>Lunes a sábado</b> · 5:00 a. m. – 10:00 p. m.</span>
            </p>
          </div>
        </section>

        <Revelar as="section" className="gd-seccion" id="planes" aria-labelledby="planes-titulo">
          <div className="gd-seccion__cabeza">
            <p className="gd-eyebrow">Membresías</p>
            <h2 id="planes-titulo">Elige tu plan</h2>
            <p>Elige el plan que mejor se adapte a ti. Pagas en recepción en efectivo, pago móvil o transferencia.</p>
          </div>
          <CarruselPlanes alElegir={(id) => { setPlan(id); irARegistro() }} />
        </Revelar>

        <Revelar as="section" className="gd-seccion gd-seccion--alterna" id="entrenadores" aria-labelledby="entrenadores-titulo">
          <div className="gd-seccion__cabeza">
            <p className="gd-eyebrow">Equipo</p>
            <h2 id="entrenadores-titulo">Encuentra tu entrenador ideal</h2>
            <p>Cada entrenador se enfoca en un objetivo distinto. Elige el que va con tu meta y mira su rutina antes de reservar.</p>
          </div>
          <CarruselEntrenadores alElegir={(id) => { setEntrenador(id); irARegistro() }} />
        </Revelar>

        <Revelar as="section" className="gd-seccion gd-registro" id="registro" aria-labelledby="registro-titulo">
          <div className="gd-registro__lado">
            <img src={logo} alt="Logo de Gym Dragón" width="280" height="260" loading="lazy" />
          </div>
          <div className="gd-registro__form">
            <p className="gd-eyebrow">Regístrate</p>
            <h2 id="registro-titulo">Empieza hoy</h2>
            <p>Déjanos tus datos y te esperamos en recepción para activar tu plan.</p>
            <Registro plan={plan} setPlan={setPlan} entrenador={entrenador} setEntrenador={setEntrenador} />
          </div>
        </Revelar>
      </main>

      <footer className="gd-pie">
        <div className="gd-pie__marca">
          <img src={icono} alt="" width="44" height="34" />
          <span>GYM <b>DRAGÓN</b></span>
        </div>
        <p>Lunes a sábado de 5:00 a. m. a 10:00 p. m. · Domingos cerrado</p>
        <p className="gd-pie__nota">© 2026 Gym Dragón</p>
      </footer>
    </div>
  )
}
