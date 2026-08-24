# ANTIVIRUS ADN - Identidad en Cristo

Aplicación web educativa e interactiva para jóvenes cristianos. La experiencia usa una dinámica de seis niveles para trabajar identidad, seguridad y comparación social mediante retos físicos y digitales.

## Estado del proyecto

- Framework: Next.js 15 con App Router.
- Entrada de la aplicación: `app/page.jsx`.
- Componente principal: `components/game/Game.jsx`.
- Contenido editable: `lib/data.js`.
- Exportación: HTML estático en `out/`.
- Backend: no requiere backend; el progreso se mantiene en la sesión del navegador.

La aplicación actual no se ejecuta sirviendo directamente el `index.html` histórico. Ese archivo se conserva como referencia de la versión anterior; la fuente de verdad es `app/`, `components/`, `lib/` y `public/`.

## Requisitos

- Node.js 20 o superior.
- npm.
- Navegador moderno.
- Conexión a Internet para DiceBear y Google Fonts.

La cámara funciona en HTTPS o en `localhost`. Si no está disponible, la aplicación permite seleccionar una imagen desde el dispositivo.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

Para comprobar la versión exportada como la verá un servidor estático:

```bash
npm run build
npm run preview
```

El comando `build` genera `out/`. Esta carpeta es un artefacto generado y no debe versionarse.

## Comandos disponibles

| Comando | Uso |
|---|---|
| `npm run dev` | Inicia Next.js en modo desarrollo |
| `npm run build` | Genera la exportación estática en `out/` |
| `npm run preview` | Sirve `out/` localmente |
| `npm run start` | Alias para servir `out/` |

No hay actualmente un script de pruebas automatizadas ni de lint configurado en `package.json`.

## Estructura principal

```text
app/
├── globals.css       # Estilos globales
├── layout.jsx        # Layout y metadatos
└── page.jsx          # Entrada de la aplicación
components/game/      # Pantallas, juego y componentes visuales
lib/
├── data.js           # Niveles, códigos y textos
├── musica.js         # Música de fondo
├── sfx.js            # Efectos de sonido
└── voz.js            # Voz MP3 y Speech Synthesis
public/
├── canciones/        # Música disponible
├── final/            # Imagen final opcional
└── ...               # Recursos estáticos
```

Los archivos de `public/` se sirven desde la raíz de la aplicación. Las rutas de recursos deben mantenerse compatibles con una publicación bajo subruta de GitHub Pages.

## Publicación en GitHub Pages

El repositorio se publica como una página de proyecto:

```text
https://hbvcorporativo-hash.github.io/educacioncristiana/
```

La publicación debe usar **GitHub Actions** y la carpeta generada `out/`. No debe configurarse Pages para servir directamente la raíz del repositorio, porque allí también existe el `index.html` histórico.

### Flujo recomendado: `develop` a `main`

1. Trabaja y prueba los cambios en `develop`.
2. Ejecuta `npm run build` y comprueba que la exportación termina correctamente.
3. Sube la rama:

   ```bash
   git add .
   git commit -m "Describe el cambio"
   git push origin develop
   ```

4. En GitHub crea un Pull Request con:
   - base: `main`
   - compare: `develop`
5. Revisa el cambio y fusiona el Pull Request.
6. El workflow configurado para `main` construirá la aplicación y desplegará `out/`.
7. En **Settings → Pages**, selecciona **GitHub Actions** como fuente de publicación.

GitHub Pages tiene una sola publicación por repositorio. Un despliegue desde `develop` reemplazaría temporalmente el sitio publicado; no crea una URL separada ni un sitio `dev` independiente.

### Revertir una publicación

Antes de fusionar el Pull Request, ciérralo y `main` no cambiará.

Después de fusionarlo, abre el Pull Request fusionado y selecciona **Revert**. GitHub creará otro Pull Request con la reversión; al fusionarlo, Actions volverá a publicar la versión anterior.

Desde la terminal, si se conoce el commit que se quiere revertir:

```bash
git checkout main
git pull origin main
git revert <hash-del-commit>
git push origin main
```

No uses `git reset --hard` ni fuerces el push de `main` para deshacer una publicación compartida.

## Contenido de la experiencia

La navegación tiene cinco estados: `intro`, `pAvatar`, `pMapa`, `pNivel` y `final`. Cada uno de los seis niveles exige:

1. Realizar el reto indicado.
2. Adjuntar una fotografía comprimida como evidencia.
3. Introducir el código normalizado correcto.

Al completar un nivel se desbloquea una pieza de armadura y se actualiza el progreso. Al completar los seis niveles se genera la tarjeta final descargable.

Consulta los documentos especializados:

- [`FLOWS.md`](FLOWS.md): navegación, reglas y criterios de aceptación.
- [`MESSAGES.md`](MESSAGES.md): textos y contenido editable.
- [`GUARDRAILS.md`](GUARDRAILS.md): invariantes que deben conservarse.
- [`AUDIO_OPTIONS.md`](AUDIO_OPTIONS.md): música, voces y fallbacks.

## Recursos opcionales

- `public/canciones/revolution.mp3`: música disponible actualmente.
- `public/voces/<id>.mp3`: audios opcionales de Leo. Si faltan, se usa Speech Synthesis del navegador.
- `public/final/jesus.jpg`: imagen opcional de la pantalla final.

No agregues claves, tokens ni configuración local sensible al repositorio. `opencode.json` está excluido por `.gitignore`.
