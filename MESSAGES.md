# Mensajes y Contenido

Este documento define el contenido editable de la aplicación Next.js: las voces de Leo y la configuración de los seis niveles. El contenido se encuentra en las constantes `VOCES` y `NIVELES` de `lib/data.js`.

## Modelo de mensajes

`VOCES` contiene 18 mensajes identificados por una clave:

| Claves | Uso |
|---|---|
| `intro` | Presentación de Leo al entrar al mapa |
| `n1` a `n6` | Instrucción inicial de cada nivel |
| `p1` a `p6` | Pista de cada nivel |
| `bien-1`, `bien-2` | Respuesta aleatoria tras un código correcto |
| `mal-1`, `mal-2` | Respuesta aleatoria tras un código incorrecto |
| `gana` | Mensaje de victoria final |

El reproductor carga MP3 por agente: `voces/leo/<clave>.mp3` para Leo y `voces/sara/<clave>.mp3` para Sara. Leo comparte sus archivos entre los perfiles natural y de sistema. Los archivos son obligatorios; si falta o no puede reproducirse uno, el juego continúa y restaura la música. El texto también se muestra en el globo del agente.

Los MP3 definitivos usan `es-US-AlonsoNeural` para Leo y `es-US-PalomaNeural` para Sara, con dirección de agente secreto tecnológico, estéreo, 44.1 kHz y 128 kbps CBR. Sara debe decir en `intro`: “Aquí Sara, su aliada en el sistema…”.

## Guion actual

### Introducción

**`intro`**

> Aquí Leo, su aliado en el sistema. Escuchen bien: un virus llamado COMPARACIÓN entró en su ADN de identidad. Les susurra que valen menos, que no encajan, que otro es mejor. Vamos a hackearlo en seis niveles y a recuperar el código original. Además, en cada nivel desbloquean una pieza de la armadura. ¡Vamos al nivel uno!

### Instrucciones de niveles

| Clave | Mensaje |
|---|---|
| `n1` | Nivel uno: la contraseña. Sobre la mesa hay tarjetas con frases. Unas son solo situaciones, otras son mentiras sobre su identidad. Separen las mentiras: cada una les da un número. Junten los números en orden y tendrán la contraseña. |
| `n2` | Nivel dos: escaneen la mentira. Cuatro códigos QR repartidos por el salón, cada uno con una pregunta trampa. Al responder bien, cada QR revela una palabra. Reúnan las cuatro y escríbanlas aquí. |
| `n3` | Nivel tres: error cuatro cero cuatro, buscando identidad. Separen las tarjetas: unas solo me describen, otras sostienen mi identidad. Detrás de las verdaderas hay letras. Ordénenlas y les darán el comando. |
| `n4` | Nivel cuatro: contracorriente. El mundo entero va en un sentido y ustedes tienen que ir en el contrario. No es fácil sostenerse cuando todos empujan. Superen la prueba y escriban la palabra que resistió. |
| `n5` | Nivel cinco: firewall. Van a lanzarles dardos: burlas, distracciones, risas. Uno del equipo debe declarar la verdad sin quebrarse. Cuando lo logren, escriban exactamente lo que declaró. |
| `n6` | Nivel seis, el último. Tienen tres palabras del código: AMADO, HIJO, DIOS. Busquen entre las tarjetas el versículo que las contiene todas. Escríbanlo y su identidad quedará desbloqueada. |

### Pistas

| Clave | Mensaje |
|---|---|
| `p1` | Pista: una situación es algo que pasó. Una mentira te pone una etiqueta sobre quién eres. Busquen las que empiezan con SOY o dicen lo que vales. |
| `p2` | Pista: las cuatro palabras responden a la pregunta quién soy yo para Dios. Empiezan con A, E, P y P. |
| `p3` | Pista: el comando tiene nueve letras y es lo que hace un antivirus con un archivo dañado. |
| `p4` | Pista: cinco letras. Efesios seis trece dice: habiendo acabado todo, estar… |
| `p5` | Pista: escriban la frase completa que declaró su compañero: soy amado por… |
| `p6` | Pista: es el primer capítulo del evangelio de Juan, versículo doce. |

### Respuestas del sistema

