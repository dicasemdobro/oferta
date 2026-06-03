import { Bebas_Neue, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata = {
  title: 'Dicas em Dobro — Baixe o App',
  description: 'Compre 1 prato, ganhe outro de graça em +60 restaurantes em Rio Preto.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${inter.variable}`}>
      <body>
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','1127780420422737');
          fbq('track','PageView');
        `}</Script>
        {children}
      </body>
    </html>
  )
}
