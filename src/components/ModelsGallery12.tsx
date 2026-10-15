import React, { useState } from 'react';
import { SEGMENT_MODELS, SegmentModelConfig } from '../data/models12';
import { generateFullSegmentHtml } from '../utils/modelGenerators';
import { downloadHtmlFile } from '../utils/exportStudioHtml';
import {
  Eye,
  Download,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';

interface ModelsGallery12Props {
  onPreviewModel: (html: string, title: string) => void;
  onSelectForPromptBuilder: (model: SegmentModelConfig) => void;
}

export const ModelsGallery12: React.FC<ModelsGallery12Props> = ({
  onPreviewModel,
  onSelectForPromptBuilder,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const categories = [
    'todos',
    'Gastronomia',
    'Varejo',
    'Turismo & Lazer',
    'Saúde',
    'Beleza & Estilo',
    'Animais & Pets',
    'Jurídico',
    'Mercado Imobiliário',
    'Saúde & Performance',
    'Automotivo',
    'Alimentação & Festas',
    'Tecnologia',
  ];

  const filteredModels = SEGMENT_MODELS.filter((m) => {
    const matchesSearch =
      m.segmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'todos' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownloadModel = (model: SegmentModelConfig) => {
    const html = generateFullSegmentHtml(model);
    const filename = `index-${model.id}.html`;
    downloadHtmlFile(filename, html);
    setDownloadSuccessId(model.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  const handlePreview = (model: SegmentModelConfig) => {
    const html = generateFullSegmentHtml(model);
    onPreviewModel(html, model.title);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner & Info */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>12 Modelos HTML Otimizados e Bem Comentados</span>
            </div>
            <a
              href="https://app.netlify.com/drop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold"
            >
              <span>Como subir no Netlify Drop?</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Modelos de Site HTML por Segmento de Comércio
          </h2>
          <p className="text-slate-300 text-sm max-width-3xl leading-relaxed">
            Cada um dos 12 modelos abaixo foi desenhado especificamente para seu
            nicho (cores, tipografia, seções e copywriting de conversão). Todos
            são gerados em <strong>arquivo único HTML autônomo</strong> com CSS
            e JS embutidos, prontos para você arrastar para o Netlify Drop ou
            editar com o criador de prompt.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar modelo ou segmento..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-500 flex-shrink-0 mr-1" />
          {categories.slice(0, 7).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'todos' ? 'Todos os 12 Modelos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 12 Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-2xl flex flex-col group"
          >
            {/* Model Card Header with Live Image */}
            <div className="relative h-44 overflow-hidden bg-slate-950">
              <img
                src={model.defaultData.galleryImages[0]}
                alt={model.segmentName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Number Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-950/90 backdrop-blur-md text-white font-extrabold text-xs border border-slate-700/80">
                  Modelo {model.number}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-400 text-[11px] font-bold border border-sky-500/30">
                  {model.category}
                </span>
              </div>

              {/* Segment Icon */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2.5">
                <span className="text-3xl filter drop-shadow-md">
                  {model.icon}
                </span>
                <div>
                  <h3 className="text-white font-extrabold text-base leading-tight drop-shadow">
                    {model.segmentName}
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium">
                    {model.defaultData.businessName}
                  </p>
                </div>
              </div>

              {/* Color Dot indicator */}
              <div
                className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: model.primaryColor }}
                title={`Cor primária: ${model.primaryColor}`}
              />
            </div>

            {/* Model Description & Features */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-slate-300 mb-3 line-clamp-2 leading-relaxed">
                  {model.description}
                </p>

                {/* Micro preview features */}
                <div className="space-y-1.5 mb-4 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="truncate">
                      <strong>Hero & CTA:</strong> {model.defaultData.heroHeadline}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>
                      {model.defaultData.services.length} Serviços configurados
                      com preços e botão WhatsApp
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>
                      Galeria + Depoimentos 5 estrelas + FAQ acordeão + Mapa
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-800">
                <div className="grid grid-cols-2 gap-2">
                  {/* Preview Modal Button */}
                  <button
                    onClick={() => handlePreview(model)}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>Visualizar</span>
                  </button>

                  {/* Direct Download Button */}
                  <button
                    onClick={() => handleDownloadModel(model)}
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>
                      {downloadSuccessId === model.id ? 'Baixado!' : 'Baixar HTML'}
                    </span>
                  </button>
                </div>

                {/* Load into Prompt Creator */}
                <button
                  onClick={() => onSelectForPromptBuilder(model)}
                  className="w-full py-2 px-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-xs font-semibold rounded-xl border border-sky-500/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Personalizar com Prompt no Criador</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
