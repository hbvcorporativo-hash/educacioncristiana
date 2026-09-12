#!/usr/bin/env python3
import asyncio
import ast
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'lib' / 'mensajes.js'
OUTPUT = ROOT / 'public' / 'voces'
VOICES = {
    'leo': ('es-US-AlonsoNeural', '+5%', '+0Hz'),
    'sara': ('es-US-PalomaNeural', '+5%', '+0Hz'),
}


def mensajes():
    contenido = DATA.read_text(encoding='utf-8')
    inicio = contenido.index('export const VOCES = {')
    fin = contenido.index('\n}', inicio)
    bloque = contenido[inicio:fin]
    resultado = {}
    for linea in bloque.splitlines()[1:]:
        linea = linea.strip().rstrip(',')
        if not linea:
            continue
        clave, texto = linea.split(': ', 1)
        resultado[clave.strip("'")] = ast.literal_eval(texto)
    return resultado


def texto_para(agente, texto):
    if agente == 'sara':
        return texto.replace('Leo', 'Sara').replace('aliado', 'aliada')
    texto = texto.replace('hackear', 'jaquear')
    return texto


async def generar(destino, texto, voz, ritmo, tono):
    destino.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile(suffix='.mp3', delete=False) as temporal:
        bruto = Path(temporal.name)
    try:
        comunicador = edge_tts.Communicate(texto, voz, rate=ritmo, pitch=tono)
        await comunicador.save(str(bruto))
        subprocess.run([
            'ffmpeg', '-y', '-i', str(bruto), '-ac', '2', '-ar', '44100',
            '-c:a', 'libmp3lame', '-b:a', '128k', str(destino),
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    finally:
        bruto.unlink(missing_ok=True)


async def main():
    if shutil.which('ffmpeg') is None:
        sys.exit('ffmpeg no está instalado')
    contenido = mensajes()
    for agente, (voz, ritmo, tono) in VOICES.items():
        for clave, texto in contenido.items():
            print(f'Generando {agente}/{clave}.mp3')
            await generar(
                OUTPUT / agente / f'{clave}.mp3',
                texto_para(agente, texto), voz, ritmo, tono,
            )


if __name__ == '__main__':
    asyncio.run(main())
