# GUARDRAILS - ANTIVIRUS ADN

## Propósito

Estas reglas mantienen la aplicación estable, exportable y fácil de mantener. La fuente de verdad es el código actual de Next.js, no el `index.html` histórico.

## Arquitectura

- Next.js 15 con App Router.
- `app/page.jsx` monta `components/game/Game.jsx`.
- `Game.jsx` es cliente y controla los estados `intro`, `pAvatar`, `pMapa`, `pNivel` y `final`.
- El contenido editable vive en `lib/data.js`.
- La aplicación se exporta como HTML estático en `out/`.
- No se requiere backend ni persistencia del progreso.
- No agregar rutas API, Server Actions ni funcionalidades que requieran servidor sin actualizar la estrategia de despliegue.

## Reglas de navegación

- La aplicación es una experiencia de una sola página.
- Debe permanecer activa una sola pantalla a la vez mediante `.pantalla.on`.
- No agregar un router para las pantallas del juego.
- Mantener el flujo: introducción, avatar, mapa, nivel y pantalla final.
- Los niveles se desbloquean en orden y solo se completa un nivel con evidencia fotográfica y código válido.

## Estado e invariantes

- `nv` debe conservar un elemento por cada nivel definido en `NIVELES`.
- `actual` debe ser `null` o un índice válido.
- Los puntos nunca pueden ser negativos.
- El nombre del avatar debe tener entre 1 y 18 caracteres.
- Un nivel completado no debe poder validarse de nuevo.
- Completar un nivel desbloquea exactamente una pieza de armadura.
- Completar los seis niveles muestra la pantalla final.
- La validación debe normalizar mayúsculas, tildes, espacios y puntuación.

## Contenido

- Los niveles, códigos, textos y claves de voz se editan en `lib/data.js`.
- Los cambios de contenido deben reflejarse en `MESSAGES.md`.
- No duplicar códigos o textos editables dentro de componentes.
- Conservar las seis definiciones de nivel salvo que el cambio de producto indique lo contrario.
- Las claves de voz deben tener texto no vacío y mantener el fallback de Speech Synthesis.

## Recursos estáticos

- Los archivos públicos pertenecen a `public/`.
- Las rutas de música, voces, imágenes y favicon deben funcionar en `localhost` y bajo la subruta de GitHub Pages.
- Evitar rutas absolutas que apunten a la raíz del dominio cuando el recurso se sirve desde `public/`.
- No asumir que existen archivos opcionales de voz o imagen final.
- Los avatares remotos de DiceBear deben conservar el fallback a iniciales.

## Audio y navegador

- `lib/sfx.js`, `lib/musica.js` y `lib/voz.js` solo se ejecutan en el navegador.
- El audio debe iniciarse desde una acción del usuario cuando el navegador lo requiera.
- La música debe permanecer como máximo en `0.07` de volumen.
- Mientras Leo habla, la música baja a `0.03` y recupera el volumen gradualmente.
- Si faltan MP3 de voz, debe funcionar Speech Synthesis en español.
- La ausencia de música, voces o DiceBear no debe bloquear el juego.

## Cámara, imágenes y descarga

- La cámara requiere HTTPS o `localhost`.
- Debe existir una alternativa para seleccionar un archivo.
- La evidencia debe comprimirse antes de guardarse en memoria.
- No enviar fotografías, progreso ni datos personales a un servidor.
- La tarjeta final se genera en el navegador mediante Canvas.

## Código y estilos

- Seguir la estructura y convenciones de los archivos vecinos antes de crear código nuevo.
- Reutilizar componentes, funciones y utilidades existentes.
- No agregar dependencias sin justificar su necesidad y actualizar `package.json` y `package-lock.json`.
- No agregar comentarios al código salvo que se soliciten expresamente.
- Preservar `.pantalla` y `.pantalla.on` en `app/globals.css`.
- Mantener la interfaz responsive para móvil, tablet y escritorio.
- No registrar secretos, tokens ni datos personales en consola.

## Desarrollo y validación

Antes de abrir un Pull Request:

```bash
npm install
npm run build
```

También se debe comprobar manualmente:

- La navegación completa de inicio a final.
- La validación con foto y código correcto.
- El rechazo de códigos incorrectos y niveles bloqueados.
- La reproducción de música, SFX y fallback de voz.
- La cámara y la selección alternativa de archivos.
- La descarga de la tarjeta final.
- La experiencia en móvil y escritorio.
- La consola del navegador y las rutas de recursos.

Actualmente no existe un script de pruebas automatizadas, lint o typecheck en `package.json`. No inventar comandos de validación; si se agregan scripts, documentarlos aquí y en `README.md`.

## GitHub Pages

- La publicación usa GitHub Actions y la carpeta `out/`.
- No publicar directamente la raíz del repositorio porque contiene el `index.html` histórico.
- El trabajo se desarrolla en `develop` y se integra mediante Pull Request a `main`.
- No versionar `node_modules/`, `.next/` ni `out/`.
- No subir `opencode.json` ni ninguna configuración con secretos.

## Documentación relacionada

- `README.md`: instalación, comandos y publicación.
- `FLOWS.md`: navegación y reglas funcionales.
- `MESSAGES.md`: textos, voces y niveles.
- `AUDIO_OPTIONS.md`: comportamiento de audio y fallbacks.
