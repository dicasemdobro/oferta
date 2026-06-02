'use client'
import { useEffect } from 'react'

const FINAL_URL = 'https://app.dicasemdobro.com.br'
const PIXEL_ID = '1127780420422737'

export default function Ir() {
  useEffect(() => {
    // Dispara pixel de Lead — pessoa chegou até aqui, clicou no botão
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Redirecionamento App',
        value: 89.90,
        currency: 'BRL',
      })
    }
    // Redireciona após 3 segundos
    const timer = setTimeout(() => {
      window.location.href = FINAL_URL
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: '#07182a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Logo */}
      <img
        src="/images/logo.webp"
        alt="Dicas em Dobro"
        style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', padding: 4, marginBottom: 32 }}
      />

      {/* Spinner */}
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        border: '4px solid rgba(255,255,255,0.1)',
        borderTop: '4px solid #1DB954',
        animation: 'spin 0.9s linear infinite',
        marginBottom: 32,
      }} />

      {/* Texto */}
      <h1 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(1.6rem, 6vw, 2.2rem)',
        color: '#fff',
        textAlign: 'center',
        letterSpacing: '0.02em',
        lineHeight: 1.2,
        marginBottom: 12,
      }}>
        ESTAMOS TE DIRECIONANDO PARA<br />
        <span style={{ color: '#FFD700' }}>O APP DICAS EM DOBRO</span>
      </h1>

      <p style={{
        color: 'rgba(255,255,255,0.45)',
        fontSize: '0.88rem',
        textAlign: 'center',
        lineHeight: 1.6,
        marginBottom: 28,
        maxWidth: 320,
      }}>
        Aproveite o menor preço do ano.<br />
        Você será redirecionado em instantes.
      </p>

      {/* Barra de progresso */}
      <div style={{
        width: '100%', maxWidth: 300,
        height: 4, background: 'rgba(255,255,255,0.08)',
        borderRadius: 100, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #1DB954, #FFD700)',
          borderRadius: 100,
          animation: 'progress 3s linear forwards',
        }} />
      </div>

      <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', marginTop: 12 }}>
        Redirecionando em 3 segundos...
      </p>

      {/* Link direto caso não redirecione */}
      <a
        href={FINAL_URL}
        style={{
          marginTop: 32,
          color: '#1DB954',
          fontSize: '0.8rem',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
        }}
      >
        Clique aqui se não for redirecionado
      </a>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600&display=swap');
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </main>
  )
}
