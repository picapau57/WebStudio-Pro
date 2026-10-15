import React from 'react';
import { SavedProject } from '../types';
import { X, FolderHeart, Download, Eye, Trash2, Calendar, FileCode } from 'lucide-react';
import { downloadHtmlFile } from '../utils/exportStudioHtml';

interface SavedProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProjects: SavedProject[];
  onOpenProject: (project: SavedProject) => void;
  onDeleteProject: (id: string) => void;
}

export const SavedProjectsModal: React.FC<SavedProjectsModalProps> = ({
  isOpen,
  onClose,
  savedProjects,
  onOpenProject,
  onDeleteProject,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
              <FolderHeart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Biblioteca de Sites Salvos
              </h3>
              <p className="text-xs text-slate-400">
                {savedProjects.length}{' '}
                {savedProjects.length === 1 ? 'projeto salvo' : 'projetos salvos'} no navegador
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedProjects.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <FileCode className="w-12 h-12 mx-auto text-slate-600 mb-2 opacity-50" />
              <p className="text-sm font-semibold">Nenhum site salvo ainda.</p>
              <p className="text-xs text-slate-500 mt-1">
                Ao criar ou personalizar um site, salve-o para poder baixá-lo a qualquer momento.
              </p>
            </div>
          ) : (
            savedProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-white">
                      {proj.businessName}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {proj.segmentName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(proj.updatedAt).toLocaleDateString('pt-BR')}</span>
                    </span>
                    <span>Modelo {proj.templateId}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      onOpenProject(proj);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Visualizar e Editar"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>Abrir</span>
                  </button>

                  <button
                    onClick={() => {
                      downloadHtmlFile(`index-${proj.businessName.toLowerCase().replace(/\s+/g, '-')}.html`, proj.htmlCode);
                    }}
                    className="p-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Baixar index.html"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar</span>
                  </button>

                  <button
                    onClick={() => onDeleteProject(proj.id)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-900 transition-colors cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
