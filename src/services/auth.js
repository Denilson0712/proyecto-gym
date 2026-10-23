// ============================================================
// Inicio de sesión de los socios de Gym Dragón
//
// Usuario = "DR" + número de cédula (ej. DR27123456).
//
// ⚠ MODO DEMO: todavía no hay backend, así que aquí se acepta solo una
//   cuenta de prueba. Cuando tengan la API, cambien MODO_DEMO a false y
//   completen la función iniciarSesion con el fetch al servidor.
// ============================================================

export const MODO_DEMO = true
export const CUENTA_DEMO = { usuario: 'DR12345678', clave: 'Dragon2026', nombre: 'Socio de prueba' }

export const PREFIJO = 'DR'
export const FORMATO_USUARIO = /^DR\d{6,9}$/

// Convierte lo que escribe la persona al formato correcto:
// "dr 27.123.456" -> "DR27123456" y "27123456" -> "DR27123456"
export function normalizarUsuario(texto) {
  let v = texto.toUpperCase().replace(/[\s.\-]/g, '')
  if (/^[VE]?\d+$/.test(v)) v = PREFIJO + v.replace(/^[VE]/, '')
  return v
}

// Arma el usuario a partir de la cédula (se usa al registrarse)
export const usuarioDesdeCedula = (cedula) => PREFIJO + String(cedula).replace(/\D/g, '')

const esperar = (ms) => new Promise((r) => setTimeout(r, ms))

export async function iniciarSesion(usuario, clave) {
  if (MODO_DEMO) {
    await esperar(700)
    if (usuario === CUENTA_DEMO.usuario && clave === CUENTA_DEMO.clave) {
      return { ok: true, nombre: CUENTA_DEMO.nombre }
    }
    return { ok: false, error: 'Usuario o contraseña incorrectos. Revisa los datos e inténtalo de nuevo.' }
  }

  // Cuando exista el backend:
  // const r = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ usuario, clave }),
  // })
  // const datos = await r.json()
  // return r.ok ? { ok: true, nombre: datos.nombre } : { ok: false, error: datos.mensaje }
  return { ok: false, error: 'El servidor todavía no está conectado.' }
}
