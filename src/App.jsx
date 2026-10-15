import { useEffect, useRef, useState } from 'react'

import closeup from './assets/lash-closeup.webp'
import greenEyes from './assets/lash-green-eyes.jpg'
import collage from './assets/lash-collage.webp'
import classic from './assets/lash-classic.jpg'
import whiteTips from './assets/lash-white-tips.webp'
import clusterArt from './assets/lash-cluster-art.webp'

const PHONE_DISPLAY = '+234 813 629 6149'
const PHONE_TEL = '+2348136296149'
const ADDRESS = 'LASU, Ojo, Lagos State, Nigeria'
const wa = (text) => `https://wa.me/2348136296149?text=${encodeURIComponent(text)}`
const BOOK_MSG = 'Hello ClusterLashTech, I would like to book a lash appointment'

/* Shared responsive classes */
const WRAP = 'mx-auto w-full max-w-7xl 2xl:max-w-[88rem] px-4 sm:px-6 lg:px-8'
const H2 = 'font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl'

/* Extra animation + polish. Self-contained so the file drops in without touching your CSS. */
const EXTRA_CSS = `
html{scroll-behavior:smooth}
@keyframes lt-draw{to{stroke-dashoffset:0}}
.lt-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:lt-draw 1.4s .9s cubic-bezier(.65,0,.35,1) forwards}
@keyframes lt-spin{to{transform:rotate(360deg)}}
.lt-spin{animation:lt-spin 48s linear infinite}
@keyframes lt-twinkle{0%,100%{opacity:.15;transform:scale(.7)}50%{opacity:1;transform:scale(1.15)}}
.lt-twinkle{animation:lt-twinkle 3.2s ease-in-out infinite}
@keyframes lt-ping{0%{transform:scale(1);opacity:.5}80%,100%{transform:scale(1.7);opacity:0}}
.lt-ping{animation:lt-ping 2.4s cubic-bezier(0,0,.2,1) infinite}
@keyframes lt-drop{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.lt-drop{animation:lt-drop .25s ease-out}
@keyframes lt-fade{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
.lt-fade{animation:lt-fade .3s ease-out}
.lt-sheen{position:relative;overflow:hidden}
.lt-sheen::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.4) 50%,transparent 70%);transform:translateX(-120%);transition:transform .7s ease}
.lt-sheen:hover::after{transform:translateX(120%)}
.lt-marquee:hover .animate-marquee{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .lt-spin,.lt-twinkle,.lt-ping,.lt-drop,.lt-fade{animation:none}
  .lt-draw{animation:none;stroke-dashoffset:0}
  .lt-sheen::after{display:none}
}
`

/* ---------- helpers ---------- */
function Reveal({ as: Tag = 'div', variant = 'reveal', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`${variant} ${shown ? 'show' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

function Img({ src, alt, className = '', eager = false }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
      draggable={false}
      className={`h-full w-full select-none object-cover ${className}`}
    />
  )
}

const WhatsAppIcon = ({ className = 'h-5 w-5' }) => (
  <svg className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.7a12 12 0 0 0 5.7 1.4c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.800 9.800 0 0 1 2.200 12C2.200 6.600 6.600 2.200 12 2.200S21.800 6.600 21.800 12 17.400 21.700 12 21.700zm5.400-7.300c-.3-.1-1.800-.9-2-1s-.5-.1-.7.1-.8 1-1 1.200-.4.200-.7.100a8 8 0 0 1-4-3.500c-.3-.5.300-.5.900-1.600.1-.2 0-.4 0-.5l-.9-2.200c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1 1-1 2.500s1.100 2.900 1.200 3.100c.1.200 2.100 3.200 5.100 4.500 1.900.8 2.600.9 3.600.7.600-.1 1.800-.7 2-1.400.3-.7.300-1.300.2-1.400-.1-.1-.3-.2-.6-.3z" />
  </svg>
)

const Eyebrow = ({ children, light }) => (
  <p className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] sm:text-xs ${light ? 'text-gold-300' : 'text-gold-600'}`}>
    <span className={`h-px w-8 ${light ? 'bg-gold-300' : 'bg-gold-600'}`} />
    {children}
  </p>
)

