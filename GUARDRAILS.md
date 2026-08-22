# GUARDRAILS - ANTIVIRUS ADN

## 🎯 Directrices de Desarrollo y Arquitectura

Este documento establece los **estándares, principios y limitaciones** para mantener la integridad, rendimiento y mantenibilidad del proyecto.

---

## 📐 Principios Arquitectónicos

### 1. **Minimalismo Tecnológico**
- ❌ **No usar librerías externas** (jQuery, Bootstrap, React, etc.)
- ✅ Vanilla JavaScript ES2015+
- ✅ CSS3 sin preprocesadores (LESS/SASS)
- ✅ APIs nativas del navegador

**Razón**: Máxima compatibilidad, menor tamaño, sin dependencias.

### 2. **Aplicación Monolítica**
- 📄 Todo en **un solo archivo HTML**
- 📌 CSS embedded en `<style>` tags
- 📌 JavaScript embedded en `<script>` tags
- 📦 Archivos externos solo: fuentes, imágenes, audio

**Razón**: Fácil deploy, sin build step, sin bundler.

### 3. **Single Page Application (SPA)**
- 🖼️ 5 pantallas principales (`#intro`, `#pAvatar`, `#pMapa`, `#pNivel`, `#final`)
- ↔️ Navegación mediante `.pantalla.on` (clase de visibilidad)
- 📦 Estado global en variables (`nv[]`, `av{}`, `actual`, `puntos`)
- ♻️ Sin rutas, sin router library

**Razón**: Transiciones fluidas, experiencia sin lag.

### 4. **Sin Backend Requerido**
- 💾 Estado en memoria durante la sesión; no existe persistencia actualmente
- 🔄 Todo el procesamiento es client-side
- 🌐 APIs externas solo para: Google Fonts, DiceBear, Web APIs nativas
- ✋ No hay autenticación, usuarios anónimos

**Razón**: Máxima portabilidad, deploy simple.

---

## 🏗️ Estructura de Datos

### Variables Globales Principales

```javascript
/* Contenido editable */
const VOCES = {...}           // 18 diálogos de Leo
const NIVELES = [...]         // 6 niveles con toda su definición
const SEGUNDOS = 300          // 5 minutos por nivel
const PTS = 100               // Puntos base por nivel
const BONO = 100              // Bonificación por tiempo restante

/* Estado del jugador */
let nv = [...]                // Array de niveles con estado (hecho, foto)
let actual = null             // Nivel actual en juego
let puntos = 0                // Puntos acumulados
let av = {                    // Avatar personalizado
  estilo: 'adventurer',       // De ESTILOS[]
  seed: 'xxx',                // Random seed
  nombre: 'Operador'          // Nombre del operador
}
```

**Invariantes**:
- `nv.length === NIVELES.length` (siempre 6)
- `actual` es `null` o índice válido (0-5)
- `puntos >= 0`
- `av.nombre` entre 1-18 caracteres
- `av.estilo` es uno de ESTILOS[]

### Objeto de Nivel

```javascript
{
  n: 1,                                    // Número (1-6)
  titulo: 'CONTRASEÑA',                   // Nombre del nivel
  pieza: 'cinturon',                      // ID de pieza de armadura
  piezaNom: 'Cinturón de la Verdad',      // Nombre descriptivo
  ico: '🎗️',                              // Emoji/icono
  verso: 'Efesios 6:14 · Juan 8:32',      // Cita bíblica
  decl: 'La verdad de Dios sostiene...',  // Declaración de identidad
  brief: 'El virus bloqueó el acceso...', // Descripción del virus
  reto: 'Sobre la mesa hay 8 tarjetas...', // Instrucción del reto
  tarjetas: [                             // Contenido del reto
    ['frase', 'tipo', 'display']
  ],
  mat: 'Materiales: 8 tarjetas impresas...', // Qué necesita educador
  clave: '2314',                          // Código correcto (normalizado)
  voz: 'n1',                              // ID de voz para Leo
  pista: 'p1',                            // ID de pista
  cancion: 1                              // Número de canción (1-6)
}
```

