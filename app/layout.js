import { Bebas_Neue, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Dicas em Dobro — Baixe o App',
  description: 'Compre 1 prato, ganhe outro de graça em +60 restaurantes em Rio Preto.',
  openGraph: {
    title: 'Dicas em Dobro — Baixe o App',
    description: 'Compre 1 prato, ganhe outro de graça em +60 restaurantes em Rio Preto.',
    images: ['/banner.webp'],
  },
}

const META_PIXEL_ID = '1127780420422737'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${inter.variable}`}>
      <head>
        {/* Meta Pixel noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body>
        {/* Meta Pixel Script — afterInteractive para não bloquear render */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${META_PIXEL_ID}');
            fbq('track','PageView');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