/* ---------- nav ---------- */
const links = [
  ['Services', '#services', 'services'],
  ['Gallery', '#gallery', 'gallery'],
  ['Process', '#process', 'process'],
  ['Contact', '#contact', 'contact'],
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const bar = useRef(null)

  // Scroll state + progress bar
  useEffect(() => {
    const on = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])

  // Highlight the link for the section currently in view
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const els = ['home', 'services', 'gallery', 'process', 'contact'].map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Close the mobile menu on Escape or when the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    mq.addEventListener('change', onChange)
    document.addEventListener('keydown', onKey)
    return () => {
      mq.removeEventListener('change', onChange)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'bg-espresso/95 shadow-lg backdrop-blur' : ''}`}>
      <div ref={bar} className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold-500" aria-hidden="true" />
      <div className={`${WRAP} flex items-center justify-between py-3 transition-[padding] duration-300 sm:py-4 ${scrolled ? 'lg:py-3' : ''}`}>
        <a href="#home" className="font-display text-xl font-bold tracking-wide text-cream sm:text-2xl">
          Cluster<span className="italic text-gold-300">LashTech</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-semibold text-cream/90 lg:flex xl:gap-9" aria-label="Main">
          {links.map(([l, h, id]) => (
            <a key={h} href={h} className={`group relative py-1 transition hover:text-gold-300 ${active === id ? 'text-gold-300' : ''}`}>
              {l}
              <span className={`absolute -bottom-0.5 left-0 h-px bg-gold-300 transition-all duration-300 ${active === id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </a>
          ))}
          <a href={wa(BOOK_MSG)} className="lt-sheen rounded-full bg-gold-500 px-5 py-2.5 font-bold text-espresso transition hover:bg-gold-300">
            Book Now
          </a>
        </nav>
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream transition hover:bg-cream/10 lg:hidden"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lt-drop max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-cream/10 px-4 pb-6 pt-2 text-cream sm:px-6 lg:hidden">
          <div className="mx-auto max-w-md sm:max-w-none">
            {links.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-cream/10 py-3.5 font-semibold">{l}</a>
            ))}
            <div className='flex justify-center'>
              <a href={wa(BOOK_MSG)} className="lt-sheen mt-4 block w-44 rounded-full bg-gold-500 py-3.5 text-center font-bold text-espresso">
              Book Now
            </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-espresso text-cream">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl sm:-left-40 sm:h-[28rem] sm:w-[28rem]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold-600/10 blur-3xl sm:-right-40 sm:h-[30rem] sm:w-[30rem]" />

      {/* twinkling sparkles */}
      <span aria-hidden="true" className="lt-twinkle pointer-events-none absolute left-[8%] top-[22%] text-lg text-gold-300 sm:text-2xl">✦</span>
      <span aria-hidden="true" className="lt-twinkle pointer-events-none absolute right-[10%] top-[16%] text-sm text-gold-300 sm:text-xl" style={{ animationDelay: '1.1s' }}>✦</span>
      <span aria-hidden="true" className="lt-twinkle pointer-events-none absolute bottom-[14%] left-[46%] hidden text-xl text-gold-300 sm:block" style={{ animationDelay: '2s' }}>✦</span>

      <div className={`${WRAP} relative grid items-center gap-14 pb-20 pt-20 sm:pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-36`}>
        <div className="lg:col-span-7">
          <Reveal className="hidden md:block"><Eyebrow light>LASU Ojo · Lagos</Eyebrow></Reveal>
          <Reveal as="h1" delay={100} className="mt-5 font-display text-[2.75rem] font-semibold leading-[1] min-[400px]:text-[3.4rem] sm:mt-6 sm:text-7xl xl:text-[6.5rem]">
            Lashes that<br />
            frame{' '}
            <span className="relative inline-block italic text-gold-300">
              your gaze.
              <svg className="absolute -bottom-1 left-0 h-2 w-full sm:-bottom-2 sm:h-3" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <path className="lt-draw" pathLength="1" d="M2 8 C 50 2, 120 2, 198 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </Reveal>
          <Reveal as="p" delay={200} className="mt-7 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
            Cluster lashes, classic sets, cat eye shapes and coloured tips, applied with a steady hand and an eye for detail. Pick your look and we'll shape it to your face.
          </Reveal>
          <Reveal delay={300} className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <div className="flex justify-center">
              <a href="#gallery" className="inline-flex items-center bg-gold-500 text-espresso justify-center rounded-full border border-cream/40 px-7 py-3.5 font-bold transition hover:bg-cream hover:text-espresso sm:px-8 sm:py-4">
              See our work
            </a>
            </div>
          </Reveal>
          <Reveal delay={400} className="mt-6 md:mt-10 grid grid-cols-3 gap-x-4 gap-y-5 border-t border-cream/10 pt-7 sm:mt-12 sm:flex sm:flex-wrap sm:gap-x-10 sm:pt-8">
            {[['4', 'Lash styles'], ['Cat eye', 'Shapes on request'], ['Ojo', 'LASU, Lagos']].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-semibold text-gold-300 sm:text-3xl">{n}</p>
                <p className="text-xs text-cream/60 sm:text-sm">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal variant="reveal-zoom" delay={200} className="relative mx-auto mb-6 w-full max-w-[17rem] min-[400px]:max-w-xs sm:max-w-sm lg:col-span-5 lg:mb-0 lg:max-w-md">
          {/* slowly rotating dashed ring behind the arch */}
          <div className="pointer-events-none absolute left-[-14%] right-[-14%] top-1/2 hidden aspect-square -translate-y-1/2 sm:block" aria-hidden="true">
            <div className="lt-spin h-full w-full rounded-full border border-dashed border-gold-500/30" />
          </div>
          <div className="arch ph relative aspect-[3/4.2] overflow-hidden border border-gold-500/40 p-1.5 sm:p-2">
            <div className="arch h-full w-full overflow-hidden">
              <Img eager src={closeup} alt="Close-up of cluster lashes and glossy burgundy lips" className="object-[40%_35%]" />
            </div>
          </div>
          <div className="absolute -bottom-4 left-2 animate-float rounded-2xl bg-cream px-4 py-2.5 text-espresso shadow-2xl sm:-left-8 sm:px-5 sm:py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-600">Signature</p>
            <p className="font-display text-lg font-semibold sm:text-xl">Cluster Lashes</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Marquee() {
  const words = ['Cluster Lashes', 'Classic Sets', 'Cat Eye', 'Coloured Tips', 'Wispy Looks', 'Bold & Soft']
  const row = words.map((w) => `${w} ✦`)
  return (
    <div className="lt-marquee overflow-hidden border-y border-gold-500/30 bg-gold-500 py-3 text-espresso sm:py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-lg font-semibold italic sm:gap-10 sm:text-xl">
        {[...row, ...row, ...row].map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  )
}

/* ---------- services ---------- */
const services = [
  { n: '01', title: 'Cluster Lashes', img: clusterArt, pos: 'object-[45%_35%]', alt: 'Full cluster lashes on a closed eye', text: 'Fluffy, dimensional clusters placed for volume and lift. Our signature look.', msg: 'Hello, I would like to book cluster lashes' },
  { n: '02', title: 'Classic Sets', img: classic, pos: 'object-[50%_45%]', alt: 'Natural classic lash set', text: 'A clean, natural-looking set that opens up the eye without being too much.', msg: 'Hello, I would like to book a classic lash set' },
  { n: '03', title: 'Cat Eye', img: closeup, pos: 'object-[40%_38%]', alt: 'Cat eye lash style with a lifted outer corner', text: 'Longer outer corners for a lifted, dramatic shape. Tell us how bold you want it.', msg: 'Hello, I would like to book cat eye lashes' },
  { n: '04', title: 'Coloured Tips', img: whiteTips, pos: 'object-[55%_38%]', alt: 'Lashes with coloured tips', text: 'Add a pop of colour at the tips for a playful, one-of-a-kind finish.', msg: 'Hello, I would like to ask about coloured lash tips' },
]

function Services() {
  return (
    <section id="services" className={`${WRAP} py-14 sm:py-20 lg:py-28`}>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end lg:gap-6">
        <div>
          <Reveal><Eyebrow>Lash menu</Eyebrow></Reveal>
          <Reveal as="h2" delay={100} className={`mt-4 max-w-2xl ${H2}`}>
            Every style, <span className="italic text-gold-600">one steady hand.</span>
          </Reveal>
        </div>
        <Reveal as="p" delay={200} className="max-w-sm text-espresso/70">
          Not sure which to pick? Send us a photo you love on WhatsApp and we'll recommend the closest match.
        </Reveal>
      </div>

      <div className="mx-auto mt-8 grid max-w-sm gap-x-5 gap-y-10 min-[640px]:max-w-none sm:mt-14 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-6">
        {services.map((s, i) => (
          <Reveal as="article" key={s.n} delay={i * 100} className="group">
            <div className="transition-transform duration-500 group-hover:-translate-y-2">
              <div className="arch ph relative aspect-[3/4] overflow-hidden">
                <Img src={s.img} alt={s.alt} className={`${s.pos} transition duration-700 group-hover:scale-110`} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="pt-5 sm:pt-6">
                <span className="font-display text-lg italic text-gold-600">{s.n}</span>
                <h3 className="font-display text-2xl font-semibold sm:text-3xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso/70">{s.text}</p>
                <a href={wa(s.msg)} className="mt-4 inline-flex items-center gap-2 border-b border-gold-500 py-1 text-sm font-bold transition-all hover:gap-3 hover:text-gold-600">
                  Book this style →
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- feature split ---------- */
function Feature() {
  return (
    <section className="bg-espresso text-cream">
      <div className={`${WRAP} grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28`}>
        <Reveal variant="reveal-left" className="relative order-2 mx-auto w-full max-w-md sm:max-w-lg lg:order-1 lg:max-w-none">
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            <div className="ph group col-span-3 aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl"><Img src={greenEyes} alt="Client with soft blue-tipped lashes" className="object-[50%_40%] transition duration-700 group-hover:scale-105" /></div>
            <div className="ph group col-span-2 mt-8 aspect-[3/4] overflow-hidden rounded-2xl sm:mt-12 sm:rounded-3xl"><Img src={whiteTips} alt="Client with white-tipped lashes" className="object-[60%_38%] transition duration-700 group-hover:scale-105" /></div>
          </div>
          <div className="absolute -bottom-4 right-2 animate-float rounded-2xl bg-cream px-4 py-2.5 text-espresso shadow-2xl sm:-right-4 sm:px-5 sm:py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-600">On request</p>
            <p className="font-display text-base font-semibold sm:text-lg">Coloured tips</p>
          </div>
        </Reveal>
        <Reveal variant="reveal-right" className="order-1 mx-auto w-full max-w-xl lg:order-2 lg:mx-0 lg:max-w-none">
          <Eyebrow light>Why ClusterLashTech</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>
            Made to suit <span className="italic text-gold-300">your eyes.</span>
          </h2>
          <p className="mt-5 max-w-lg text-cream/70">
            No two faces are alike, so no two sets should be either. We take time to match length, curl and shape to your eyes.
          </p>
          <ul className="mt-8 space-y-5">
            {[
              ['Custom shapes', 'Natural, wispy or full cat eye, your call.'],
              ['Colour options', 'Blue, white and other coloured tips on request.'],
              ['Careful application', 'Tell us about any sensitivities before we start.'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-4">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-500 text-xs font-bold text-espresso">✓</span>
                <span><span className="block font-bold">{t}</span><span className="text-sm text-cream/60">{d}</span></span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <a href={wa(BOOK_MSG)} className="lt-sheen mt-10 inline-flex w-44 items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 font-bold text-espresso transition hover:-translate-y-0.5 hover:bg-gold-300 sm:w-auto">
           Book your set
          </a>

          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- gallery ---------- */
const gallery = [
  { src: clusterArt, alt: 'Full cluster lashes close-up', pos: 'object-[45%_38%]' },
  { src: greenEyes, alt: 'Soft blue-tipped lashes on a client smiling', pos: 'object-[50%_40%]' },
  { src: collage, alt: 'Collage of cluster lash sets on different clients', pos: 'object-center' },
  { src: classic, alt: 'Classic lash set', pos: 'object-[50%_45%]' },
  { src: whiteTips, alt: 'White-tipped lashes', pos: 'object-[60%_38%]' },
  { src: closeup, alt: 'Cat eye cluster lashes', pos: 'object-[40%_38%]' },
]

function Gallery() {
  const [active, setActive] = useState(null)
  const scroller = useRef(null)
  const thumb = useRef(null)
  const drag = useRef({ down: false, x: 0, left: 0, moved: false })
  const touchX = useRef(null)

  const go = (d) => setActive((a) => (a + d + gallery.length) % gallery.length)

  // Lightbox: keys + scroll lock
  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  // Scroll progress thumb under the carousel
  const updateThumb = () => {
    const el = scroller.current
    if (!el || !thumb.current) return
    const max = el.scrollWidth - el.clientWidth
    thumb.current.style.left = `${(max > 0 ? el.scrollLeft / max : 0) * 70}%`
  }
  useEffect(() => {
    updateThumb()
    window.addEventListener('resize', updateThumb)
    return () => window.removeEventListener('resize', updateThumb)
  }, [])

  // Mouse drag-to-scroll (touch devices already swipe natively)
  useEffect(() => {
    const move = (e) => {
      const d = drag.current
      if (!d.down) return
      const dx = e.clientX - d.x
      if (Math.abs(dx) > 5) d.moved = true
      scroller.current.scrollLeft = d.left - dx
    }
    const up = () => {
      const d = drag.current
      if (!d.down) return
      d.down = false
      const el = scroller.current
      el.style.scrollSnapType = ''
      el.classList.remove('cursor-grabbing')
      setTimeout(() => { d.moved = false }, 0)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const el = scroller.current
    drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false }
    el.style.scrollSnapType = 'none'
    el.classList.add('cursor-grabbing')
  }

  const nudge = (dir) => scroller.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })

  return (
    <section id="gallery" className="py-12 md:py-16 sm:py-20 lg:py-28">
      <div className={`${WRAP} flex flex-col justify-between gap-5 sm:flex-row sm:items-end`}>
        <div>
          <Reveal><Eyebrow>The gallery</Eyebrow></Reveal>
          <Reveal as="h2" delay={100} className={`mt-4 ${H2}`}>
            Our <span className="italic text-gold-600">work</span>
          </Reveal>
        </div>
        <Reveal delay={200} className="hidden gap-3 sm:flex">
          <button onClick={() => nudge(-1)} aria-label="Scroll left" className="grid h-12 w-12 place-items-center rounded-full border border-espresso/30 transition hover:bg-espresso hover:text-cream">←</button>
          <button onClick={() => nudge(1)} aria-label="Scroll right" className="grid h-12 w-12 place-items-center rounded-full border border-espresso/30 transition hover:bg-espresso hover:text-cream">→</button>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div
          ref={scroller}
          onScroll={updateThumb}
          onPointerDown={onPointerDown}
          className="no-scrollbar mt-10 flex cursor-grab snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:mt-12 sm:gap-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] 2xl:px-[max(2rem,calc((100vw-88rem)/2+2rem))]"
        >
          {gallery.map((g, i) => (
            <button
              key={i}
              onClick={() => !drag.current.moved && setActive(i)}
              aria-label={`Enlarge: ${g.alt}`}
              className="ph group h-[24rem] w-[72vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-[1.5rem] focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-500 sm:h-[30rem] sm:w-[320px] sm:rounded-[2rem] lg:h-[32rem] lg:w-[340px]"
            >
              <Img src={g.src} alt={g.alt} className={`${g.pos} transition duration-700 group-hover:scale-105`} />
            </button>
          ))}
        </div>
      </Reveal>

      <div className={`${WRAP} mt-3`}>
        <div className="mx-auto h-[3px] w-full max-w-xs rounded-full bg-espresso/10">
          <div ref={thumb} className="relative h-full w-[30%] rounded-full bg-gold-500" />
        </div>
        <p className="mt-4 text-center text-xs text-espresso/50">Swipe or drag sideways. Tap a photo to enlarge. Results vary from person to person.</p>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-espresso/95 p-3 sm:p-6"
          onClick={() => setActive(null)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            touchX.current = null
            if (dx > 50) go(-1)
            else if (dx < -50) go(1)
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button aria-label="Close" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream text-espresso sm:right-5 sm:top-5" onClick={() => setActive(null)}>✕</button>
          <button aria-label="Previous" className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-espresso sm:left-5" onClick={(e) => { e.stopPropagation(); go(-1) }}>←</button>
          <button aria-label="Next" className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-espresso sm:right-5" onClick={(e) => { e.stopPropagation(); go(1) }}>→</button>
          <figure className="flex w-full max-w-3xl flex-col items-center px-10 sm:px-14" onClick={(e) => e.stopPropagation()}>
            <img key={active} src={gallery[active].src} alt={gallery[active].alt} className="lt-fade max-h-[78dvh] max-w-full rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center text-xs tracking-widest text-cream/60">{active + 1} / {gallery.length}</figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}

/* ---------- process ---------- */
function Process() {
  const steps = [
    ['01', 'Message us', 'Send a photo of the look you want on WhatsApp.'],
    ['02', 'Pick your set', 'We help you choose the style, length and shape.'],
    ['03', 'Come to LASU, Ojo', 'We confirm a time and apply your lashes with care.'],
    ['04', 'Walk out glowing', 'Receive aftercare tips so your set looks its best.'],
  ]
  return (
    <section id="process" className="bg-sand">
      <div className={`${WRAP} py-12 sm:py-20 lg:py-28`}>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center"><Eyebrow>How it works</Eyebrow></Reveal>
          <Reveal as="h2" delay={100} className={`mt-4 ${H2}`}>
            Four easy <span className="italic text-gold-600">steps</span>
          </Reveal>
        </div>
        <div className="relative mt-10 sm:mt-14">
          {/* connector line between cards on desktop */}
          <div className="absolute left-8 right-8 top-[3.4rem] hidden h-px bg-gold-500/50 lg:block" aria-hidden="true" />
          <div className="relative grid gap-4 min-[560px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {steps.map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 120} className="rounded-3xl border border-espresso/10 bg-cream p-6 transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl sm:p-7">
                <p className="font-display text-5xl italic text-gold-500">{n}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso/70">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- contact ---------- */
function Contact() {
  return (
    <section id="contact" className="bg-espresso text-cream">
      <div className={`${WRAP} grid gap-10 py-16 sm:py-20 lg:grid-cols-5 lg:py-28`}>
        <Reveal variant="reveal-left" className="lg:col-span-2">
          <Eyebrow light>Contact</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>
            Ready for your <span className="italic text-gold-300">new look?</span>
          </h2>
          <p className="mt-5 text-cream/70">Message us on WhatsApp to book your lash appointment.</p>
          <div className="mt-8 space-y-4">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-4 rounded-2xl border border-cream/15 p-4 transition hover:border-gold-400 hover:bg-cream/5 sm:p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-500 text-espresso" aria-hidden="true">📞</span>
              <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[0.2em] text-cream/50">Call</span><span className="block break-words font-bold">{PHONE_DISPLAY}</span></span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-cream/15 p-4 sm:p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-500 text-espresso" aria-hidden="true">📍</span>
              <span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[0.2em] text-cream/50">Visit</span><span className="block break-words font-bold">{ADDRESS}</span></span>
            </div>
          </div>
        </Reveal>
        <Reveal variant="reveal-right" className="lg:col-span-3">
          <div className="h-[300px] overflow-hidden rounded-3xl border border-gold-500/40 shadow-2xl min-[480px]:h-[360px] sm:h-[440px] sm:rounded-[2rem] lg:h-full lg:min-h-[480px]">
            <iframe
              title="ClusterLashTech location at LASU, Ojo, Lagos"
              src="https://maps.google.com/maps?q=Lagos%20State%20University%2C%20Ojo%2C%20Lagos%2C%20Nigeria&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-espresso pb-[env(safe-area-inset-bottom)] text-cream">
      <div className={`${WRAP} flex flex-col items-center justify-between gap-3 py-8 text-center sm:flex-row sm:py-10 sm:text-left`}>
        <p className="font-display text-2xl font-bold">Cluster<span className="italic text-gold-300">LashTech</span></p>

        {/* Builder Credit */}
        <p className="mt-6 text-xs sm:text-sm opacity-80 flex items-center justify-center gap-2">
          <img
              src="/logos.jpg"
              alt="Elvionweb Logo"
              className="w-8 h-8 object-contain"
          />
          Built by{" "}
          <a
            href="https://www.elvionweb.com"
        target="_blank"
          rel="noopener noreferrer"
        className="font-semibold underline underline-offset-4 hover:opacity-100 transition-opacity"
          >
          Elvionweb
          </a>
          </p>
        <p className="text-sm text-cream/50">© {new Date().getFullYear()} ClusterLashTech · LASU, Ojo, Lagos</p>
      </div>
    </footer>
  )
}

function FloatingWhatsApp() {
  return (
    <a
      href={wa('Hello ClusterLashTech')}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
    >
      <span className="lt-ping absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
      <WhatsAppIcon className="relative h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  )
}

export default function App() {
  return (
    // overflow-x-clip stops slide-in animations / blurred blobs from causing sideways scroll on phones
    <div className="w-full overflow-x-clip">
      <style>{EXTRA_CSS}</style>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Feature />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

