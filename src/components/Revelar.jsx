import { useEffect, useRef, useState } from 'react'

// Hace que una sección aparezca con animación al bajar con el scroll.
// Si el navegador no lo soporta o el usuario pidió menos movimiento, se muestra normal.
export default function Revelar({ as: Etiqueta = 'div', className = '', children, ...resto }) {
  const ref = useRef(null)
  const [estado, setEstado] = useState('visible')

  useEffect(() => {
    const el = ref.current
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!el || quieto || !('IntersectionObserver' in window)) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return // ya está en pantalla

    setEstado('oculto')
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) { setEstado('entrando'); obs.disconnect() }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Etiqueta ref={ref} className={`revelar revelar--${estado} ${className}`} {...resto}>
      {children}
    </Etiqueta>
  )
}
