// Datos de ejemplo. Cuando tengan el backend, esto vendrá de la base de datos.
// Cambien aquí precios, nombres y rutinas.

export const planes = [
  {
    id: 'diario',
    nombre: 'Pase Diario',
    precio: 3,
    periodo: 'día',
    duracion: '1 día',
    ideal: 'Para probar el gym o entrenar de visita',
    incluye: ['Acceso a sala de pesas y cardio', 'Uso de vestuarios y duchas', 'Válido solo el día de compra'],
  },
  {
    id: 'semanal',
    nombre: 'Pase Semanal',
    precio: 10,
    periodo: 'semana',
    duracion: '7 días',
    ideal: 'Para una semana de entrenamiento sin compromiso',
    incluye: ['Sala de pesas y cardio', '2 clases grupales', 'Asesoría básica en sala'],
  },
  {
    id: 'mensual',
    nombre: 'Membresía Mensual',
    precio: 25,
    periodo: 'mes',
    duracion: '30 días',
    ideal: 'Para entrenar en serio todo el mes',
    incluye: ['Sala de pesas y cardio', 'Clases grupales ilimitadas', 'Evaluación física inicial', 'Rutina asignada por un entrenador'],
    destacado: 'Más popular',
  },
]

// ============================================================
// ENTRENADORES
// ⚠ DATOS DE EJEMPLO: nombres, descripciones, cupos y rutinas son de prueba.
//   Antes de publicar, cámbienlos por los datos reales del gimnasio y pongan
//   ejemplo: false en cada entrenador y en cada rutina ya aprobada.
//
// foto:        déjala vacía ('') y guarda la imagen en src/assets/entrenadores/
//              con el mismo nombre que el id (ej. carlos.jpg). Se carga sola.
// valoracion:  null = no se muestran estrellas. Cuando tengan reseñas reales:
//              valoracion: { promedio: 4.8, total: 32 }
// whatsapp:    número real con código de país, solo dígitos (ej. '584121234567').
//              Si está vacío ('') el botón de WhatsApp no aparece.
// cupos:       ocupados = personas inscritas ahora, maximo = límite del entrenador.
// rutina.ejercicios: series y repeticiones son opcionales (null si no aplica).
// ============================================================
export const entrenadores = [
  {
    id: 'carlos',
    ejemplo: true,
    nombre: 'Carlos Mendoza',
    foto: '',
    especialidad: 'Hipertrofia y masa muscular',
    descripcion: 'Rutinas por grupos musculares para ganar tamaño con buena técnica.',
    valoracion: null,
    whatsapp: '',
    cupos: { ocupados: 18, maximo: 20 },
    horario: 'Lun a Vie · 6:00 a. m. – 12:00 m.',
    rutina: {
      nombre: 'Volumen Dragón',
      ejemplo: true,
      objetivo: 'Aumentar masa muscular en tren superior e inferior.',
      ejercicios: [
        { nombre: 'Press de banca', series: 4, repeticiones: '8–10' },
        { nombre: 'Remo con barra', series: 4, repeticiones: '8–10' },
        { nombre: 'Sentadilla', series: 4, repeticiones: '8–10' },
        { nombre: 'Press militar', series: 3, repeticiones: '10–12' },
        { nombre: 'Curl de bíceps', series: 3, repeticiones: '12' },
      ],
    },
  },
  {
    id: 'andrea',
    ejemplo: true,
    nombre: 'Andrea Rivas',
    foto: '',
    especialidad: 'Pérdida de grasa y acondicionamiento',
    descripcion: 'Circuitos de alta intensidad para quemar grasa y mejorar tu condición.',
    valoracion: null,
    whatsapp: '',
    cupos: { ocupados: 20, maximo: 20 },
    horario: 'Lun a Sáb · 3:00 p. m. – 9:00 p. m.',
    rutina: {
      nombre: 'Quema total',
      ejemplo: true,
      objetivo: 'Reducir grasa corporal con circuitos y cardio.',
      ejercicios: [
        { nombre: 'Sentadilla con salto', series: 3, repeticiones: '15' },
        { nombre: 'Burpees', series: 3, repeticiones: '10' },
        { nombre: 'Remo con mancuerna', series: 3, repeticiones: '12' },
        { nombre: 'Escaladores', series: 3, repeticiones: '30 s' },
        { nombre: 'Bicicleta a ritmo moderado', series: null, repeticiones: '15 min' },
      ],
    },
  },
  {
    id: 'luis',
    ejemplo: true,
    nombre: 'Luis Ferrer',
    foto: '',
    especialidad: 'Fuerza y levantamiento',
    descripcion: 'Trabajo con barra para subir tus marcas en los levantamientos básicos.',
    valoracion: null,
    whatsapp: '',
    cupos: { ocupados: 9, maximo: 12 },
    horario: 'Mar a Sáb · 5:00 p. m. – 10:00 p. m.',
    rutina: {
      nombre: 'Fuerza 5×5',
      ejemplo: true,
      objetivo: 'Ganar fuerza en sentadilla, banca y peso muerto.',
      ejercicios: [
        { nombre: 'Sentadilla', series: 5, repeticiones: '5' },
        { nombre: 'Press de banca', series: 5, repeticiones: '5' },
        { nombre: 'Peso muerto', series: 3, repeticiones: '5' },
        { nombre: 'Dominadas', series: 3, repeticiones: 'al fallo' },
      ],
    },
  },
  {
    id: 'jose',
    ejemplo: true,
    nombre: 'José Díaz',
    foto: '',
    especialidad: 'Resistencia y rendimiento',
    descripcion: 'Entrenamiento por intervalos para rendir más en tu deporte.',
    valoracion: null,
    whatsapp: '',
    cupos: { ocupados: 6, maximo: 15 },
    horario: 'Lun, Mié y Vie · 5:00 p. m. – 9:00 p. m.',
    rutina: {
      nombre: 'Motor Dragón',
      ejemplo: true,
      objetivo: 'Mejorar resistencia cardiovascular y potencia.',
      ejercicios: [
        { nombre: 'Intervalos en cinta', series: 6, repeticiones: '400 m' },
        { nombre: 'Remo ergómetro', series: 4, repeticiones: '500 m' },
        { nombre: 'Saltos al cajón', series: 3, repeticiones: '10' },
        { nombre: 'Plancha', series: 3, repeticiones: '45 s' },
      ],
    },
  },
  {
    id: 'mariana',
    ejemplo: true,
    nombre: 'Mariana Soto',
    foto: '',
    especialidad: 'Funcional y movilidad',
    descripcion: 'Movimientos del día a día, postura y flexibilidad. Ideal para empezar.',
    valoracion: null,
    whatsapp: '',
    cupos: { ocupados: 14, maximo: 15 },
    horario: 'Lun a Vie · 7:00 a. m. – 1:00 p. m.',
    rutina: {
      nombre: 'Cuerpo en movimiento',
      ejemplo: true,
      objetivo: 'Ganar movilidad y estabilidad con ejercicios funcionales.',
      ejercicios: [
        { nombre: 'Movilidad de cadera', series: 2, repeticiones: '10' },
        { nombre: 'Sentadilla goblet', series: 3, repeticiones: '12' },
        { nombre: 'Peso muerto rumano', series: 3, repeticiones: '12' },
        { nombre: 'Plancha lateral', series: 3, repeticiones: '30 s' },
        { nombre: 'Estiramientos guiados', series: null, repeticiones: '10 min' },
      ],
    },
  },
]