**Invariantes**:
- `n` es 1-6 (único)
- `pieza` es único
- `clave` ya normalizado (sin espacios, mayúsculas)
- `tarjetas` tiene estructura consistente

### Objeto de VOCES

```javascript
const VOCES = {
  'intro': "texto de la introducción...",
  'n1': "instrucción nivel 1...",        // n1-n6
  'p1': "pista para nivel 1...",         // p1-p6
  'bien-1': "respuesta correcta...",     // bien-1, bien-2
  'mal-1': "respuesta incorrecta...",    // mal-1, mal-2
  'gana': "mensaje de victoria..."
}
```

**Invariantes**:
- Exactamente 18 voces
- Cada voz es string no vacío
- Máximo ~200 caracteres por voz (para síntesis de voz)

---

## 🎨 Convenciones de Código

### Selectores y Naming

```javascript
/* HTML */
<div id="intro"></div>         // IDs: camelCase, descriptivo
<button id="btnIniciar"></button>
<div class="pantalla"></div>   // Classes: kebab-case, reutilizable
<div class="col"></div>

/* JS */
const $ = s => document.querySelector(s);   // Alias corto
const $$ = s => document.querySelectorAll(s);
$('#intro')         // Buscar por ID
$$('.pantalla')     // Buscar por clase

/* Variables */
let nv = []         // Array de niveles
let av = {}         // Avatar object
let actual = null   // Nivel actual
```

### Funciones Utilidad

```javascript
/* Normalización */
const norm = s => s
  .trim()
  .toUpperCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')      // Quita acentos
  .replace(/[^A-Z0-9]/g, '')             // Solo alfanuméricos

/* Random */
const rnd = a => a[Math.floor(Math.random() * a.length)];

/* Búsqueda */
const buscar = (id) => VOCES[id] || NIVELES.find(x => x.n === id);
```

**Regla**: Si se usa 3+ veces, extraer como función.

### Nombres de Funciones

```javascript
verPantalla(id)        // Navegar a pantalla
abrirNivel(i)          // Cargar nivel i
hackear()              // Validar código e completar
hablar(id, fin)        // Narrar voz
pintarAvatar()         // Renderizar avatar
pintarADN()            // Actualizar medidor
arrancarReloj()        // Iniciar cronómetro
marcarOps()            // Marcar opciones seleccionadas
descargarTarjeta()     // Generar PNG de identidad
ganar()                // Pantalla final + confeti
verGuion()             // Abrir modal de guion
```

**Patrón**: `verbo + sustantivo` (acción clara)

### Atributos Data

```html
<!-- Usar data-* para asociar datos a elementos -->
<div data-adn></div>              <!-- Selector único -->
<button data-sel="1"></button>    <!-- Estado booleano -->
<div data-p="cinturon"></div>     <!-- ID de pieza -->
<img data-s="seed123"></img>      <!-- Seed de avatar -->
```

---

## 🔧 Cómo Extender Funcionalidades

### Agregar un Nuevo Nivel

**NO SE RECOMIENDA** (diseño de 6 niveles), pero si es necesario:

1. **Agregar objeto a `NIVELES`**:
```javascript
const NIVELES = [
  // ... niveles 1-6 ...
  {n:7, titulo:'NUEVO NIVEL', pieza:'nueva-pieza', ...}
];
```

2. **Actualizar `VOCES`**:
```javascript
const VOCES = {
  // ... voces existentes ...
  'n7': "instrucción del nuevo nivel...",
  'p7': "pista del nivel 7..."
};
```

3. **Agregar UI** (si aplica):
- Nuevo `.ava-b[data-p="nueva-pieza"]`
- Nuevo icono emoji en `.piezaNom`

4. **Actualizar constante `N`**:
```javascript
const N = NIVELES.length;  // Se actualiza automáticamente
```

### Agregar Voces o Diálogos

