'use client'

export default function Obrigado() {
  return (
    <main style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
      <img src="/images/logo.webp" alt="Dicas em Dobro" style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', padding: 4, marginBottom: 24 }} />
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem,9vw,3rem)', letterSpacing: '0.02em', marginBottom: 12 }}>
        COMPRA <span style={{ color: '#FFD700' }}>CONFIRMADA!</span>
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 28 }}>
        Bem-vindo ao Dicas em Dobro! 🎉<br />
        Baixe o app, faça login com o mesmo e-mail e comece a aproveitar os +60 restaurantes parceiros.
      </p>
      <a
        href="https://app.dicasemdobro.com.br"
        style={{
          display: 'block', background: '#E33E33', color: 'white',
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem', letterSpacing: '0.04em',
          padding: '16px 24px', borderRadius: 12, textDecoration: 'none', width: '100%',
          marginBottom: 16,
        }}
      >
        ACESSAR O APP AGORA
      </a>
      <a href="https://www.instagram.com/dicasemdobro.rp" target="_blank" rel="noopener noreferrer"
        style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', textDecoration: 'none' }}>
        @dicasemdobro.rp
      </a>
    </main>
  )
}
