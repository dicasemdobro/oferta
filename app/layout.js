import './globals.css'

export const metadata = {
  title: 'Dicas em Dobro — Compre 1, Ganhe Outro. Só Hoje por R$89,90.',
  description: 'Tour gastronômico em São José do Rio Preto. +60 restaurantes. Mais de R$3.000 em benefícios. Compre pelo site e garanta o menor preço do ano.',
  openGraph: {
    title: 'Dicas em Dobro — Compre 1 e Ganhe Outro 🍔❤️',
    description: 'Só hoje R$89,90. +60 restaurantes em Rio Preto. Concorra a um iPhone 17e.',
    url: 'https://dicasemdobro.com.br',
    siteName: 'Dicas em Dobro',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* ── META PIXEL ── TROQUE pelo seu Pixel ID real */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','SEU_PIXEL_ID_AQUI');
          fbq('track','PageView');
          fbq('track','ViewContent',{content_name:'LP Lancamento Dicas em Dobro'});
        `}} />
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=SEU_PIXEL_ID_AQUI&ev=PageView&noscript=1" />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}
