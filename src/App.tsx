/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MasterLogin } from './components/MasterLogin';
import { Header } from './components/Header';
import { ModelsGallery12 } from './components/ModelsGallery12';
import { PromptBuilderForm } from './components/PromptBuilderForm';
import { PreviewModal } from './components/PreviewModal';
import { PasswordModal } from './components/PasswordModal';
import { SavedProjectsModal } from './components/SavedProjectsModal';
import { SEGMENT_MODELS, SegmentModelConfig } from './data/models12';
import { BUSINESS_SEGMENTS } from './data/segments';
import { generateSingleFileHtml } from './utils/htmlGenerator';
import { generateFullSegmentHtml } from './utils/modelGenerators';
import { SiteFormData, EnrichedSiteData, SavedProject } from './types';

const STORAGE_SAVED_PROJECTS = 'webstudio_saved_projects';

function MainApp() {
  const { isAuthenticated } = useAuth();

  // Navigation tab: 'models' (12 Modelos) | 'builder' (Criador via Prompt)
  const [activeTab, setActiveTab] = useState<'models' | 'builder'>('models');
  const [selectedModelForBuilder, setSelectedModelForBuilder] =
    useState<SegmentModelConfig | null>(null);

  // Preview Modal state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  // Password & Saved Projects Modals
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [savedModalOpen, setSavedModalOpen] = useState(false);

  // Saved Projects List
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load saved projects on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SAVED_PROJECTS);
      if (stored) {
        setSavedProjects(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Erro ao ler projetos salvos:', e);
    }
  }, []);

  const saveProjectsToStorage = (updated: SavedProject[]) => {
    setSavedProjects(updated);
    try {
      localStorage.setItem(STORAGE_SAVED_PROJECTS, JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  };

  if (!isAuthenticated) {
    return <MasterLogin />;
  }

  // Handle direct preview of any of the 12 models
  const handlePreviewModel = (html: string, title: string) => {
    setPreviewHtml(html);
    setPreviewTitle(title);
    setPreviewOpen(true);
  };

  // Switch to Prompt Builder with a specific model preselected
  const handleSelectForPromptBuilder = (model: SegmentModelConfig) => {
    setSelectedModelForBuilder(model);
    setActiveTab('builder');
  };

  // Generate site via prompt with backend Gemini AI + instant fallback
  const handleGenerateSite = async (formData: SiteFormData) => {
    setIsGenerating(true);

    try {
      // Find matching segment configuration
      const modelConfig =
        SEGMENT_MODELS.find((m) => m.id === formData.segmentId) ||
        SEGMENT_MODELS[0];
      const businessSegment =
        BUSINESS_SEGMENTS.find((s) => s.id === formData.segmentId) ||
        BUSINESS_SEGMENTS[0];

      let generatedHtml = '';

      // Call backend Gemini AI API
      try {
        const res = await fetch('/api/generate-site', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            segment: modelConfig.segmentName,
            businessName: formData.businessName,
            slogan: formData.slogan,
            address: formData.address,
            whatsapp: formData.whatsapp,
            phone: formData.phone,
            email: formData.email,
            instagram: formData.instagram,
            hours: formData.hours,
            templateId: formData.templateId,
            colorTheme: formData.colorTheme,
            prompt: formData.prompt,
            sections: formData.activeSections,
          }),
        });

        const json = await res.json();

        if (json.success && json.data) {
          const aiData = json.data;
          const enriched: EnrichedSiteData = {
            hero: aiData.hero,
            about: aiData.about,
            services: aiData.services,
            differentials: aiData.differentials,
            testimonials: aiData.testimonials,
            faq: aiData.faq,
            ctaBanner: aiData.ctaBanner,
            seo: aiData.seo,
            businessInfo: {
              name: formData.businessName,
              segment: modelConfig.segmentName,
              slogan: formData.slogan || modelConfig.defaultData.slogan,
              address: formData.address || modelConfig.defaultData.address,
              city: formData.city || modelConfig.defaultData.city,
              state: formData.state,
              cep: formData.cep,
              whatsapp: formData.whatsapp,
              phone: formData.phone,
              email: formData.email,
              instagram: formData.instagram,
              hours: formData.hours,
            },
            templateId: formData.templateId,
            primaryColor: formData.customPrimaryColor || modelConfig.primaryColor,
            images: {
              hero: businessSegment.heroImage || modelConfig.defaultData.galleryImages[0],
              about: businessSegment.aboutImage || modelConfig.defaultData.galleryImages[1],
              gallery: businessSegment.galleryImages || modelConfig.defaultData.galleryImages,
            },
            activeSections: formData.activeSections,
          };

          generatedHtml = generateSingleFileHtml(enriched);
        } else {
          // Native high-fidelity generator fallback
          generatedHtml = generateFullSegmentHtml(modelConfig, {
            businessName: formData.businessName,
            slogan: formData.slogan,
            whatsapp: formData.whatsapp,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            hours: formData.hours,
            customPrimaryColor: formData.customPrimaryColor,
          });
        }
      } catch (err) {
        console.warn('Backend call failed, using native generator:', err);
        generatedHtml = generateFullSegmentHtml(modelConfig, {
          businessName: formData.businessName,
          slogan: formData.slogan,
          whatsapp: formData.whatsapp,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          hours: formData.hours,
          customPrimaryColor: formData.customPrimaryColor,
        });
      }

      // Celebrate with confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // no-op
      }

      // Automatically save to local history
      const newProject: SavedProject = {
        id: 'proj_' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        businessName: formData.businessName,
        segmentName: modelConfig.segmentName,
        templateId: formData.templateId,
        formData,
        enrichedData: null as any,
        htmlCode: generatedHtml,
      };

      const updated = [newProject, ...savedProjects];
      saveProjectsToStorage(updated);

      // Open Preview Modal
      setPreviewHtml(generatedHtml);
      setPreviewTitle(`${formData.businessName} - ${modelConfig.segmentName}`);
      setPreviewOpen(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenSavedProject = (proj: SavedProject) => {
    setPreviewHtml(proj.htmlCode);
    setPreviewTitle(`${proj.businessName} - ${proj.segmentName}`);
    setPreviewOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    const updated = savedProjects.filter((p) => p.id !== id);
    saveProjectsToStorage(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedProjects.length}
        onOpenSavedModal={() => setSavedModalOpen(true)}
        onOpenPasswordModal={() => setPasswordModalOpen(true)}
      />

      {/* Main View */}
      <main className="flex-1">
        {activeTab === 'models' ? (
          <ModelsGallery12
            onPreviewModel={handlePreviewModel}
            onSelectForPromptBuilder={handleSelectForPromptBuilder}
          />
        ) : (
          <PromptBuilderForm
            initialModel={selectedModelForBuilder}
            onGenerateSite={handleGenerateSite}
            isGenerating={isGenerating}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            WebStudio Pro &bull; Sistema de Geração de Sites HTML Único para Comércios
          </div>
          <div className="flex items-center gap-4">
            <span>Pronto para Netlify & Vercel</span>
            <a
              href="https://app.netlify.com/drop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline"
            >
              Netlify Drop
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        htmlContent={previewHtml}
        title={previewTitle}
      />

      <PasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />

      <SavedProjectsModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        savedProjects={savedProjects}
        onOpenProject={handleOpenSavedProject}
        onDeleteProject={handleDeleteProject}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
