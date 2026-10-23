import { useState } from 'react'
import { planes, entrenadores } from '../data/gimnasio.js'
import { MODO_DEMO, usuarioDesdeCedula } from '../services/auth.js'

const vacio = { nombre: '', cedula: '', telefono: '', correo: '' }

function validar(d) {
  const e = {}
  if (d.nombre.trim().length < 3) e.nombre = 'Escribe tu nombre y apellido.'
  if (!/^[VEve]?-?\d{6,9}$/.test(d.cedula.trim())) e.cedula = 'Escribe solo los números de tu cédula, por ejemplo 27123456.'
  if (!/^0?4\d{2}-?\d{7}$/.test(d.telefono.replace(/\s/g, ''))) e.telefono = 'Usa el formato 0412-1234567.'
  if (!d.correo.trim()) e.correo = 'Escribe tu correo: ahí te llegará tu usuario para entrar.'
  else if (!/^\S+@\S+\.\S+$/.test(d.correo)) e.correo = 'Revisa el correo, falta la @ o el dominio.'
  return e
}

// Formulario de inscripción. Por ahora solo valida; cuando exista el backend,
// aquí se enviarán los datos a la API (POST /api/socios). El servidor debe:
//   1. Crear el usuario DR + cédula.
//   2. Enviar un correo con ese usuario y un ENLACE para crear la contraseña
//      (no mandar la contraseña escrita en el correo).
export default function Registro({ plan, setPlan, entrenador, setEntrenador }) {
  const [datos, setDatos] = useState(vacio)
  const [errores, setErrores] = useState({})
  const [listo, setListo] = useState(null)

  const cambiar = (campo) => (ev) => {
    setDatos({ ...datos, [campo]: ev.target.value })
    if (errores[campo]) setErrores({ ...errores, [campo]: undefined })
  }

  const enviar = (ev) => {
    ev.preventDefault()
    const e = validar(datos)
    setErrores(e)
    if (Object.keys(e).length) {
      document.getElementById(`reg-${Object.keys(e)[0]}`)?.focus()
      return
    }
    setListo({
      nombre: datos.nombre.split(' ')[0],
      plan: planes.find((p) => p.id === plan)?.nombre,
      usuario: usuarioDesdeCedula(datos.cedula),
      correo: datos.correo.trim(),
    })
    setDatos(vacio)
  }

  const campo = (id, etiqueta, props = {}) => (
    <div className={`gd-campo${errores[id] ? ' tiene-error' : ''}`}>
      <label htmlFor={`reg-${id}`}>{etiqueta}</label>
      <input
        id={`reg-${id}`}
        value={datos[id]}
        onChange={cambiar(id)}
        aria-invalid={errores[id] ? 'true' : undefined}
        aria-describedby={errores[id] ? `reg-${id}-error` : undefined}
        {...props}
      />
      {errores[id] && <p className="gd-campo__error" id={`reg-${id}-error`}>{errores[id]}</p>}
    </div>
  )

  return (
    <form className="gd-form" onSubmit={enviar} noValidate>
      {listo && (
        <div className="gd-form__exito" role="status">
          <b>¡Listo, {listo.nombre}!</b> Recibimos tu solicitud del plan {listo.plan}.
          <span className="gd-form__usuario">Tu usuario para entrar es <b>{listo.usuario}</b></span>
          Te enviaremos a <b>{listo.correo}</b> un correo con tu usuario y un enlace para crear tu contraseña. Pasa por recepción con tu cédula para activar tu membresía.
          {MODO_DEMO && <small className="gd-form__demo">Versión de prueba: el correo se enviará cuando el servidor esté conectado.</small>}
        </div>
      )}
      <div className="gd-form__grid">
        {campo('nombre', 'Nombre y apellido', { autoComplete: 'name', placeholder: 'Ej. Ana Pérez' })}
        {campo('cedula', 'Cédula', { inputMode: 'numeric', placeholder: 'Ej. 27123456' })}
        {campo('telefono', 'Teléfono', { type: 'tel', autoComplete: 'tel', placeholder: '0412-1234567' })}
        {campo('correo', 'Correo', { type: 'email', autoComplete: 'email', placeholder: 'tucorreo@gmail.com' })}

        <div className="gd-campo">
          <label htmlFor="reg-plan">Plan</label>
          <select id="reg-plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
            {planes.map((p) => <option key={p.id} value={p.id}>{p.nombre} · ${p.precio} / {p.periodo}</option>)}
          </select>
        </div>

        <div className="gd-campo">
          <label htmlFor="reg-entrenador">Entrenador (opcional)</label>
          <select id="reg-entrenador" value={entrenador} onChange={(e) => setEntrenador(e.target.value)}>
            <option value="">Sin preferencia</option>
            {entrenadores.map((t) => <option key={t.id} value={t.id}>{t.nombre} · {t.especialidad}</option>)}
          </select>
        </div>
      </div>
      <button type="submit" className="gd-btn gd-btn--grande">Enviar inscripción</button>
    </form>
  )
}
