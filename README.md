# ANTIVIRUS ADN - Identidad en Cristo

## 🎮 Descripción del Proyecto

**ANTIVIRUS ADN** es una aplicación web educativa e interactiva diseñada para jóvenes cristianos. Mediante un sistema gamificado de 6 niveles, los estudiantes aprenden sobre su verdadera identidad en Cristo mientras combaten el "virus COMPARACIÓN" — la inseguridad causada por redes sociales, comentarios negativos y presión social.

### Propósito

- **Educativo**: Enseña teología cristiana de forma experiencial y memorable
- **Terapéutico**: Ayuda a jóvenes a combatir la inseguridad y la comparación
- **Interactivo**: Combina retos físicos con desafíos digitales
- **Gamificado**: Sistema de puntos, armadura desbloqueables y progresión visual

### Público Objetivo

- Estudiantes de secundaria/bachillerato
- Grupos de células o discipulado de iglesias
- Contextos educativos cristianos
- Jóvenes en búsqueda de identidad

---

## 🚀 Instalación y Setup

### Requisitos Mínimos

- **Navegador moderno** (Chrome, Firefox, Safari, Edge - últimas 2 versiones)
- **Conexión a internet** (para Google Fonts y DiceBear API)
- **Servidor web local** (para evitar problemas de CORS)

### Opción 1: Servidor Local Simple (Recomendado)

```bash
# Navega a la carpeta del proyecto
cd /ruta/a/educacioncristiana

# Python 3
python -m http.server 8000

# O Node.js (si tienes npx)
npx http-server

# O si usas Ruby
ruby -run -ehttpd . -p8000
```

Luego abre: **http://localhost:8000**

### Opción 2: Desplegar en Web

- Sube todos los archivos a un servidor web (GitHub Pages, Netlify, Vercel, etc.)
- El proyecto está completamente client-side, no requiere backend
- Asegúrate de que `index.html` sea el archivo por defecto

### Opción 3: Usar Directamente en Navegador

