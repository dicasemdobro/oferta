'use client'
import { useEffect, useRef, useState } from 'react'

const APP_URL = 'https://app.dicasemdobro.com.br'

function fbq(event, params) {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, params || {})
}

function CTAButton({ label, text = 'GARANTIR POR R$89,90 AGORA', sub }) {
  return (
    <a href={APP_URL} target="_blank" rel="noopener noreferrer"
      onClick={() => fbq('InitiateCheckout', { content_name: label, value: 89.90, currency: 'BRL' })}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 3, background: '#1DB954', color: '#fff',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(1.15rem, 5vw, 1.35rem)', letterSpacing: '0.04em',
        padding: '17px 24px', borderRadius: 14, textDecoration: 'none', width: '100%',
        boxShadow: '0 3px 14px rgba(29,185,84,0.3)',
      }}>
      {text}
      {sub && <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 600, opacity: 0.8, letterSpacing: '0.02em', textTransform: 'none' }}>{sub}</span>}
    </a>
  )
}

function PriceStrip() {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <div style={{ flex: 1, borderRadius: 12, padding: '14px 12px', textAlign: 'center', background: 'linear-gradient(135deg,rgba(29,185,84,0.18),rgba(29,185,84,0.06))', border: '1.5px solid rgba(29,185,84,0.45)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#1DB954', borderRadius: 100, padding: '2px 10px', fontSize: '0.58rem', fontWeight: 800, color: 'white', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>🔥 SÓ HOJE</div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', marginBottom: 4, marginTop: 8 }}>pelo site</p>
        <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.9rem,8vw,2.6rem)', color: '#fff', lineHeight: 1 }}>R$89,90</p>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem', marginTop: 3 }}>pagamento único via Pix</p>
      </div>
      <div style={{ flex: 1, borderRadius: 12, padding: '14px 12px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', marginBottom: 4 }}>depois sobe para</p>
        <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.9rem,8vw,2.6rem)', color: 'rgba(255,255,255,0.35)', lineHeight: 1, textDecoration: 'line-through', textDecorationColor: '#E33E33', textDecorationThickness: 3 }}>R$129,90</p>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', marginTop: 3 }}>pagamento único</p>
      </div>
    </div>
  )
}

function Countdown() {
  const [mounted, setMounted] = useState(false)
  const [t, setT] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    setMounted(true)
    function calc() {
      // Calcula dinamicamente: amanhã às 23:59:59 no horário do usuário
      const now = new Date()
      const end = new Date(now)
      end.setDate(end.getDate() + 1)
      end.setHours(23, 59, 59, 0)
      const diff = Math.max(0, end.getTime() - now.getTime())
      setT({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return null

  const blocks = [
    { v: String(t.h).padStart(2,'0'), l: 'horas' },
    { v: String(t.m).padStart(2,'0'), l: 'min' },
    { v: String(t.s).padStart(2,'0'), l: 'seg' },
  ]

  return (
    <div style={{ textAlign: 'center', padding: '4px 0' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>⏳ OFERTA ENCERRA EM</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        {blocks.map((b, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              background: 'rgba(227,62,51,0.15)',
              border: '1.5px solid rgba(227,62,51,0.5)',
              borderRadius: 10, padding: '10px 16px',
              minWidth: 60, textAlign: 'center',
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 'clamp(1.9rem,7vw,2.8rem)',
              color: '#E33E33', lineHeight: 1,
            }}>{b.v}</div>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 5 }}>{b.l}</span>
          </div>
        ))}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', marginTop: 10 }}>Oferta encerra amanhã às 23:59</p>
    </div>
  )
}

function EconomyBar({ label, economia, max }) {
  const pct = Math.round((economia/max)*100)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{label}</span>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.95rem', color: '#FFD700' }}>~R${economia}</span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 100, height: 8, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 100, background: 'linear-gradient(90deg,#1DB954,#FFD700)', width: visible ? `${pct}%` : '0%', transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '16px 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, color: 'white', fontFamily: 'Inter,sans-serif', fontWeight: 700, fontSize: '0.88rem', lineHeight: 1.4 }}>
        <span>{q}</span>
        <span style={{ flexShrink: 0, width: 22, height: 22, border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#FFD700', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s ease' }}>+</span>
      </button>
      {open && <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.6, paddingBottom: 16 }}>{a}</p>}
    </div>
  )
}

