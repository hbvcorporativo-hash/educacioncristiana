import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType, HeadingLevel, BorderStyle, ShadingType } from 'docx'
import { writeFileSync } from 'fs'
import { join } from 'path'

const NIVELES = [
  {
    n: 1, titulo: 'CONTRASEÑA',
    verso: 'Efesios 6:14 · Juan 8:32',
    decl: 'La verdad de Dios sostiene quién soy.',
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
    mat: '8 tarjetas impresas con las frases, con el número escrito al respaldo solo en las mentiras.',
    pista: 'Una situación es algo que pasó. Una mentira te pone una etiqueta sobre quién eres. Busquen las que empiezan con SOY o dicen lo que vales.'
  },
  {
    n: 2, titulo: 'ESCANEA LA MENTIRA',
    verso: 'Efesios 6:14 · 2 Corintios 5:21',
    decl: 'Soy perdonado y justificado por Cristo.',
    reto: 'Peguen 4 códigos QR por el salón. Cada uno abre una pregunta trampa; al responderla bien revela una palabra. Reúnan las 4 palabras y escríbanlas aquí en orden.',
    tarjetas: [
      ['QR 1 · Tu amigo publica una foto y recibe 300 likes. Tú recibes 12. ¿Quién vale más?', 'verdad', '→ AMADO'],
      ['QR 2 · Alguien te dice: "Nunca vas a cambiar". ¿Qué haces con esa frase?', 'verdad', '→ ESCOGIDO'],
      ['QR 3 · Cometiste un error delante de todos. ¿Tu error define quién eres?', 'verdad', '→ PERDONADO'],
      ['QR 4 · Completa: "Mi identidad depende de ______".', 'verdad', '→ PROPÓSITO']
    ],
    mat: '4 QR impresos (pueden generarlos gratis y apuntar a un documento o imagen con la pregunta y la palabra).',
    pista: 'Las cuatro palabras responden a la pregunta quién soy yo para Dios. Empiezan con A, E, P y P.'
  },
  {
    n: 3, titulo: 'ERROR 404: IDENTIDAD',
    verso: 'Efesios 6:17 · Romanos 12:2',
    decl: 'Mi mente la protege lo que Dios dice de mí.',
    reto: 'Separen las tarjetas en dos columnas: 🟡 COSAS QUE PUEDEN DESCRIBIRME y 🟢 VERDADES QUE SOSTIENEN MI IDENTIDAD. Detrás de las 🟢 hay letras: ordénenlas y forman el comando de reparación.',
    tarjetas: [
      ['Soy alto / bajito', 'situacion', 'DESCRIBE'],
      ['Me va bien en deportes', 'situacion', 'DESCRIBE'],
      ['Soy tímido', 'situacion', 'DESCRIBE'],
      ['Me gusta dibujar', 'situacion', 'DESCRIBE'],
      ['Soy hijo de Dios', 'verdad', 'SOSTIENE'],
      ['Soy amado sin condición', 'verdad', 'SOSTIENE'],
      ['Soy perdonado', 'verdad', 'SOSTIENE'],
      ['Fui creado con propósito', 'verdad', 'SOSTIENE']
    ],
    mat: '8 tarjetas; al respaldo de las 4 verdades, las letras que forman el comando (9 letras en total).',
    pista: 'El comando tiene nueve letras y es lo que hace un antivirus con un archivo dañado.'
  },
  {
    n: 4, titulo: 'CONTRACORRIENTE',
    verso: 'Efesios 6:15 · Romanos 12:2',
    decl: 'No me amoldo al mundo: estoy firme en Cristo.',
    reto: 'Todo el grupo camina en círculo en un sentido; el equipo debe atravesarlo en sentido contrario sin caerse ni devolverse. Ronda 2: el líder grita frases que "todos dicen" y el equipo responde en voz alta con la verdad bíblica que corresponde, aunque los demás griten lo contrario.',
    tarjetas: [
      ['El mundo dice: "vales por tus likes"', 'verdad', 'La Palabra dice: eres imagen de Dios'],
      ['El mundo dice: "si fallas, eres un perdedor"', 'verdad', 'La Palabra dice: hay misericordia nueva'],
      ['El mundo dice: "sé como los demás"', 'verdad', 'La Palabra dice: fuiste hecho único'],
      ['El mundo dice: "estás solo"', 'verdad', 'La Palabra dice: nunca te dejaré']
    ],
    mat: 'Espacio despejado y las tarjetas de "el mundo dice / la Palabra dice".',
    pista: 'Cinco letras. Efesios seis trece dice: habiendo acabado todo, estar…'
  },
  {
    n: 5, titulo: 'FIREWALL',
    verso: 'Efesios 6:16',
    decl: 'La fe apaga los dardos del enemigo.',
    reto: 'Un integrante se para al frente y declara en voz alta una verdad bíblica sobre sí mismo, sin reírse ni quebrarse, mientras los demás intentan distraerlo (sin tocarlo ni ofenderlo). Debe sostener la declaración 30 segundos. Escriban la frase exacta que declaró.',
    tarjetas: [['La frase a declarar', 'verdad', 'SOY AMADO POR DIOS']],
    mat: 'Cronómetro. Regla de oro: distraer con ruido y muecas, nunca con burlas hirientes.',
    pista: 'Escriban la frase completa que declaró su compañero: soy amado por…'
  },
  {
    n: 6, titulo: 'DESBLOQUEO FINAL',
    verso: 'Efesios 6:17 · Juan 1:12',
    decl: 'Soy hijo de Dios: ese es mi código original.',
    reto: 'Tienen tres fragmentos del código: AMADO + HIJO + DIOS. Entre varias tarjetas con versículos, encuentren el que los contiene y escriban la cita.',
    tarjetas: [
      ['Fragmento 1', 'verdad', 'AMADO'],
      ['Fragmento 2', 'verdad', 'HIJO'],
      ['Fragmento 3', 'verdad', 'DIOS'],
      ['Opciones en tarjetas', 'situacion', 'Salmo 23:1 · Juan 1:12 · Filipenses 4:13 · Jeremías 29:11']
    ],
    mat: 'Tarjetas con 4 versículos, solo uno correcto (Juan 1:12).',
    pista: 'Es el primer capítulo del evangelio de Juan, versículo doce.'
  }
]