En versiones recientes, puedes abrir `index.html` directamente en el navegador (archivo://), pero algunas características (música, voces custom) podrían no funcionar por restricciones de seguridad.

---

## 📁 Estructura de Carpetas

```
educacioncristiana/
├── index.html              # Aplicación principal (HTML + CSS + JS)
├── revolution.mp3          # Música de fondo (fallback)
├── README.md               # Este archivo
├── GUARDRAILS.md           # Directrices de desarrollo
├── MESSAGES.md             # Definición de contenido (voces, niveles)
├── FLOWS.md                # Flujos de usuario
├── voces/                  # (Opcional) Narración personalizada de Leo
│   ├── intro.mp3
│   ├── n1.mp3 → n6.mp3     # Instrucciones de cada nivel
│   ├── p1.mp3 → p6.mp3     # Pistas
│   ├── bien-1.mp3, bien-2.mp3
│   ├── mal-1.mp3, mal-2.mp3
│   └── gana.mp3
├── canciones/              # (Opcional) Música de fondo por nivel
│   ├── principal.mp3       # Música por defecto
│   ├── revolution.mp3      # Música alternativa
│   └── 1.mp3 → 6.mp3       # Música para cada nivel
└── final/                  # (Opcional) Imagen final
    └── jesus.jpg           # Imagen de Jesús (reemplaza placeholder)
```

---

## 🎮 Cómo Usar la Aplicación

### Para Estudiantes

1. **Abre la aplicación** en tu navegador
2. **Lee la intro** y toca "INICIAR MISIÓN"
3. **Crea tu avatar**: 
   - Elige nombre para tu "operador"
   - Selecciona estilo y personaje
   - Toca "ENTRAR AL SISTEMA"
4. **Mapa de niveles**: Verás 6 niveles bloqueados
5. **Juega cada nivel**:
   - Lee el brief del virus
   - Realiza el reto físico (separar tarjetas, escanear QR, etc.)
   - Toma una foto como evidencia
   - Ingresa el código de acceso
   - Toca "HACKEAR EL VIRUS"
6. **Desbloquea piezas de armadura** y restaura tu ADN
7. **Identidad restaurada**: Al completar todos los niveles, llena tu tarjeta de identidad y descárgala

### Para Educadores

1. **Prepara los materiales físicos**:
   - Imprime las tarjetas para cada nivel (ver MESSAGES.md)
   - Configura el espacio (círculo para nivel 4, zona despejada, etc.)
   - Ten cronómetro a mano
   
2. **Configura la música y voces (opcional)**:
   - Crea carpeta `voces/` y sube archivos MP3
   - Crea carpeta `canciones/` para música de fondo
   - (Sin estos archivos, se usa síntesis de voz automática)

3. **Personaliza la imagen final**:
   - Reemplaza `final/jesus.jpg` con tu imagen
   - Formato recomendado: JPG, 330x250px mínimo

4. **Facilita la sesión**:
   - Grupo recomendado: 4-8 estudiantes
   - Duración total: 45-60 minutos (6 niveles × 5-8 min)
   - Un educador en vivo, otro facilitando retos físicos

---

## 🔧 Archivos Opcionales

### Música de Fondo (`canciones/`)

La aplicación busca música en este orden:
1. `canciones/revolution.mp3` (música por defecto)
2. `revolution.mp3` (alternativa)
3. `canciones/principal.mp3`
4. `principal.mp3`
5. `canciones/{n}.mp3` (música para nivel 1-6)
6. `{n}.mp3`

**Si no existen**: Se ejecuta sin música (sin errores)

**Cómo configurar**:
```bash
mkdir canciones
# Sube archivos: revolution.mp3, 1.mp3, 2.mp3, 3.mp3, 4.mp3, 5.mp3, 6.mp3
```

### Voces Personalizadas (`voces/`)

Si no hay archivos, se usa **Web Speech API** (síntesis de voz del navegador).

Para grabar voces personalizadas:
```bash
mkdir voces
# Graba y sube: intro.mp3, n1.mp3...n6.mp3, p1.mp3...p6.mp3, etc.
```

**Archivos esperados**:
- `intro.mp3` - Introducción de Leo
- `n1.mp3` → `n6.mp3` - Instrucciones de cada nivel
- `p1.mp3` → `p6.mp3` - Pistas
- `bien-1.mp3`, `bien-2.mp3` - Respuestas correctas
- `mal-1.mp3`, `mal-2.mp3` - Respuestas incorrectas
- `gana.mp3` - Mensaje de victoria

### Imagen Final (`final/`)

Reemplaza el placeholder con una imagen de Jesús o inspiradora:
```bash
mkdir final
# Sube: jesus.jpg (recomendado: 330×250px o proporciones 4:3)
```

---

## 🌐 Requisitos del Navegador

| Característica | Navegador Mínimo |
|---|---|
| **HTML5/CSS3 Moderno** | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| **ES2015+ JavaScript** | Chrome 51+, Firefox 54+, Safari 10+, Edge 15+ |
| **CSS Grid & Flexbox** | Chrome 57+, Firefox 52+, Safari 10.1+, Edge 16+ |
| **Web Audio API** | Chrome 14+, Firefox 25+, Safari 6+, Edge 12+ |
| **Speech Synthesis API** | Chrome 25+, Firefox 49+, Safari 14.1+, Edge 79+ |
| **Canvas API** | Chrome 4+, Firefox 2+, Safari 4+, Edge (todas) |
| **File API** | Chrome 13+, Firefox 10+, Safari 7.1+, Edge (todas) |
| **DiceBear API** | Requiere conexión HTTPS/HTTP para CORS |

**Dispositivos Soportados**:
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Móvil (iOS, Android)
- ⚠️ La captura de cámara funciona mejor en dispositivos con cámara

---

## 🎨 Paleta de Colores

El proyecto usa una paleta **Cyberpunk Cristiano** (azul oscuro + cian + verde neón):

```css
--bg: #060B14              /* Fondo principal - azul muy oscuro */
--panel: #0E1B2E           /* Paneles secundarios */
--linea: #1E3A5C           /* Líneas y bordes */
--cian: #22D3EE            /* Color principal */
--cian-d: #0E93A8          /* Cian oscuro */
--verde: #34E39B           /* Verde neón */
--verde-d: #179168         /* Verde oscuro */
--oro: #FFC531             /* Dorado/amarillo */
--oro-d: #C79200           /* Oro oscuro */
--virus: #FF3B5C           /* Rojo/rosa - virus */
--virus-d: #B81E3B         /* Virus oscuro */
--txt: #DCE9F5             /* Texto principal */
--gris: #7C93AE            /* Texto secundario */
```

---

## 📊 Contenido de los 6 Niveles

| Nivel | Título | Pieza de Armadura | Reto | Código |
|-------|--------|-------------------|------|--------|
| 1 | **CONTRASEÑA** | Cinturón de la Verdad | Separar mentiras de situaciones | `2314` |
| 2 | **ESCANEA LA MENTIRA** | Coraza de Justicia | Responder QR y reunir palabras | `AMADO ESCOGIDO PERDONADO PROPOSITO` |
| 3 | **ERROR 404** | Yelmo de la Salvación | Clasificar tarjetas y extraer letras | `RESTAURAR` |
| 4 | **CONTRACORRIENTE** | Calzado de la Paz | Caminar contracorriente y resistir | `FIRME` |
| 5 | **FIREWALL** | Escudo de la Fe | Declarar verdad sin quebrarse | `SOY AMADO POR DIOS` |
| 6 | **DESBLOQUEO FINAL** | Espada del Espíritu | Encontrar versículo bíblico | `JUAN 1:12` |

**Cada nivel toma ~5-8 minutos**. Total: **45-60 minutos** para la experiencia completa.

---

## 🔐 Validación de Códigos

Los códigos se validan de forma **flexible**:
- ✅ Se ignoran mayúsculas/minúsculas
- ✅ Se eliminan acentos y tildes
- ✅ Se ignoran espacios y puntuación
- ✅ Solo se comparan letras y números

**Ejemplos válidos para "2314"**:
- `2314`
- `23-14`
- `2 3 1 4`
- `dos tres uno cuatro` (NO funcionaría)

---

## 🔊 Sistema de Audio

### Sonidos (SFX)

Se generan dinámicamente con **Web Audio API** (sin archivos):
- 🎵 Tap (botón)
- ✅ Bien (código correcto)
- ❌ Mal (código incorrecto)
- 📸 Foto (captura)
- ⏱️ Tic (cronómetro)
- 🎉 Gana (victoria final)

### Música de Fondo

- Busca archivos MP3 en carpeta `canciones/`
- Si no existen, continúa sin música
- Se baja automáticamente cuando habla Leo
- Control independiente de volumen: 0-100% (slider `#volSlider` en modal `🎵 Música NXTWAVE`)

### Voces (Narración)

- **Opción 1**: Archivos MP3 en carpeta `voces/` (personalizado)
- **Opción 2**: Web Speech Synthesis API (automático, en idioma del navegador)
- Control independiente de volumen: 0-100% (slider `#vozSlider` en modal `🎙 Voces de Leo`)
- El control funciona tanto para los MP3 de voz como para la voz sintetizada

### Efectos de Sonido (SFX)

- Se generan dinámicamente con Web Audio API (sin archivos)
- Botón `🔊`/`🔇` en la HUD para activar/desactivar
- No afectan el volumen de música ni de voces

---

## 📱 Características Principales

- ✅ **6 Niveles progresivos** con retos únicos
- ✅ **Avatar personalizable** (4 estilos × múltiples opciones)
- ✅ **Sistema de puntos y bonificación** (tiempo)
- ✅ **Cronómetro** (5 minutos por nivel)
- ✅ **Captura de fotos** (evidencia del reto)
- ✅ **Medidor ADN** progresivo (0-100%)
- ✅ **Armadura de Efesios 6** (6 piezas desbloqueables)
- ✅ **Modal de revelación** (pieza + verso + declaración)
- ✅ **Tarjeta de identidad personalizada** (descargable como PNG)
- ✅ **Narración de Leo** (voz sintetizada o personalizada)
- ✅ **Efectos visuales y sonoros** (animaciones, confeti)
- ✅ **Responsive** (móvil, tablet, desktop)

---

## ⚙️ Características Técnicas

| Aspecto | Detalles |
|--------|----------|
| **Arquitectura** | Single Page Application (SPA) vanilla |
| **Dependencias** | 0 (cero librerías externas) |
| **Lenguaje** | JavaScript ES2015+ |
| **Estilos** | CSS3 (Grid, Flexbox, variables) |
| **APIs Usadas** | Web Audio, Canvas, File, Speech Synthesis, Fetch |
| **Persistencia** | No hay persistencia; el progreso vive en memoria durante la sesión |
| **Backend** | No requiere backend |
| **Licencia** | Propietario - HBVC Corporativo |

---

## 🛠️ Desarrollo y Personalización

Para entender cómo modificar el proyecto, ver:

- **GUARDRAILS.md** - Arquitectura y directrices de desarrollo
- **MESSAGES.md** - Cómo editar voces, niveles y códigos
- **FLOWS.md** - Flujos de usuario y navegación

---

## 🐛 Solución de Problemas

### La música no suena
- Verifica que exista `canciones/revolution.mp3` o `revolution.mp3`
- O crea la carpeta `canciones/` con archivos MP3
- (La app funciona sin música)

### Leo no habla
- Chrome/Firefox deben permitir Web Speech API
- O sube archivos MP3 en carpeta `voces/`
- Verifica que el volumen del navegador esté activado

### Las fotos no se capturan
- El navegador debe permitir acceso a cámara
- Usa HTTPS (si despliegas en web)
- Requiere navegador moderno

### El avatar no carga
- Verifica conexión a internet (necesita DiceBear API)
- Si no carga, se muestran iniciales del nombre
- Cierra y reabre la app

### Códigos no se aceptan
- Verifica que TODOS los campos estén completos
- Revisa que hayas tomado una FOTO (debe estar visible)
- Los códigos se normalizan (mayúsculas, acentos, espacios ignorados)
- Ver MESSAGES.md para códigos exactos

---

## 📞 Soporte y Contacto

- **Repositorio**: https://github.com/hbvcorporativo-hash/educacioncristiana
- **Desarrollador Original**: HBVC Corporativo
- **Licencia**: Propietario

---

## 📚 Documentación Completa

- **README.md** (este archivo) - Guía de uso general
- **GUARDRAILS.md** - Arquitectura y desarrollo
- **MESSAGES.md** - Contenido de voces y niveles
- **FLOWS.md** - Flujos de usuario

---

## ✨ Créditos

- **Teología**: Armadura de Efesios 6, identidad en Cristo
- **Diseño**: Estética cyberpunk + elementos cristianos
- **Avatares**: DiceBear (API gratuita)
- **Tipografía**: Google Fonts (Space Grotesk, JetBrains Mono)
- **Audio**: Web Audio API + Speech Synthesis API

---

**Versión**: 1.0  
**Última actualización**: Agosto 2026  
**Estado**: Producción
