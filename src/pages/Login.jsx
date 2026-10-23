import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo-gym-dragon.png'
import { FORMATO_USUARIO, iniciarSesion, normalizarUsuario } from '../services/auth.js'
import './Login.css'

const CLAVE_RECORDAR = 'gd-usuario-recordado'

const leerRecordado = () => {
  try { return localStorage.getItem(CLAVE_RECORDAR) || '' } catch { return '' }
}
const guardarRecordado = (usuario) => {
  try { usuario ? localStorage.setItem(CLAVE_RECORDAR, usuario) : localStorage.removeItem(CLAVE_RECORDAR) } catch { /* sin almacenamiento */ }
}

export default function Login() {
  const recordado = leerRecordado()
  const [usuario, setUsuario] = useState(recordado)
  const [clave, setClave] = useState('')
  const [verClave, setVerClave] = useState(false)
  const [recordar, setRecordar] = useState(Boolean(recordado))
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')
  const [cargando, setCargando] = useState(false)
  const [sesion, setSesion] = useState(null)
  const [ayudaClave, setAyudaClave] = useState(false)
  const refUsuario = useRef(null)
  const refClave = useRef(null)

  useEffect(() => { (recordado ? refClave : refUsuario).current?.focus() }, [])

  const validar = () => {
    const e = {}
    const u = normalizarUsuario(usuario)
    if (!u) e.usuario = 'Escribe tu usuario.'
    else if (!FORMATO_USUARIO.test(u)) e.usuario = 'Tu usuario es DR seguido de tu cédula, sin espacios. Ejemplo: DR27123456.'
    if (!clave) e.clave = 'Escribe tu contraseña.'
    return { e, u }
  }

  const enviar = async (ev) => {
    ev.preventDefault()
    setErrorGeneral('')
    const { e, u } = validar()
    setUsuario(u)
    setErrores(e)
    if (e.usuario) { refUsuario.current?.focus(); return }
    if (e.clave) { refClave.current?.focus(); return }

    setCargando(true)
    const r = await iniciarSesion(u, clave)
    setCargando(false)
    if (r.ok) {
      guardarRecordado(recordar ? u : '')
      setSesion({ nombre: r.nombre, usuario: u })
      setClave('')
    } else {
      setErrorGeneral(r.error)
      setClave('')
      refClave.current?.focus()
    }
  }

  return (
    <div className="lg">
      <div className="lg__fondo" aria-hidden="true" />

      <a className="lg__volver" href="#inicio">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        Volver al inicio
      </a>

      <main className="lg__centro">
        <img className="lg__logo" src={logo} alt="Gym Dragón" width="280" height="260" />

        <section className="lg__tarjeta" aria-labelledby="lg-titulo">
          {sesion ? (
            <div className="lg__bienvenida" role="status">
              <h1 id="lg-titulo">¡Bienvenido, {sesion.nombre}!</h1>
              <p>Iniciaste sesión como <b>{sesion.usuario}</b>.</p>
              <p className="lg__nota">El panel del socio (pagos, asistencia y rutina) todavía está en construcción.</p>
              <a className="gd-btn gd-btn--grande lg__boton" href="#inicio">Ir a la página principal</a>
              <button type="button" className="lg__enlace" onClick={() => setSesion(null)}>Cerrar sesión</button>
            </div>
          ) : (
            <>
              <h1 id="lg-titulo">Iniciar sesión</h1>

              {errorGeneral && <p className="lg__alerta" role="alert">{errorGeneral}</p>}

              <form onSubmit={enviar} noValidate>
                <div className={`lg__campo${errores.usuario ? ' tiene-error' : ''}`}>
                  <label htmlFor="lg-usuario">Usuario</label>
                  <input
                    ref={refUsuario}
                    id="lg-usuario"
                    name="username"
                    value={usuario}
                    onChange={(e) => { setUsuario(e.target.value.toUpperCase()); setErrores({ ...errores, usuario: undefined }) }}
                    onBlur={() => usuario && setUsuario(normalizarUsuario(usuario))}
                    autoComplete="username"
                    autoCapitalize="characters"
                    spellCheck="false"
                    placeholder="DR27123456"
                    maxLength={14}
                    aria-invalid={errores.usuario ? 'true' : undefined}
                    aria-describedby={errores.usuario ? 'lg-usuario-error' : undefined}
                  />
                  {errores.usuario && <p className="lg__ayuda" id="lg-usuario-error">{errores.usuario}</p>}
                </div>

                <div className={`lg__campo${errores.clave ? ' tiene-error' : ''}`}>
                  <label htmlFor="lg-clave">Contraseña</label>
                  <div className="lg__clave">
                    <input
                      ref={refClave}
                      id="lg-clave"
                      name="password"
                      type={verClave ? 'text' : 'password'}
                      value={clave}
                      onChange={(e) => { setClave(e.target.value); setErrores({ ...errores, clave: undefined }) }}
                      autoComplete="current-password"
                      aria-invalid={errores.clave ? 'true' : undefined}
                      aria-describedby={errores.clave ? 'lg-clave-error' : undefined}
                    />
                    <button
                      type="button"
                      className="lg__ojo"
                      onClick={() => setVerClave((v) => !v)}
                      aria-label={verClave ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      aria-pressed={verClave}
                    >
                      {verClave ? (
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 6.1A9.9 9.9 0 0 1 12 6c5 0 9 4.5 10 6-.5.8-1.6 2.2-3.1 3.5M6.2 7.6C4.3 8.9 2.9 10.7 2 12c1 1.5 5 6 10 6 1.6 0 3-.4 4.3-1.1M9.9 10a3 3 0 0 0 4.1 4.1" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12c1-1.5 5-6 10-6s9 4.5 10 6c-1 1.5-5 6-10 6S3 13.5 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
                      )}
                    </button>
                  </div>
                  {errores.clave && <p className="lg__ayuda" id="lg-clave-error">{errores.clave}</p>}
                </div>

                <div className="lg__fila">
                  <label className="lg__check">
                    <input type="checkbox" id="lg-recordar" checked={recordar} onChange={(e) => setRecordar(e.target.checked)} />
                    <span>Recordar mi usuario</span>
                  </label>
                  <button type="button" className="lg__enlace" onClick={() => setAyudaClave((v) => !v)} aria-expanded={ayudaClave} aria-controls="lg-olvido">
                    Olvidé mi contraseña
                  </button>
                </div>

                {ayudaClave && (
                  <p className="lg__info" id="lg-olvido">
                    Pide en recepción que te envíen un nuevo enlace a tu correo para crear otra contraseña. Lleva tu cédula.
                  </p>
                )}

                <button type="submit" className="gd-btn gd-btn--grande lg__boton" disabled={cargando}>
                  {cargando ? 'Entrando…' : 'Entrar'}
                </button>
              </form>

              <p className="lg__registro">
                ¿Todavía no eres socio? <a href="#registro">Inscríbete aquí</a>
              </p>

            </>
          )}
        </section>
      </main>
    </div>
  )
}
