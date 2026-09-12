export const VOCES = {
  intro: 'Aquí Leo, su aliado en el sistema. Escuchen bien: un virus llamado COMPARACIÓN entró en su ADN de identidad. Les susurra que valen menos, que no encajan, que otro es mejor. Vamos a hackearlo en seis niveles y a recuperar el código original. Además, en cada nivel desbloquean una pieza de la armadura. ¡Vamos al nivel uno!',
  n1: 'Nivel uno: Sobre la mesa hay tarjetas con frases. Unas son solo situaciones, otras son mentiras sobre su identidad. Separen las mentiras: cada una les da un número. Junten los números en orden y tendrán la contraseña.',
  n2: 'Nivel dos: Cuatro códigos QR repartidos por el salón, cada uno con una pregunta trampa. Al responder bien, cada QR revela una palabra. Reúnan las cuatro y escríbanlas aquí.',
  n3: 'Nivel tres: Buscando identidad. El sistema está usando datos equivocados para descubrir quién eres. Algunas tarjetas solo te describen. Otras contienen verdades que sostienen tu identidad. Clasifíquenlas, encuentren las verdades y revisen su reverso. Allí está escondido el comando que necesitan para reparar el sistema. ¿Cuál será?',
  n4: 'Nivel cuatro: contracorriente. El mundo entero va en un sentido y ustedes tienen que ir en el contrario. No es fácil sostenerse cuando todos empujan. Superen la prueba y escriban la palabra que resistió.',
  n5: 'Nivel cinco: firewall. Van a lanzarles dardos: burlas, distracciones, risas. Uno del equipo debe declarar la verdad sin quebrarse. Cuando lo logren, escriban exactamente lo que declaró.',
  n6: 'Nivel seis, el último. Tienen tres palabras del código: AMADO, HIJO, DIOS. Busquen entre las tarjetas el versículo que las contiene todas. Escríbalo y su identidad quedará desbloqueada.',
  p1: 'Pista: una situación es algo que pasó. Una mentira te pone una etiqueta sobre quién eres. Busquen las que empiezan con SOY o dicen lo que vales.',
  p2: 'Pista: las cuatro palabras responden a la pregunta quién soy yo para Dios. Empiezan con A, E, P y P.',
  p3: 'Pista: el comando tiene nueve letras, cuando un archivo está corrupto o roto, lo primero que el sistema intenta hacer es',
  p4: 'Pista: cinco letras. Efesios seis trece dice: habiendo acabado todo, estar…',
  p5: 'Pista: escriban la frase completa que declaró su compañero: soy amado por…',
  p6: 'Pista: es el primer capítulo del evangelio de Juan, versículo doce.',
  'bien-1': '¡Sector limpio! Miren cómo se restaura su ADN. El virus está perdiendo, equipo.',
  'bien-2': '¡Código aceptado! Una pieza más de armadura. ¡Sigan hackeando!',
  'mal-1': 'Código rechazado. Tranquilos, revisen otra vez: el virus quiere que se rindan.',
  'mal-2': 'No es ese. Respiren y vuelvan a intentarlo, están cerca.',
  gana: '¡Virus eliminado, equipo! Su ADN quedó restaurado al cien por ciento y su sistema de defensa la armadura completa ha sido puesta sobre ti. Escuchen esto: no tienen que compararse con nadie, porque Dios los escogió, los conoce desde antes de la creación, ustedes son sus hijos amados, y eso ningún comentario, ningún like y ninguna nota lo puede cambiar. Recuerden estp cada día Ahora… vívanlo, y no caigan ante la comparación.'
}