1. **Editar objeto `VOCES`**:
```javascript
const VOCES = {
  'nueva-voz': "texto del nuevo diálogo..."
};
```

2. **Usar en código**:
```javascript
hablar('nueva-voz', () => {
  console.log('Se terminó de narrar');
});
```

### Cambiar Paleta de Colores

1. **Editar variables CSS** (líneas 12-17):
```css
:root {
  --bg: #060B14;           /* Cambiar color principal */
  --cian: #22D3EE;         /* Cambiar cian */
  /* ... etc ... */
}
```

2. **Propagar cambio** en botones, texto, bordes, etc.

### Agregar Nueva Pantalla

1. **Agregar HTML**:
```html
<div class="pantalla" id="miPantalla">
  <div class="col"><!-- contenido --></div>
</div>
```

2. **Agregar función de navegación**:
```javascript
const abrirMiPantalla = () => {
  verPantalla('miPantalla');
};
```

3. **Vincular con botón**:
```html
<button onclick="abrirMiPantalla()">Ir a Mi Pantalla</button>
```

---

## 🚀 Performance y Optimización

### Limitaciones Respetadas

| Aspecto | Límite | Razón |
|--------|--------|-------|
| **Tamaño archivo HTML** | < 500 KB | Carga rápida |
| **CSS inline** | < 50 KB | Evitar HTTP requests |
| **Niveles** | 6 (máximo) | Experiencia enfocada |
| **Voces** | 18 (máximo) | Rendimiento de síntesis |
| **Avatares simultáneos** | 1 activo | Evitar overhead |
| **Música simultanea** | 1 track | Evitar conflictos de audio |

### Buenas Prácticas

1. **Caché de selectores**:
```javascript
// ❌ Malo: queryselector en cada loop
for (let i = 0; i < 10; i++) {
  $('#elemento').textContent = i;
}

// ✅ Bueno: cachear selector
const el = $('#elemento');
for (let i = 0; i < 10; i++) {
  el.textContent = i;
}
```

2. **Event listeners delegados**:
```javascript
// ✅ En lugar de listener en cada botón
document.addEventListener('click', e => {
  if (e.target.matches('.mi-clase')) {
    // Manejar clic
  }
});
```

3. **Lazy loading de contenido**:
- URLs de avatares generadas solo cuando se necesitan
- Imágenes con fallback a iniciales si no cargan

4. **Debouncing** (si aplica):
```javascript
const debounce = (fn, ms) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
};
```

---

## 🔐 Consideraciones de Seguridad

### Validación de Entrada

1. **Código de acceso (input `#clave`)**:
```javascript
const claveIngresada = norm($('#clave').value);
const claveEsperada = norm(actual.clave);
if (claveIngresada === claveEsperada) {
  // Válida
}
```

2. **Nombre del avatar**:
```javascript
av.nombre = $('#nombreAv').value.trim().slice(0, 18);  // Máximo 18 caracteres
```

3. **No validar en cliente solamente**:
- Este proyecto no tiene backend, pero si lo tuviera, SIEMPRE validar en servidor
- Los usuarios pueden modificar JavaScript del navegador

### Prevención de Inyección

- ✅ No usar `innerHTML` con entrada de usuario
- ✅ Usar `textContent` o `.value` para texto puro
- ✅ DiceBear API generalmente safe (escapado por el servidor)

### CORS y Recursos Externos

- 🔒 Google Fonts: HTTPS, servidor oficial
- 🔒 DiceBear API: HTTPS, dominio público
- ⚠️ Si agregas APIs: usar HTTPS, verificar CORS headers

---

## 📊 Datos y Persistencia

### localStorage (Opcional)

Actualmente **no se usa**, pero se puede agregar:

```javascript
// Guardar progreso
const guardar = () => {
  localStorage.setItem('educacioncristiana', JSON.stringify({
    nv: nv,
    av: av,
    puntos: puntos
  }));
};

// Cargar progreso
const cargar = () => {
  const data = localStorage.getItem('educacioncristiana');
  if (data) {
    const {nv: niveles, av: avatar, puntos: pts} = JSON.parse(data);
    // ... asignar ...
  }
};
```

