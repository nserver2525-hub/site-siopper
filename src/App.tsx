import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react'
import { serviceOptions, services } from './services'

const CONTACT = {
  phone: '+244 931 515 960',
  phoneLink: '+244931515960',
  whatsapp: '244931515960',
  email: 'comercial@siopper.ao',
  address: 'Avenida 21 de Janeiro',
  instagram: '_Siopper_Seguranca',
}

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre nós', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Porquê a SIOPPER', href: '#diferenciais' },
  { label: 'Contactos', href: '#contactos' },
]

type QuoteForm = {
  name: string
  company: string
  phone: string
  email: string
  service: string
  location: string
  details: string
}

const initialForm: QuoteForm = {
  name: '',
  company: '',
  phone: '',
  email: '',
  service: '',
  location: '',
  details: '',
}

function Logo({ light = false, homeHref = '#inicio' }: { light?: boolean; homeHref?: string }) {
  return (
    <a
      className={`brand${light ? ' brand--light' : ''}`}
      href={homeHref}
      aria-label="SIOPPER — início"
    >
      <img className="brand__image" src="/images/siopper-logo.jpg" alt="Logótipo SIOPPER" />
    </a>
  )
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <Logo light homeHref="/" />
      <p className="eyebrow eyebrow--light">Erro 404</p>
      <h1>Esta página não foi encontrada.</h1>
      <p>O endereço pode estar incorrecto ou a página já não estar disponível.</p>
      <a className="button button--gold" href="/">
        Voltar à página inicial <ArrowRight size={16} aria-hidden="true" />
      </a>
    </main>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string
  title: string
  description?: string
  light?: boolean
}) {
  return (
    <div className={`section-heading${light ? ' section-heading--light' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  )
}

function App() {
  if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
    return <NotFoundPage />
  }
  return <HomePage />
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState<QuoteForm>(initialForm)
  const [whatsappUrl, setWhatsappUrl] = useState('')

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            currentObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' },
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  function updateForm(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm({ ...form, [event.target.name]: event.target.value })
    setWhatsappUrl('')
  }

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = [
      'Olá, SIOPPER. Gostaria de solicitar um orçamento.',
      '',
      `Nome: ${form.name}`,
      form.company && `Empresa: ${form.company}`,
      `Telefone: ${form.phone}`,
      `E-mail: ${form.email}`,
      `Serviço pretendido: ${form.service}`,
      `Localização: ${form.location}`,
      `Necessidade: ${form.details}`,
    ]
      .filter(Boolean)
      .join('\n')

    setWhatsappUrl(
      `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`,
    )
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Saltar para o conteúdo
      </a>

      <div className="topline">
        <div className="container topline__inner">
          <span>Protegendo o que é mais importante para você.</span>
          <a href={`tel:${CONTACT.phoneLink}`}>
            <Phone size={14} aria-hidden="true" />
            {CONTACT.phone}
          </a>
        </div>
      </div>

      <header className="site-header">
        <div className="container site-header__inner">
          <Logo light />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav
            className={`navigation${menuOpen ? ' navigation--open' : ''}`}
            id="primary-navigation"
            aria-label="Navegação principal"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <a
              className="button button--small button--gold navigation__cta"
              href="#orcamento"
              onClick={() => setMenuOpen(false)}
            >
              Pedir orçamento <ArrowRight size={15} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero__image" role="img" aria-label="Agentes de segurança da SIOPPER em serviço" />
          <div className="hero__shade" />
          <div className="container hero__content">
            <div className="hero__copy">
              <p className="eyebrow eyebrow--light">
                <span className="eyebrow__line" />
                SIOPPER · SEGURANÇA
              </p>
              <h1 id="hero-title">
                SEGURANÇA E PROTECÇÃO PARA AQUILO QUE <em>MAIS IMPORTA.</em>
              </h1>
              <p className="hero__intro">
                Oferecemos soluções profissionais de segurança humana e protecção
                patrimonial, adaptadas às necessidades de empresas, instituições e
                particulares.
              </p>
              <div className="hero__actions">
                <a className="button button--gold" href="#orcamento">
                  Solicitar um orçamento <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className="button button--outline-light" href="#servicos">
                  Conhecer os nossos serviços
                </a>
              </div>
            </div>
            <div className="hero__foot">
              <span>CONFIANÇA. PROTECÇÃO. PROFISSIONALISMO.</span>
              <a href="#sobre" aria-label="Descer para a secção Sobre nós">
                <ArrowDown size={18} />
              </a>
            </div>
          </div>
          <span className="hero__index" aria-hidden="true">01 / 04</span>
        </section>

        <section className="about section-pad" id="sobre">
          <div className="container about__layout">
            <div className="about__visual" data-reveal>
              <div className="about__photo" role="img" aria-label="Agente da equipa de segurança SIOPPER" />
              <div className="about__badge">
                <ShieldCheck size={23} strokeWidth={1.5} />
                <span>Protecção com< b> propósito</b></span>
              </div>
              <span className="about__vertical">SIOPPER · SEGURANÇA</span>
            </div>

            <div className="about__content" data-reveal>
              <SectionHeading eyebrow="Quem somos" title="Segurança que começa com confiança." />
              <p>
                A SIOPPER é uma empresa dedicada à prestação de serviços de segurança
                humana e protecção patrimonial, comprometida com a protecção de vidas,
                patrimónios e ambientes de trabalho.
              </p>
              <p>
                Através de profissionais criteriosamente seleccionados e preparados
                para diferentes desafios de segurança, procuramos oferecer soluções
                personalizadas, eficientes e confiáveis, respondendo às necessidades
                dos nossos clientes.
              </p>
              <a className="text-link" href="#orcamento">
                Fale com a nossa equipa <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="container values" data-reveal>
            <article className="value-card">
              <span className="value-card__number">01</span>
              <h3>Missão</h3>
              <p>Proteger vidas e patrimónios, oferecendo soluções de segurança personalizadas e confiáveis.</p>
            </article>
            <article className="value-card">
              <span className="value-card__number">02</span>
              <h3>Visão</h3>
              <p>Ser referência em segurança humana, reconhecida pela qualidade dos nossos serviços em Angola.</p>
            </article>
            <article className="value-card">
              <span className="value-card__number">03</span>
              <h3>Valores</h3>
              <p>Ética, profissionalismo, confiança, agilidade, inovação e respeito pelo cliente.</p>
            </article>
          </div>
        </section>

        <section className="services section-pad" id="servicos">
          <div className="container">
            <div className="services__heading" data-reveal>
              <SectionHeading
                eyebrow="O que fazemos"
                title="Soluções para proteger o que importa."
                description="Serviços de segurança pensados para responder às necessidades de empresas, instituições e particulares."
                light
              />
              <a className="button button--outline-light services__all" href="#orcamento">
                Encontrar a solução certa <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="service-grid">
              {services.map(({ title, description, icon: Icon }, index) => (
                <article className="service-card" data-reveal key={title}>
                  <div className="service-card__top">
                    <span className="service-card__icon"><Icon size={22} strokeWidth={1.7} /></span>
                    <span className="service-card__number">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a
                    className="service-card__link"
                    href="#orcamento"
                    onClick={() => setForm((current) => ({ ...current, service: title }))}
                    aria-label={`Solicitar ${title}`}
                  >
                    Solicitar este serviço <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="people section-pad">
          <div className="container people__layout">
            <div className="people__content" data-reveal>
              <p className="eyebrow">Segurança humana</p>
              <h2>Profissionais preparados. Protecção próxima.</h2>
              <p>
                Contamos com profissionais qualificados, submetidos a um processo
                criterioso de recrutamento e selecção, preparados através de formação
                e treino nas diferentes técnicas de segurança.
              </p>
              <p>
                O nosso compromisso é proporcionar aos clientes soluções de protecção
                pessoal e patrimonial, adequadas às necessidades de residências,
                empresas e instituições.
              </p>
              <a className="button button--dark" href="#orcamento">
                Vamos conversar <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="people__visual" data-reveal>
              <div className="people__photo" role="img" aria-label="Agente de segurança da SIOPPER em serviço" />
              <div className="people__caption">
                <span>01 — PRESENÇA PROFISSIONAL</span>
                <span>Protecção ajustada a cada contexto</span>
              </div>
              <div className="people__accent" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="reasons section-pad" id="diferenciais">
          <div className="container reasons__layout">
            <div className="reasons__intro" data-reveal>
              <p className="eyebrow eyebrow--light">O nosso compromisso</p>
              <h2>Porquê escolher a SIOPPER?</h2>
              <p>
                A segurança deve responder à realidade de cada cliente. Trabalhamos
                para oferecer um serviço atento, profissional e adequado a cada
                necessidade.
              </p>
              <a className="text-link text-link--light" href="#contactos">
                Conheça a nossa equipa <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="reasons__list" data-reveal>
              {[
                'Profissionais criteriosamente seleccionados',
                'Soluções personalizadas de segurança',
                'Compromisso com a protecção de pessoas e património',
                'Atendimento profissional',
                'Serviços para empresas e particulares',
                'Foco na confiança e satisfação do cliente',
              ].map((reason) => (
                <div className="reason" key={reason}>
                  <span><Check size={15} aria-hidden="true" /></span>
                  <p>{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="quote section-pad" id="orcamento">
          <div className="container quote__layout">
            <div className="quote__intro" data-reveal>
              <p className="eyebrow">Vamos conversar</p>
              <h2>Conte-nos o que precisa proteger.</h2>
              <p>
                Partilhe alguns detalhes e a nossa equipa poderá perceber melhor a
                sua necessidade. O pedido será preparado para envio pelo WhatsApp.
              </p>
              <div className="quote__contact">
                <span className="quote__contact-icon"><Phone size={19} /></span>
                <div>
                  <small>Prefere falar connosco?</small>
                  <a href={`tel:${CONTACT.phoneLink}`}>{CONTACT.phone}</a>
                </div>
              </div>
              <div className="quote__note">
                <ShieldCheck size={17} />
                <span>Os seus dados serão incluídos apenas na mensagem que decidir enviar.</span>
              </div>
            </div>

            <form className="quote-form" onSubmit={submitQuote} data-reveal>
              <div className="quote-form__heading">
                <span>01 <i>/</i> SOLICITAÇÃO</span>
                <span>Campos com * são obrigatórios</span>
              </div>
              <div className="form-grid">
                <label className="field">
                  <span>Nome completo <b>*</b></span>
                  <input name="name" autoComplete="name" required value={form.name} onChange={updateForm} placeholder="O seu nome" />
                </label>
                <label className="field">
                  <span>Nome da empresa</span>
                  <input name="company" autoComplete="organization" value={form.company} onChange={updateForm} placeholder="Se aplicável" />
                </label>
                <label className="field">
                  <span>Número de telefone <b>*</b></span>
                  <input name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={updateForm} placeholder="+244" />
                </label>
                <label className="field">
                  <span>E-mail <b>*</b></span>
                  <input name="email" type="email" autoComplete="email" required value={form.email} onChange={updateForm} placeholder="nome@empresa.ao" />
                </label>
                <label className="field">
                  <span>Serviço pretendido <b>*</b></span>
                  <select name="service" required value={form.service} onChange={updateForm}>
                    <option value="" disabled>Seleccione um serviço</option>
                    {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
                <label className="field">
                  <span>Localização <b>*</b></span>
                  <input name="location" autoComplete="address-level2" required value={form.location} onChange={updateForm} placeholder="Província, município ou bairro" />
                </label>
                <label className="field field--full">
                  <span>Descreva a sua necessidade <b>*</b></span>
                  <textarea name="details" required rows={4} value={form.details} onChange={updateForm} placeholder="Partilhe os detalhes que considera importantes..." />
                </label>
              </div>
              <button className="button button--gold quote-form__submit" type="submit">
                Preparar solicitação no WhatsApp <ArrowRight size={17} aria-hidden="true" />
              </button>
              {whatsappUrl && (
                <div className="form-feedback" role="status" aria-live="polite">
                  <p>O pedido está pronto. Abra o WhatsApp e confirme o envio da mensagem.</p>
                  <a className="button button--dark" href={whatsappUrl} target="_blank" rel="noreferrer">
                    Continuar para WhatsApp <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="contact-strip" id="contactos">
          <div className="container contact-strip__layout">
            <div className="contact-strip__intro" data-reveal>
              <p className="eyebrow eyebrow--light">Estamos disponíveis</p>
              <h2>Fale connosco.</h2>
              <p>Escolha o canal mais conveniente para si.</p>
            </div>
            <div className="contact-items" data-reveal>
              <a className="contact-item" href={`tel:${CONTACT.phoneLink}`}>
                <Phone size={19} />
                <span><small>Telefone</small><b>{CONTACT.phone}</b></span>
                <ChevronRight size={16} />
              </a>
              <a className="contact-item" href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">
                <MessageIcon />
                <span><small>WhatsApp</small><b>Enviar mensagem</b></span>
                <ChevronRight size={16} />
              </a>
              <a className="contact-item" href={`mailto:${CONTACT.email}`}>
                <Mail size={19} />
                <span><small>E-mail</small><b>{CONTACT.email}</b></span>
                <ChevronRight size={16} />
              </a>
              <a className="contact-item" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`} target="_blank" rel="noreferrer">
                <MapPin size={19} />
                <span><small>Endereço</small><b>{CONTACT.address}</b></span>
                <ChevronRight size={16} />
              </a>
              <a className="contact-item" href={`https://www.instagram.com/${CONTACT.instagram}/`} target="_blank" rel="noreferrer">
                <Instagram size={19} />
                <span><small>Instagram</small><b>@_Siopper_Segurança</b></span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <Logo light />
              <p>Protegendo o que é mais importante para você.</p>
            </div>
            <div className="footer-column">
              <h3>Navegação</h3>
              {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            </div>
            <div className="footer-column">
              <h3>Serviços</h3>
              {services.slice(0, 5).map((service) => <a key={service.title} href="#servicos">{service.title}</a>)}
              <a href="#servicos">Ver todos os serviços</a>
            </div>
            <div className="footer-column footer-column--contact">
              <h3>Contactos</h3>
              <a href={`tel:${CONTACT.phoneLink}`}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
              <a href={`https://www.instagram.com/${CONTACT.instagram}/`} target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© SIOPPER — Todos os direitos reservados.</span>
            <a href="#inicio">Voltar ao início <ArrowDown size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={`https://wa.me/${CONTACT.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar a SIOPPER pelo WhatsApp"
      >
        <MessageIcon />
        <span>Fale connosco</span>
      </a>
    </>
  )
}

function MessageIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="message-icon">
      <path d="M20.1 11.6a8.1 8.1 0 0 1-12 7.1L4 20l1.3-3.9a8.1 8.1 0 1 1 14.8-4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 8.8c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.6 1.4c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.3-.1.5.5.9 1.2 1.6 2.1 2.1.2.1.3.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.3.6c.3.1.4.3.4.5 0 .3-.2 1.1-.7 1.4-.5.4-1.1.6-1.8.4-1-.2-2.3-.8-3.5-2-1.1-1.1-1.8-2.4-2-3.3-.2-.9.1-1.5.5-1.9.2-.1.4-.1.6 0Z" fill="currentColor" />
    </svg>
  )
}

export default App
