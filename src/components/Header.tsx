import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Layers,
  FolderHeart,
  Key,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Code2,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'models' | 'builder';
  setActiveTab: (tab: 'models' | 'builder') => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  onOpenPasswordModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSavedModal,
  onOpenPasswordModal,
}) => {
  const { userEmail, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/20">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  WebStudio Pro
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  IA & Netlify
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Criador de Sites HTML Único para Comércios
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('models')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'models'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>15 Modelos de Comércio</span>
            </button>

            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'builder'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Criar Site via Prompt</span>
            </button>
          </div>

          {/* User & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Netlify Drop Guide Button */}
            <a
              href="https://app.netlify.com/drop"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 border border-teal-500/20 text-xs font-medium transition-colors"
              title="Arraste seu arquivo index.html no Netlify Drop"
            >
              <span>Netlify Drop</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Saved Projects Library */}
            <button
              onClick={onOpenSavedModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <FolderHeart className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Projetos</span>
              {savedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Master User Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span className="truncate max-w-[140px]">{userEmail}</span>
            </div>

            {/* Password Modal */}
            <button
              onClick={onOpenPasswordModal}
              title="Alterar Senha Master"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <Key className="w-4 h-4" />
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              title="Encerrar Sessão"
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
