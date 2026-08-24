# Opciones y plan de resolución del audio

## Diagnóstico

El audio de la aplicación tiene tres canales independientes:

- **SFX:** efectos sintetizados con Web Audio API. No requieren archivos MP3.
- **Música:** un elemento `Audio` en bucle que busca `revolution.mp3` y nombres alternativos.
- **Voces de Leo y Sara:** usan MP3 pregrabados por mensaje y perfil, sin síntesis del navegador.

La aplicación carga las voces desde `public/voces/leo/<clave>.mp3` y `public/voces/sara/<clave>.mp3`. Los 36 MP3 son parte requerida de la publicación. El único recurso musical disponible actualmente es `public/canciones/revolution.mp3`.

## Opciones consideradas

### 1. Mantener rutas relativas como el original

Usar rutas relativas como `canciones/revolution.mp3` y `voces/<id>.mp3` permite que los recursos funcionen en localhost y en una aplicación publicada bajo una subruta, siempre que la página tenga una URL base correcta.

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

### 7. Voces pregrabadas definitivas

Cada una de las 18 claves debe existir para Leo y Sara, con dirección de agente secreto tecnológico y voz clara. Leo usa `es-US-AlonsoNeural` y Sara `es-US-PalomaNeural`; `principal` y `sistema` comparten la colección de Leo.

**Decisión:** usar exclusivamente MP3 para eliminar diferencias de síntesis entre navegadores. Si un archivo falla o el navegador bloquea su reproducción, la interfaz finaliza la locución, restaura la música y permite seguir jugando.

### 8. Proveer todos los MP3 de voz

La entrega requiere 36 archivos: `intro`, `n1`-`n6`, `p1`-`p6`, `bien-1`, `bien-2`, `mal-1`, `mal-2` y `gana`, en ambas carpetas:

```text
public/voces/leo/<clave>.mp3
public/voces/sara/<clave>.mp3
```

Deben exportarse como MP3 estéreo, 44.1 kHz y 128 kbps CBR. El guion de Sara cambia “Aquí Leo, su aliado” por “Aquí Sara, su aliada” en `intro`.

## Resultado esperado

- Música funcional con `public/canciones/revolution.mp3`.
- SFX funcionales sin archivos externos.
- Voces funcionales mediante los 36 MP3 definitivos requeridos, con recuperación limpia ante errores de reproducción.
- Rutas compatibles con raíz y subruta.
- Reintento de música después de errores 404 o bloqueos temporales.
- El loader no interfiere con las políticas de reproducción del navegador.
