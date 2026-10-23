import { useCallback, useEffect, useRef, useState } from 'react'

// Lógica compartida de los carruseles: sabe qué tarjeta está al frente,
// mueve con flechas, puntos, teclado y deslizando con el dedo.
// modo 'centro': la tarjeta activa queda centrada (planes)
// modo 'inicio': la tarjeta activa queda a la izquierda (entrenadores)
export default function useCarrusel(total, { inicial = 0, modo = 'centro' } = {}) {
  const pista = useRef(null)
  const [activo, setActivo] = useState(inicial)

  const tarjetas = () => Array.from(pista.current?.children ?? [])

  const irA = useCallback(
    (i, suave = true) => {
      const el = pista.current
      const t = tarjetas()[Math.max(0, Math.min(total - 1, i))]
      if (!el || !t) return
      const izquierda =
        modo === 'centro'
          ? t.offsetLeft - (el.clientWidth - t.offsetWidth) / 2
          : t.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft || 0)
      const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollTo({ left: izquierda, behavior: suave && !quieto ? 'smooth' : 'auto' })
    },
    [total, modo]
  )

  // Detecta la tarjeta activa mientras se desliza
  useEffect(() => {
    const el = pista.current
    if (!el) return
    let raf = 0
    const medir = () => {
      const caja = el.getBoundingClientRect()
      const referencia = modo === 'centro' ? caja.left + caja.width / 2 : caja.left + parseFloat(getComputedStyle(el).paddingLeft || 0)
      let mejor = 0
      let distancia = Infinity
      tarjetas().forEach((t, i) => {
        const r = t.getBoundingClientRect()
        const punto = modo === 'centro' ? r.left + r.width / 2 : r.left
        const d = Math.abs(punto - referencia)
        if (d < distancia) { distancia = d; mejor = i }
      })
      // Si ya se llegó al final, el último cuenta como activo
      if (modo === 'inicio' && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) mejor = total - 1
      setActivo(mejor)
    }
    const alDeslizar = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(medir) }
    el.addEventListener('scroll', alDeslizar, { passive: true })
    window.addEventListener('resize', alDeslizar)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('scroll', alDeslizar)
      window.removeEventListener('resize', alDeslizar)
    }
  }, [modo, total])

  // Posición inicial sin animación
  useEffect(() => { irA(inicial, false) }, [irA, inicial])

  const alTeclado = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); irA(activo + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); irA(activo - 1) }
    if (e.key === 'Home') { e.preventDefault(); irA(0) }
    if (e.key === 'End') { e.preventDefault(); irA(total - 1) }
  }

  return { pista, activo, irA, alTeclado }
}