**Advertencia**: localStorage tiene límite de ~5-10MB y es por dominio.

---

## 🔊 Sistema de Audio

El audio está dividido en tres canales independientes:

| Canal | Control | Implementación |
|---|---|---|
| Música | Slider `#volSlider` | `Audio` en el módulo `musica` |
| Voces de Leo | Slider `#vozSlider` | MP3 `voces/*.mp3` o `SpeechSynthesisUtterance.volume` |
| Efectos | Botones `.btnSonido` | Web Audio API en el módulo `sfx` |

No mezclar estos controles. La reducción automática de música mientras habla Leo solo modifica temporalmente el volumen efectivo del canal musical; conserva el volumen configurado por el usuario.

El volumen de una voz sintetizada se establece al crear cada `SpeechSynthesisUtterance`. Los cambios del slider se aplican inmediatamente a un MP3 activo y a la siguiente locución sintetizada.

---

## 🎯 Estándares de UI/UX

### Botones

```html
<!-- Tipos -->
<button class="bt cian">Botón cian</button>
<button class="bt verde">Botón verde</button>
<button class="bt oro">Botón oro</button>
<button class="bt ghost">Botón ghost (outline)</button>

<!-- Estados -->
<button class="bt cian" disabled>Deshabilitado</button>
<button class="bt cian" id="btnEjemplo">Habilitado</button>
```

**Criterios**:
- Mínimo 44×44px en móvil
- Color suficiente contraste (WCAG AA)
- Feedback inmediato (onclick, active state)

### Transiciones

```css
/* Suave, no instantáneo */
transition: transform .1s, box-shadow .1s, filter .2s;

/* Animaciones breves (<1s) excepto looping */
@keyframes pulsa {
  50% { box-shadow: 0 0 0 8px rgba(34, 211, 238, .1); }
}
.nivel.libre .nv-n {
  animation: pulsa 1.8s ease-in-out infinite;
}
```

### Accesibilidad

- ✅ Suficiente contraste de color
- ✅ Texto legible (mínimo 14px en móvil)
- ✅ Touch targets >= 44×44px
- ✅ Labels para inputs
- ✅ Alternativa de texto para imágenes

---

## 🧪 Testing y QA

### Checklist de Prueba

- [ ] Todos los 6 niveles juegan sin errores
- [ ] Códigos validan correctamente (case-insensitive, sin acentos)
- [ ] Fotos se capturan y se muestran
- [ ] Cronómetro cuenta correcto
- [ ] Puntos se suman correctamente
- [ ] Avatar se renderiza en 3 tamaños
- [ ] ADN se restaura progresivamente
- [ ] Música y sonido funcionan (si existen archivos)
- [ ] Leo habla (síntesis o archivos de voz)
- [ ] Modal de revelación aparece y desaparece
- [ ] Tarjeta de identidad se descarga
- [ ] Responsive en móvil (320px), tablet (768px), desktop (1200px)
- [ ] Navegadores probados: Chrome, Firefox, Safari, Edge (últimas 2 versiones)

### Debugging

```javascript
// Activar modo debug en consola
const DEBUG = true;
if (DEBUG) console.log('Estado actual:', {nv, av, actual, puntos});

// Ver estado global
window.showState = () => ({nv, av, actual, puntos});
```

---

## 🚨 Limitaciones y Restricciones

### No hacer

- ❌ Agregar frameworks (React, Vue, etc.)
- ❌ Usar librerías externas (jQuery, Bootstrap, etc.)
- ❌ Agregar 7+ niveles (diseño de 6)
- ❌ Cambiar estructura de VOCES o NIVELES sin actualizar documentación
- ❌ Usar `eval()` o `innerHTML` con entrada de usuario
- ❌ Guardar datos sensibles en localStorage sin encriptar
- ❌ Agregar tracking/analytics sin consentimiento
- ❌ Modificar paleta de colores sin pasar A/B testing

