import React, { useState } from 'react';
import { SEGMENT_MODELS, SegmentModelConfig } from '../data/models12';
import { WEBSITE_TEMPLATES } from '../data/templates';
import { SiteFormData } from '../types';
import {
  Sparkles,
  Building2,
  MapPin,
  Phone,
  Clock,
  Palette,
  CheckSquare,
  Wand2,
  FileText,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface PromptBuilderFormProps {
  initialModel?: SegmentModelConfig | null;
  onGenerateSite: (formData: SiteFormData) => void;
  isGenerating: boolean;
}

export const PromptBuilderForm: React.FC<PromptBuilderFormProps> = ({
  initialModel,
  onGenerateSite,
  isGenerating,
}) => {
  // Form State
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>(
    initialModel?.id || SEGMENT_MODELS[0].id
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>(1);
  const [businessName, setBusinessName] = useState<string>(
    initialModel?.defaultData.businessName || 'Bella Itália Pizzaria & Forneria'
  );
  const [slogan, setSlogan] = useState<string>(
    initialModel?.defaultData.slogan ||
      'Massas artesanais de fermentação natural de 48h e forno a lenha tradicional'
  );
  const [address, setAddress] = useState<string>(
    initialModel?.defaultData.address || 'Rua das Oliveiras, 450 - Jardins'
  );
  const [city, setCity] = useState<string>(
    initialModel?.defaultData.city || 'São Paulo - SP'
  );
  const [whatsapp, setWhatsapp] = useState<string>(
    initialModel?.defaultData.whatsapp || '(11) 98765-4321'
  );
  const [phone, setPhone] = useState<string>(
    initialModel?.defaultData.phone || '(11) 3456-7890'
  );
  const [email, setEmail] = useState<string>(
    initialModel?.defaultData.email || 'contato@bellaitaliapizza.com.br'
  );
  const [instagram, setInstagram] = useState<string>('@bellaitaliapizza');
  const [hours, setHours] = useState<string>(
    initialModel?.defaultData.hours || 'Terça a Domingo das 18h30 às 23h30'
  );
  const [customPrimaryColor, setCustomPrimaryColor] = useState<string>(
    initialModel?.primaryColor || '#E11D48'
  );

  // Prompt / Detailed notes
  const [prompt, setPrompt] = useState<string>(
    initialModel
      ? `Somos ${initialModel.defaultData.businessName}, especializados em ${initialModel.segmentName}. Oferecemos serviços de alta qualidade com garantia, atendimento via WhatsApp e entrega rápida. Diferenciais: mais de 10 anos de experiência, profissionais certificados e facilidade de pagamento no cartão e PIX.`
      : 'Pizzaria e restaurante com forno a lenha tradicional, ingredientes italianos importados, atendimento no salão e delivery com embalagem térmica especial. Promoção de terça a quinta-feira.'
  );

  // Active Sections
  const [activeSections, setActiveSections] = useState({
    hero: true,
    about: true,
    services: true,
    differentials: true,
    gallery: true,
    testimonials: true,
    faq: true,
    location: true,
    contactForm: true,
    whatsappFloat: true,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Sync when initialModel changes
  React.useEffect(() => {
    if (initialModel) {
      setSelectedSegmentId(initialModel.id);
      setBusinessName(initialModel.defaultData.businessName);
      setSlogan(initialModel.defaultData.slogan);
      setAddress(initialModel.defaultData.address);
      setCity(initialModel.defaultData.city);
      setWhatsapp(initialModel.defaultData.whatsapp);
      setPhone(initialModel.defaultData.phone);
      setEmail(initialModel.defaultData.email);
      setHours(initialModel.defaultData.hours);
      setCustomPrimaryColor(initialModel.primaryColor);
      setPrompt(
        `Somos ${initialModel.defaultData.businessName}, referência no segmento de ${initialModel.segmentName}. ${initialModel.defaultData.heroSubtitle} Nossos principais diferenciais: atendimento ágil pelo WhatsApp, produtos de primeiríssima qualidade e compromisso total com a satisfação do cliente.`
      );
    }
  }, [initialModel]);

  // Handle Segment Change
  const handleSegmentChange = (segId: string) => {
    setSelectedSegmentId(segId);
    const found = SEGMENT_MODELS.find((m) => m.id === segId);
    if (found) {
      setBusinessName(found.defaultData.businessName);
      setSlogan(found.defaultData.slogan);
      setAddress(found.defaultData.address);
      setCity(found.defaultData.city);
      setWhatsapp(found.defaultData.whatsapp);
      setPhone(found.defaultData.phone);
      setEmail(found.defaultData.email);
      setHours(found.defaultData.hours);
      setCustomPrimaryColor(found.primaryColor);
      setPrompt(
        `Somos ${found.defaultData.businessName}, especialistas em ${found.segmentName}. ${found.defaultData.heroSubtitle}`
      );
    }
  };

  const handleInsertPromptTemplate = () => {
    const found = SEGMENT_MODELS.find((m) => m.id === selectedSegmentId);
    if (found) {
      setPrompt(
        `Somos ${businessName || found.defaultData.businessName}, referência em ${found.segmentName}. ` +
          `História: ${found.defaultData.aboutText1} ` +
          `Serviços e Especialidades: ${found.defaultData.services.map((s) => `${s.title} (${s.price})`).join(', ')}. ` +
          `Horário de atendimento: ${hours}. Atendemos clientes locais e pedidos direto pelo WhatsApp com confirmação imediata.`
      );
    }
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!businessName.trim()) {
      errors.businessName = 'O nome do comércio é obrigatório.';
    }
    if (!whatsapp.trim()) {
      errors.whatsapp = 'O número de WhatsApp é obrigatório para as conversões.';
    }
    if (!prompt.trim()) {
      errors.prompt = 'Descreva seu comércio e anotações no prompt.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    onGenerateSite({
      segmentId: selectedSegmentId,
      businessName,
      slogan,
      address,
      city,
      state: 'SP',
      cep: '01000-000',
      whatsapp,
      phone,
      email,
      instagram,
      hours,
      templateId: selectedTemplateId,
      colorTheme: 'Custom',
      customPrimaryColor,
      prompt,
      activeSections,
    });
  };

  const toggleSection = (key: keyof typeof activeSections) => {
    setActiveSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold mb-3">
          <Wand2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Criador de Site via Prompt Inteligente</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Preencha as Anotações do Comércio & Crie o Site
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          Descreva o que o comércio oferece no campo de prompt. O sistema gera um
          código HTML único completo com seções, fotos temáticas e links de
          WhatsApp funcionando.
        </p>
      </div>

      <form onSubmit={validateAndSubmit} className="space-y-8">
        {/* STEP 1: Select Segment */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black">
                1
              </span>
              <span>Escolha o Segmento do Comércio (12 Nichos Disponíveis)</span>
            </label>
            <span className="text-xs text-slate-500">
              Adapta textos e fotos automaticamente
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {SEGMENT_MODELS.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => handleSegmentChange(m.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  selectedSegmentId === m.id
                    ? 'bg-sky-500/15 border-sky-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="text-xl flex-shrink-0">{m.icon}</span>
                <div className="truncate">
                  <div className="text-xs font-bold truncate leading-tight text-white">
                    {m.segmentName}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Mod. {m.number}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2: Choose Template / Model Architecture */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black">
                2
              </span>
              <span>Selecione o Estilo Arquitetural do Site (6 Modelos)</span>
            </label>
            <span className="text-xs text-slate-500">
              Define a estrutura visual e atmosfera
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {WEBSITE_TEMPLATES.map((tmpl) => (
              <button
                type="button"
                key={tmpl.id}
                onClick={() => setSelectedTemplateId(tmpl.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  selectedTemplateId === tmpl.id
                    ? 'bg-sky-500/10 border-sky-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-xs text-white">
                      {tmpl.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-sky-400 border border-slate-700">
                      {tmpl.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mb-2">
                    {tmpl.tagline}
                  </p>
                </div>
                <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
                  Ideal para: {tmpl.bestFor.slice(0, 45)}...
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* STEP 3: Business Information Fields */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black">
                3
              </span>
              <span>Dados Obrigatórios e Anotações Comerciais</span>
            </label>
            <span className="text-xs text-amber-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Campos obrigatórios com (*)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome do Comércio */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nome do Comércio / Empresa *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ex: Pica-Pau Informática & Tech"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <Building2 className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
              {formErrors.businessName && (
                <p className="text-xs text-rose-400 mt-1">
                  {formErrors.businessName}
                </p>
              )}
            </div>

            {/* Slogan */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Slogan / Frase Comercial de Impacto
              </label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="Ex: Qualidade, rapidez e o melhor atendimento"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                WhatsApp Comercial com DDD * (Gera link automático)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ex: (11) 98765-4321"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <Phone className="w-4 h-4 text-emerald-500 absolute right-3 top-3 pointer-events-none" />
              </div>
              {formErrors.whatsapp && (
                <p className="text-xs text-rose-400 mt-1">
                  {formErrors.whatsapp}
                </p>
              )}
            </div>

            {/* Telefone Fixo ou Secundário */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Telefone Fixo / Segundo Contato
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: (11) 3456-7890"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Endereço */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Endereço Completo (Rua, Número e Bairro)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ex: Rua das Palmeiras, 150 - Centro"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <MapPin className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Cidade e Estado */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Cidade e Estado
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: São Paulo - SP"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail de Contato
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: contato@comercio.com.br"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Horário de Funcionamento */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Horário de Atendimento
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="Ex: Seg a Sex das 08h às 18h | Sáb até 13h"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <Clock className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* STEP 4: Prompt and Detailed Notes */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black">
                4
              </span>
              <span>Prompt com Conteúdo e Anotações do Comércio *</span>
            </label>

            <button
              type="button"
              onClick={handleInsertPromptTemplate}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inserir Exemplo Completo de Prompt</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Escreva aqui tudo o que o site deve conter: lista de serviços,
            preços praticados, história da empresa, garantias, diferenciais,
            formas de pagamento ou promoções ativas. Quanto mais detalhes você
            escrever, mais completo ficará o site.
          </p>

          <textarea
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Descreva todos os detalhes, serviços, história, diferenciais, valores e público-alvo deste comércio..."
            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 leading-relaxed"
          />
          {formErrors.prompt && (
            <p className="text-xs text-rose-400">{formErrors.prompt}</p>
          )}

          {/* Color theme customization */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Palette className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-300">
                Cor Primária de Destaque:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customPrimaryColor}
                  onChange={(e) => setCustomPrimaryColor(e.target.value)}
                  className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-400 uppercase">
                  {customPrimaryColor}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {['#E11D48', '#0284C7', '#0D9488', '#4F46E5', '#D97706', '#1E3A8A', '#DC2626'].map(
                (c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCustomPrimaryColor(c)}
                    className="w-6 h-6 rounded-full border border-slate-700 transition-transform hover:scale-110"
                    style={{ backgroundColor: c }}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* STEP 5: Active Sections Toggles */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-black">
                5
              </span>
              <span>Seções do Site a Serem Incluídas no Arquivo Único HTML</span>
            </label>
            <span className="text-xs text-slate-500">
              Todas com código bem comentado
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { key: 'hero', label: 'Cabeçalho / Hero' },
              { key: 'about', label: 'Sobre Nós' },
              { key: 'services', label: 'Serviços / Cardápio' },
              { key: 'differentials', label: 'Diferenciais' },
              { key: 'gallery', label: 'Galeria de Fotos' },
              { key: 'testimonials', label: 'Depoimentos' },
              { key: 'faq', label: 'Dúvidas (FAQ)' },
              { key: 'location', label: 'Endereço e Contato' },
              { key: 'contactForm', label: 'Formulário WhatsApp' },
              { key: 'whatsappFloat', label: 'Botão Flutuante' },
            ].map(({ key, label }) => {
              const isActive = activeSections[key as keyof typeof activeSections];
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => toggleSection(key as keyof typeof activeSections)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:text-slate-400'
                  }`}
                >
                  <span>{label}</span>
                  <CheckSquare
                    className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="pt-2 text-center">
          <button
            type="submit"
            disabled={isGenerating}
            className={`w-full max-w-md mx-auto py-4 px-6 rounded-2xl font-extrabold text-base text-white shadow-xl flex items-center justify-center gap-3 transition-all cursor-pointer ${
              isGenerating
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 hover:from-emerald-400 hover:to-sky-500 shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Gerando Site com IA & Formatando HTML Único...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>Criar Site Profissional (Gerar index.html)</span>
              </>
            )}
          </button>
          <p className="text-xs text-slate-500 mt-3">
            O site gerado estará pronto para ser arrastado diretamente para a
            plataforma do Netlify (netlify.com/drop) ou Vercel.
          </p>
        </div>
      </form>
    </div>
  );
};
