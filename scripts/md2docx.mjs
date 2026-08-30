import { readFileSync, writeFileSync } from 'fs'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, TableRow, TableCell, Table, WidthType, ExternalHyperlink } from 'docx'

const DOCX_STYLES = {
  default: {
    document: {
      run: { font: 'Calibri', size: 24, color: '333333' },
      paragraph: { spacing: { after: 120, line: 276 } }
    }
  }
}

function parseMd(md) {
  const lines = md.split('\n')
  const elements = []
  let i = 0
  let inTable = false
  let tableRows = []

  while (i < lines.length) {
    const line = lines[i]

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      const cells = line.split('|').filter(c => c.trim()).map(c => c.trim())
      if (cells.every(c => /^[-:]+$/.test(c))) {
        i++
        continue
      }
      tableRows.push(cells)
      if (i + 1 < lines.length && lines[i + 1].includes('|') && lines[i + 1].trim().startsWith('|')) {
        i++
        continue
      } else {
        // Flush table
        if (tableRows.length > 0) {
          elements.push(buildTable(tableRows))
          tableRows = []
        }
        i++
        continue
      }
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line.trim())) {
      elements.push(new Paragraph({ spacing: { before: 200, after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC' } } }))
      i++
      continue
    }

    // Headers
    const hMatch = line.match(/^(#{1,6})\s+(.*)/)
    if (hMatch) {
      const level = hMatch[1].length
      const text = hMatch[2]
      const headingMap = {
        1: HeadingLevel.HEADING_1,
        2: HeadingLevel.HEADING_2,
        3: HeadingLevel.HEADING_3
      }
      elements.push(new Paragraph({
        heading: headingMap[level] || HeadingLevel.HEADING_3,
        children: [new TextRun({ text, bold: true, color: level === 1 ? '12304F' : level === 2 ? '22D3EE' : '34E39B' })]
      }))
      i++
      continue
    }

    // Unordered list
    if (/^[-*]\s+/.test(line.trim())) {
      const text = line.trim().replace(/^[-*]\s+/, '')
      elements.push(new Paragraph({
        bullet: { level: 0 },
        children: parseInline(text)
      }))
      i++
      continue
    }

    // Ordered list
    const olMatch = line.trim().match(/^(\d+)\.\s+(.*)/)
    if (olMatch) {
      elements.push(new Paragraph({
        numbering: { reference: 'default-numbering', level: 0 },
        children: parseInline(olMatch[2])
      }))
      i++
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      const text = line.trim().replace(/^>\s*/, '')
      elements.push(new Paragraph({
        indent: { left: 480 },
        border: { left: { style: BorderStyle.SINGLE, size: 12, color: '22D3EE' } },
        children: [new TextRun({ text, italics: true, color: '7C93AE', size: 22 })]
      }))
      i++
      continue
    }

    // Code block
    if (line.trim().startsWith('```')) {
      i++
      const codeLines = []
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++
      elements.push(new Paragraph({
        shading: { fill: '050D18' },
        indent: { left: 240 },
        children: [new TextRun({ text: codeLines.join('\n'), font: 'Consolas', size: 20, color: '34E39B' })]
      }))
      continue
    }

    // Regular paragraph
    elements.push(new Paragraph({ children: parseInline(line) }))
    i++
  }

  if (tableRows.length > 0) elements.push(buildTable(tableRows))
  return elements
}

function parseInline(text) {
  const runs = []
  // Simple inline parsing: **bold**, `code`, regular text
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      runs.push(new TextRun({ text: text.slice(lastIndex, match.index) }))
    }
    const part = match[0]
    if (part.startsWith('**')) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true }))
    } else if (part.startsWith('`')) {
      runs.push(new TextRun({ text: part.slice(1, -1), font: 'Consolas', size: 20, color: '22D3EE' }))
    }
    lastIndex = match.index + part.length
  }
  if (lastIndex < text.length) {
    runs.push(new TextRun({ text: text.slice(lastIndex) }))
  }
  return runs.length > 0 ? runs : [new TextRun({ text })]
}

function buildTable(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map((cells, ri) => new TableRow({
      children: cells.map(cell => new TableCell({
        children: [new Paragraph({
          children: [new TextRun({ text: cell, bold: ri === 0, size: ri === 0 ? 22 : 21, color: ri === 0 ? 'FFFFFF' : '333333' })]
        })],
        shading: ri === 0 ? { fill: '12304F' } : ri % 2 === 0 ? { fill: 'F0F4F8' } : undefined
      }))
    }))
  })
}

async function convertMdToDocx(mdPath, docxPath, title) {
  const md = readFileSync(mdPath, 'utf-8')
  const elements = parseMd(md)

  const doc = new Document({
    styles: DOCX_STYLES,
    numbering: {
      config: [{
        reference: 'default-numbering',
        levels: [{ level: 0, format: 'decimal', text: '%1.', alignment: AlignmentType.START, style: { paragraph: { indent: { left: 480, hanging: 240 } } } }]
      }]
    },
    sections: [{
      properties: {
        page: { margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } }
      },
      children: [
        new Paragraph({
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: title, bold: true, size: 40, color: '12304F' })]
        }),
        ...elements
      ]
    }]
  })

  const buffer = await Packer.toBuffer(doc)
  writeFileSync(docxPath, buffer)
  console.log(`✓ ${docxPath}`)
}

const files = [
  { md: 'docs/MANUAL_DOCENTE.md', docx: 'docs/MANUAL_DOCENTE.docx', title: 'Manual del Docente — ANTIVIRUS ADN' },
  { md: 'docs/MANUAL_ESTUDIANTE.md', docx: 'docs/MANUAL_ESTUDIANTE.docx', title: 'Manual del Estudiante — ANTIVIRUS ADN' }
]

for (const f of files) {
  await convertMdToDocx(f.md, f.docx, f.title)
}
