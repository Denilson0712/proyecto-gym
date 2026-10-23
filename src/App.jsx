import { useEffect, useState } from 'react'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'

// Navegación sencilla con el # de la dirección:
//   localhost:5173/#login  -> pantalla de inicio de sesión
//   cualquier otra         -> página principal (y baja a la sección del #)
const vistaActual = () => (window.location.hash === '#login' ? 'login' : 'inicio')

export default function App() {
  const [vista, setVista] = useState(vistaActual)

  useEffect(() => {
    const alCambiar = () => setVista(vistaActual())
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  // Al volver a la página principal, baja a la sección pedida (#planes, #registro...)
  useEffect(() => {
    if (vista !== 'inicio') { window.scrollTo(0, 0); return }
    const id = window.location.hash.slice(1)
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [vista])

  return vista === 'login' ? <Login /> : <Landing />
}
