import useCarrusel from '../hooks/useCarrusel.js'
import { planes } from '../data/gimnasio.js'

// Carrusel de planes: la tarjeta del centro se agranda y brilla.
export default function CarruselPlanes({ alElegir }) {
  const inicial = Math.max(0, planes.findIndex((p) => p.destacado === 'Más popular'))
  const { pista, activo, irA, alTeclado } = useCarrusel(planes.length, { inicial, modo: 'centro' })

  return (
    <div className="gd-carrusel" role="region" aria-roledescription="carrusel" aria-label="Planes de membresía">
      <div className="gd-carrusel__marco">
        <button type="button" className="gd-flecha gd-flecha--izq" onClick={() => irA(activo - 1)} disabled={activo === 0} aria-label="Plan anterior">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>

        <div className="gd-pista gd-pista--centro" ref={pista} tabIndex={0} onKeyDown={alTeclado} aria-label="Usa las flechas del teclado para cambiar de plan">
          {planes.map((plan, i) => (
            <article
              key={plan.id}
              className={`gd-plan${i === activo ? ' es-activo' : ''}${plan.destacado ? ' es-destacado' : ''}`}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${planes.length}: plan ${plan.nombre}`}
              onClick={() => i !== activo && irA(i)}
            >
              {plan.destacado && <span className="gd-plan__cinta">{plan.destacado}</span>}
              <p className="gd-plan__duracion">{plan.duracion}</p>
              <h3 className="gd-plan__nombre">{plan.nombre}</h3>
              <p className="gd-plan__precio">
                <span className="gd-plan__moneda">$</span>
                <span className="gd-plan__monto">{plan.precio}</span>
                <span className="gd-plan__periodo">/ {plan.periodo}</span>
              </p>
              <p className="gd-plan__ideal">{plan.ideal}</p>
              <ul className="gd-plan__lista">
                {plan.incluye.map((item) => (
                  <li key={item}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`gd-btn gd-plan__cta${i === activo ? '' : ' gd-btn--suave'}`}
                onClick={(e) => { e.stopPropagation(); alElegir(plan.id) }}
              >
                Elegir {plan.nombre}
              </button>
            </article>
          ))}
        </div>

        <button type="button" className="gd-flecha gd-flecha--der" onClick={() => irA(activo + 1)} disabled={activo === planes.length - 1} aria-label="Plan siguiente">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="gd-puntos">
        {planes.map((plan, i) => (
          <button
            key={plan.id}
            type="button"
            className={`gd-punto${i === activo ? ' es-activo' : ''}`}
            onClick={() => irA(i)}
            aria-label={`Ver plan ${plan.nombre}`}
            aria-current={i === activo ? 'true' : undefined}
          >
            <span>{plan.nombre}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
