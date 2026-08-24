export const VOCES = {
  intro: 'Aquí Leo, su aliado en el sistema. Escuchen bien: un virus llamado COMPARACIÓN entró en su ADN de identidad. Les susurra que valen menos, que no encajan, que otro es mejor. Vamos a hackearlo en seis niveles y a recuperar el código original. Además, en cada nivel desbloquean una pieza de la armadura. ¡Vamos al nivel uno!',
  n1: 'Nivel uno: la contraseña. Sobre la mesa hay tarjetas con frases. Unas son solo situaciones, otras son mentiras sobre su identidad. Separen las mentiras: cada una les da un número. Junten los números en orden y tendrán la contraseña.',
  n2: 'Nivel dos: escaneen la mentira. Cuatro códigos QR repartidos por el salón, cada uno con una pregunta trampa. Al responder bien, cada QR revela una palabra. Reúnan las cuatro y escríbanlas aquí.',
  n3: 'Nivel tres: error cuatro cero cuatro, buscando identidad. Separen las tarjetas: unas solo me describen, otras sostienen mi identidad. Detrás de las verdaderas hay letras. Ordénalas y les darán el comando.',
  n4: 'Nivel cuatro: contracorriente. El mundo entero va en un sentido y ustedes tienen que ir en el contrario. No es fácil sostenerse cuando todos empujan. Superen la prueba y escriban la palabra que resistió.',
  n5: 'Nivel cinco: firewall. Van a lanzarles dardos: burlas, distracciones, risas. Uno del equipo debe declarar la verdad sin quebrarse. Cuando lo logren, escriban exactamente lo que declaró.',
  n6: 'Nivel seis, el último. Tienen tres palabras del código: AMADO, HIJO, DIOS. Busquen entre las tarjetas el versículo que las contiene todas. Escríbalo y su identidad quedará desbloqueada.',
  p1: 'Pista: una situación es algo que pasó. Una mentira te pone una etiqueta sobre quién eres. Busquen las que empiezan con SOY o dicen lo que vales.',
  p2: 'Pista: las cuatro palabras responden a la pregunta quién soy yo para Dios. Empiezan con A, E, P y P.',
  p3: 'Pista: el comando tiene nueve letras y es lo que hace un antivirus con un archivo dañado.',
  p4: 'Pista: cinco letras. Efesios seis trece dice: habiendo acabado todo, estar…',
  p5: 'Pista: escriban la frase completa que declaró su compañero: soy amado por…',
  p6: 'Pista: es el primer capítulo del evangelio de Juan, versículo doce.',
  'bien-1': '¡Sector limpio! Miren cómo se restaura su ADN. El virus está perdiendo, equipo.',
  'bien-2': '¡Código aceptado! Una pieza más de armadura. ¡Sigan hackeando!',
  'mal-1': 'Código rechazado. Tranquilos, revisen otra vez: el virus quiere que se rindan.',
  'mal-2': 'No es ese. Respiren y vuelvan a intentarlo, están cerca.',
  gana: '¡Virus eliminado, equipo! Su ADN quedó restaurado al cien por ciento y la armadura completa. Escuchen esto: no tienen que compararse con nadie, porque Dios ya los escogió. Son hijos amados, y eso ningún comentario, ningún like y ninguna nota lo puede cambiar. Ahora… vívanlo.'
}