### Sí hacer

- ✅ Agregar voces nuevas (dentro de VOCES existentes)
- ✅ Cambiar/actualizar contenido de niveles
- ✅ Agregar archivos opcionales (música, voces, imágenes)
- ✅ Customizar tarjeta de identidad
- ✅ Agregar eventos educadores
- ✅ Optimizar performance
- ✅ Mejorar accesibilidad

---

## 📝 Commenting y Documentación

### Dónde comentar

```javascript
/* ==================== SECCIÓN MAYOR ==================== */
// Subsección importante

// Lógica compleja o no obvia
const norm = s => s.trim().toUpperCase().normalize('NFD')...;
// Nota: normalize('NFD') descompone caracteres acentuados
// para poder quitarlos sin problemas

// Invariantes
if (!(nv && nv.length === 6)) {
  throw new Error('NIVELES debe tener exactamente 6 elementos');
}
```

### Dónde NO comentar

```javascript
// ❌ Obvio, no necesita comentario
let x = 1; // x es 1

// ❌ Nombrar bien la función
const sumarUnoPorUnidad = x => x + 1;  // En lugar de // suma 1
```

---

## 🔄 Versionado y Control de Cambios

### Naming de versiones

```
VERSIÓN: 1.0
CAMBIOS: 
- Versión inicial, 6 niveles funcionales
- Avatar con 4 estilos
- Sistema de puntos y armadura
- Tarjeta de identidad descargable
```

### Changelog

Al actualizar, agregar entrada:
```markdown
## [1.1] - 2024-09-01
### Added
- Soporte para voces MP3 personalizadas
- Nueva pieza de armadura "Nova"

### Fixed
- Error en cronómetro si recarga página

### Changed
- Paleta de colores más vibrante
```

---

## 📚 Recursos de Referencia

### Documentación Web Standards

- [MDN Web Docs](https://developer.mozilla.org/) - Referencia oficial
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Speech Synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
- [File API](https://developer.mozilla.org/en-US/docs/Web/API/File)

### Compatibilidad

- [Can I Use](https://caniuse.com/) - Soporte de navegadores

### Ayuda

- GitHub Issues: Reportar bugs
- Pull Requests: Proponer cambios

---

## ✅ Checklist de Merge

Antes de merear cambios:

- [ ] Código sigue convenciones de naming
- [ ] Sin librerías externas agregadas
- [ ] Nuevos niveles/voces documentados en MESSAGES.md
- [ ] GUARDRAILS.md actualizado si hay cambios arquitectónicos
- [ ] Probado en al menos 2 navegadores
- [ ] Probado en móvil (responsive)
- [ ] Sin console errors
- [ ] Sin breaking changes en APIs existentes
- [ ] README.md actualizado si hay cambios visibles

---

## 🎓 Capacitación para Nuevos Desarrolladores

### Día 1: Entendimiento
1. Leer README.md completo
2. Abrir index.html en navegador y explorar
3. Abrir DevTools (F12) y revisar estructura HTML
4. Buscar variables globales en JS

### Día 2: Arquitectura
1. Leer GUARDRAILS.md (este documento)
2. Leer MESSAGES.md y FLOWS.md
3. Mapear flujo de un nivel de inicio a fin
4. Identificar dónde se renderiza cada elemento

### Día 3: Práctica
1. Cambiar un color en la paleta CSS
2. Editar una voz en VOCES
3. Cambiar un código de nivel en NIVELES
4. Probar en navegador

### Día 4: Modificación
1. Agregar una voz nueva (mantener estructura)
2. Modificar un nivel completo (título, brief, reto)
3. Cambiar música de fondo
4. Documentar cambios

---

**Última revisión**: Agosto 2026  
**Estado**: En vigencia  
**Responsable**: Equipo de desarrollo HBVC