const CYAN = '00E5FF'
const GRIS_CLARO = 'F0F0F0'

function crearCelda(texto, opts = {}) {
  const { bold, color, shading, width } = opts
  return new TableCell({
    width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
    shading: shading ? { type: ShadingType.SOLID, color: shading } : undefined,
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: texto,
            bold: bold || false,
            color: color || '000000',
            size: 20
          })
        ],
        spacing: { after: 50 }
      })
    ]
  })
}

function crearSeccionNivel(nivel) {
  const elementos = []

  // Título del nivel
  elementos.push(new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [
      new TextRun({
        text: `NIVEL ${nivel.n} - ${nivel.titulo}`,
        bold: true,
        size: 28,
        color: '1A1A2E'
      })
    ],
    spacing: { before: 400, after: 200 }
  }))

  // Versículo
  elementos.push(new Paragraph({
    children: [
      new TextRun({ text: '📖 Versículo: ', bold: true, size: 22 }),
      new TextRun({ text: nivel.verso, size: 22 })
    ],
    spacing: { after: 100 }
  }))

  // Declaración
  elementos.push(new Paragraph({
    children: [
      new TextRun({ text: '💬 Declaración: ', bold: true, size: 22 }),
      new TextRun({ text: nivel.decl, italics: true, size: 22 })
    ],
    spacing: { after: 100 }
  }))

  // Reto
  elementos.push(new Paragraph({
    children: [
      new TextRun({ text: '🎯 Reto: ', bold: true, size: 22 }),
      new TextRun({ text: nivel.reto, size: 22 })
    ],
    spacing: { after: 200 }
  }))

  // Tabla de tarjetas
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      crearCelda('Texto', { bold: true, shading: CYAN, width: 50 }),
      crearCelda('Tipo', { bold: true, shading: CYAN, width: 20 }),
      crearCelda('Etiqueta', { bold: true, shading: CYAN, width: 30 })
    ]
  })

  const rows = nivel.tarjetas.map((t, i) => {
    const shading = i % 2 === 0 ? GRIS_CLARO : undefined
    return new TableRow({
      children: [
        crearCelda(t[0], { shading }),
        crearCelda(t[1], { shading }),
        crearCelda(t[2], { bold: true, shading })
      ]
    })
  })

  elementos.push(new Paragraph({
    children: [new TextRun({ text: 'TARJETAS', bold: true, size: 24 })],
    spacing: { before: 200, after: 100 }
  }))

  elementos.push(new Table({
    rows: [headerRow, ...rows],
    width: { size: 100, type: WidthType.PERCENTAGE }
  }))

  // Materiales
  elementos.push(new Paragraph({
    children: [
      new TextRun({ text: '📝 Materiales: ', bold: true, size: 22 }),
      new TextRun({ text: nivel.mat, size: 22 })
    ],
    spacing: { before: 200, after: 100 }
  }))

  // Pista
  elementos.push(new Paragraph({
    children: [
      new TextRun({ text: '💡 Pista: ', bold: true, size: 22, color: 'FF6B00' }),
      new TextRun({ text: nivel.pista, size: 22, italics: true })
    ],
    spacing: { after: 100 }
  }))

  // Separador
  elementos.push(new Paragraph({
    children: [new TextRun({ text: '─'.repeat(60), color: 'CCCCCC', size: 18 })],
    spacing: { before: 200, after: 200 }
  }))

  return elementos
}