| Clave | Mensaje |
|---|---|
| `bien-1` | ¡Sector limpio! Miren cómo se restaura su ADN. El virus está perdiendo, equipo. |
| `bien-2` | ¡Código aceptado! Una pieza más de armadura. ¡Sigan hackeando! |
| `mal-1` | Código rechazado. Tranquilos, revisen otra vez: el virus quiere que se rindan. |
| `mal-2` | No es ese. Respiren y vuelvan a intentarlo, están cerca. |
| `gana` | ¡Virus eliminado, equipo! Su ADN quedó restaurado al cien por ciento y la armadura completa. Escuchen esto: no tienen que compararse con nadie, porque Dios ya los escogió. Son hijos amados, y eso ningún comentario, ningún like y ninguna nota lo puede cambiar. Ahora… vívanlo. |

## Definición de niveles

Cada nivel usa esta estructura:

```js
{
  n, titulo, pieza, piezaNom, ico,
  verso, decl, brief, reto, tarjetas, mat,
  clave, voz, pista, cancion
}
```

`tarjetas` es una lista de `[texto, tipo, etiqueta]`, donde `tipo` es normalmente `mentira`, `situacion` o `verdad`. La etiqueta se presenta al participante como parte del material del reto.

| # | Título | Armadura | Declaración | Código |
|---:|---|---|---|---|
| 1 | CONTRASEÑA | Cinturón de la Verdad | La verdad de Dios sostiene quién soy. | `2314` |
| 2 | ESCANEA LA MENTIRA | Coraza de Justicia | Soy perdonado y justificado por Cristo. | `AMADO ESCOGIDO PERDONADO PROPOSITO` |
| 3 | ERROR 404: IDENTIDAD | Yelmo de la Salvación | Mi mente está protegida por lo que Dios dice de mí. | `RESTAURAR` |
| 4 | CONTRACORRIENTE | Calzado de la Paz | No me amoldo al mundo: estoy firme en Cristo. | `FIRME` |
| 5 | FIREWALL | Escudo de la Fe | La fe apaga los dardos del enemigo. | `SOY AMADO POR DIOS` |
| 6 | DESBLOQUEO FINAL | Espada del Espíritu | Soy hijo de Dios: ese es mi código original. | `JUAN 1:12` |

### Contenido operativo por nivel

| # | Texto del reto | Materiales |
|---:|---|---|
| 1 | Separar 8 tarjetas entre situaciones y mentiras de identidad. Ordenar los números que aparecen detrás de las mentiras. | 8 tarjetas impresas; números detrás de las mentiras. |
| 2 | Escanear 4 QR, responder preguntas trampa y reunir una palabra de cada respuesta. | 4 QR impresos. |
| 3 | Clasificar tarjetas entre cosas que describen al participante y verdades que sostienen su identidad. Ordenar las letras de las verdades. | 8 tarjetas; letras detrás de las 4 verdades. |
| 4 | Caminar en sentido contrario a la corriente y responder con verdades bíblicas frente a frases del mundo. | Espacio despejado y tarjetas “El mundo dice / La Palabra dice”. |
| 5 | Una persona declara una verdad durante 30 segundos mientras el equipo intenta distraerla sin contacto ni ofensas. | Cronómetro. |
| 6 | Encontrar entre varias citas el versículo que contiene las palabras AMADO, HIJO y DIOS. | Tarjetas con 4 versículos. |

## Validación de códigos

La función `norm()`:

1. Elimina espacios al inicio y al final.
2. Convierte a mayúsculas.
3. Elimina tildes mediante normalización Unicode NFD.
4. Elimina todo lo que no sea letra ASCII o número.

Por tanto, `Juan 1:12`, `JUAN-1:12` y `juan 1 12` se comparan como el mismo código. La foto de evidencia es opcional.

## Reglas de edición

- Mantener las claves de `VOCES` si ya están referenciadas por un nivel o botón.
- Si se crea una voz nueva, agregar sus MP3 en `public/voces/leo/` y `public/voces/sara/`, usando audio estéreo a 44.1 kHz y 128 kbps CBR, y documentarla aquí.
- Mantener coherentes `clave`, `pista`, `reto` y `tarjetas`.
- Revisar las citas bíblicas y el lenguaje con el responsable educativo antes de publicar.
- Evitar instrucciones que impliquen contacto físico, humillación, burlas hirientes o riesgos de seguridad.
- No introducir HTML dentro de mensajes: se muestran como texto mediante `textContent` en el globo de Leo.