export const NIVELES = [
  {
    n: 1, titulo: 'CONTRASEÑA', pieza: 'cinturon', piezaNom: 'Cinturón de la Verdad', ico: '🎗️',
    verso: 'Efesios 6:14 · Juan 8:32', decl: 'La verdad de Dios sostiene quién soy.',
    brief: 'El virus bloqueó el acceso mezclando situaciones reales con mentiras sobre tu identidad. Si no sabes distinguirlas, seguira haciendote daño.',
    reto: 'Existe un paquete con tarjetas que tienen el código de acceso, es necesario identificar la contraseña de acceso. Cada tarjeta tiene una situación y esto revela una mentira, lás mentiras al respaldo revelan un número: júntenlos en el orden en que aparecen y tendrán la contraseña.',
    tarjetas: [
      ['Todos mis amigos tienen más likes que yo.', 'situacion', 'SITUACIÓN'],
      ['Valgo menos porque tengo menos likes.', 'mentira', 'MENTIRA'],
      ['Me dijeron que soy raro.', 'situacion', 'SITUACIÓN'],
      ['Nadie me quiere de verdad.', 'mentira', 'MENTIRA'],
      ['Soy malo para matemáticas, entonces soy bruto.', 'mentira', 'MENTIRA'],
      ['Fallé otra vez.', 'situacion', 'SITUACIÓN'],
      ['Si fallé, soy un fracaso.', 'mentira', 'MENTIRA'],
      ['Mis papás están orgullosos de mí.', 'situacion', 'SITUACIÓN']
    ],
    mat: 'Materiales: 8 tarjetas SITUACIONES / MENTIRAS, al respaldo estará el número escrito.',
    clave: '2314', voz: 'n1', pista: 'p1', cancion: 1
  },
  {
    n: 2, titulo: 'ESCANEA LA MENTIRA', pieza: 'coraza', piezaNom: 'Coraza de Justicia', ico: '🦺',
    verso: 'Efesios 6:14 · 2 Corintios 5:21', decl: 'Soy perdonado y justificado por Cristo.',
    brief: 'El virus le gusta distoricionar y obliga a que nos comparemos. Cada vez que respondes desde la comparación, se replica. Es hora de detenerlo!.',
    reto: 'En el salón hay 4 QR. Cada uno tiene una pregunta clave, y un código QR, al responderla bien revela una palabra. Reúnan las 4 palabras y escríbanlas aquí en orden.',
    tarjetas: [
      ['QR 1 · Tu amigo publica una foto y recibe 300 likes. Tú recibes 12. ¿Los likes pueden decidir cuánto vales tú? Entonces, ¿qué verdad necesitas recordar sobre ti?', 'verdad', '→'],
      ['QR 2 · Todos están formando equipos y parece que nadie te escoge. Te quedas pensando: **Tal vez no soy suficientemente bueno**. ¿Que otros no te elijan significa que tú no tienes un lugar? ¿Qué verdad puedes recordar?', 'verdad', '→'],
      ['QR 3 · Cometiste un error delante de todos. Te arrepientes y quieres hacerlo mejor. ¿Tu error se convierte en tu identidad o puedes recibir perdón y comenzar de nuevo?', 'verdad', '→'],
      ['QR 4 · Si pudieras tener fama, dinero, muchos amigos y éxito, pero no supieras para qué estás viviendo… ¿sentirías que tienes todo? ¿Qué necesitas descubrir para saber quién eres y para qué estás aquí?".', 'verdad', '→']
    ],
    mat: 'Materiales: 4 QR impresos distribuidos por el salon.',
    clave: 'AMADO ESCOGIDO PERDONADO PROPOSITO', voz: 'n2', pista: 'p2', cancion: 2
  },
  {
    n: 3, titulo: 'ERROR 404: SYSTEM ERROR', pieza: 'yelmo', piezaNom: 'Yelmo de la Salvación', ico: '⛑️',
    verso: 'Efesios 6:17 · Romanos 12:2', decl: 'Mi mente está protegida por lo que Dios dice de mí.',
    brief: ' El sistema intentó encontrar tu identidad usando datos equivocados: tus gustos, tu apariencia, tus habilidades, tus emociones y tus errores. Por eso marca ERROR 404: no encuentra quién eres realmente.',
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
    reto: 'Los chicos forman una línea. El líder se coloca delante y empieza a decir frases como: \"¡Todos lo hacen!\" \"¡No pasa nada!\" \"¡Si nadie te ve, hazlo!\" \"¡Si todos piensan igual, tú también!\" \"¡No seas diferente!\" El grupo debe responder todos juntos, con la verdad correspondiente. Pero hay una regla: Si alguien cambia su respuesta porque los demás gritan otra cosa, el equipo pierde estabilidad y debe volver a empezar esa prueba.',
    tarjetas: [
      ['El 🌐 dice: "vales por tus likes"', 'verdad', 'Mi valor viene de Dios. Soy Obra Maestra'],
      ['El 🌐 dice: "si fallas, eres un perdedor"', 'verdad', 'La Palabra dice: hay misericordia nueva'],
      ['El 🌐 dice: "sé como los demás"', 'verdad', 'La Palabra dice: fuiste hecho único'],
      ['El 🌐 dice: "estás solo"', 'verdad', 'La Palabra dice: nunca te dejaré']
    ],
    mat: 'Materiales: espacio despejado y las tarjetas de "el mundo dice / la Palabra dice".',
    clave: 'FIRME', voz: 'n4', pista: 'p4', cancion: 4
  },
  {
    n: 5, titulo: 'FIREWALL', pieza: 'escudo', piezaNom: 'Escudo de la Fe', ico: '🛡️',
    verso: 'Efesios 6:16', decl: 'La fe apaga los dardos del enemigo.',
    brief: 'El virus lanza dardos: burlas, apodos, risas, comentarios. Sin escudo, cada dardo entra. Con escudo, se apagan.',
    reto: 'Un integrante se para al frente y declara en voz alta una verdad bíblica sobre sí mismo, sin reírse ni quebrarse, mientras los demás intentan distraerlo (sin tocarlo ni ofenderlo). Debe sostener la declaración 30 segundos. Escriban la frase exacta que declaró.',
    tarjetas: [['La frase a declarar', 'verdad', 'SOY AMADO POR _ _ _ _']],
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
    mat: 'Materiales: tarjetas con 4 versículos, solo uno correcto.',
    clave: 'JUAN 1:12', voz: 'n6', pista: 'p6', cancion: 6
  }
]

