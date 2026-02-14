import { GoogleGenAI, Type } from "@google/genai";
import { MenuResponse } from "../types";

// Helper to get the API client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateWorldCupMenu = async (): Promise<MenuResponse> => {
  const ai = getAiClient();

  const prompt = `
    Actúa como un chef ejecutivo de clase mundial y organizador de eventos experto.
    Tu tarea es diseñar un menú de examen final para estudiantes de gastronomía.
    El tema es "La Copa Mundial de Fútbol".
    Debes generar UN menú de 4 tiempos (Entrada, Plato Fuerte, Postre, Bebida).
    
    REGLAS CRÍTICAS:
    1. Cada plato debe estar inspirado en un MOMENTO ICÓNICO específico de la historia de los mundiales (ej: La Mano de Dios, El Maracanazo, El Cabezazo de Zidane, El Gol del Siglo, etc.).
    2. Cada plato debe representar a un PAÍS relacionado con ese momento.
    3. Las descripciones deben ser técnicas y apetitosas, dignas de alta cocina.
    4. Explica la conexión (reasoning) entre el momento futbolístico y el plato.
    
    Devuelve la respuesta estrictamente en formato JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          menuTitle: {
            type: Type.STRING,
            description: "Un nombre creativo y elegante para el menú del evento"
          },
          themeDescription: {
            type: Type.STRING,
            description: "Una breve introducción al concepto del evento"
          },
          dishes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                course: {
                  type: Type.STRING,
                  description: "Tipo de plato: Entrada, Plato Fuerte, Postre o Bebida"
                },
                name: {
                  type: Type.STRING,
                  description: "Nombre creativo del plato culinario"
                },
                country: {
                  type: Type.STRING,
                  description: "País que inspira el plato"
                },
                moment: {
                  type: Type.STRING,
                  description: "El momento icónico del mundial (ej: 'Mano de Dios, México 86')"
                },
                description: {
                  type: Type.STRING,
                  description: "Descripción gastronómica detallada de los ingredientes y técnica"
                },
                reasoning: {
                  type: Type.STRING,
                  description: "Explicación de cómo el plato conecta conceptualmente con el momento histórico"
                }
              },
              required: ["course", "name", "country", "moment", "description", "reasoning"]
            }
          }
        },
        required: ["menuTitle", "themeDescription", "dishes"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  return JSON.parse(text) as MenuResponse;
};