function useScrollTracking() {
  const fired = useRef({})
  useEffect(() => {
    const h = () => {
      const pct = Math.round(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100)
      ;[25,50,75,90].forEach(d => { if (pct >= d && !fired.current[d]) { fired.current[d] = true; fbq('ScrollDepth', { depth: d }) } })
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
}

const PARTNERS = [
  { img: '/images/rest-borelli.webp', logo: '/images/rest-borelli-logo.webp', name: 'Gelato Borelli', cat: 'Gelato & Sobremesas', benefit: 'Na compra de um Milkshake G, ganhe outro de igual ou menor valor.' },
  { img: '/images/rest-cocobambu.webp', logo: '/images/rest-cocobambu-logo.webp', name: 'Coco Bambu', cat: 'Frutos do Mar', benefit: 'Na compra de uma isca de peixe ou camarão à milanesa, ganhe outra de menor ou igual valor.' },
  { img: '/images/rest-nugrill.webp', logo: '/images/rest-nugrill-logo.webp', name: 'Nugrill Burger', cat: 'Hambúrguer artesanal', benefit: 'Na compra de um Nuhavaí, ganhe outro de igual ou menor valor.' },
  { img: '/images/rest-harushi.webp', logo: '/images/rest-harushi-logo.webp', name: 'Harushi Oriental', cat: 'Japonesa premium', benefit: 'Na compra de um combo (15 peças), ganhe outro de igual ou menor valor.' },
  { img: '/images/rest-jazz.webp', logo: '/images/rest-jazz-logo.webp', name: 'Jazz Cozinha', cat: 'Contemporânea', benefit: 'Compre um prato principal e ganhe outro de igual ou menor valor.' },
]

const FAQS = [
  { q: 'Posso usar o mesmo restaurante várias vezes?', a: 'Não. Cada voucher pode ser utilizado apenas uma vez por estabelecimento. Mas atenção: alguns parceiros disponibilizaram mais de uma oferta no app!' },
  { q: 'Vale para delivery?', a: 'Neste momento, não. Os benefícios são válidos apenas presencialmente. Alguns parceiros oferecem retirada no local via WhatsApp — o botão aparece dentro do app.' },
  { q: 'Como faço o resgate do voucher?', a: 'Escolha o restaurante no app, vá até o local respeitando os horários, avise o atendente que veio pelo Dicas em Dobro, e clique em "Resgatar Voucher" na presença dele.' },
  { q: 'Funciona todos os dias?', a: 'Cada restaurante define seus próprios dias e horários. Tudo visível dentro do aplicativo antes de você ir.' },
  { q: 'Até quando posso usar?', a: 'Seu acesso é válido até 10 de abril de 2027. Tempo de sobra para aproveitar dezenas de experiências.' },
  { q: 'Por que comprar pelo site e não pelo app?', a: 'Pelo site você paga R$89,90. Pelo app pagaria R$129,90 — a Apple e o Google ficam com a diferença. Após a compra, é só baixar o app e fazer login com o mesmo e-mail.' },
  { q: 'Onde vejo todos os restaurantes participantes?', a: 'Dentro do aplicativo! Novos parceiros são anunciados diariamente no nosso Instagram @dicasemdobro.rp. São mais de 60 estabelecimentos confirmados.' },
]

const ECONOMY = [
  { label: 'Outback Steak House', economia: 120 },
  { label: 'Coco Bambu', economia: 90 },
  { label: 'Harushi Oriental', economia: 85 },
  { label: 'Nugrill Burger', economia: 60 },
  { label: 'Gelato Borelli', economia: 40 },
]


/* ── VIMEO LAZY LOAD 9:16 ── */
function LazyVimeo() {
  const ref = useRef(null)
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setLoad(true); obs.disconnect() }
    }, { threshold: 0.1, rootMargin: '150px' })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', marginBottom: 24, background: '#061220', position: 'relative', maxWidth: '100%' }}>
      <div style={{ paddingBottom: '177.78%', position: 'relative' }}>
        {load ? (
          <iframe
            src="https://player.vimeo.com/video/1197527843?badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="Dicas em Dobro — Como usar"
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.4rem', marginLeft: 4 }}>▶</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem' }}>Toque para carregar o vídeo</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── BOTÕES FLUTUANTES WhatsApp + Instagram ── */
function FloatingButtons() {
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 16, zIndex: 1000,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {/* WhatsApp */}
      <a
        href="https://wa.me/5517991168922"
        target="_blank"
        rel="noopener noreferrer"
        title="Fale no WhatsApp"
        style={{
          width: 50, height: 50, borderRadius: '50%',
          background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37,211,102,0.5)',
          textDecoration: 'none', fontSize: '1.4rem',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.847L.057 23.882l6.204-1.629A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.51-5.168-1.4l-.371-.22-3.844 1.009 1.03-3.751-.242-.386A9.934 9.934 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>
      {/* Instagram */}
      <a
        href="https://www.instagram.com/dicasemdobro.rp"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
        style={{
          width: 50, height: 50, borderRadius: '50%',
          background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(220,39,67,0.45)',
          textDecoration: 'none',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      </a>
    </div>
  )
}

export default function Home() {
  useScrollTracking()
  return (
    <main style={{ maxWidth: 480, margin: '0 auto' }}>

      {/* LÂMINA 1 — HERO */}
      <section style={{ padding: '24px 20px 28px', background: '#07182a' }}>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(227,62,51,0.15)', border: '1px solid rgba(227,62,51,0.45)', borderRadius: 100, padding: '5px 14px', color: '#ff7a72', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', animation: 'blink 2s ease infinite' }}>🔥 HOJE É O ÚLTIMO DIA PELO MENOR PREÇO</span>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.4rem,10vw,3.8rem)', lineHeight: 0.95, letterSpacing: '0.01em', color: 'white', textAlign: 'center', marginBottom: 14 }}>
          COMPRE 1 PRATO<br /><span style={{ color: '#FFD700' }}>GANHE OUTRO</span><br />DE GRAÇA
        </h1>
        <div style={{ marginBottom: 14 }}><Countdown /></div>
        <div style={{ marginBottom: 14 }}>
          <CTAButton label="hero-top" text="GARANTIR POR R$89,90 AGORA" sub="De R$129,90 · Só hoje · Pagamento via Pix" />
        </div>
        <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', marginBottom: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
          <img src="/images/hero.webp" alt="Dicas em Dobro" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 275 }} loading="eager" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,24,42,0.65) 0%, rgba(7,24,42,0.1) 60%, transparent 100%)' }} />


        </div>
        <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
          <img src="/images/hero-banner.webp" alt="+60 restaurantes · +R$3.000 · Sorteio iPhone 17e" style={{ width: '100%', display: 'block' }} loading="eager" />
        </div>
        <PriceStrip />
        <div style={{ marginTop: 14 }}>
          <CTAButton label="hero" text="GARANTIR POR R$89,90 AGORA" sub="De R$129,90 · Só hoje · Pagamento via Pix" />
        </div>
      </section>

      {/* LÂMINA 2 — COMO COMPRAR */}
      <section style={{ padding: '40px 20px', background: '#0a1f35', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ color: '#FFD700', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>⚠️ ATENÇÃO</p>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.8rem,7vw,2.8rem)', letterSpacing: '0.02em', lineHeight: 1.05, marginBottom: 8 }}>COMPRE PELO SITE,<br /><span style={{ color: '#FFD700' }}>NÃO PELO APP</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.55 }}>Pelo site você paga <strong style={{ color: 'white' }}>R$89,90</strong>. Pelo app você pagaria R$129,90.<br />Assista e veja como é simples:</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: 12, padding: '10px 14px', marginBottom: 16 }}>
          <span style={{ fontSize: '1.1rem' }}>🏆</span>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.95rem', color: '#FFD700', letterSpacing: '0.04em', lineHeight: 1 }}>CONCORRA A UM iPHONE 17e</p>
        </div>
        <LazyVimeo />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            { n: '1', t: 'Acesse o site', d: 'Toque aqui para abrir o site do app.', link: true },
            { n: '2', t: 'Crie sua conta', d: 'Cadastre seu e-mail e senha. Leva menos de 1 minuto.', link: false },
            { n: '3', t: 'Escolha o plano', d: 'Selecione o Passe Anual por R$89,90.', link: false },
            { n: '4', t: 'Finalize pelo Pix', d: 'Pague via Pix e tenha acesso imediato.', link: false },
            { n: '5', t: 'Baixe o app e use', d: 'Entre com o mesmo e-mail. Todos os benefícios liberados.', link: false },
          ].map((s, i) => {
            const inner = (
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: s.link ? 'rgba(29,185,84,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${s.link ? 'rgba(29,185,84,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 12, padding: '13px 14px' }}>
                <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: s.link ? '#1DB954' : '#1a3a5c', color: 'white', fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.n}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.88rem', color: s.link ? '#1DB954' : 'white', marginBottom: 3 }}>{s.t}{s.link ? ' →' : ''}</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.76rem', lineHeight: 1.45 }}>{s.d}</p>
                </div>
              </div>
            )
            return s.link ? <a key={i} href={APP_URL} target="_blank" rel="noopener noreferrer" onClick={() => fbq('InitiateCheckout', { content_name: 'step1', value: 89.90, currency: 'BRL' })} style={{ textDecoration: 'none' }}>{inner}</a> : <div key={i}>{inner}</div>
          })}
        </div>
        <CTAButton label="como-comprar" text="QUERO COMPRAR POR R$89,90" sub="Abre o site do app · Só hoje nesse preço" />
      </section>

      {/* LÂMINA 3 — ECONOMIA */}
      <section style={{ padding: '40px 20px', background: '#07182a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>A MATEMÁTICA QUE FECHA A CONTA</p>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.8rem,7vw,2.8rem)', letterSpacing: '0.02em', lineHeight: 1.05, textAlign: 'center', marginBottom: 6 }}>USE UMA VEZ.<br /><span style={{ color: '#FFD700' }}>JÁ PAGOU.</span></h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: 16 }}>Economia estimada por restaurante, em média por casal.</p>
        <div style={{ textAlign: 'center', marginBottom: 28, background: 'linear-gradient(135deg,rgba(29,185,84,0.12),rgba(29,185,84,0.04))', border: '1px solid rgba(29,185,84,0.3)', borderRadius: 12, padding: '14px 16px' }}>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.3rem,5vw,1.7rem)', color: '#1DB954', letterSpacing: '0.03em', lineHeight: 1.2 }}>Em 4 saídas você já economiza</p>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2rem,8vw,2.8rem)', color: '#FFD700', letterSpacing: '0.02em', lineHeight: 1 }}>R$300,00</p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginTop: 4 }}>e o passe custou apenas R$89,90</p>
        </div>
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: 4 }}>
          <img src="/images/economia-parceiros.webp" alt="Quanto você economiza por restaurante" style={{ width: '100%', display: 'block' }} loading="lazy" />
        </div>
        <div style={{ marginTop: 20 }}><CTAButton label="economia" text="GARANTIR MEU PASSE AGORA" sub="Válido até 10/04/2027 · Pagamento único" /></div>
      </section>

      {/* LÂMINA 4 — PARCEIROS */}
      <section style={{ padding: '40px 0 32px', background: '#061220', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ padding: '0 20px', marginBottom: 20, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>+60 CONFIRMADOS</p>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.8rem,7vw,2.6rem)', letterSpacing: '0.02em', lineHeight: 1.05 }}>VOCÊ JÁ CONHECE<br /><span style={{ color: '#FFD700' }}>MUITOS DELES.</span></h2>
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 12, paddingLeft: 20, paddingRight: 20, scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {PARTNERS.map((r, i) => (
            <div key={i} style={{ flex: '0 0 72vw', maxWidth: 280, scrollSnapAlign: 'start', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.5)', background: '#0d2137' }}>
              <div style={{ position: 'relative', paddingBottom: '60%' }}>
                <img src={r.img} alt={r.name} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 100%)' }} />
                <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(29,185,84,0.9)', borderRadius: 100, padding: '2px 8px', fontSize: '0.56rem', fontWeight: 800, color: 'white' }}>PARCEIRO</div>
              </div>
              <div style={{ padding: '12px 14px 14px' }}>
                <div style={{ marginBottom: 8 }}>
                  <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'white', lineHeight: 1.2 }}>{r.name}</p>
                  <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)' }}>{r.cat}</p>
                </div>
                <div style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: 8, padding: '8px 10px' }}>
                  <p style={{ fontSize: '0.67rem', color: '#FFD700', lineHeight: 1.45, fontWeight: 600 }}>🎁 {r.benefit}</p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ flex: '0 0 50vw', maxWidth: 190, scrollSnapAlign: 'start', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, textAlign: 'center', minHeight: 200 }}>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.8rem', color: '#FFD700', lineHeight: 1.1, marginBottom: 8 }}>+55<br />outros</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', lineHeight: 1.4 }}>Outback, Raizal, El Santo e muito mais</p>
          </div>
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: '0.62rem', marginTop: 8, marginBottom: 20 }}>← arraste para ver mais →</p>
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {['Outback','Coco Bambu','Bonsai','Fifty2','El Santo','Raizal','Brasaria','Yakiniku','Belzebeer','Tom Nosso','Prozaria','Lugano','Universo Ozzy','Makisu Prime','Jazz','Harushi','+ outros'].map((n, i) => (
              <span key={i} style={{ background: i===16 ? 'rgba(29,185,84,0.12)' : 'rgba(255,255,255,0.05)', border: `1px solid ${i===16 ? 'rgba(29,185,84,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 6, padding: '4px 10px', fontSize: '0.72rem', fontWeight: 600, color: i===16 ? '#1DB954' : 'rgba(255,255,255,0.55)' }}>{n}</span>
            ))}
          </div>
          <CTAButton label="parceiros" text="VER TODOS NO APP" sub="Acesso imediato após a compra" />
        </div>
      </section>

      {/* LÂMINA 5 — SORTEIO */}
      <section style={{ padding: '40px 20px', background: '#07182a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: 100, padding: '4px 14px', fontSize: '0.66rem', fontWeight: 700, color: '#FFD700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>🏆 BÔNUS EXCLUSIVO DO LANÇAMENTO</span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.4rem,10vw,3.6rem)', letterSpacing: '0.02em', lineHeight: 0.95, marginBottom: 12 }}>COMPRE HOJE E<br />CONCORRA A UM<br /><span style={{ color: '#FFD700' }}>iPHONE 17e</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.84rem', lineHeight: 1.55 }}>Todo cliente que comprar o passe é cadastrado automaticamente no sorteio.</p>
        </div>
        <div style={{ maxWidth: 400, margin: '0 auto 24px', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
          <img src="/images/sorteio-iphone.webp" alt="Sorteio iPhone 17e" style={{ width: '100%', display: 'block' }} loading="lazy" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {['✅ Compre o passe hoje (qualquer horário)','✅ Cadastro automático — sem formulário extra','✅ Resultado divulgado em nossas redes sociais'].map((item, i) => (
            <p key={i} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', lineHeight: 1.4 }}>{item}</p>
          ))}
        </div>
        <CTAButton label="sorteio" text="QUERO COMPRAR E CONCORRER" sub="Compre hoje e entre no sorteio automaticamente" />
      </section>

      {/* LÂMINA 6 — FAQ */}
      <section style={{ padding: '40px 20px', background: '#0a1f35', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>TUDO QUE VOCÊ PRECISA SABER</p>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.8rem,7vw,2.4rem)', letterSpacing: '0.02em', lineHeight: 1.05, textAlign: 'center', marginBottom: 24 }}>PRINCIPAIS<br /><span style={{ color: '#FFD700' }}>DÚVIDAS</span></h2>
        {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        <div style={{ marginTop: 28 }}><CTAButton label="faq" text="⏰ ÚLTIMAS HORAS PELO MELHOR VALOR DO ANO" sub="Acesso imediato · Pagamento via Pix" /></div>
      </section>

      {/* LÂMINA 7 — CTA FINAL */}
      <section style={{ padding: '40px 20px 52px', background: '#07182a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(227,62,51,0.15)', border: '1px solid rgba(227,62,51,0.4)', borderRadius: 100, padding: '5px 14px', marginBottom: 18, color: '#ff7a72', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', animation: 'blink 2s ease infinite' }}>⏰ ÚLTIMA CHANCE</span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.2rem,9vw,3.4rem)', letterSpacing: '0.02em', lineHeight: 0.95, marginBottom: 14 }}>AMANHÃ<br />O PREÇO <span style={{ color: '#E33E33' }}>SOBE.</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 24 }}>Hoje é R$89,90. Amanhã o valor sobe.<br />Quem entrou primeiro, pagou menos.</p>
        </div>
        <div style={{ marginBottom: 24 }}><Countdown /></div>
        <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          <img src="/images/final-cta.webp" alt="Dicas em Dobro" style={{ width: '100%', display: 'block' }} loading="lazy" />
        </div>
        <div style={{ borderRadius: 16, padding: '22px 18px', marginBottom: 20, background: 'linear-gradient(135deg,rgba(29,185,84,0.1),rgba(29,185,84,0.03))', border: '1.5px solid rgba(29,185,84,0.28)', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginBottom: 6 }}>Preço de hoje — compre pelo site</p>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(3rem,12vw,4rem)', color: 'white', lineHeight: 1 }}>R$89,90</p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', marginTop: 6 }}>Pagamento via Pix · Acesso imediato · Válido até 10/04/2027</p>
          <div style={{ margin: '14px 0', display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {['✅ +60 restaurantes','✅ +R$3.000 em benefícios','✅ Concorre ao iPhone 17e'].map((b, i) => (
              <span key={i} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.73rem' }}>{b}</span>
            ))}
          </div>
        </div>
        <CTAButton label="final" text="QUERO MEU PASSE POR R$89,90" sub="De R$129,90 · Acesso imediato · Pague via Pix" />
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.18)', fontSize: '0.62rem', marginTop: 10 }}>Pagamento 100% seguro · Acesso imediato · iPhone e Android</p>
      </section>

      <footer style={{ padding: '20px', background: '#040d18', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
          <img src="/images/logo.webp" alt="Dicas em Dobro" style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', padding: 2 }} />
          <a href="https://www.instagram.com/dicasemdobro.rp" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textDecoration: 'none' }}>@dicasemdobro.rp</a>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.62rem' }}>© 2025 Dicas em Dobro · São José do Rio Preto · SP</p>
        <p style={{ color: 'rgba(255,255,255,0.08)', fontSize: '0.58rem', marginTop: 4 }}>Sorteio sujeito a regulamento. Imagens meramente ilustrativas.</p>
      </footer>

      <FloatingButtons />
    </main>
  )
}