export const MENSAJES = {
  voces: VOCES,
  niveles: NIVELES,
  ui: {
    intro: {
      alerta: 'AMENAZA DETECTADA',
      titulo: 'ANTIVIRUS ADN',
      sub: 'Hackea el virus · recupera tu identidad',
      brief: [
        'Hoy sus identidades están siendo atacadas por un virus. Se mete por las redes sociales, los comentarios, el colegio, los amigos y hasta por nuestros propios pensamientos.',
        'Su misión: Identificar el virus, recuperar el sistema defensivo para contra atacar las mentiras y recuperar el código de su verdadera identidad.'
      ],
      terminal: [
        '> Escaneando ADN...',
        '> **Archivo:** identidad.adn',
        '> **Estado:** ',
        '> **Sistema Defensivo:** 0/6 piezas',
        '> Esperando operador...'
      ],
      terminalCorrupto: 'CORRUPTO (0% restaurado)',
      btnIniciar: 'INICIAR MISIÓN',
      audioHint: 'Toca para activar el audio'
    },
    avatar: {
      paso: 'Paso 1 de 2',
      titulo: 'Personaliza tu operador',
      desc: 'Este eres tú dentro del sistema. Con cada nivel el sistema defensivo te fortalecerá. Efesios 6.',
      nombrePlaceholder: 'Nombre de tu operador',
      estilo: 'Estilo',
      personaje: 'Elige tu personaje',
      verOtros: '🎲 VER OTROS',
      entrar: 'ENTRAR AL SISTEMA'
    },
    mapa: {
      subRestaurado: 'Sistema {hechos}/{N} restaurado',
      tituloNiveles: 'Niveles de descontaminación',
      sectorLimpio: 'Sector limpio',
      disponible: 'Disponible · Toca para acceder',
      bloqueado: 'Bloqueado',
      nivel: 'Nivel {n}',
      finalAbierto: {
        titulo: '¡Sistema defensivo Activado, Identidad Restaurada al 100%!',
        sub: 'Toquen para ver su tarjeta'
      },
      finalCerrado: {
        titulo: 'Identidad corrupta y bloqueada',
        sub: 'Supera los 6 niveles para limpiar el sistema'
      }
    },
    nivel: {
      volver: '←',
      header: 'NIVEL {n} / {N}',
      denied: '🔴 ACCESS DENIED',
      informe: 'Informe del virus',
      repetir: '▶ Repetir',
      pista: '💡 Pista',
      reto: 'Reto en físico',
      evidencia: '📸 Evidencia del equipo (opcional)',
      evidenciaAlt: 'evidencia',
      fotoVacia: 'La foto es opcional: pueden escribir el código directamente',
      cambiarFoto: '🔄 CAMBIAR FOTO',
      tomarFoto: '📸 TOMAR FOTO',
      codigo: 'Introduce el código de acceso',
      codigoPlaceholder: 'Escribe el código…',
      descontaminado: '✔ NIVEL DESCONTAMINADO',
      hackear: 'HACKEAR EL VIRUS'
    },
    final: {
      alerta: '● VIRUS ELIMINADO',
      titulo: 'Identidad restaurada',
      parrafo: 'El virus mentía. No tienes que compararte con nadie, porque Él ya te ha diseñado unico, y no hay nadie igual a ti, te ha escogido desde antes que nacieras y te hizo obra MAESTRA.',
      tarjeta: 'Tarjeta de identidad',
      identidad: 'Hijo/a de Dios',
      identidadLab: '❤️ IDENTIDAD',
      poder: '⚡ MI PODER',
      verdad: '🛡️ VERDAD QUE NECESITO RECORDAR',
      proposito: '🎯 MI PROPÓSITO',
      versoLab: '🔓 VERSÍCULO DESBLOQUEADO',
      verso: 'Juan 1:12',
      escribe: 'Escríbelo…',
      descargar: '⬇ DESCARGAR MI TARJETA',
      nuevaMision: '↻ NUEVA MISIÓN'
    },
    hud: {
      adnRestaurado: 'ADN restaurado',
      comoJugar: '¿Cómo jugar?'
    },
    revelar: {
      eti: 'ADN {pct}% restaurado',
      ver: '📖 {ver}',
      dec: '"{dec}"',
      puntos: '+{pts} pts',
      bono: ' ⚡ bono +{bono}',
      dilo: 'Dilo en voz alta',
      continuar: 'CONTINUAR'
    },
    modales: {
      musica: {
        titulo: '🎵 Música NXTWAVE',
        intro: 'Pon las canciones de NXTWAVE en una carpeta `canciones/`, con estos nombres. Sonarán de fondo en cada nivel. Si un archivo no existe, ese nivel va sin música.',
        play: '▶ REPRODUCIR CANCIÓN',
        pausa: '⏸ PAUSAR CANCIÓN',
        volumen: 'Música MP3 (máx 7%)',
        volumenAria: 'Volumen de música MP3',
        linea1: {
          f: 'canciones/revolution.mp3',
          t: 'Canción principal — suena continua durante todo el juego.\n**We Are The Revolution** · Nxtwave (WATR)'
        },
        linea2: {
          f: 'revolution.mp3',
          t: 'También funciona si el archivo queda suelto, al lado de la app.'
        },
        ducking: 'La música baja sola cuando Leo habla y vuelve a subir al terminar.'
      },
      guion: {
        titulo: '🎙 Voces de {agente}',
        intro: 'Cada línea requiere un MP3 estéreo colombiano en `public/voces/{dir}/`. Leo usa la misma colección para voz natural y de sistema.',
        pickerTitulo: 'Agente de voz',
        agentes: [
          { id: 'principal', nombre: 'Leo · voz natural', corto: 'Leo', dir: 'leo' },
          { id: 'sistema', nombre: 'Leo · voz del sistema', corto: 'Leo', dir: 'leo' },
          { id: 'mujer', nombre: 'Sara · voz femenina', corto: 'Sara', dir: 'sara' }
        ],
        volumen: 'Voces de {agente}',
        volumenAria: 'Volumen de las voces de {agente}',
        lineaArchivo: 'voces/{dir}/{k}.mp3',
        lineaTexto: '"{texto}"'
      },
      camara: {
        titulo: '📸 Cámara de evidencia',
        capturar: 'CAPTURAR FOTO',
        cancelar: 'CANCELAR'
      }
    },
    avisos: {
      tiempo: { t: 'se acabó el tiempo — pueden seguir, sin bono', k: 'tip' },
      ok: { t: '✔ evidencia guardada', k: 'ok' },
      procesando: { t: 'procesando imagen...', k: 'tip' },
      sinImagen: { t: 'no se pudo leer la imagen', k: 'mal' },
      claveVacia: { t: 'introduce el código', k: 'mal' },
      denied: { t: '✖ ACCESS DENIED — código incorrecto', k: 'mal' },
      pista: { t: '💡 escucha la pista de {agente}', k: 'tip' },
      camaraDenegada: { t: 'Permiso de cámara denegado. Puedes seleccionar una imagen.', k: 'mal' },
      camaraError: { t: 'No se pudo abrir la cámara. Puedes seleccionar una imagen.', k: 'mal' }
    },
    bandera: {
      equipado: '◆ {pieza} EQUIPADO',
      captura: 'Toma una captura de pantalla'
    },
    tarjeta: {
      titulo: 'TARJETA DE IDENTIDAD',
      archivo: 'mi-identidad-adn.png',
      vacio: '—',
      campos: [
        { lab: 'IDENTIDAD', val: 'Hijo/a de Dios', color: '#34E39B' },
        { lab: 'MI PODER', input: 'tiPoder', color: '#DCE9F5' },
        { lab: 'VERDAD QUE NECESITO RECORDAR', input: 'tiVerdad', color: '#DCE9F5' },
        { lab: 'MI PROPOSITO', input: 'tiProp', color: '#DCE9F5' },
        { lab: 'VERSICULO DESBLOQUEADO', val: 'Juan 1:12', color: '#FFC531' }
      ],
      footer: 'ADN restaurado 100% · armadura completa · Efesios 6'
    },
    jugador: {
      nombre: 'Operador',
      globo: '…',
      avatarAlt: 'avatar',
      sectorListo: 'Sector ya descontaminado. Pueden revisar su evidencia o volver al mapa.'
    },
    audio: {
      play: '▶ REPRODUCIR CANCIÓN',
      pausa: '⏸ PAUSAR CANCIÓN'
    },
    jesus: {
      placeholder: '[ imagen final ]\nColoca tu imagen en\n**public/final/jesus.png**',
      alt: 'Jesús'
    },
    matrix: {
      prompt: 'root@adn:~$',
      canal: ' SECURE_CHANNEL',
      protocolo: '> EJECUTANDO PROTOCOLO',
      aria: 'Procesando hackeo',
      mensajes: {
        inicio: ['ESTABLECIENDO CONEXIÓN...', 'BYPASSING FIREWALL NEURAL...', 'ACCESO PERMITIDO'],
        avatar: ['CARGANDO PERFIL DE OPERADOR...', 'SINCRONIZANDO NODOS ADN...', 'PERFIL LISTO'],
        hackeo: ['ANALIZANDO CÓDIGO SECRETO...', 'DESCONTAMINANDO SECTOR...', 'ADN RESTAURADO']
      }
    },
    ayuda: {
      hero: { alerta: '● GUÍA RÁPIDA', titulo: 'ANTIVIRUS ADN', sub: 'Cómo jugar y superar los 6 niveles' },
      mision: {
        ico: '🎯', titulo: 'Tu Misión',
        texto: 'Un virus llamado **COMPARACIÓN** ha infectado tu ADN de identidad. Te susurra que vales menos, que no encajas, que alguien es mejor que tú. Tu misión: hackearlo en **6 niveles**, completar retos y recuperar tu verdadera identidad.'
      },
      pasosTitulo: { ico: '📋', titulo: 'Paso a Paso' },
      pasos: [
        {
          num: '01', titulo: 'Inicia la Misión', icono: '🚀',
          desc: 'Toca el botón INICIAR MISIÓN en la pantalla de inicio. Se activarán los sonidos y la música de fondo.',
          detalle: 'Lee la explicación del virus COMPARACIÓN. Este virus te dice que vales menos que los demás. Tu misión es hackearlo.'
        },
        {
          num: '02', titulo: 'Crea tu Operador', icono: '🧑‍💻',
          desc: 'Escribe tu nombre, elige un estilo visual y selecciona tu personaje.',
          detalle: 'Tu avatar es tu identidad dentro del juego. Con cada nivel que completes, le equiparás una pieza de la armadura de Dios.'
        },
        {
          num: '03', titulo: 'Explora el Mapa', icono: '🗺️',
          desc: 'El mapa muestra 6 niveles. Solo el primero está disponible al inicio.',
          detalle: 'Cada nivel desbloquea una pieza de armadura y una verdad bíblica. Los niveles se abren en orden: 1 → 2 → 3 → 4 → 5 → 6.'
        },
        {
          num: '04', titulo: 'Haz el Reto', icono: '⚔️',
          desc: 'Escucha las instrucciones, realiza la actividad física en el salón.',
          detalle: 'Leo o Sara te explican qué hacer. Lee el "Informe del virus" y el "Reto en físico". Puedes tocar Repetir para volver a escuchar o Pista si necesitas ayuda.'
        },
        {
          num: '05', titulo: 'Toma Foto y Escribe el Código', icono: '📸',
          desc: 'Captura evidencia del reto completado y escribe el código que descubriste.',
          detalle: 'La foto es opcional. Si no tienes cámara o permisos, puedes escribir directamente el código. El código acepta espacios, mayúsculas y tildes sin problema.'
        },
        {
          num: '06', titulo: '¡Hackea el Virus!', icono: '🔓',
          desc: 'Presiona HACKEAR EL VIRUS. Si es correcto, desbloqueas la pieza de armadura.',
          detalle: 'Si el código es correcto, verás una animación y ganarás puntos. Si es incorrecto, puedes intentar de nuevo sin penalización.'
        },
        {
          num: '07', titulo: 'Tu Identidad Desbloqueada', icono: '🌟',
          desc: 'Después de completar los 6 niveles, escribe tu reflexión y descarga tu tarjeta.',
          detalle: 'Escribe: Mi Poder, La Verdad que necesito recordar, y Mi Propósito. Descarga tu tarjeta como recuerdo.'
        }
      ],
      nivelesTitulo: { ico: '🗺️', titulo: 'Los 6 Niveles' },
      consejosTitulo: { ico: '💡', titulo: 'Consejos Importantes' },
      consejos: [
        { ico: '📷', texto: '**La foto es opcional.** Te ayuda como evidencia, pero si no tienes cámara puedes escribir el código directamente.' },
        { ico: '⌨️', texto: '**El código es flexible.** Mayúsculas, espacios y tildes no importan. "Juan 1:12" es igual a "juan112".' },
        { ico: '🔒', texto: '**No se saltan niveles.** Debes completar el 1 para abrir el 2, y así sucesivamente.' },
        { ico: '⏱️', texto: '**El cronómetro es tu amigo.** Si terminas rápido, ganas puntos extra. Si te tardas, no pasa nada.' },
        { ico: '🔄', texto: '**Si fallas, reintentas.** No hay penalización por equivocarse. ¡Intenta de nuevo!' },
        { ico: '🔊', texto: '**Ajusta el volumen.** Usa los botones de la barra superior para música, voces y sonidos.' }
      ],
      armadura: {
        ico: '🛡️', titulo: 'La Armadura de Dios',
        intro: 'Cada nivel desbloquea una pieza de la armadura descrita en **Efesios 6:10-18**:'
      },
      volver: '← Volver al Juego'
    }
  }
}

