import { EnrichedSiteData } from '../types';

export function generateSingleFileHtml(data: EnrichedSiteData): string {
  const {
    hero,
    about,
    services,
    differentials,
    testimonials,
    faq,
    ctaBanner,
    seo,
    businessInfo,
    templateId,
    primaryColor,
    images,
    activeSections,
  } = data;

  // Clean WhatsApp number
  const rawWhatsapp = businessInfo.whatsapp.replace(/\D/g, '');
  const cleanWhatsapp = rawWhatsapp.startsWith('55') ? rawWhatsapp : `55${rawWhatsapp}`;
  const whatsappDefaultMsg = encodeURIComponent(
    `Olá! Vi o site de ${businessInfo.name} e gostaria de saber mais informações e solicitar um orçamento.`
  );
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${whatsappDefaultMsg}`;

  // Theme specific styles and variables
  const isDark = templateId === 3 || templateId === 6 || templateId === 8;
  const isLuxury = templateId === 3 || templateId === 9;
  const isArtisan = templateId === 4 || templateId === 7;
  const isCorporate = templateId === 5;
  const isDirect = templateId === 2;
  const isNature = templateId === 7;
  const isCyber = templateId === 8;
  const isEditorial = templateId === 9;

  // Font family determination
  let fontLink = '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">';
  let fontFamily = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  let headingFont = fontFamily;

  if (isLuxury || isEditorial) {
    fontLink = '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
    headingFont = "'Playfair Display', Georgia, serif";
  }

  // Color variables
  const themePrimary = primaryColor || '#0284C7';

  // SVG Icons helper
  const svgIcons = {
    whatsapp: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 2C6.5 2 2 6.5 2 12.031c0 1.8.47 3.52 1.34 5.03L2 22l5.12-1.34c1.46.8 3.12 1.25 4.91 1.25 5.53 0 10.03-4.5 10.03-10.03S17.56 2 12.031 2zm0 18.28c-1.57 0-3.08-.42-4.4-1.2l-.32-.19-3.26.85.87-3.18-.21-.33a8.16 8.16 0 0 1-1.25-4.4c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.23 3.69 8.23 8.23 0 4.54-3.69 8.24-8.23 8.24zm4.51-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.12-.17.25-.65.8-.8 1-.15.19-.3.21-.55.09-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.11-.11.25-.28.37-.43.12-.15.16-.25.25-.42.08-.17.04-.32-.02-.45-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.3-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.12.17 1.75 2.67 4.24 3.74.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.18-.48-.3z"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mapPin: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    close: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    chevronDown: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  };

  // Schema.org JSON-LD
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    description: seo.description,
    telephone: businessInfo.whatsapp || businessInfo.phone,
    email: businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address,
      addressLocality: businessInfo.city || 'Brasil',
      addressRegion: businessInfo.state || 'BR',
      postalCode: businessInfo.cep,
      addressCountry: 'BR',
    },
    openingHours: businessInfo.hours || 'Mo-Sa 08:00-19:00',
    priceRange: '$$',
  };

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${seo.title || `${businessInfo.name} | Site Oficial`}</title>
  <meta name="description" content="${seo.description || `${businessInfo.name} - ${businessInfo.slogan}`}">
  <meta name="keywords" content="${seo.keywords || `${businessInfo.name}, ${businessInfo.segment}, orçamento`}">
  
  <!-- Open Graph / Redes Sociais -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${seo.title}">
  <meta property="og:description" content="${seo.description}">
  <meta property="og:image" content="${images.hero}">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Fontes Google -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ${fontLink}

  <!-- Schema.org para Google SEO -->
  <script type="application/ld+json">
  ${JSON.stringify(schemaOrg, null, 2)}
  </script>

  <style>
    :root {
      --primary: ${themePrimary};
      --primary-dark: ${themePrimary}dd;
      --font-body: ${fontFamily};
      --font-heading: ${headingFont};
      --bg-body: ${isDark ? '#0B0F19' : isArtisan ? '#FAF7F2' : '#FFFFFF'};
      --bg-surface: ${isDark ? '#111827' : '#FFFFFF'};
      --bg-surface-alt: ${isDark ? '#1F2937' : isArtisan ? '#F3ECE2' : '#F8FAFC'};
      --border-color: ${isDark ? '#1F2937' : isArtisan ? '#EAE0D2' : '#E2E8F0'};
      --text-main: ${isDark ? '#F9FAFB' : '#0F172A'};
      --text-muted: ${isDark ? '#9CA3AF' : '#64748B'};
      --accent-gold: ${isLuxury ? '#E5B869' : '#F59E0B'};
      --radius-sm: ${isArtisan ? '14px' : '8px'};
      --radius-md: ${isArtisan ? '20px' : '12px'};
      --radius-lg: ${isArtisan ? '32px' : '16px'};
      --shadow-card: ${isDark ? '0 10px 25px -5px rgba(0,0,0,0.5)' : '0 10px 30px -5px rgba(15, 23, 42, 0.06)'};
    }

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

    h1, h2, h3, h4, h5 {
      font-family: var(--font-heading);
      color: var(--text-main);
      line-height: 1.25;
      font-weight: 700;
    }

    a {
      color: inherit;
      text-decoration: none;
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

    /* TOP ANNOUNCEMENT BAR */
    .top-bar {
      background: ${isDark ? '#080c14' : isDirect ? '#ea580c' : isCorporate ? '#0f172a' : 'var(--primary)'};
      color: #ffffff;
      padding: 10px 0;
      font-size: 13px;
      font-weight: 500;
    }
    .top-bar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .top-bar-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* NAVBAR */
    .navbar {
      position: sticky;
      top: 0;
      background: ${isDark ? 'rgba(11, 15, 25, 0.95)' : 'rgba(255, 255, 255, 0.96)'};
      backdrop-filter: blur(12px);
      z-index: 99;
      border-bottom: 1px solid var(--border-color);
      transition: all 0.3s;
    }
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 76px;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 800;
      font-size: 20px;
      letter-spacing: -0.02em;
    }
    .brand-badge {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 99px;
      background: ${isLuxury ? 'rgba(229,184,105,0.15)' : 'rgba(2,132,199,0.1)'};
      color: ${isLuxury ? 'var(--accent-gold)' : 'var(--primary)'};
      border: 1px solid ${isLuxury ? 'var(--accent-gold)' : 'var(--primary)'};
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 32px;
      list-style: none;
    }
    .nav-link {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-muted);
      transition: color 0.2s;
    }
    .nav-link:hover {
      color: var(--primary);
    }
    .nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #25D366;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: var(--radius-sm);
      font-weight: 700;
      font-size: 14px;
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
      transition: transform 0.2s, background 0.2s;
    }
    .nav-btn:hover {
      background: #20BA5A;
      transform: translateY(-2px);
    }
    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--text-main);
      cursor: pointer;
    }

    /* HERO SECTION */
    .hero {
      position: relative;
      padding: 80px 0 100px;
      background: ${
        isDark
          ? 'radial-gradient(circle at 50% 0%, rgba(31, 41, 55, 0.7) 0%, rgba(11, 15, 25, 1) 100%)'
          : isDirect
          ? 'linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 100%)'
          : isArtisan
          ? 'linear-gradient(180deg, #FBF8F3 0%, #FAF7F2 100%)'
          : isCorporate
          ? 'linear-gradient(180deg, #F1F5F9 0%, #FFFFFF 100%)'
          : 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)'
      };
      overflow: hidden;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 56px;
      align-items: center;
    }
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(2, 132, 199, 0.08)'};
      color: ${isLuxury ? 'var(--accent-gold)' : 'var(--primary)'};
      border: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(2, 132, 199, 0.2)'};
      margin-bottom: 20px;
    }
    .hero h1 {
      font-size: 48px;
      letter-spacing: -0.03em;
      margin-bottom: 20px;
      color: ${isDark ? '#FFFFFF' : '#0F172A'};
    }
    ${isLuxury ? '.hero h1 { font-family: var(--font-heading); font-style: italic; }' : ''}
    .hero-subtitle {
      font-size: 18px;
      color: var(--text-muted);
      margin-bottom: 32px;
      max-width: 560px;
    }
    .hero-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 36px;
    }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #25D366;
      color: #ffffff;
      padding: 16px 30px;
      border-radius: var(--radius-sm);
      font-size: 16px;
      font-weight: 700;
      box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn-primary:hover {
      background: #1EBE5D;
      transform: translateY(-2px);
      box-shadow: 0 14px 28px rgba(37, 211, 102, 0.5);
    }
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: ${isDark ? '#1F2937' : '#FFFFFF'};
      color: var(--text-main);
      padding: 16px 26px;
      border-radius: var(--radius-sm);
      font-size: 15px;
      font-weight: 600;
      border: 1px solid var(--border-color);
      transition: all 0.2s;
    }
    .btn-secondary:hover {
      background: ${isDark ? '#374151' : '#F1F5F9'};
    }
    .hero-trust {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      padding-top: 24px;
      border-top: 1px solid var(--border-color);
    }
    .trust-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
    }
    .trust-icon {
      color: #10B981;
    }
    .hero-media {
      position: relative;
    }
    .hero-img-wrap {
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-card);
      border: 1px solid var(--border-color);
    }
    .hero-img {
      width: 100%;
      height: 480px;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .hero-float-badge {
      position: absolute;
      bottom: -20px;
      left: -20px;
      background: ${isDark ? '#111827' : '#FFFFFF'};
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }
    .badge-icon-box {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(37, 211, 102, 0.15);
      color: #25D366;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* SECTIONS COMMON */
    section {
      padding: 90px 0;
      border-bottom: 1px solid var(--border-color);
    }
    .section-header {
      text-align: center;
      max-width: 680px;
      margin: 0 auto 56px;
    }
    .section-tag {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: ${isLuxury ? 'var(--accent-gold)' : 'var(--primary)'};
      margin-bottom: 12px;
      display: inline-block;
    }
    .section-title {
      font-size: 36px;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    .section-desc {
      color: var(--text-muted);
      font-size: 16px;
    }

    /* SERVICES GRID */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 28px;
    }
    .service-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 32px 28px;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-card);
      border-color: var(--primary);
    }
    .service-badge {
      position: absolute;
      top: 18px;
      right: 18px;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 99px;
      background: rgba(37, 211, 102, 0.1);
      color: #16A34A;
    }
    .service-title {
      font-size: 20px;
      margin-bottom: 12px;
    }
    .service-desc {
      color: var(--text-muted);
      font-size: 14px;
      margin-bottom: 20px;
      flex-grow: 1;
    }
    .service-features {
      list-style: none;
      margin-bottom: 24px;
    }
    .service-feature {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-main);
      margin-bottom: 8px;
    }
    .service-feature svg {
      color: #10B981;
      flex-shrink: 0;
    }
    .service-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 18px;
      border-top: 1px solid var(--border-color);
    }
    .service-price {
      font-weight: 800;
      font-size: 16px;
      color: ${isLuxury ? 'var(--accent-gold)' : 'var(--primary)'};
    }
    .btn-sm-whatsapp {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 700;
      color: #25D366;
      background: rgba(37, 211, 102, 0.1);
      padding: 8px 14px;
      border-radius: var(--radius-sm);
      transition: background 0.2s;
    }
    .btn-sm-whatsapp:hover {
      background: rgba(37, 211, 102, 0.2);
    }

    /* ABOUT US */
    .about-grid {
      display: grid;
      grid-template-columns: 0.95fr 1.05fr;
      gap: 60px;
      align-items: center;
    }
    .about-img-box {
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-card);
    }
    .about-img-box img {
      width: 100%;
      height: 460px;
      object-fit: cover;
    }
    .about-text p {
      color: var(--text-muted);
      font-size: 16px;
      margin-bottom: 20px;
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 36px;
      padding-top: 28px;
      border-top: 1px solid var(--border-color);
    }
    .stat-box {
      text-align: left;
    }
    .stat-num {
      font-size: 32px;
      font-weight: 800;
      color: ${isLuxury ? 'var(--accent-gold)' : 'var(--primary)'};
      line-height: 1;
      margin-bottom: 6px;
    }
    .stat-label {
      font-size: 13px;
      color: var(--text-muted);
      font-weight: 500;
    }

    /* DIFFERENTIALS */
    .diff-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 28px;
    }
    .diff-card {
      background: var(--bg-surface-alt);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 28px;
    }
    .diff-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: ${isLuxury ? 'rgba(229,184,105,0.15)' : 'rgba(2, 132, 199, 0.1)'};
      color: ${isLuxury ? 'var(--accent-gold)' : 'var(--primary)'};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
    }
    .diff-title {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .diff-desc {
      color: var(--text-muted);
      font-size: 14px;
    }

    /* GALLERY */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .gallery-item {
      border-radius: var(--radius-md);
      overflow: hidden;
      height: 260px;
      border: 1px solid var(--border-color);
    }
    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .gallery-item:hover img {
      transform: scale(1.05);
    }

    /* TESTIMONIALS */
    .test-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 28px;
    }
    .test-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 32px;
      box-shadow: var(--shadow-card);
    }
    .test-stars {
      display: flex;
      gap: 4px;
      color: #FBBF24;
      margin-bottom: 16px;
    }
    .test-content {
      font-size: 15px;
      font-style: italic;
      color: var(--text-main);
      margin-bottom: 24px;
    }
    .test-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .test-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--primary);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 16px;
    }
    .test-name {
      font-size: 15px;
      font-weight: 700;
    }
    .test-role {
      font-size: 12px;
      color: var(--text-muted);
    }

    /* FAQ ACCORDION */
    .faq-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .faq-item {
      border: 1px solid var(--border-color);
      background: var(--bg-surface);
      border-radius: var(--radius-sm);
      margin-bottom: 14px;
      overflow: hidden;
    }
    .faq-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      font-size: 16px;
      font-weight: 700;
      color: var(--text-main);
    }
    .faq-header svg {
      transition: transform 0.3s ease;
      color: var(--text-muted);
      flex-shrink: 0;
    }
    .faq-item.active .faq-header svg {
      transform: rotate(180deg);
      color: var(--primary);
    }
    .faq-body {
      padding: 0 24px 20px;
      display: none;
      color: var(--text-muted);
      font-size: 14px;
      line-height: 1.6;
    }
    .faq-item.active .faq-body {
      display: block;
    }

    /* CTA BANNER */
    .cta-banner {
      background: ${
        isDark
          ? 'linear-gradient(135deg, #111827 0%, #1F2937 100%)'
          : isDirect
          ? 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)'
          : isCorporate
          ? 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)'
          : 'linear-gradient(135deg, var(--primary) 0%, #0369A1 100%)'
      };
      color: #ffffff;
      padding: 80px 0;
      text-align: center;
      border: none;
    }
    .cta-banner h2 {
      color: #ffffff;
      font-size: 40px;
      margin-bottom: 16px;
    }
    .cta-banner p {
      color: rgba(255, 255, 255, 0.85);
      font-size: 18px;
      max-width: 600px;
      margin: 0 auto 36px;
    }

    /* LOCATION & CONTACT */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
    }
    .contact-info-card {
      background: var(--bg-surface-alt);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 36px;
    }
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 24px;
    }
    .contact-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: ${isDark ? '#1F2937' : '#FFFFFF'};
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1px solid var(--border-color);
    }
    .contact-title {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 4px;
    }
    .contact-val {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-main);
    }

    /* CONTACT FORM */
    .contact-form {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 36px;
      box-shadow: var(--shadow-card);
    }
    .form-group {
      margin-bottom: 20px;
    }
    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      color: var(--text-main);
    }
    .form-input, .form-textarea {
      width: 100%;
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: var(--bg-body);
      color: var(--text-main);
      font-family: inherit;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-input:focus, .form-textarea:focus {
      border-color: var(--primary);
    }

    /* FOOTER */
    .site-footer {
      background: ${isDark ? '#080C14' : '#0F172A'};
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
    .footer-bottom {
      padding-top: 30px;
      border-top: 1px solid #1E293B;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    /* FLOATING WHATSAPP BUTTON */
    .whatsapp-float {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 60px;
      height: 60px;
      background: #25D366;
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45);
      z-index: 999;
      transition: transform 0.3s ease;
      cursor: pointer;
    }
    .whatsapp-float:hover {
      transform: scale(1.1);
    }
    .whatsapp-float::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #25D366;
      opacity: 0.5;
      animation: pulse-ring 2s infinite;
      z-index: -1;
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.95); opacity: 0.7; }
      50% { transform: scale(1.35); opacity: 0; }
      100% { transform: scale(0.95); opacity: 0; }
    }

    /* MOBILE RESPONSIVENESS */
    @media (max-width: 900px) {
      .hero-grid, .about-grid, .contact-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .hero h1 {
        font-size: 34px;
      }
      .hero-img {
        height: 340px;
      }
      .stats-row {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .footer-grid {
        grid-template-columns: 1fr;
      }
      .nav-links, .nav-btn {
        display: none;
      }
      .mobile-menu-btn {
        display: block;
      }
      .mobile-nav {
        display: none;
        position: absolute;
        top: 76px;
        left: 0;
        width: 100%;
        background: ${isDark ? '#0B0F19' : '#FFFFFF'};
        border-bottom: 1px solid var(--border-color);
        padding: 24px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      }
      .mobile-nav.open {
        display: block;
      }
      .mobile-nav a {
        display: block;
        padding: 12px 0;
        font-weight: 600;
        border-bottom: 1px solid var(--border-color);
      }
      .mobile-nav .nav-btn {
        display: flex;
        justify-content: center;
        margin-top: 16px;
      }
    }
  </style>
</head>
<body>

  <!-- TOP BAR -->
  <div class="top-bar">
    <div class="container top-bar-content">
      <div class="top-bar-item">
        ${svgIcons.mapPin}
        <span>${businessInfo.address ? `${businessInfo.address} - ${businessInfo.city || ''}` : 'Atendimento em toda a região'}</span>
      </div>
      <div class="top-bar-item">
        ${svgIcons.clock}
        <span>${businessInfo.hours || 'Segunda a Sábado das 08h às 19h'}</span>
      </div>
    </div>
  </div>

  <!-- NAVBAR -->
  <nav class="navbar">
    <div class="container nav-container">
      <a href="#" class="brand-logo">
        <span>${businessInfo.name}</span>
        <span class="brand-badge">${businessInfo.segment || 'Oficial'}</span>
      </a>

      <ul class="nav-links">
        ${activeSections.about ? '<li><a href="#sobre" class="nav-link">Sobre</a></li>' : ''}
        ${activeSections.services ? '<li><a href="#servicos" class="nav-link">Serviços</a></li>' : ''}
        ${activeSections.testimonials ? '<li><a href="#depoimentos" class="nav-link">Depoimentos</a></li>' : ''}
        ${activeSections.faq ? '<li><a href="#faq" class="nav-link">Dúvidas</a></li>' : ''}
        ${activeSections.location ? '<li><a href="#contato" class="nav-link">Contato</a></li>' : ''}
      </ul>

      <a href="${whatsappUrl}" onclick="openWhatsAppSmart(); return false;" target="_blank" rel="noopener noreferrer" class="nav-btn">
        ${svgIcons.whatsapp}
        <span>Falar no WhatsApp</span>
      </a>

      <button class="mobile-menu-btn" id="mobileMenuToggle" aria-label="Abrir Menu">
        ${svgIcons.menu}
      </button>
    </div>

    <!-- MOBILE MENU DRAWER -->
    <div class="mobile-nav" id="mobileNav">
      ${activeSections.about ? '<a href="#sobre">Sobre Nós</a>' : ''}
      ${activeSections.services ? '<a href="#servicos">Nossos Serviços</a>' : ''}
      ${activeSections.testimonials ? '<a href="#depoimentos">Depoimentos</a>' : ''}
      ${activeSections.faq ? '<a href="#faq">Perguntas Frequentes</a>' : ''}
      ${activeSections.location ? '<a href="#contato">Endereço e Contato</a>' : ''}
      <a href="${whatsappUrl}" onclick="openWhatsAppSmart(); return false;" target="_blank" rel="noopener noreferrer" class="nav-btn">
        ${svgIcons.whatsapp} Falar no WhatsApp
      </a>
    </div>
  </nav>

  <!-- HERO SECTION -->
  ${
    activeSections.hero
      ? `
  <section class="hero" id="inicio">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-tag">
            ${svgIcons.shield}
            <span>${hero.badge || 'Atendimento com Excelência'}</span>
          </div>
          <h1>${hero.headline || `${businessInfo.name}: Qualidade Garantida`}</h1>
          <p class="hero-subtitle">${hero.subheadline || businessInfo.slogan}</p>
          
          <div class="hero-actions">
            <a href="${whatsappUrl}" onclick="openWhatsAppSmart(); return false;" target="_blank" rel="noopener noreferrer" class="btn-primary">
              ${svgIcons.whatsapp}
              <span>${hero.ctaPrimary || 'Solicitar Orçamento no WhatsApp'}</span>
            </a>
            ${
              activeSections.services
                ? `<a href="#servicos" class="btn-secondary">${hero.ctaSecondary || 'Ver Nossos Serviços'}</a>`
                : ''
            }
          </div>

          <div class="hero-trust">
            ${(hero.trustItems || ['Atendimento Personalizado', 'Garantia de Qualidade', 'Orçamento Rápido'])
              .map(
                (item) => `
              <div class="trust-item">
                <span class="trust-icon">${svgIcons.check}</span>
                <span>${item}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="hero-media">
          <div class="hero-img-wrap">
            <img src="${images.hero}" alt="${businessInfo.name}" class="hero-img" loading="eager">
          </div>
          <div class="hero-float-badge">
            <div class="badge-icon-box">
              ${svgIcons.whatsapp}
            </div>
            <div>
              <div style="font-weight: 800; font-size: 15px; color: var(--text-main);">Resposta Imediata</div>
              <div style="font-size: 12px; color: var(--text-muted);">Atendimento direto via WhatsApp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
      : ''
  }

  <!-- ABOUT SECTION -->
  ${
    activeSections.about
      ? `
  <section id="sobre">
    <div class="container">
      <div class="about-grid">
        <div class="about-img-box">
          <img src="${images.about}" alt="Sobre ${businessInfo.name}" loading="lazy">
        </div>
        <div class="about-text">
          <span class="section-tag">${about.badge || 'Nossa História & Compromisso'}</span>
          <h2 class="section-title">${about.title || `Conheça a ${businessInfo.name}`}</h2>
          <p>${about.paragraph1}</p>
          <p>${about.paragraph2}</p>
          
          <div class="stats-row">
            ${(about.stats || [
              { value: '+10', label: 'Anos de Tradição' },
              { value: '100%', label: 'Clientes Satisfeitos' },
              { value: '+2.500', label: 'Atendimentos Realizados' },
            ])
              .map(
                (stat) => `
              <div class="stat-box">
                <div class="stat-num">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
  `
      : ''
  }

  <!-- SERVICES SECTION -->
  ${
    activeSections.services
      ? `
  <section id="servicos" style="background: var(--bg-surface-alt);">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Especialidades & Soluções</span>
        <h2 class="section-title">O que podemos fazer por você</h2>
        <p class="section-desc">Serviços e produtos desenvolvidos com rigor técnico, pontualidade e os melhores materiais do mercado.</p>
      </div>

      <div class="services-grid">
        ${services
          .map(
            (srv) => `
          <div class="service-card">
            ${srv.badge ? `<span class="service-badge">${srv.badge}</span>` : ''}
            <h3 class="service-title">${srv.title}</h3>
            <p class="service-desc">${srv.description}</p>
            
            ${
              srv.features && srv.features.length > 0
                ? `
              <ul class="service-features">
                ${srv.features
                  .map(
                    (f) => `
                  <li class="service-feature">
                    ${svgIcons.check}
                    <span>${f}</span>
                  </li>
                `
                  )
                  .join('')}
              </ul>
            `
                : ''
            }

            <div class="service-footer">
              <span class="service-price">${srv.price || 'Sob Consulta'}</span>
              <a href="${whatsappUrl}" onclick="openWhatsAppSmart(); return false;" target="_blank" rel="noopener noreferrer" class="btn-sm-whatsapp">
                ${svgIcons.whatsapp} Orçar
              </a>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>
  `
      : ''
  }

  <!-- DIFFERENTIALS -->
  ${
    activeSections.differentials
      ? `
  <section id="diferenciais">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Nossos Diferenciais</span>
        <h2 class="section-title">Por que escolher a nossa empresa?</h2>
        <p class="section-desc">Nosso compromisso é entregar a melhor experiência, com transparência total e garantia.</p>
      </div>

      <div class="diff-grid">
        ${differentials
          .map(
            (diff) => `
          <div class="diff-card">
            <div class="diff-icon">
              ${svgIcons.shield}
            </div>
            <h3 class="diff-title">${diff.title}</h3>
            <p class="diff-desc">${diff.description}</p>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>
  `
      : ''
  }

  <!-- GALLERY -->
  ${
    activeSections.gallery && images.gallery && images.gallery.length > 0
      ? `
  <section id="galeria" style="background: var(--bg-surface-alt);">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Nosso Espaço & Trabalhos</span>
        <h2 class="section-title">Galeria de Fotos</h2>
        <p class="section-desc">Confira um pouco do nosso dia a dia, estrutura e resultados impecáveis.</p>
      </div>

      <div class="gallery-grid">
        ${images.gallery
          .map(
            (imgUrl, idx) => `
          <div class="gallery-item">
            <img src="${imgUrl}" alt="${businessInfo.name} - Imagem ${idx + 1}" loading="lazy">
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>
  `
      : ''
  }

  <!-- TESTIMONIALS -->
  ${
    activeSections.testimonials
      ? `
  <section id="depoimentos">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Avaliações Reais</span>
        <h2 class="section-title">O que dizem os nossos clientes</h2>
        <p class="section-desc">A satisfação de quem confia no nosso trabalho é o nosso maior patrimônio.</p>
      </div>

      <div class="test-grid">
        ${testimonials
          .map(
            (t) => `
          <div class="test-card">
            <div class="test-stars">
              ${Array.from({ length: t.rating || 5 })
                .map(() => svgIcons.star)
                .join('')}
            </div>
            <p class="test-content">"${t.content}"</p>
            <div class="test-author">
              <div class="test-avatar">
                ${t.name.charAt(0)}
              </div>
              <div>
                <div class="test-name">${t.name}</div>
                <div class="test-role">${t.role || 'Cliente Verificado'}</div>
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>
  `
      : ''
  }

  <!-- FAQ SECTION -->
  ${
    activeSections.faq
      ? `
  <section id="faq" style="background: var(--bg-surface-alt);">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Perguntas Frequentes</span>
        <h2 class="section-title">Tire todas as suas dúvidas</h2>
        <p class="section-desc">Respostas rápidas para as questões mais comuns dos nossos clientes.</p>
      </div>

      <div class="faq-container">
        ${faq
          .map(
            (item, index) => `
          <div class="faq-item ${index === 0 ? 'active' : ''}">
            <button class="faq-header" type="button">
              <span>${item.question}</span>
              ${svgIcons.chevronDown}
            </button>
            <div class="faq-body">
              <p>${item.answer}</p>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>
  `
      : ''
  }

  <!-- CTA CALL TO ACTION BANNER -->
  <section class="cta-banner">
    <div class="container">
      <h2>${ctaBanner.title || 'Pronto para transformar sua experiência?'}</h2>
      <p>${ctaBanner.subtitle || `Fale agora mesmo com a equipe de ${businessInfo.name} e receba atendimento imediato.`}</p>
      <a href="${whatsappUrl}" onclick="openWhatsAppSmart(); return false;" target="_blank" rel="noopener noreferrer" class="btn-primary" style="background: #25D366; font-size: 18px; padding: 18px 36px;">
        ${svgIcons.whatsapp}
        <span>${ctaBanner.buttonText || 'Chamar no WhatsApp Agora'}</span>
      </a>
    </div>
  </section>

  <!-- LOCATION & CONTACT -->
  ${
    activeSections.location
      ? `
  <section id="contato">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Fale Conosco</span>
        <h2 class="section-title">Venha nos visitar ou mande uma mensagem</h2>
        <p class="section-desc">Estamos à sua disposição para esclarecer dúvidas e prestar o melhor atendimento.</p>
      </div>

      <div class="contact-grid">
        <div class="contact-info-card">
          <h3 style="font-size: 22px; margin-bottom: 24px;">Informações de Contato</h3>
          
          <div class="contact-item">
            <div class="contact-icon">${svgIcons.mapPin}</div>
            <div>
              <div class="contact-title">Endereço</div>
              <div class="contact-val">${businessInfo.address || 'Atendimento local e sob demanda'}</div>
              ${businessInfo.city ? `<div style="font-size: 14px; color: var(--text-muted);">${businessInfo.city} - ${businessInfo.state || 'Brasil'}</div>` : ''}
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon">${svgIcons.whatsapp}</div>
            <div>
              <div class="contact-title">WhatsApp Oficial</div>
              <div class="contact-val">${businessInfo.whatsapp}</div>
            </div>
          </div>

          ${
            businessInfo.phone
              ? `
          <div class="contact-item">
            <div class="contact-icon">${svgIcons.phone}</div>
            <div>
              <div class="contact-title">Telefone Comercial</div>
              <div class="contact-val">${businessInfo.phone}</div>
            </div>
          </div>
          `
              : ''
          }

          ${
            businessInfo.email
              ? `
          <div class="contact-item">
            <div class="contact-icon">${svgIcons.mail}</div>
            <div>
              <div class="contact-title">E-mail</div>
              <div class="contact-val">${businessInfo.email}</div>
            </div>
          </div>
          `
              : ''
          }

          <div class="contact-item">
            <div class="contact-icon">${svgIcons.clock}</div>
            <div>
              <div class="contact-title">Horário de Funcionamento</div>
              <div class="contact-val">${businessInfo.hours || 'Segunda a Sábado das 08h às 19h'}</div>
            </div>
          </div>
        </div>

        <!-- CONTACT FORM WITH WHATSAPP DISPATCH -->
        <div class="contact-form">
          <h3 style="font-size: 22px; margin-bottom: 20px;">Envie uma Mensagem Rápida</h3>
          <form id="leadContactForm" onsubmit="handleFormSubmit(event)">
            <div class="form-group">
              <label class="form-label" for="formName">Seu Nome Completo</label>
              <input type="text" id="formName" class="form-input" placeholder="Ex: Carlos Oliveira" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="formPhone">Seu Telefone / WhatsApp</label>
              <input type="tel" id="formPhone" class="form-input" placeholder="Ex: (11) 98765-4321" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="formMessage">Como podemos ajudar?</label>
              <textarea id="formMessage" class="form-textarea" rows="4" placeholder="Descreva o que você precisa ou qual serviço tem interesse..." required></textarea>
            </div>

            <button type="submit" class="btn-primary" style="width: 100%;">
              ${svgIcons.whatsapp}
              <span>Enviar via WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  `
      : ''
  }

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">${businessInfo.name}</div>
          <p style="margin-bottom: 16px; max-width: 380px;">${businessInfo.slogan}</p>
          <p style="font-size: 13px;">${businessInfo.address ? `${businessInfo.address} - ${businessInfo.city || ''}` : ''}</p>
        </div>

        <div class="footer-col">
          <h4>Navegação Rápida</h4>
          <ul class="footer-links">
            <li><a href="#inicio">Início</a></li>
            ${activeSections.about ? '<li><a href="#sobre">Sobre Nós</a></li>' : ''}
            ${activeSections.services ? '<li><a href="#servicos">Nossos Serviços</a></li>' : ''}
            ${activeSections.testimonials ? '<li><a href="#depoimentos">Depoimentos</a></li>' : ''}
            ${activeSections.location ? '<li><a href="#contato">Fale Conosco</a></li>' : ''}
          </ul>
        </div>

        <div class="footer-col">
          <h4>Atendimento</h4>
          <p style="margin-bottom: 8px;"><strong>WhatsApp:</strong> ${businessInfo.whatsapp}</p>
          ${businessInfo.email ? `<p style="margin-bottom: 8px;"><strong>E-mail:</strong> ${businessInfo.email}</p>` : ''}
          <p style="margin-bottom: 8px;"><strong>Horário:</strong> ${businessInfo.hours}</p>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          &copy; ${new Date().getFullYear()} ${businessInfo.name}. Todos os direitos reservados.
        </div>
        <div style="font-size: 12px; color: #64748B;">
          Site desenvolvido profissionalmente | Pronto para Netlify e Vercel
        </div>
      </div>
    </div>
  </footer>

  <!-- FLOATING WHATSAPP BUTTON -->
  ${
    activeSections.whatsappFloat
      ? `
  <a href="${whatsappUrl}" onclick="openWhatsAppSmart(); return false;" target="_blank" rel="noopener noreferrer" class="whatsapp-float" aria-label="Falar no WhatsApp">
    ${svgIcons.whatsapp}
  </a>
  `
      : ''
  }

  <!-- INTERACTIVE CLIENT SCRIPT -->
  <script>
    // Toggle Mobile Navigation
    const mobileBtn = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileBtn && mobileNav) {
      mobileBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
      });
      // Close on link click
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
        });
      });
    }

    // Toggle FAQ Accordion
    document.querySelectorAll('.faq-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });

    // Função Inteligente Anti-Bloqueio do WhatsApp (Resolve ERR_BLOCKED_BY_RESPONSE)
    function openWhatsAppSmart(customText) {
      const phone = "${cleanWhatsapp}";
      const defaultText = "Olá! Vi o site de " + ${JSON.stringify(businessInfo.name)} + " e gostaria de saber mais informações e solicitar um orçamento.";
      const text = customText || defaultText;
      const encoded = encodeURIComponent(text);

      const isMobile = /Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry/i.test(navigator.userAgent);

      // No computador abre o WhatsApp Web diretamente, eliminando o bloqueio de api.whatsapp.com!
      // No celular abre wa.me que chama o app nativo
      const targetUrl = isMobile
        ? "https://wa.me/" + phone + "?text=" + encoded
        : "https://web.whatsapp.com/send?phone=" + phone + "&text=" + encoded;

      const a = document.createElement('a');
      a.href = targetUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 500);
    }

    // Handle Contact Form Submit -> Direct to WhatsApp
    function handleFormSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('formName').value;
      const phone = document.getElementById('formPhone').value;
      const message = document.getElementById('formMessage').value;

      const fullMessage = "Olá! Vim através do site de " + ${JSON.stringify(businessInfo.name)} + ":\\n\\n" +
        "👤 *Nome:* " + name + "\\n" +
        "📱 *Telefone:* " + phone + "\\n" +
        "💬 *Mensagem:* " + message;

      openWhatsAppSmart(fullMessage);
    }
  </script>
</body>
</html>`;
}
