import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Download,
  Copy,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  Code,
  FileCheck,
  Sliders,
} from 'lucide-react';
import { downloadHtmlFile, copyToClipboard, openInNewTab } from '../utils/exportStudioHtml';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
  title: string;
  onSaveProject?: () => void;
  isSaved?: boolean;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  htmlContent,
  title,
  onSaveProject,
  isSaved = false,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [showCodeView, setShowCodeView] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && isOpen && !showCodeView) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  }, [htmlContent, isOpen, showCodeView]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(htmlContent);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownload = () => {
    const cleanFilename = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    downloadHtmlFile(`index-${cleanFilename}.html`, htmlContent);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md">
      {/* Top Bar Controls */}
      <div className="h-16 px-4 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 flex-shrink-0">
        {/* Title & Badge */}
        <div className="flex items-center gap-3 truncate">
          <div className="flex items-center gap-2 truncate">
            <span className="font-extrabold text-sm text-white truncate">
              {title}
            </span>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
              HTML Único Autônomo
            </span>
          </div>
        </div>

        {/* Device Switcher (Desktop, Tablet, Mobile) */}
        {!showCodeView && (
          <div className="hidden md:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                deviceMode === 'desktop'
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização Computador / Desktop"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                deviceMode === 'tablet'
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização Tablet (768px)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                deviceMode === 'mobile'
                  ? 'bg-sky-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Visualização Celular / Mobile (375px)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Toggle Code View */}
          <button
            onClick={() => setShowCodeView(!showCodeView)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showCodeView
                ? 'bg-sky-500 text-white border-sky-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {showCodeView ? 'Ver Visual' : 'Ver Código HTML'}
            </span>
          </button>

          {/* Copy HTML Button */}
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Copiar código HTML completo"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copiar Código</span>
              </>
            )}
          </button>

          {/* Open in New Tab */}
          <button
            onClick={() => openInNewTab(htmlContent)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Abrir em Nova Aba"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Main Download index.html Button */}
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Baixar index.html (Netlify)</span>
          </button>

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer ml-1"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Netlify Drop Quick Tip Banner */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-1.5 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
        <FileCheck className="w-3.5 h-3.5 text-teal-400" />
        <span>
          Para colocar este site online em segundos: clique em <strong>Baixar index.html</strong> e arraste o arquivo diretamente em{' '}
          <a
            href="https://app.netlify.com/drop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 underline font-semibold hover:text-sky-300"
          >
            app.netlify.com/drop
          </a>
        </span>
      </div>

      {/* Content Area (Iframe or Code View) */}
      <div className="flex-1 overflow-hidden relative flex items-center justify-center p-2 sm:p-4 bg-slate-950">
        {showCodeView ? (
          <div className="w-full h-full max-w-6xl bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-2xl">
            <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">index.html (Código-fonte completo e comentado)</span>
              <span>{Math.round(htmlContent.length / 1024)} KB</span>
            </div>
            <pre className="flex-1 p-4 overflow-auto font-mono text-xs text-sky-200/90 leading-relaxed bg-slate-950/60 selection:bg-sky-500/30">
              {htmlContent}
            </pre>
          </div>
        ) : (
          <div
            className={`h-full transition-all duration-300 rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-white ${
              deviceMode === 'desktop'
                ? 'w-full'
                : deviceMode === 'tablet'
                ? 'w-[768px]'
                : 'w-[375px]'
            }`}
          >
            <iframe
              ref={iframeRef}
              title="Live Website Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        )}
      </div>
    </div>
  );
};
