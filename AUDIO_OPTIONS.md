# Opciones y plan de resolución del audio

## Diagnóstico

El audio de la aplicación tiene tres canales independientes:

- **SFX:** efectos sintetizados con Web Audio API. No requieren archivos MP3.
- **Música:** un elemento `Audio` en bucle que busca `revolution.mp3` y nombres alternativos.
- **Voz de Leo:** intenta un MP3 por mensaje y usa `SpeechSynthesis` como respaldo.

El `index.html` original no contiene voces MP3 embebidas. Solo contiene las rutas esperadas y el código de fallback. El único recurso musical recuperado del proyecto es `public/canciones/revolution.mp3`.

## Opciones consideradas

### 1. Mantener rutas relativas como el original

Usar `canciones/revolution.mp3` y `voces/<id>.mp3` permite que los recursos funcionen en la raíz y en una aplicación publicada bajo una subruta, siempre que la página tenga una URL base correcta.

**Ventaja:** conserva el comportamiento original y evita asumir que la aplicación vive en `/`.

### 2. Usar rutas absolutas

Usar `/canciones/...` y `/voces/...` funciona en `localhost:3000` y en dominios donde la aplicación vive en la raíz.

**Problema:** falla en GitHub Pages u otros hosts bajo `/nombre-del-proyecto/`, porque `/canciones/...` apunta al dominio y no a la subcarpeta.

### 3. Resolver recursos contra `document.baseURI`

Construir cada URL con `new URL(recurso, document.baseURI)` conserva la ruta base real del documento.

**Decisión:** es la opción recomendada para mantener compatibilidad con localhost, export estático y despliegues bajo subruta.

### 4. Desbloquear AudioContext en el primer gesto

El primer clic debe crear o reanudar el `AudioContext` y disparar el SFX de activación de forma síncrona.

**Decisión:** mantener `sfx.init()` y `sfx.tap()` directamente en el handler. El loader nunca debe envolver estas llamadas en un `setTimeout`.

### 5. Loader exclusivamente visual

El loader Matrix puede retrasar la navegación o el modal, pero no debe retrasar:

- `sfx.*()`;
- `musica.iniciar()`;
- `voz.hablar()`;
- la activación del fallback de voz.

**Decisión:** conservar esta separación.

### 6. Reintento de música

Cuando todas las fuentes fallan, el reproductor debe quedar listo para intentar de nuevo. El índice y el estado de reproducción no deben dejar el botón bloqueado después de una ronda de errores.

**Decisión:** reiniciar el estado al agotar fuentes y permitir reintentos posteriores.

### 7. Fallback de voz resistente

El navegador puede entregar una lista vacía de voces al inicio. El sistema debe escuchar `voiceschanged`, seleccionar preferentemente una voz española y reintentar una vez si la lista aún no está disponible.

**Decisión:** mantener fallback inmediato a Speech Synthesis y repetir la preparación de voces sin bloquear la interfaz.

### 8. Proveer todos los MP3 de voz

Se podrían agregar los 18 archivos: `intro`, `n1`-`n6`, `p1`-`p6`, `bien-1`, `bien-2`, `mal-1`, `mal-2` y `gana`.

**Limitación:** esos audios no existen dentro del `index.html` original y no se pueden extraer de él. Deben ser grabados o entregados como archivos externos. Mientras tanto, Speech Synthesis es el comportamiento oficial de respaldo.

## Resultado esperado

- Música funcional con `public/canciones/revolution.mp3`.
- SFX funcionales sin archivos externos.
- Voz funcional mediante MP3 si existe y Speech Synthesis si no existe.
- Rutas compatibles con raíz y subruta.
- Reintento de música después de errores 404 o bloqueos temporales.
- El loader no interfiere con las políticas de reproducción del navegador.