export const NIVELES = [
  {
    n: 1, titulo: 'CONTRASEÑA', pieza: 'cinturon', piezaNom: 'Cinturón de la Verdad', ico: '🎗️',
    verso: 'Efesios 6:14 · Juan 8:32', decl: 'La verdad de Dios sostiene quién soy.',
    brief: 'El virus bloqueó el acceso mezclando situaciones reales con mentiras sobre tu identidad. Si no sabes distinguirlas, te quedas afuera.',
    reto: 'Sobre la mesa hay 8 tarjetas. Separen las que son MENTIRAS sobre la identidad de las que son solo SITUACIONES. Cada mentira lleva un número al respaldo: júntenlos en el orden en que aparecen y tendrán la contraseña.',
    tarjetas: [
      ['Todos mis amigos tienen más likes que yo.', 'situacion', 'SITUACIÓN'],
      ['Valgo menos porque tengo menos likes.', 'mentira', 'MENTIRA · 2'],
      ['Me dijeron que soy raro.', 'situacion', 'SITUACIÓN'],
      ['Nadie me quiere de verdad.', 'mentira', 'MENTIRA · 3'],
      ['Soy malo para matemáticas, entonces soy bruto.', 'mentira', 'MENTIRA · 1'],
      ['Fallé otra vez.', 'situacion', 'SITUACIÓN'],
      ['Si fallé, soy un fracaso.', 'mentira', 'MENTIRA · 4'],
      ['Mis papás están orgullosos de mí.', 'situacion', 'SITUACIÓN']
    ],
    mat: 'Materiales: 8 tarjetas impresas con las frases, con el número escrito al respaldo solo en las mentiras.',
    clave: '2314', voz: 'n1', pista: 'p1', cancion: 1
  },
  {
    n: 2, titulo: 'ESCANEA LA MENTIRA', pieza: 'coraza', piezaNom: 'Coraza de Justicia', ico: '🦺',
    verso: 'Efesios 6:14 · 2 Corintios 5:21', decl: 'Soy perdonado y justificado por Cristo.',
    brief: 'El virus se esconde en preguntas trampa. Cada vez que respondes desde la comparación, se replica. Escanea y desármalo.',
    reto: 'Peguen 4 códigos QR por el salón. Cada uno abre una pregunta trampa; al responderla bien revela una palabra. Reúnan las 4 palabras y escríbanlas aquí en orden.',
    tarjetas: [
      ['QR 1 · Tu amigo publica una foto y recibe 300 likes. Tú recibes 12. ¿Quién vale más?', 'verdad', '→ AMADO'],
      ['QR 2 · Alguien te dice: "Nunca vas a cambiar". ¿Qué haces con esa frase?', 'verdad', '→ ESCOGIDO'],
      ['QR 3 · Cometiste un error delante de todos. ¿Tu error define quién eres?', 'verdad', '→ PERDONADO'],
      ['QR 4 · Completa: "Mi identidad depende de ______".', 'verdad', '→ PROPÓSITO']
    ],
    mat: 'Materiales: 4 QR impresos (pueden generarlos gratis y apuntar a un documento o imagen con la pregunta y la palabra).',
    clave: 'AMADO ESCOGIDO PERDONADO PROPOSITO', voz: 'n2', pista: 'p2', cancion: 2
  },
  {
    n: 3, titulo: 'ERROR 404: IDENTIDAD', pieza: 'yelmo', piezaNom: 'Yelmo de la Salvación', ico: '⛑️',
    verso: 'Efesios 6:17 · Romanos 12:2', decl: 'Mi mente la protege lo que Dios dice de mí.',
    brief: 'El sistema confundió tus gustos y defectos con tu identidad. Por eso marca ERROR 404: no encuentra quién eres realmente.',
    reto: 'Separen las tarjetas en dos columnas: 🟡 COSAS QUE PUEDEN DESCRIBIRME y 🟢 VERDADES QUE SOSTIENEN MI IDENTIDAD. Detrás de las 🟢 hay letras: ordénenlas y forman el comando de reparación.',
    tarjetas: [
      ['Soy alto / bajito', 'situacion', 'DESCRIBE'], ['Me va bien en deportes', 'situacion', 'DESCRIBE'],
      ['Soy tímido', 'situacion', 'DESCRIBE'], ['Me gusta dibujar', 'situacion', 'DESCRIBE'],
      ['Soy hijo de Dios', 'verdad', 'SOSTIENE'], ['Soy amado sin condición', 'verdad', 'SOSTIENE'],
      ['Soy perdonado', 'verdad', 'SOSTIENE'], ['Fui creado con propósito', 'verdad', 'SOSTIENE']
    ],
    mat: 'Materiales: 8 tarjetas; al respaldo de las 4 verdades, las letras que forman el comando (9 letras en total).',
    clave: 'RESTAURAR', voz: 'n3', pista: 'p3', cancion: 3
  },
  {
    n: 4, titulo: 'CONTRACORRIENTE', pieza: 'calzado', piezaNom: 'Calzado de la Paz', ico: '🥾',
    verso: 'Efesios 6:15 · Romanos 12:2', decl: 'No me amoldo al mundo: estoy firme en Cristo.',
    brief: 'El virus se alimenta de la corriente: todos hacen lo mismo, todos opinan igual. Ir contra esa corriente es lo que lo debilita.',
    reto: 'Todo el grupo camina en círculo en un sentido; el equipo debe atravesarlo en sentido contrario sin caerse ni devolverse. Ronda 2: el líder grita frases que "todos dicen" y el equipo responde en voz alta con la verdad bíblica que corresponde, aunque los demás griten lo contrario.',
    tarjetas: [
      ['El mundo dice: "vales por tus likes"', 'verdad', 'La Palabra dice: eres imagen de Dios'],
      ['El mundo dice: "si fallas, eres un perdedor"', 'verdad', 'La Palabra dice: hay misericordia nueva'],
      ['El mundo dice: "sé como los demás"', 'verdad', 'La Palabra dice: fuiste hecho único'],
      ['El mundo dice: "estás solo"', 'verdad', 'La Palabra dice: nunca te dejaré']
    ],
    mat: 'Materiales: espacio despejado y las tarjetas de "el mundo dice / la Palabra dice".',
    clave: 'FIRME', voz: 'n4', pista: 'p4', cancion: 4
  },
  {
    n: 5, titulo: 'FIREWALL', pieza: 'escudo', piezaNom: 'Escudo de la Fe', ico: '🛡️',
    verso: 'Efesios 6:16', decl: 'La fe apaga los dardos del enemigo.',
    brief: 'El virus lanza dardos: burlas, apodos, risas, comentarios. Sin escudo, cada dardo entra. Con escudo, se apagan.',
    reto: 'Un integrante se para al frente y declara en voz alta una verdad bíblica sobre sí mismo, sin reírse ni quebrarse, mientras los demás intentan distraerlo (sin tocarlo ni ofenderlo). Debe sostener la declaración 30 segundos. Escriban la frase exacta que declaró.',
    tarjetas: [['La frase a declarar', 'verdad', 'SOY AMADO POR DIOS']],
    mat: 'Materiales: cronómetro. Regla de oro: distraer con ruido y muecas, nunca con burlas hirientes.',
    clave: 'SOY AMADO POR DIOS', voz: 'n5', pista: 'p5', cancion: 5
  },
  {
    n: 6, titulo: 'DESBLOQUEO FINAL', pieza: 'espada', piezaNom: 'Espada del Espíritu', ico: '⚔️',
    verso: 'Efesios 6:17 · Juan 1:12', decl: 'Soy hijo de Dios: ese es mi código original.',
    brief: 'Último sector. El código original de tu identidad está escrito en la Palabra. Encuéntralo y el virus queda eliminado.',
    reto: 'Tienen tres fragmentos del código: AMADO + HIJO + DIOS. Entre varias tarjetas con versículos, encuentren el que los contiene y escriban la cita.',
    tarjetas: [
      ['Fragmento 1', 'verdad', 'AMADO'], ['Fragmento 2', 'verdad', 'HIJO'], ['Fragmento 3', 'verdad', 'DIOS'],
      ['Opciones en tarjetas', 'situacion', 'Salmo 23:1 · Juan 1:12 · Filipenses 4:13 · Jeremías 29:11']
    ],
    mat: 'Materiales: tarjetas con 4 versículos, solo uno correcto (Juan 1:12).',
    clave: 'JUAN 1:12', voz: 'n6', pista: 'p6', cancion: 6
  }
]

export const SEGUNDOS = 300
export const PTS = 100
export const BONO = 100
export const N = NIVELES.length

export const ESTILOS = [
  ['adventurer', 'Aventura'],
  ['avataaars', 'Clásico'],
  ['big-smile', 'Sonrisa'],
  ['micah', 'Moderno']
]

export const norm = s =>
  s.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Z0-9]/g, '')

export const rnd = a => a[Math.floor(Math.random() * a.length)]

export function urlAvatar(seed, estilo, px) {
  return (
    'https://api.dicebear.com/9.x/' + (estilo || 'adventurer') + '/svg?seed=' +
    encodeURIComponent(seed || 'inicio') +
    '&backgroundColor=transparent' + (px ? '&size=' + px : '')
  )
}
