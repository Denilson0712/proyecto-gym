import { useRef, useState } from 'react'
import useCarrusel from '../hooks/useCarrusel.js'
import { entrenadores } from '../data/gimnasio.js'

// Fotos guardadas en src/assets/entrenadores/ con el nombre del id (ej. carlos.jpg).
// Vite las encuentra solas: para agregar o cambiar una foto no hay que tocar este archivo.
const fotosLocales = import.meta.glob('../assets/entrenadores/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

function fotoDe(ent) {
  if (ent.foto) return ent.foto
  const encontrada = Object.entries(fotosLocales).find(([ruta]) => ruta.split('/').pop().replace(/\.[^.]+$/, '') === ent.id)
  return encontrada ? encontrada[1] : ''
}

const textoCupos = (n) => `${n} ${n === 1 ? 'cupo libre' : 'cupos libres'}`

// Tarjeta que se voltea en 3D.
// Delante: perfil, horario y cupos. Detrás: su rutina y la reserva.
function TarjetaEntrenador({ ent, posicion, total }) {
  const [volteada, setVolteada] = useState(false)
  const [ocupados, setOcupados] = useState(ent.cupos.ocupados)
  const [reservado, setReservado] = useState(false)
  const [enEspera, setEnEspera] = useState(false)
  const [fotoRota, setFotoRota] = useState(false)
  const btnVerRutina = useRef(null)
  const btnVolver = useRef(null)

  const foto = fotoRota ? '' : fotoDe(ent)
  const { rutina, valoracion } = ent
  const maximo = ent.cupos.maximo
  const agotado = ocupados >= maximo
  const libres = maximo - ocupados
  const porcentaje = Math.min(100, Math.round((ocupados / maximo) * 100))
  const estadoBarra = agotado ? 'lleno' : porcentaje >= 80 ? 'casi' : 'libre'
  const nombreCorto = ent.nombre.split(' ')[0]
  const enlaceWhatsapp = ent.whatsapp
    ? `https://wa.me/${ent.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${nombreCorto}, vi tu perfil en la página de Gimnasio El Dragón y quiero información para entrenar contigo.`)}`
    : ''

  const voltear = (v) => {
    setVolteada(v)
    // Lleva el foco a la cara que queda visible (teclado y lectores de pantalla)
    setTimeout(() => (v ? btnVolver : btnVerRutina).current?.focus({ preventScroll: true }), 50)
  }

  const reservar = () => {
    if (reservado) { setReservado(false); setOcupados((n) => n - 1); return }
    if (agotado) return
    setReservado(true)
    setOcupados((n) => n + 1)
  }

  const etiquetaAgotado = agotado && <span className="gd-coach__agotado">Cupos agotados</span>

  return (
    <article
      className={`gd-coach${volteada ? ' es-volteada' : ''}${agotado ? ' es-agotado' : ''}`}
      role="group"
      aria-roledescription="diapositiva"
      aria-label={`${posicion} de ${total}: ${ent.nombre}, ${ent.especialidad}`}
    >
      <div className="gd-coach__giro">
        {/* -------- Cara de adelante: perfil -------- */}
        <div className="gd-coach__cara gd-coach__frente" aria-hidden={volteada} inert={volteada ? '' : undefined}>
          {/* Foto grande del entrenador con su nombre encima */}
          <div className={`gd-coach__foto${foto ? '' : ' es-pendiente'}`}>
            {foto ? (
              <img src={foto} alt={`Foto de ${ent.nombre}`} loading="lazy" width="640" height="800" onError={() => setFotoRota(true)} />
            ) : (
              <svg viewBox="0 0 64 64" role="img" aria-label="Foto pendiente"><circle cx="32" cy="24" r="12" /><path d="M10 60c2-13 11-20 22-20s20 7 22 20" /></svg>
            )}
            {etiquetaAgotado && <div className="gd-coach__marcas">{etiquetaAgotado}</div>}
            <div className="gd-coach__identidad">
              <p className="gd-coach__esp">{ent.especialidad}</p>
              <h3>{ent.nombre}</h3>
            </div>
          </div>

          {valoracion ? (
            <p className="gd-coach__estrellas" aria-label={`Calificación ${valoracion.promedio} de 5, ${valoracion.total} valoraciones`}>
              <span aria-hidden="true">★</span> {valoracion.promedio.toFixed(1)} <small>({valoracion.total} valoraciones)</small>
            </p>
          ) : (
            <p className="gd-coach__estrellas es-vacia">Aún sin valoraciones</p>
          )}

          <p className="gd-coach__desc">{ent.descripcion}</p>

          <p className="gd-coach__horario">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            {ent.horario}
          </p>

          <div className="gd-cupos">
            <div className="gd-cupos__texto">
              <span>Cupos</span>
              <b>{ocupados}/{maximo}</b>
            </div>
            <div
              className={`gd-cupos__barra gd-cupos__barra--${estadoBarra}`}
              role="progressbar"
              aria-label={`Cupos ocupados de ${ent.nombre}`}
              aria-valuemin={0}
              aria-valuemax={maximo}
              aria-valuenow={ocupados}
              aria-valuetext={agotado ? 'Sin cupos' : textoCupos(libres)}
            >
              <span style={{ width: `${porcentaje}%` }} />
            </div>
            <p className="gd-cupos__nota" aria-live="polite">{agotado ? 'Sin cupos por ahora' : textoCupos(libres)}</p>
          </div>

          <div className="gd-coach__botones">
            <button ref={btnVerRutina} type="button" className="gd-btn" onClick={() => voltear(true)} aria-label={`Ver rutina de ${ent.nombre}`}>
              Ver rutina
            </button>
            {enlaceWhatsapp && (
              <a className="gd-btn gd-btn--whatsapp" href={enlaceWhatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Contactar a ${ent.nombre} por WhatsApp (se abre en otra pestaña)`}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm0 16.4a7.4 7.4 0 0 1-3.8-1l-.3-.2-2.7.7.7-2.6-.2-.3A7.4 7.4 0 1 1 12 19.4zm4-5.5c-.2-.1-1.3-.7-1.5-.7s-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6 6 0 0 1-3-2.6c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.8 1.8 4.3 4.3 0 0 0 .9 2.3 9.6 9.6 0 0 0 3.7 3.3c1.4.6 1.9.6 2.6.5a2.2 2.2 0 0 0 1.5-1c.2-.5.2-.9.1-1z" /></svg>
                Contactar por WhatsApp
              </a>
            )}
          </div>
          {ent.ejemplo && <p className="gd-coach__nota-ejemplo">Perfil de ejemplo</p>}
        </div>

        {/* -------- Cara de atrás: rutina -------- */}
        <div className="gd-coach__cara gd-coach__dorso" aria-hidden={!volteada} inert={volteada ? undefined : ''}>
          <div className="gd-coach__marcas">
            {rutina.ejemplo ? <span className="gd-coach__ejemplo" title="Rutina de ejemplo, pendiente de aprobación del entrenador">Ejemplo<span className="gd-oculto"> (rutina de prueba)</span></span> : <span className="gd-coach__aprobada">Oficial</span>}
            {etiquetaAgotado}
          </div>

          <p className="gd-coach__titulo">Rutina de {nombreCorto}</p>
          <h3 className="gd-coach__rutina-nombre">{rutina.nombre}</h3>
          <p className="gd-coach__objetivo"><b>Objetivo:</b> {rutina.objetivo}</p>

          <table className="gd-ejercicios">
            <caption className="gd-oculto">Ejercicios de la rutina {rutina.nombre}</caption>
            <thead>
              <tr><th scope="col">Ejercicio</th><th scope="col">Series × reps</th></tr>
            </thead>
            <tbody>
              {rutina.ejercicios.map((ej) => (
                <tr key={ej.nombre}>
                  <th scope="row">{ej.nombre}</th>
                  <td>{ej.series ? `${ej.series} × ${ej.repeticiones}` : ej.repeticiones || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="gd-coach__acciones">
            {agotado && !reservado ? (
              <button type="button" className={`gd-btn ${enEspera ? 'gd-btn--hecho' : 'gd-btn--espera'}`} onClick={() => setEnEspera((v) => !v)} aria-pressed={enEspera}>
                {enEspera ? '✓ En lista de espera' : 'Unirme a lista de espera'}
              </button>
            ) : (
              <button type="button" className={`gd-btn${reservado ? ' gd-btn--hecho' : ''}`} onClick={reservar} aria-pressed={reservado}>
                {reservado ? '✓ Cupo reservado' : 'Reservar cupo'}
              </button>
            )}
            <p className="gd-coach__aviso" aria-live="polite">
              {reservado && 'Toca otra vez para cancelar la reserva.'}
              {enEspera && !reservado && 'Te avisaremos cuando se libere un cupo.'}
            </p>
            <button ref={btnVolver} type="button" className="gd-coach__volver" onClick={() => voltear(false)}>
              ← Volver al perfil
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function CarruselEntrenadores() {
  const { pista, activo, irA, alTeclado } = useCarrusel(entrenadores.length, { modo: 'inicio' })

  return (
    <div className="gd-carrusel" role="region" aria-roledescription="carrusel" aria-label="Entrenadores y sus rutinas">
      <div className="gd-carrusel__controles">
        <p className="gd-contador" aria-live="polite">
          <b>{String(activo + 1).padStart(2, '0')}</b> / {String(entrenadores.length).padStart(2, '0')}
        </p>
        <div className="gd-carrusel__flechas">
          <button type="button" className="gd-flecha" onClick={() => irA(activo - 1)} disabled={activo === 0} aria-label="Entrenador anterior">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" className="gd-flecha" onClick={() => irA(activo + 1)} disabled={activo === entrenadores.length - 1} aria-label="Entrenador siguiente">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="gd-pista gd-pista--inicio" ref={pista} tabIndex={0} onKeyDown={alTeclado} aria-label="Lista de entrenadores. Usa las flechas del teclado o desliza para ver más">
        {entrenadores.map((ent, i) => (
          <TarjetaEntrenador key={ent.id} ent={ent} posicion={i + 1} total={entrenadores.length} />
        ))}
      </div>
    </div>
  )
}
