import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, ShieldCheck, ArrowRight, Sparkles, Key, CheckCircle } from 'lucide-react';

export const MasterLogin: React.FC = () => {
  const { login, quickLogin, isRemembered, setIsRemembered, userEmail } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(password);
    if (!success) {
      setError('Senha incorreta. A senha padrão inicial é: admin123');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl p-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/20 mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white mb-2">
            WebStudio Pro
          </h1>
          <p className="text-sm text-slate-400">
            Acesso Exclusivo do Administrador
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-sky-400 font-medium mt-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{userEmail}</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Senha Master de Acesso
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha master..."
                className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                autoFocus
              />
              <Key className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-2 font-medium bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/60">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isRemembered}
                onChange={(e) => setIsRemembered(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-sky-600 focus:ring-0 focus:ring-offset-0"
              />
              <span>Lembrar meu acesso</span>
            </label>
            <span className="text-slate-500">Padrão: admin123</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
          >
            <span>Entrar no Sistema</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Quick Access Helper */}
        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400 mb-3">
            Acesso rápido direto para o seu trabalho diário:
          </p>
          <button
            type="button"
            onClick={quickLogin}
            className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Liberar Acesso Direto com 1 Clique</span>
          </button>
        </div>

        {/* Feature note */}
        <div className="mt-6 flex items-center gap-2 text-[11px] text-slate-500 justify-center">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span>Exportação de arquivo único HTML para Netlify e Vercel</span>
        </div>
      </div>
    </div>
  );
};
