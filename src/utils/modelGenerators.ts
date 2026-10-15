import { SegmentModelConfig } from '../data/models12';

export interface CustomModelOverrides {
  businessName?: string;
  slogan?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  hours?: string;
  promptNotes?: string;
  customPrimaryColor?: string;
}

export function generateFullSegmentHtml(
  model: SegmentModelConfig,
  overrides?: CustomModelOverrides
): string {
  const d = model.defaultData;

  const businessName = overrides?.businessName || d.businessName;
  const slogan = overrides?.slogan || d.slogan;
  const rawWhatsapp = (overrides?.whatsapp || d.whatsapp).replace(/\D/g, '');
  const cleanWhatsapp = rawWhatsapp.startsWith('55') ? rawWhatsapp : `55${rawWhatsapp}`;
  const phone = overrides?.phone || d.phone;
  const email = overrides?.email || d.email;
  const address = overrides?.address || d.address;
  const city = overrides?.city || d.city;
  const hours = overrides?.hours || d.hours;
  const primaryColor = overrides?.customPrimaryColor || model.primaryColor;

  const whatsappMsg = encodeURIComponent(
    `Olá! Vi o site de ${businessName} e gostaria de solicitar um atendimento/orçamento.`
  );
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${whatsappMsg}`;

  const isDark = !!model.isDarkTheme;

  // SVG Icons
  const icons = {
    whatsapp: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 2C6.5 2 2 6.5 2 12.031c0 1.8.47 3.52 1.34 5.03L2 22l5.12-1.34c1.46.8 3.12 1.25 4.91 1.25 5.53 0 10.03-4.5 10.03-10.03S17.56 2 12.031 2zm0 18.28c-1.57 0-3.08-.42-4.4-1.2l-.32-.19-3.26.85.87-3.18-.21-.33a8.16 8.16 0 0 1-1.25-4.4c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.23 3.69 8.23 8.23 0 4.54-3.69 8.24-8.23 8.24zm4.51-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.12-.17.25-.65.8-.8 1-.15.19-.3.21-.55.09-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.11-.11.25-.28.37-.43.12-.15.16-.25.25-.42.08-.17.04-.32-.02-.45-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.3-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.12.17 1.75 2.67 4.24 3.74.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.18-.48-.3z"/></svg>`,
    mapPin: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    chevronDown: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    phoneIcon: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  };

  return `<!DOCTYPE html>
<!-- ==========================================================================
  MODELO ${model.number}: ${model.title.toUpperCase()}
  SEGMENTO: ${model.segmentName} (${model.category})
  TOTALMENTE RESPONSIVO | ARQUIVO ÚNICO HTML | PRONTO PARA NETLIFY E VERCEL
  ARRASTE ESTE ARQUIVO 'index.html' DIRETAMENTE NO NETLIFY DROP (netlify.com/drop)
========================================================================== -->
<html lang="pt-BR">
<head>
  <!-- 1. METATAGS & SEO LOCAL -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} | ${model.segmentName}</title>
  <meta name="description" content="${slogan}">
  <meta property="og:title" content="${businessName}">
  <meta property="og:description" content="${slogan}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${d.galleryImages[0]}">

  <!-- FONTES GOOGLE DO MODELO -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- SCHEMA.ORG DADOS ESTRUTURADOS (GOOGLE SEO) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "${businessName}",
    "description": "${slogan}",
    "telephone": "${overrides?.whatsapp || d.whatsapp}",
    "email": "${email}",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "${address}",
      "addressLocality": "${city}",
      "addressCountry": "BR"
    },
    "openingHours": "${hours}"
  }
  </script>

  <!-- 2. ESTILOS CSS EMBUTIDOS (RESPONSIVO E INDEPENDENTE DE BIBLIOTECAS) -->
  <style>
    /* ==========================================================================
       VARIÁVEIS DE COR E TIPOGRAFIA DO MODELO
    ========================================================================== */
    :root {
      --primary: ${primaryColor};
      --primary-hover: ${model.secondaryColor};
      --accent: ${model.accentColor};
      --bg-body: ${isDark ? '#0F1117' : model.bgLight};
      --bg-surface: ${isDark ? '#171B26' : '#FFFFFF'};
      --bg-surface-alt: ${isDark ? '#202636' : '#F8FAFC'};
      --border-color: ${isDark ? '#272E40' : '#E2E8F0'};
      --text-main: ${isDark ? '#F3F4F6' : '#0F172A'};
      --text-muted: ${isDark ? '#9CA3AF' : '#64748B'};
      --font-heading: ${model.fontHeading};
      --font-body: ${model.fontBody};
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 24px;
      --shadow-card: ${isDark ? '0 10px 25px rgba(0,0,0,0.5)' : '0 10px 30px rgba(15, 23, 42, 0.07)'};
    }

    /* RESET BÁSICO */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--bg-body);
      color: var(--text-main);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4 {
      font-family: var(--font-heading);
      color: var(--text-main);
      line-height: 1.25;
      font-weight: 700;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* BARRA SUPERIOR */
    .top-bar {
      background: ${isDark ? '#0A0C12' : 'var(--primary)'};
      color: #FFFFFF;
      padding: 10px 0;
      font-size: 13px;
      font-weight: 500;
    }
    .top-bar-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .top-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* CABEÇALHO / NAVBAR */
    .navbar {
      position: sticky;
      top: 0;
      background: ${isDark ? 'rgba(15, 17, 23, 0.96)' : 'rgba(255, 255, 255, 0.97)'};
      backdrop-filter: blur(10px);
      z-index: 100;
      border-bottom: 1px solid var(--border-color);
    }
    .nav-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 76px;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 20px;
      font-weight: 800;
    }
    .brand-icon {
      font-size: 24px;
    }
    .brand-pill {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 99px;
      background: rgba(37, 211, 102, 0.15);
      color: #16A34A;
      border: 1px solid rgba(22, 163, 74, 0.3);
    }
    .nav-menu {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
    }
    .nav-menu a {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-muted);
      transition: color 0.2s;
    }
    .nav-menu a:hover {
      color: var(--primary);
    }
    .btn-nav-whats {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #25D366;
      color: #FFFFFF;
      padding: 10px 18px;
      border-radius: var(--radius-sm);
      font-size: 14px;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
      transition: all 0.2s;
    }
    .btn-nav-whats:hover {
      background: #1EBE5D;
      transform: translateY(-1px);
    }
    .mobile-btn {
      display: none;
      background: none;
      border: none;
      color: var(--text-main);
      cursor: pointer;
    }

    /* SEÇÃO HERO */
    .hero-section {
      padding: 80px 0 100px;
      position: relative;
      overflow: hidden;
      background: ${
        isDark
          ? 'radial-gradient(circle at 50% 0%, #1e2536 0%, #0F1117 100%)'
          : `linear-gradient(180deg, ${model.bgLight} 0%, #FFFFFF 100%)`
      };
      border-bottom: 1px solid var(--border-color);
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 50px;
      align-items: center;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 700;
      background: ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(2, 132, 199, 0.1)'};
      color: var(--primary);
      border: 1px solid var(--border-color);
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .hero-title {
      font-size: 46px;
      letter-spacing: -0.02em;
      margin-bottom: 20px;
    }
    .hero-desc {
      font-size: 18px;
      color: var(--text-muted);
      margin-bottom: 32px;
      max-width: 540px;
    }
    .hero-btns {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 36px;
    }
    .btn-main {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #25D366;
      color: #FFFFFF;
      padding: 16px 28px;
      border-radius: var(--radius-sm);
      font-size: 16px;
      font-weight: 700;
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.35);
      transition: all 0.2s;
    }
    .btn-main:hover {
      background: #1EBE5D;
      transform: translateY(-2px);
    }
    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-surface);
      color: var(--text-main);
      border: 1px solid var(--border-color);
      padding: 16px 24px;
      border-radius: var(--radius-sm);
      font-size: 15px;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn-outline:hover {
      background: var(--bg-surface-alt);
    }
    .hero-media {
      position: relative;
    }
    .hero-img {
      width: 100%;
      height: 460px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-card);
    }

    /* SEÇÕES COMUNS */
    section {
      padding: 90px 0;
      border-bottom: 1px solid var(--border-color);
    }
    .section-head {
      text-align: center;
      max-width: 680px;
      margin: 0 auto 56px;
    }
    .section-tag {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--primary);
      letter-spacing: 0.08em;
      margin-bottom: 10px;
      display: inline-block;
    }
    .section-title {
      font-size: 36px;
      margin-bottom: 14px;
    }
    .section-subtitle {
      color: var(--text-muted);
      font-size: 16px;
    }

    /* SOBRE NÓS */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }
    .about-img {
      width: 100%;
      height: 440px;
      object-fit: cover;
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-card);
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 36px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
    }
    .stat-val {
      font-size: 30px;
      font-weight: 800;
      color: var(--primary);
      line-height: 1.1;
      margin-bottom: 4px;
    }
    .stat-label {
      font-size: 13px;
      color: var(--text-muted);
    }

    /* SERVIÇOS */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      gap: 28px;
    }
    .service-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 32px 24px;
      position: relative;
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
    }
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-card);
      border-color: var(--primary);
    }
    .badge-service {
      position: absolute;
      top: 16px;
      right: 16px;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 99px;
      background: rgba(37, 211, 102, 0.12);
      color: #15803D;
    }
    .service-title {
      font-size: 20px;
      margin-bottom: 12px;
    }
    .service-desc {
      color: var(--text-muted);
      font-size: 14px;
      margin-bottom: 24px;
      flex-grow: 1;
    }
    .service-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
    }
    .service-price {
      font-size: 16px;
      font-weight: 800;
      color: var(--primary);
    }
    .btn-service-whats {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 700;
      color: #25D366;
      background: rgba(37, 211, 102, 0.1);
      padding: 8px 12px;
      border-radius: var(--radius-sm);
    }

    /* GALERIA */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .gallery-box {
      border-radius: var(--radius-md);
      overflow: hidden;
      height: 260px;
      border: 1px solid var(--border-color);
    }
    .gallery-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .gallery-box:hover img {
      transform: scale(1.06);
    }

    /* DEPOIMENTOS */
    .test-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 28px;
    }
    .test-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 30px;
      box-shadow: var(--shadow-card);
    }
    .test-stars {
      display: flex;
      gap: 4px;
      color: #FBBF24;
      margin-bottom: 14px;
    }
    .test-quote {
      font-size: 15px;
      font-style: italic;
      color: var(--text-main);
      margin-bottom: 20px;
    }
    .test-user {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .user-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--primary);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 15px;
    }

    /* FAQ */
    .faq-list {
      max-width: 800px;
      margin: 0 auto;
    }
    .faq-item {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      margin-bottom: 14px;
      overflow: hidden;
    }
    .faq-btn {
      width: 100%;
      padding: 20px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: none;
      border: none;
      font-size: 16px;
      font-weight: 700;
      color: var(--text-main);
      cursor: pointer;
      text-align: left;
    }
    .faq-btn svg {
      transition: transform 0.3s;
      flex-shrink: 0;
    }
    .faq-item.open .faq-btn svg {
      transform: rotate(180deg);
      color: var(--primary);
    }
    .faq-ans {
      display: none;
      padding: 0 24px 20px;
      color: var(--text-muted);
      font-size: 14px;
    }
    .faq-item.open .faq-ans {
      display: block;
    }

    /* CONTATO & FORMULÁRIO */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
    .contact-card {
      background: var(--bg-surface-alt);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 36px;
    }
    .contact-row {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 24px;
    }
    .contact-icon-box {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: var(--bg-surface);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-color);
      flex-shrink: 0;
    }
    .form-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 36px;
      box-shadow: var(--shadow-card);
    }
    .input-group {
      margin-bottom: 18px;
    }
    .input-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .input-control {
      width: 100%;
      padding: 12px 14px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: var(--bg-body);
      color: var(--text-main);
      font-family: inherit;
      font-size: 14px;
      outline: none;
    }
    .input-control:focus {
      border-color: var(--primary);
    }

    /* RODAPÉ */
    .footer {
      background: ${isDark ? '#07090E' : '#0B132B'};
      color: #94A3B8;
      padding: 60px 0 30px;
      font-size: 14px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: 40px;
      margin-bottom: 40px;
    }
    .footer-brand {
      color: #FFFFFF;
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 12px;
    }
    .footer-col h4 {
      color: #FFFFFF;
      font-size: 15px;
      margin-bottom: 16px;
    }
    .footer-links {
      list-style: none;
    }
    .footer-links li {
      margin-bottom: 10px;
    }
    .footer-links a:hover {
      color: #FFFFFF;
    }
    .footer-bar {
      border-top: 1px solid #1E293B;
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    /* BOTÃO FLUTUANTE WHATSAPP */
    .float-whats {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #25D366;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
      z-index: 999;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .float-whats:hover {
      transform: scale(1.1);
    }

    /* RESPONSIVIDADE MOBILE */
    @media (max-width: 900px) {
      .hero-grid, .about-grid, .contact-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .gallery-grid {
        grid-template-columns: 1fr;
      }
      .hero-title {
        font-size: 32px;
      }
      .hero-img, .about-img {
        height: 320px;
      }
      .nav-menu, .btn-nav-whats {
        display: none;
      }
      .mobile-btn {
        display: block;
      }
      .mobile-nav-panel {
        display: none;
        padding: 20px;
        background: var(--bg-surface);
        border-bottom: 1px solid var(--border-color);
      }
      .mobile-nav-panel.open {
        display: block;
      }
      .mobile-nav-panel a {
        display: block;
        padding: 10px 0;
        font-weight: 600;
        border-bottom: 1px solid var(--border-color);
      }
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- 3. BARRA SUPERIOR DE HORÁRIO E ENDEREÇO -->
  <div class="top-bar">
    <div class="container top-bar-flex">
      <div class="top-item">
        ${icons.mapPin}
        <span>${address} - ${city}</span>
      </div>
      <div class="top-item">
        ${icons.clock}
        <span>${hours}</span>
      </div>
    </div>
  </div>

  <!-- 4. CABEÇALHO & MENU DE NAVEGAÇÃO -->
  <nav class="navbar">
    <div class="container nav-flex">
      <a href="#" class="brand-logo">
        <span class="brand-icon">${model.icon}</span>
        <span>${businessName}</span>
        <span class="brand-pill">${model.segmentName}</span>
      </a>

      <ul class="nav-menu">
        <li><a href="#sobre">Sobre Nós</a></li>
        <li><a href="#servicos">Especialidades</a></li>
        <li><a href="#galeria">Galeria</a></li>
        <li><a href="#depoimentos">Avaliações</a></li>
        <li><a href="#faq">Dúvidas</a></li>
        <li><a href="#contato">Contato</a></li>
      </ul>

      <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-nav-whats">
        ${icons.whatsapp}
        <span>Falar no WhatsApp</span>
      </a>

      <button class="mobile-btn" id="btnToggleMobile" aria-label="Abrir Menu">
        ${icons.menu}
      </button>
    </div>

    <!-- MENU MOBILE RETRÁTIL -->
    <div class="mobile-nav-panel" id="panelMobile">
      <a href="#sobre">Sobre Nós</a>
      <a href="#servicos">Especialidades</a>
      <a href="#galeria">Galeria</a>
      <a href="#depoimentos">Avaliações</a>
      <a href="#faq">Dúvidas</a>
      <a href="#contato">Contato</a>
      <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="color: #25D366; font-weight: 700; margin-top: 10px;">
        Chamar no WhatsApp
      </a>
    </div>
  </nav>

  <!-- 5. SEÇÃO HERO / APRESENTAÇÃO PRINCIPAL -->
  <section class="hero-section" id="inicio">
    <div class="container">
      <div class="hero-grid">
        <div>
          <div class="hero-badge">
            ${icons.shield}
            <span>${model.tagline}</span>
          </div>
          <h1 class="hero-title">${d.heroHeadline}</h1>
          <p class="hero-desc">${d.heroSubtitle}</p>
          
          <div class="hero-btns">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-main">
              ${icons.whatsapp}
              <span>${d.heroCta}</span>
            </a>
            <a href="#servicos" class="btn-outline">Ver Detalhes</a>
          </div>
        </div>

        <div class="hero-media">
          <img src="${d.galleryImages[0]}" alt="${businessName}" class="hero-img" loading="eager">
        </div>
      </div>
    </div>
  </section>

  <!-- 6. SEÇÃO SOBRE NÓS / HISTÓRIA & ESTATÍSTICAS -->
  <section id="sobre">
    <div class="container">
      <div class="about-grid">
        <div>
          <img src="${d.galleryImages[1]}" alt="Sobre ${businessName}" class="about-img" loading="lazy">
        </div>
        <div>
          <span class="section-tag">Nossa Trajetória</span>
          <h2 class="section-title">${d.aboutTitle}</h2>
          <p style="margin-bottom: 16px; color: var(--text-muted);">${d.aboutText1}</p>
          <p style="color: var(--text-muted);">${d.aboutText2}</p>

          <div class="stats-row">
            ${d.stats
              .map(
                (s) => `
              <div>
                <div class="stat-val">${s.value}</div>
                <div class="stat-label">${s.label}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. SEÇÃO DE SERVIÇOS / CARDÁPIO / ESPECIALIDADES -->
  <section id="servicos" style="background: var(--bg-surface-alt);">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Nossas Soluções</span>
        <h2 class="section-title">O que oferecemos com excelência</h2>
        <p class="section-subtitle">Serviços e produtos projetados com qualidade máxima, transparência e garantia.</p>
      </div>

      <div class="services-grid">
        ${d.services
          .map(
            (srv) => `
          <div class="service-card">
            ${srv.badge ? `<span class="badge-service">${srv.badge}</span>` : ''}
            <h3 class="service-title">${srv.title}</h3>
            <p class="service-desc">${srv.description}</p>
            <div class="service-foot">
              <span class="service-price">${srv.price}</span>
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-service-whats">
                ${icons.whatsapp} Orçar
              </a>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 8. SEÇÃO DE GALERIA FOTOGRÁFICA -->
  <section id="galeria">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Galeria de Fotos</span>
        <h2 class="section-title">Conheça nosso espaço e estrutura</h2>
        <p class="section-subtitle">Um olhar mais atento à dedicação e ao cuidado presentes em cada detalhe.</p>
      </div>

      <div class="gallery-grid">
        ${d.galleryImages
          .map(
            (imgUrl, idx) => `
          <div class="gallery-box">
            <img src="${imgUrl}" alt="${businessName} Foto ${idx + 1}" loading="lazy">
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 9. SEÇÃO DE DEPOIMENTOS DE CLIENTES -->
  <section id="depoimentos" style="background: var(--bg-surface-alt);">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Depoimentos Reais</span>
        <h2 class="section-title">A opinião de quem já confia em nós</h2>
        <p class="section-subtitle">A satisfação dos nossos clientes é o nosso maior orgulho.</p>
      </div>

      <div class="test-grid">
        ${d.testimonials
          .map(
            (t) => `
          <div class="test-box">
            <div class="test-stars">
              ${Array.from({ length: t.rating })
                .map(() => icons.star)
                .join('')}
            </div>
            <p class="test-quote">"${t.text}"</p>
            <div class="test-user">
              <div class="user-avatar">${t.name.charAt(0)}</div>
              <div>
                <div style="font-weight: 700; font-size: 15px;">${t.name}</div>
                <div style="font-size: 12px; color: var(--text-muted);">${t.role}</div>
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 10. SEÇÃO DE PERGUNTAS FREQUENTES (FAQ) -->
  <section id="faq">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Tire Suas Dúvidas</span>
        <h2 class="section-title">Perguntas Frequentes</h2>
        <p class="section-subtitle">Esclareça rapidamente os questionamentos mais comuns sobre nosso atendimento.</p>
      </div>

      <div class="faq-list">
        ${d.faq
          .map(
            (f, idx) => `
          <div class="faq-item ${idx === 0 ? 'open' : ''}">
            <button class="faq-btn" type="button">
              <span>${f.question}</span>
              ${icons.chevronDown}
            </button>
            <div class="faq-ans">
              <p>${f.answer}</p>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <!-- 11. BANNER DE CHAMADA PARA AÇÃO (CTA FINAL) -->
  <section style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%); color: #FFFFFF; text-align: center; border: none; padding: 75px 0;">
    <div class="container">
      <h2 style="color: #FFFFFF; font-size: 38px; margin-bottom: 16px;">Pronto para ser atendido por especialistas?</h2>
      <p style="color: rgba(255,255,255,0.9); font-size: 18px; max-width: 600px; margin: 0 auto 32px;">
        Entre em contato agora mesmo e tire todas as suas dúvidas diretamente com nossa equipe.
      </p>
      <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-main" style="font-size: 18px; padding: 18px 36px;">
        ${icons.whatsapp}
        <span>Falar no WhatsApp Imediatamente</span>
      </a>
    </div>
  </section>

  <!-- 12. SEÇÃO DE CONTATO & FORMULÁRIO DE WHATSAPP -->
  <section id="contato">
    <div class="container">
      <div class="section-head">
        <span class="section-tag">Atendimento</span>
        <h2 class="section-title">Onde estamos e como nos contatar</h2>
      </div>

      <div class="contact-grid">
        <div class="contact-card">
          <h3 style="margin-bottom: 24px; font-size: 22px;">Canais Oficiais</h3>
          
          <div class="contact-row">
            <div class="contact-icon-box">${icons.mapPin}</div>
            <div>
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Endereço</div>
              <div style="font-size: 15px; font-weight: 600;">${address}</div>
              <div style="font-size: 13px; color: var(--text-muted);">${city}</div>
            </div>
          </div>

          <div class="contact-row">
            <div class="contact-icon-box">${icons.whatsapp}</div>
            <div>
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">WhatsApp Direto</div>
              <div style="font-size: 15px; font-weight: 600;">${overrides?.whatsapp || d.whatsapp}</div>
            </div>
          </div>

          <div class="contact-row">
            <div class="contact-icon-box">${icons.phoneIcon}</div>
            <div>
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Telefone</div>
              <div style="font-size: 15px; font-weight: 600;">${phone}</div>
            </div>
          </div>

          <div class="contact-row">
            <div class="contact-icon-box">${icons.mail}</div>
            <div>
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">E-mail</div>
              <div style="font-size: 15px; font-weight: 600;">${email}</div>
            </div>
          </div>
        </div>

        <div class="form-box">
          <h3 style="margin-bottom: 20px; font-size: 22px;">Envie uma Mensagem Direta</h3>
          <form onsubmit="handleSendLead(event)">
            <div class="input-group">
              <label class="input-label" for="clienteNome">Seu Nome</label>
              <input type="text" id="clienteNome" class="input-control" placeholder="Digite seu nome completo" required>
            </div>
            <div class="input-group">
              <label class="input-label" for="clienteTel">Seu WhatsApp</label>
              <input type="tel" id="clienteTel" class="input-control" placeholder="(DDD) 90000-0000" required>
            </div>
            <div class="input-group">
              <label class="input-label" for="clienteMensagem">Mensagem ou Dúvida</label>
              <textarea id="clienteMensagem" rows="4" class="input-control" placeholder="Escreva o que você precisa..." required></textarea>
            </div>
            <button type="submit" class="btn-main" style="width: 100%;">
              ${icons.whatsapp}
              <span>Enviar via WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- 13. RODAPÉ INSTITUCIONAL COMPLETO -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">${model.icon} ${businessName}</div>
          <p style="margin-bottom: 16px; max-width: 360px;">${slogan}</p>
          <p style="font-size: 13px;">${address} - ${city}</p>
        </div>

        <div class="footer-col">
          <h4>Navegação</h4>
          <ul class="footer-links">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a href="#servicos">Especialidades</a></li>
            <li><a href="#galeria">Galeria</a></li>
            <li><a href="#contato">Fale Conosco</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Atendimento</h4>
          <p style="margin-bottom: 8px;">WhatsApp: ${overrides?.whatsapp || d.whatsapp}</p>
          <p style="margin-bottom: 8px;">E-mail: ${email}</p>
          <p>Horário: ${hours}</p>
        </div>
      </div>

      <div class="footer-bar">
        <div>&copy; ${new Date().getFullYear()} ${businessName}. Todos os direitos reservados.</div>
        <div style="font-size: 12px; color: #64748B;">Site profissional gerado com WebStudio Pro | Pronto para Netlify e Vercel</div>
      </div>
    </div>
  </footer>

  <!-- 14. BOTÃO FLUTUANTE DE WHATSAPP -->
  <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="float-whats" aria-label="WhatsApp">
    ${icons.whatsapp}
  </a>

  <!-- 15. SCRIPTS INTERATIVOS -->
  <script>
    // Menu Mobile
    const btnMobile = document.getElementById('btnToggleMobile');
    const panelMobile = document.getElementById('panelMobile');
    if (btnMobile && panelMobile) {
      btnMobile.addEventListener('click', () => {
        panelMobile.classList.toggle('open');
      });
      panelMobile.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => panelMobile.classList.remove('open'));
      });
    }

    // Acordeão FAQ
    document.querySelectorAll('.faq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });

    // Envio do formulário direto para o WhatsApp do comércio
    function handleSendLead(e) {
      e.preventDefault();
      const nome = document.getElementById('clienteNome').value;
      const tel = document.getElementById('clienteTel').value;
      const msg = document.getElementById('clienteMensagem').value;

      const texto = "Olá! Vim através do site de " + "${businessName}" + ":\\n\\n" +
        "👤 *Nome:* " + nome + "\\n" +
        "📱 *Telefone:* " + tel + "\\n" +
        "💬 *Mensagem:* " + msg;

      const url = "https://wa.me/" + "${cleanWhatsapp}" + "?text=" + encodeURIComponent(texto);
      window.open(url, '_blank');
    }
  </script>
</body>
</html>`;
}
