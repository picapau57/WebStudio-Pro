export interface BusinessSegment {
  id: string;
  name: string;
  shortName: string;
  category: string;
  icon: string;
  sampleSlogan: string;
  samplePrompt: string;
  defaultColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  sampleServices: {
    title: string;
    description: string;
    price: string;
  }[];
  heroImage: string;
  aboutImage: string;
  galleryImages: string[];
}

export interface WebsiteTemplate {
  id: number;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  themeStyle: 'minimal' | 'direct' | 'luxury' | 'artisan' | 'corporate' | 'creative';
  bestFor: string;
  previewBg: string;
  previewAccent: string;
}

export interface SiteFormData {
  segmentId: string;
  customSegment?: string;
  businessName: string;
  slogan: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  hours: string;
  templateId: number;
  colorTheme: string;
  customPrimaryColor: string;
  prompt: string;
  activeSections: {
    hero: boolean;
    about: boolean;
    services: boolean;
    differentials: boolean;
    gallery: boolean;
    testimonials: boolean;
    faq: boolean;
    location: boolean;
    contactForm: boolean;
    whatsappFloat: boolean;
  };
}

export interface EnrichedSiteData {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustItems: string[];
  };
  about: {
    badge: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  services: {
    id: string;
    title: string;
    description: string;
    price: string;
    badge?: string;
    features: string[];
  }[];
  differentials: {
    title: string;
    description: string;
  }[];
  testimonials: {
    name: string;
    role: string;
    content: string;
    rating: number;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  ctaBanner: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  businessInfo: {
    name: string;
    segment: string;
    slogan: string;
    address: string;
    city: string;
    state: string;
    cep: string;
    whatsapp: string;
    phone: string;
    email: string;
    instagram: string;
    hours: string;
  };
  templateId: number;
  primaryColor: string;
  images: {
    hero: string;
    about: string;
    gallery: string[];
  };
  activeSections: SiteFormData['activeSections'];
}

export interface SavedProject {
  id: string;
  createdAt: string;
  updatedAt: string;
  businessName: string;
  segmentName: string;
  templateId: number;
  formData: SiteFormData;
  enrichedData: EnrichedSiteData;
  htmlCode: string;
}
