'use client'
import { useEffect, useRef, useState } from 'react'

const APP_URL = 'https://app.dicasemdobro.com.br'

function fbq(event, params) {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, params || {})
}

/* ── BOTÃO VERDE (sem glow excessivo) ── */
function CTAButton({ label, text = 'GARANTIR POR R$89,90 AGORA', sub }) {
  return (
    <a
      href={APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => fbq('InitiateCheckout', { content_name: label, value: 89.90, currency: 'BRL' })}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 3, background: '#1DB954', color: '#fff',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(1.15rem, 5vw, 1.35rem)',
        letterSpacing: '0.04em',
        padding: '17px 24px', borderRadius: 14,
        textDecoration: 'none', width: '100%',
        boxShadow: '0 3px 14px rgba(29,185,84,0.3)',
        transition: 'opacity 0.2s',
      }}
    >
      {text}
      {sub && (
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.62rem',
          fontWeight: 600, opacity: 0.8, letterSpacing: '0.02em', textTransform: 'none',
        }}>{sub}</span>
      )}
    </a>
  )
}

/* ── PRICE STRIP ── */
function PriceStrip() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
      <div style={{
        flex: 1, borderRadius: 12, padding: '14px 12px', textAlign: 'center',
        background: 'linear-gradient(135deg,rgba(29,185,84,0.18),rgba(29,185,84,0.06))',
        border: '1.5px solid rgba(29,185,84,0.45)', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
          background: '#1DB954', borderRadius: 100, padding: '2px 10px',
          fontSize: '0.58rem', fontWeight: 800, color: 'white',
          letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>🔥 SÓ HOJE</div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', marginBottom: 4, marginTop: 8 }}>pelo site</p>
        <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.9rem,8vw,2.6rem)', color: '#fff', lineHeight: 1, letterSpacing: '0.02em' }}>R$89,90</p>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem', marginTop: 3 }}>pagamento único</p>
      </div>
      <div style={{
        flex: 1, borderRadius: 12, padding: '14px 12px', textAlign: 'center',
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', marginBottom: 4 }}>depois sobe para</p>
        <p style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(1.9rem,8vw,2.6rem)',
          color: 'rgba(255,255,255,0.35)', lineHeight: 1, letterSpacing: '0.02em',
          textDecoration: 'line-through', textDecorationColor: '#E33E33', textDecorationThickness: 3,
        }}>R$129,90</p>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', marginTop: 3 }}>pagamento único</p>
      </div>
    </div>
  )
}

/* ── COUNTDOWN até 03/06 às 10h ── */
function Countdown() {
  const target = new Date('2025-06-03T10:00:00-03:00').getTime()

  function calc() {
    const diff = Math.max(0, target - Date.now())
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
      done: diff <= 0,
    }
  }

  const [t, setT] = useState(calc())
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  const blocks = [
    { v: String(t.d).padStart(2, '0'), l: 'dias' },
    { v: String(t.h).padStart(2, '0'), l: 'horas' },
    { v: String(t.m).padStart(2, '0'), l: 'min' },
    { v: String(t.s).padStart(2, '0'), l: 'seg' },
  ]

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
        ⏳ preço de R$89,90 encerra em
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        {blocks.map((b, i) => (
          <span key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 10, padding: '10px 14px',
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 'clamp(1.8rem,7vw,2.6rem)',
              color: '#FFD700', lineHeight: 1, minWidth: 54, textAlign: 'center',
            }}>{b.v}</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{b.l}</span>
          </span>
        ))}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.6rem', marginTop: 8 }}>
        Oferta encerra em 03/06 às 10h da manhã
      </p>
    </div>
  )
}

/* ── ECONOMY BAR ── */
function EconomyBar({ label, economia, max }) {
  const pct = Math.round((economia / max) * 100)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{label}</span>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.95rem', color: '#FFD700', letterSpacing: '0.03em' }}>~R${economia}</span>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 100, height: 8, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 100,
          background: 'linear-gradient(90deg,#1DB954,#FFD700)',
          width: visible ? `${pct}%` : '0%',
          transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  )
}