function crearTablaResumen() {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      crearCelda('Nivel', { bold: true, shading: CYAN, width: 15 }),
      crearCelda('Título', { bold: true, shading: CYAN, width: 25 }),
      crearCelda('Pista', { bold: true, shading: CYAN, width: 60 })
    ]
  })

  const rows = NIVELES.map((n, i) => {
    const shading = i % 2 === 0 ? GRIS_CLARO : undefined
    return new TableRow({
      children: [
        crearCelda(String(n.n), { shading, bold: true }),
        crearCelda(n.titulo, { shading }),
        crearCelda(n.pista, { shading })
      ]
    })
  })

  return new Table({
    rows: [headerRow, ...rows],
    width: { size: 100, type: WidthType.PERCENTAGE }
  })
}

async function main() {
  const elementos = []

  // Portada
  elementos.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 2000 },
    children: [
      new TextRun({
        text: 'ANTIVIRUS ADN',
        bold: true,
        size: 48,
        color: '1A1A2E'
      })
    ]
  }))

  elementos.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({
        text: 'Mensajes del Juego',
        size: 36,
        color: '4A4A6A'
      })
    ]
  }))

  elementos.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [
      new TextRun({
        text: 'Tarjetas, Pistas, Versículos y Declaraciones',
        size: 28,
        color: '6A6A8A'
      })
    ]
  }))

  elementos.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [
      new TextRun({
        text: '─'.repeat(40),
        color: 'CCCCCC',
        size: 24
      })
    ]
  }))

  // Contenido por nivel
  for (const nivel of NIVELES) {
    elementos.push(...crearSeccionNivel(nivel))
  }

  // Tabla resumen de pistas
  elementos.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [
      new TextRun({
        text: 'RESUMEN DE PISTAS',
        bold: true,
        size: 32,
        color: '1A1A2E'
      })
    ],
    spacing: { before: 400, after: 200 }
  }))

  elementos.push(crearTablaResumen())

  const doc = new Document({
    sections: [{
      properties: {},
      children: elementos
    }]
  })

  const buffer = await Packer.toBuffer(doc)
  const outPath = join(import.meta.dirname, '..', 'mensajes-tarjetas-pistas.docx')
  writeFileSync(outPath, buffer)
  console.log(`✓ Documento generado: ${outPath}`)
}

main().catch(err => { console.error(err); process.exit(1) })
