import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini client server-side
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Route to generate structured site content via Gemini 3.8 Flash
app.post('/api/generate-site', async (req, res) => {
  try {
    const {
      segment,
      businessName,
      slogan,
      address,
      whatsapp,
      phone,
      email,
      instagram,
      hours,
      templateId,
      colorTheme,
      prompt,
      sections,
    } = req.body;

    if (!businessName || !segment) {
      return res.status(400).json({ error: 'Nome do comércio e segmento são obrigatórios.' });
    }

    if (!ai) {
      // If no API key configured, notify client so it uses built-in generator
      return res.json({
        fallback: true,
        message: 'Chave Gemini não configurada no servidor; utilizando mecanismo nativo de alta fidelidade.',
      });
    }

    const systemInstruction = `Você é um diretor de criação e copywriter sênior especialista em desenvolvimento web, marketing digital de alta conversão e SEO local no Brasil.
Seu trabalho é gerar o conteúdo completo, envolvente, persuasivo e profissional para um site de alta conversão em português do Brasil (pt-BR).
O conteúdo deve refletir precisamente o segmento do comércio, o nome, a localização e todas as instruções/anotações fornecidas pelo usuário.
Gere textos naturais, cativantes, que transmitam extrema credibilidade e estimulem contato direto pelo WhatsApp.
Retorne SOMENTE um objeto JSON válido correspondente ao esquema fornecido.`;

    const userPrompt = `Crie o conteúdo completo para o site do seguinte comércio:
- Segmento: ${segment}
- Nome do Comércio: ${businessName}
- Slogan/Frase de Impacto: ${slogan || 'Qualidade, atendimento exclusivo e excelência'}
- Endereço / Localização: ${address || 'Atendimento local e regional'}
- WhatsApp: ${whatsapp || ''}
- Telefone: ${phone || ''}
- E-mail: ${email || ''}
- Instagram: ${instagram || ''}
- Horário de Funcionamento: ${hours || 'Segunda a Sexta das 08h às 18h'}
- Estilo / Modelo do Site: Modelo ${templateId || 1}
- Paleta / Tom: ${colorTheme || 'Moderno'}
- Anotações, Instruções Detalhadas e Serviços:
"""
${prompt || 'Oferecemos os melhores produtos e serviços da região com qualidade garantida, pontualidade e atendimento humanizado.'}
"""

Crie títulos impactantes, história convincente, 4 a 6 serviços/produtos detalhados com preços ou valores sugeridos compatíveis, 4 diferenciais reais, 3 depoimentos autênticos com nomes brasileiros, e 4 perguntas frequentes indispensáveis.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hero: {
              type: Type.OBJECT,
              properties: {
                badge: { type: Type.STRING },
                headline: { type: Type.STRING },
                subheadline: { type: Type.STRING },
                ctaPrimary: { type: Type.STRING },
                ctaSecondary: { type: Type.STRING },
                trustItems: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['badge', 'headline', 'subheadline', 'ctaPrimary', 'ctaSecondary', 'trustItems'],
            },
            about: {
              type: Type.OBJECT,
              properties: {
                badge: { type: Type.STRING },
                title: { type: Type.STRING },
                paragraph1: { type: Type.STRING },
                paragraph2: { type: Type.STRING },
                stats: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      value: { type: Type.STRING },
                      label: { type: Type.STRING },
                    },
                    required: ['value', 'label'],
                  },
                },
              },
              required: ['badge', 'title', 'paragraph1', 'paragraph2', 'stats'],
            },
            services: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  price: { type: Type.STRING },
                  badge: { type: Type.STRING },
                  features: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['id', 'title', 'description', 'price', 'features'],
              },
            },
            differentials: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['title', 'description'],
              },
            },
            testimonials: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  content: { type: Type.STRING },
                  rating: { type: Type.NUMBER },
                },
                required: ['name', 'role', 'content', 'rating'],
              },
            },
            faq: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING },
                },
                required: ['question', 'answer'],
              },
            },
            ctaBanner: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                buttonText: { type: Type.STRING },
              },
              required: ['title', 'subtitle', 'buttonText'],
            },
            seo: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                keywords: { type: Type.STRING },
              },
              required: ['title', 'description', 'keywords'],
            },
          },
          required: ['hero', 'about', 'services', 'differentials', 'testimonials', 'faq', 'ctaBanner', 'seo'],
        },
      },
    });

    const contentText = response.text;
    if (!contentText) {
      return res.status(500).json({ error: 'Nenhuma resposta retornada pela IA.' });
    }

    const parsedData = JSON.parse(contentText);
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Erro na geração via Gemini:', error);
    return res.status(500).json({
      error: error.message || 'Erro ao processar com a IA Gemini.',
      fallback: true,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString(),
  });
});

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: Number(PORT),
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production: serve built static files
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[WebStudio Server] Rodando na porta ${PORT} (${isProd ? 'produção' : 'desenvolvimento'})`);
  });
}

startServer();
