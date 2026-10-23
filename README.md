# Gimnasio El Dragón — Página principal

Proyecto React + Vite con la página principal del sistema.

## Cómo correrlo

En Git Bash, dentro de esta carpeta:

```bash
npm install
npm run dev
```

Abre en el navegador la dirección que aparece (normalmente http://localhost:5173).

## Dónde está cada cosa

| Archivo | Qué tiene |
|---|---|
| `src/pages/Landing.jsx` | La página completa: portada, secciones y pie |
| `src/pages/Landing.css` | Estilos y colores (arriba están las variables de color) |
| `src/App.jsx` | Cambia entre la página principal y el login (`#login`) |
| `src/pages/Login.jsx` / `Login.css` | Pantalla de inicio de sesión |
| `src/services/auth.js` | Lógica del login (usuario DR + cédula, cuenta de prueba) |
| `src/components/Navbar.jsx` | Barra de arriba y menú del celular |
| `src/components/CarruselPlanes.jsx` | Carrusel de planes |
| `src/components/CarruselEntrenadores.jsx` | Carrusel de entrenadores y rutinas |
| `src/components/Registro.jsx` | Formulario de inscripción |
| `src/hooks/useCarrusel.js` | Lógica de los carruseles (flechas, puntos, teclado) |
| `src/data/gimnasio.js` | Planes, precios, entrenadores y rutinas |
| `src/assets/` | Logo, fondo de la portada (`fondo-portada.jpg`) |
| `src/assets/entrenadores/` | Fotos de los entrenadores (ver `LEEME.txt`) |

## Cambiar precios, planes o entrenadores

Editen `src/data/gimnasio.js`. Más adelante estos datos vendrán del backend.

## Entrenadores

Los perfiles y rutinas actuales son **de ejemplo** (`ejemplo: true` en `src/data/gimnasio.js`).
Antes de publicar, cambien nombres, descripciones, horarios, cupos y rutinas por los reales.

- **Fotos:** guarden `carlos.jpg`, `andrea.jpg`, etc. en `src/assets/entrenadores/` (mismo nombre que el `id`). Se cargan solas.
- **Estrellas:** solo aparecen si ponen `valoracion: { promedio: 4.8, total: 32 }` con datos reales.
- **WhatsApp:** solo aparece si ponen el número real en `whatsapp: '584121234567'`.

## Inicio de sesión

- Se entra en `localhost:5173/#login` o con el botón **Iniciar sesión**.
- Usuario: **DR + cédula** (ej. `DR27123456`). Si la persona escribe solo la cédula, se agrega el DR solo.
- Mientras no haya backend está en **modo demo** (`MODO_DEMO = true` en `src/services/auth.js`).
  Cuenta de prueba: `DR12345678` / `Dragon2026`.

### Correo al registrarse (lo hace el backend)
1. Al inscribirse, el servidor crea el usuario `DR` + cédula.
2. Envía un correo con el **usuario** y un **enlace para crear la contraseña** (que venza en 24 h).
   No enviar la contraseña escrita en el correo.
3. La contraseña se guarda cifrada (por ejemplo con `bcrypt`), nunca en texto plano.
Para enviar correos desde Node se puede usar Nodemailer con Gmail o un servicio como Resend o Brevo.
