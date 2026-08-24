import './globals.css'
import { publicAsset } from '@/lib/assets'

export const metadata = {
  title: 'ANTIVIRUS ADN · Identidad en Cristo',
  description: 'Recupera tu identidad en Cristo',
  icons: { icon: publicAsset('/favicon.png') }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