/* ── FAQ ITEM ── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '16px 0', cursor: 'pointer', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', gap: 12,
          color: 'white', fontFamily: 'Inter,sans-serif', fontWeight: 700,
          fontSize: '0.88rem', lineHeight: 1.4,
        }}
      >
        <span>{q}</span>
        <span style={{
          flexShrink: 0, width: 22, height: 22,
          border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.85rem', color: '#FFD700',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.25s ease',
        }}>+</span>
      </button>
      {open && (
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.6, paddingBottom: 16 }}>{a}</p>
      )}
    </div>
  )
}

/* ── SCROLL TRACKING ── */
function useScrollTracking() {
  const fired = useRef({})
  useEffect(() => {
    const h = () => {
      const pct = Math.round(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100)
      ;[25, 50, 75, 90].forEach(d => {
        if (pct >= d && !fired.current[d]) { fired.current[d] = true; fbq('ScrollDepth', { depth: d }) }
      })
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
}

const PARTNERS = [
  { img: '/images/rest-cocobambu.webp', name: 'Coco Bambu', cat: 'Frutos do mar', benefit: 'Na compra de uma isca de peixe ou camarão à milanesa, ganhe outra de menor ou igual valor.' },
  { img: '/images/rest-nugrill.webp', name: 'Nugrill Burger', cat: 'Hambúrguer artesanal', benefit: 'Na compra de um Nuhavaí, ganhe outro de igual ou menor valor.' },
  { img: '/images/rest-harushi.webp', name: 'Harushi Oriental', cat: 'Japonesa premium', benefit: 'Na compra de um combo (15 peças), ganhe outro de igual ou menor valor.' },
  { img: '/images/rest-jazz.webp', name: 'Jazz Cozinha', cat: 'Contemporânea', benefit: 'Compre um prato principal e ganhe outro de igual ou menor valor.' },
  { img: '/images/rest-borelli.webp', name: 'Gelato Borelli', cat: 'Gelato & Sobremesas', benefit: 'Na compra de um Milkshake G, ganhe outro de igual ou menor valor.' },
]

const FAQS = [
  { q: 'Posso usar o mesmo restaurante várias vezes?', a: 'Não. Cada voucher pode ser utilizado apenas uma vez por estabelecimento. Mas atenção: alguns parceiros disponibilizaram mais de uma oferta no app!' },
  { q: 'Vale para delivery?', a: 'Neste momento, não. Os benefícios são válidos apenas presencialmente. Alguns parceiros oferecem retirada no local via WhatsApp — o botão aparece dentro do app.' },
  { q: 'Como faço o resgate do voucher?', a: 'Escolha o restaurante no app, vá até o local respeitando os horários, avise o atendente que veio pelo Dicas em Dobro, e clique em "Resgatar Voucher" na presença dele.' },
  { q: 'Funciona todos os dias?', a: 'Cada restaurante define seus próprios dias e horários. Tudo visível dentro do aplicativo antes de você ir.' },
  { q: 'Até quando posso usar?', a: 'Seu acesso é válido até 10 de abril de 2027. Tempo de sobra para aproveitar dezenas de experiências em Rio Preto.' },
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

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
export default function Home() {
  useScrollTracking()

  return (
    <main style={{ maxWidth: 480, margin: '0 auto' }}>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LÂMINA 1 — HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '24px 20px 28px', background: '#07182a' }}>

        {/* Badge urgência — sem logo no topo, economiza espaço */}
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(227,62,51,0.15)', border: '1px solid rgba(227,62,51,0.45)',
            borderRadius: 100, padding: '5px 14px',
            color: '#ff7a72', fontSize: '0.68rem', fontWeight: 800,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            animation: 'blink 2s ease infinite',
          }}>
            🔥 HOJE É O ÚLTIMO DIA PELO MENOR PREÇO
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 'clamp(2.4rem,10vw,3.8rem)',
          lineHeight: 0.95, letterSpacing: '0.01em',
          color: 'white', textAlign: 'center', marginBottom: 14,
        }}>
          COMPRE 1<br />
          <span style={{ color: '#FFD700' }}>GANHE OUTRO</span><br />
          DE GRAÇA
        </h1>

        {/* Banner informativo */}
        <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <img
            src="/images/hero-banner.webp"
            alt="+60 restaurantes · +R$3.000 em benefícios · Sorteio iPhone 17e"
            style={{ width: '100%', display: 'block' }}
            loading="eager"
          />
        </div>

        {/* Price strip */}
        <PriceStrip />

        {/* CTA */}
        <div style={{ marginTop: 14 }}>
          <CTAButton
            label="hero"
            text="GARANTIR POR R$89,90 AGORA"
            sub="Amanhã o preço sobe · Pagamento único · Sem mensalidade"
          />
        </div>

        {/* Hero image com logo overlay no topo esquerdo + badge iPhone */}
        <div style={{ marginTop: 16, borderRadius: 16, overflow: 'hidden', position: 'relative', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
          <img
            src="/images/hero.webp"
            alt="Experiências gastronômicas em Rio Preto"
            style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 300 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,24,42,0.75) 0%, rgba(7,24,42,0.2) 60%, transparent 100%)' }} />

          {/* Logo no topo esquerdo da foto */}
          <div style={{
            position: 'absolute', top: 10, left: 12,
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
            borderRadius: 100, padding: '5px 10px 5px 5px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <img src="/images/logo.webp" alt="Dicas em Dobro" style={{ width: 24, height: 24, borderRadius: '50%', background: 'white', padding: 2 }} />
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em' }}>DICAS EM DOBRO · RIO PRETO</span>
          </div>

          {/* Badge iPhone na parte de baixo */}
          <div style={{
            position: 'absolute', bottom: 12, left: 12, right: 12,
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
            borderRadius: 12, padding: '9px 14px',
            border: '1px solid rgba(255,215,0,0.3)',
          }}>
            <span style={{ fontSize: '1.1rem' }}>🏆</span>
            <div>
              <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '0.95rem', color: '#FFD700', letterSpacing: '0.04em', lineHeight: 1 }}>CONCORRA A UM iPHONE 17e</p>
              <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Exclusivo para quem comprar hoje</p>
            </div>
          </div>
        </div>

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LÂMINA 2 — COMO COMPRAR + COUNTDOWN
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '40px 20px', background: '#0a1f35', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ color: '#FFD700', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>⚠️ ATENÇÃO</p>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.8rem,7vw,2.8rem)', letterSpacing: '0.02em', lineHeight: 1.05, marginBottom: 8 }}>
            COMPRE PELO SITE,<br /><span style={{ color: '#FFD700' }}>NÃO PELO APP</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.55 }}>
            Pelo site você paga <strong style={{ color: 'white' }}>R$89,90</strong>. Pelo app você pagaria R$129,90.<br />
            Assista o vídeo e veja como é simples:
          </p>
        </div>

        {/* Countdown */}
        <div style={{ marginBottom: 28 }}>
          <Countdown />
        </div>

        {/* Vimeo video */}
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', marginBottom: 24 }}>
          <div style={{ padding: '56.25% 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1196995723?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Como comprar pelo site — Dicas em Dobro"
            />
          </div>
        </div>

        {/* Steps — passo 1 clicável */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            { n: '1', t: 'Acesse o site', d: 'Toque aqui para abrir o site do app.', link: true },
            { n: '2', t: 'Crie sua conta', d: 'Cadastre seu e-mail e senha. Rápido, leva 1 minuto.', link: false },
            { n: '3', t: 'Escolha o plano', d: 'Selecione o Passe Anual por R$89,90.', link: false },
            { n: '4', t: 'Finalize o pagamento', d: 'Cartão ou Pix. Acesso liberado na hora.', link: false },
            { n: '5', t: 'Baixe o app e use', d: 'Entre com o mesmo e-mail. Todos os benefícios liberados.', link: false },
          ].map((s, i) => {
            const inner = (
              <div style={{
                display: 'flex', gap: 14, alignItems: 'flex-start',
                background: s.link ? 'rgba(29,185,84,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${s.link ? 'rgba(29,185,84,0.3)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 12, padding: '13px 14px',
              }}>
                <span style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                  background: s.link ? '#1DB954' : '#1a3a5c', color: 'white',
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: '1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{s.n}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.88rem', color: s.link ? '#1DB954' : 'white', marginBottom: 3 }}>
                    {s.t} {s.link ? '→' : ''}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.76rem', lineHeight: 1.45 }}>{s.d}</p>
                </div>
              </div>
            )
            return s.link ? (
              <a key={i} href={APP_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => fbq('InitiateCheckout', { content_name: 'step1', value: 89.90, currency: 'BRL' })}
                style={{ textDecoration: 'none' }}>
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            )
          })}
        </div>

        <CTAButton label="como-comprar" text="QUERO COMPRAR POR R$89,90" sub="Abre o site do app · Só hoje nesse preço" />

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LÂMINA 3 — QUANTO VOCÊ ECONOMIZA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '40px 20px', background: '#07182a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>A MATEMÁTICA QUE FECHA A CONTA</p>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.8rem,7vw,2.8rem)', letterSpacing: '0.02em', lineHeight: 1.05, textAlign: 'center', marginBottom: 6 }}>
          USE UMA VEZ.<br /><span style={{ color: '#FFD700' }}>JÁ PAGOU.</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: 28 }}>
          Economia estimada por restaurante, em média por casal.
        </p>

        {ECONOMY.map((e, i) => (
          <EconomyBar key={i} label={e.label} economia={e.economia} max={130} />
        ))}

        <div style={{
          marginTop: 22, borderRadius: 12, padding: '18px 16px',
          background: 'linear-gradient(135deg,rgba(255,215,0,0.1),rgba(255,215,0,0.04))',
          border: '1px solid rgba(255,215,0,0.25)', textAlign: 'center',
        }}>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.6rem,6vw,2rem)', color: '#FFD700', letterSpacing: '0.03em', lineHeight: 1.1 }}>
            MAIS DE R$3.000<br />
            <span style={{ fontSize: '0.75em', color: 'rgba(255,255,255,0.5)' }}>EM BENEFÍCIOS DURANTE A CAMPANHA</span>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', marginTop: 8 }}>
            Você paga R$89,90 uma vez. O resto é puro lucro.
          </p>
        </div>

        <div style={{ marginTop: 20 }}>
          <CTAButton label="economia" text="GARANTIR MEU PASSE AGORA" sub="Válido até 10/04/2027 · Pagamento único" />
        </div>

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LÂMINA 4 — PARCEIROS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '40px 0 32px', background: '#061220', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

        <div style={{ padding: '0 20px', marginBottom: 20, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>+60 CONFIRMADOS</p>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.8rem,7vw,2.6rem)', letterSpacing: '0.02em', lineHeight: 1.05 }}>
            VOCÊ JÁ CONHECE<br /><span style={{ color: '#FFD700' }}>MUITOS DELES.</span>
          </h2>
        </div>

        {/* Horizontal scroll cards com benefit em caixinha */}
        <div style={{
          display: 'flex', overflowX: 'auto', gap: 10,
          paddingLeft: 20, paddingRight: 20,
          scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
        }}>
          {PARTNERS.map((r, i) => (
            <div key={i} style={{
              flex: '0 0 70vw', maxWidth: 270, scrollSnapAlign: 'start',
              borderRadius: 14, overflow: 'hidden', position: 'relative',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}>
              <div style={{ paddingBottom: '90%', position: 'relative' }}>
                <img src={r.img} alt={r.name} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.3) 50%,transparent 75%)' }} />

                {/* Badge parceiro */}
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  background: 'rgba(29,185,84,0.85)', borderRadius: 100,
                  padding: '2px 8px', fontSize: '0.56rem', fontWeight: 800, color: 'white',
                }}>PARCEIRO</div>

                {/* Info na parte de baixo */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px' }}>
                  <p style={{ fontWeight: 800, fontSize: '0.92rem', color: 'white', lineHeight: 1.2, marginBottom: 2 }}>{r.name}</p>
                  <p style={{ fontSize: '0.63rem', color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>{r.cat}</p>

                  {/* Caixinha do benefício */}
                  <div style={{
                    background: 'rgba(255,215,0,0.12)',
                    border: '1px solid rgba(255,215,0,0.35)',
                    borderRadius: 8, padding: '7px 9px',
                    backdropFilter: 'blur(6px)',
                  }}>
                    <p style={{ fontSize: '0.66rem', color: '#FFD700', lineHeight: 1.45, fontWeight: 600 }}>🎁 {r.benefit}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Card +55 outros */}
          <div style={{
            flex: '0 0 52vw', maxWidth: 200, scrollSnapAlign: 'start', borderRadius: 14,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: 20, textAlign: 'center', minHeight: 200,
          }}>
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.6rem', color: '#FFD700', lineHeight: 1.1, marginBottom: 8 }}>+55<br />outros</p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', lineHeight: 1.4 }}>Outback, Raizal, El Santo e muito mais</p>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: '0.62rem', marginTop: 8, marginBottom: 20 }}>← arraste para ver mais →</p>

        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {['Outback', 'Coco Bambu', 'Bonsai', 'Fifty2', 'El Santo', 'Raizal', 'Brasaria', 'Yakiniku', 'Belzebeer', 'Tom Nosso', 'Prozaria', 'Lugano', 'Universo Ozzy', 'Makisu Prime', 'Jazz', 'Harushi', '+ outros'].map((n, i) => (
              <span key={i} style={{
                background: i === 16 ? 'rgba(29,185,84,0.12)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${i === 16 ? 'rgba(29,185,84,0.3)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 100, padding: '4px 10px',
                fontSize: '0.72rem', fontWeight: 600,
                color: i === 16 ? '#1DB954' : 'rgba(255,255,255,0.55)',
              }}>{n}</span>
            ))}
          </div>
          <CTAButton label="parceiros" text="VER TODOS NO APP" sub="Acesso imediato após a compra" />
        </div>

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LÂMINA 5 — SORTEIO iPHONE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '40px 20px', background: '#07182a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{
            display: 'inline-block', background: 'rgba(255,215,0,0.1)',
            border: '1px solid rgba(255,215,0,0.3)', borderRadius: 100,
            padding: '4px 14px', fontSize: '0.66rem', fontWeight: 700,
            color: '#FFD700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14,
          }}>
            🏆 BÔNUS EXCLUSIVO DO LANÇAMENTO
          </span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.4rem,10vw,3.6rem)', letterSpacing: '0.02em', lineHeight: 0.95, marginBottom: 12 }}>
            COMPRE HOJE E<br />CONCORRA A UM<br /><span style={{ color: '#FFD700' }}>iPHONE 17e</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.84rem', lineHeight: 1.55 }}>
            Todo cliente que comprar o passe é cadastrado automaticamente. Sorteio realizado ao vivo nas nossas redes.
          </p>
        </div>

        <div style={{ maxWidth: 400, margin: '0 auto 24px', borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
          <img
            src="/images/sorteio-iphone.webp"
            alt="Sorteio iPhone 17e Dicas em Dobro"
            style={{ width: '100%', display: 'block' }}
            loading="lazy"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            '✅ Compre o passe hoje (qualquer horário)',
            '✅ Cadastro automático — sem formulário extra',
            '✅ Sorteio ao vivo nas nossas redes sociais',
            '✅ Um iPhone 17e para um morador de Rio Preto',
          ].map((item, i) => (
            <p key={i} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', lineHeight: 1.4 }}>{item}</p>
          ))}
        </div>

        <CTAButton label="sorteio" text="QUERO COMPRAR E CONCORRER" sub="Compre hoje e entre no sorteio automaticamente" />

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LÂMINA 6 — FAQ
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '40px 20px', background: '#0a1f35', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>TUDO QUE VOCÊ PRECISA SABER</p>
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.8rem,7vw,2.4rem)', letterSpacing: '0.02em', lineHeight: 1.05, textAlign: 'center', marginBottom: 24 }}>
          PRINCIPAIS<br /><span style={{ color: '#FFD700' }}>DÚVIDAS</span>
        </h2>

        <div>
          {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>

        <div style={{ marginTop: 28 }}>
          <CTAButton label="faq" text="AINDA TEM DÚVIDA? COMPRE ASSIM MESMO" sub="Acesso imediato · Suporte disponível" />
        </div>

      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LÂMINA 7 — CTA FINAL
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ padding: '40px 20px 52px', background: '#07182a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(227,62,51,0.15)', border: '1px solid rgba(227,62,51,0.4)',
            borderRadius: 100, padding: '5px 14px',
            color: '#ff7a72', fontSize: '0.68rem', fontWeight: 800,
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18,
            animation: 'blink 2s ease infinite',
          }}>
            ⏰ ÚLTIMA CHANCE
          </span>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.2rem,9vw,3.4rem)', letterSpacing: '0.02em', lineHeight: 0.95, marginBottom: 14 }}>
            AMANHÃ<br />O PREÇO <span style={{ color: '#E33E33' }}>SOBE.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 24 }}>
            Hoje é R$89,90. Depois do dia 03/06 às 10h o valor sobe.<br />
            Quem entrou primeiro, pagou menos.
          </p>
        </div>

        {/* Countdown final */}
        <div style={{ marginBottom: 24 }}>
          <Countdown />
        </div>

        <div style={{
          borderRadius: 16, padding: '22px 18px', marginBottom: 20,
          background: 'linear-gradient(135deg,rgba(29,185,84,0.1),rgba(29,185,84,0.03))',
          border: '1.5px solid rgba(29,185,84,0.28)', textAlign: 'center',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', marginBottom: 6 }}>Preço de hoje — compre pelo site</p>
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(3rem,12vw,4rem)', color: 'white', lineHeight: 1, letterSpacing: '0.02em' }}>R$89,90</p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', marginTop: 6 }}>Pagamento único · Sem mensalidade · Válido até 10/04/2027</p>
          <div style={{ margin: '14px 0', display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {['✅ +60 restaurantes', '✅ +R$3.000 em benefícios', '✅ Concorre ao iPhone 17e'].map((b, i) => (
              <span key={i} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.73rem' }}>{b}</span>
            ))}
          </div>
        </div>

        <CTAButton
          label="final"
          text="QUERO MEU PASSE POR R$89,90"
          sub="Clique · Cadastre · Pague · Acesse na hora"
        />

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.18)', fontSize: '0.62rem', marginTop: 10 }}>
          Pagamento 100% seguro · Acesso imediato · iPhone e Android
        </p>

      </section>


      {/* FOOTER */}
      <footer style={{ padding: '20px', background: '#040d18', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
          <img src="/images/logo.webp" alt="Dicas em Dobro" style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', padding: 2 }} />
          <a href="https://www.instagram.com/dicasemdobro.rp" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textDecoration: 'none' }}>
            @dicasemdobro.rp
          </a>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.62rem' }}>© 2025 Dicas em Dobro · São José do Rio Preto · SP</p>
        <p style={{ color: 'rgba(255,255,255,0.08)', fontSize: '0.58rem', marginTop: 4 }}>Sorteio sujeito a regulamento. Imagens meramente ilustrativas.</p>
      </footer>

    </main>
  )
}