export function t(clave, vars = {}) {
  const v = clave.split('.').reduce((o, k) => (o == null ? o : o[k]), MENSAJES)
  if (v == null) return clave
  return String(v).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m))
}

export function aviso(clave, vars = {}) {
  const v = clave.split('.').reduce((o, k) => (o == null ? o : o[k]), MENSAJES)
  if (!v || typeof v !== 'object') return { t: String(v ?? ''), k: '' }
  return {
    t: String(v.t).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)),
    k: v.k || ''
  }
}

export function paraAgente(texto, agente) {
  return agente === 'mujer' ? String(texto).replace(/Leo/g, 'Sara').replace(/aliado/g, 'aliada') : texto
}

export function Rich({ s }) {
  if (s == null) return null
  const out = []
  String(s).split('\n').forEach((linea, i) => {
    if (i > 0) out.push(<br key={'br' + i} />)
    linea.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).forEach((p, j) => {
      if (p.startsWith('**') && p.endsWith('**') && p.length > 4) out.push(<b key={i + '-b' + j}>{p.slice(2, -2)}</b>)
      else if (p.startsWith('`') && p.endsWith('`') && p.length > 2) out.push(<code key={i + '-c' + j}>{p.slice(1, -1)}</code>)
      else out.push(p)
    })
  })
  return out
}