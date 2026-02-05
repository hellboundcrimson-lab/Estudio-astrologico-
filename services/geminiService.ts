
import { GoogleGenAI, Type } from "@google/genai";
import { BirthData, Interpretation } from "../types";

export const getAstrologicalInterpretation = async (data: BirthData): Promise<Interpretation> => {
  // Initialize AI with the environment variable directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use dynamic user data in the prompt for accurate interpretation
  const prompt = `Actúa como un Maestro de los Registros Akáshicos y Astrólogo Kármico.
    Analiza al usuario: ${data.name}, nacido el ${data.birthDate} a las ${data.birthTime} en ${data.birthLocation}.
    Contexto energético actual/Vocación: ${data.currentEnergyState || "No proporcionado"}
    
    TAREAS DE ESTUDIO:
    1. ASTROLOGÍA SIDERAL: Calcula el desplazamiento (Ayanamsa) de sus posiciones (aprox -24°). 
    2. ASTROLOGÍA GEOCÉNTRICA KÁRMICA: Analiza las posiciones planetarias desde la perspectiva de "Contratos de Alma".
    3. IDENTIFICACIÓN DE VIDAS PASADAS: Basado en Saturno, Nodos Lunares y planetas en Casas 8, 9 y 12.
    
    ESTRUCTURA DE RESPUESTA JSON REQUERIDA:
    - classical: Resumen de la encarnación actual.
    - siderealAnalysis: Explicación de la diferencia entre su personalidad tropical y su "Yo Esencial" Sideral.
    - karmicBalance: Deudas y talentos acumulados.
    - incarnations: Array de 3 vidas pasadas identificadas con {era, location, role, karmicLesson, astrologicalMarker}.
    - akashicMessage: Mensaje directo del registro akáshico.
    - planets: Posiciones Tropicales.
    - siderealPlanets: Posiciones Siderales.
    - profileBreakdown: Narrativa poética (array de {title, content, emoji}).
    - starseed: Origen galáctico {origin, narrative, connectionDegrees}.
    - spiritualAdvice: Array de consejos espirituales.
    - aspects: Aspectos astrológicos {type, planets, meaning, color}.
    - chakras: Sistema energético {name, status, description, color, starseedLink, practice}.
    - ascendant: Datos del ascendente {name, sign, degree, symbol, description}.
    - midheaven: Datos del mediocielo {name, sign, degree, symbol, description}.
    
    Lenguaje: Español profundo, técnico pero místico.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          classical: { type: Type.STRING },
          siderealAnalysis: { type: Type.STRING },
          karmicBalance: { type: Type.STRING },
          akashicMessage: { type: Type.STRING },
          incarnations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                era: { type: Type.STRING },
                location: { type: Type.STRING },
                role: { type: Type.STRING },
                karmicLesson: { type: Type.STRING },
                astrologicalMarker: { type: Type.STRING }
              }
            }
          },
          planets: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, sign: { type: Type.STRING }, house: { type: Type.NUMBER }, symbol: { type: Type.STRING }, description: { type: Type.STRING } } } },
          siderealPlanets: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, sign: { type: Type.STRING }, house: { type: Type.NUMBER }, symbol: { type: Type.STRING }, description: { type: Type.STRING } } } },
          profileBreakdown: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, content: { type: Type.STRING }, emoji: { type: Type.STRING } } } },
          starseed: { type: Type.OBJECT, properties: { origin: { type: Type.STRING }, narrative: { type: Type.STRING }, connectionDegrees: { type: Type.STRING } } },
          spiritualAdvice: { type: Type.ARRAY, items: { type: Type.STRING } },
          aspects: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { type: { type: Type.STRING }, planets: { type: Type.ARRAY, items: { type: Type.STRING } }, meaning: { type: Type.STRING }, color: { type: Type.STRING } } } },
          chakras: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, status: { type: Type.STRING }, description: { type: Type.STRING }, color: { type: Type.STRING }, starseedLink: { type: Type.STRING }, practice: { type: Type.STRING } } } },
          ascendant: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, sign: { type: Type.STRING }, degree: { type: Type.NUMBER }, symbol: { type: Type.STRING }, description: { type: Type.STRING } } },
          midheaven: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, sign: { type: Type.STRING }, degree: { type: Type.NUMBER }, symbol: { type: Type.STRING }, description: { type: Type.STRING } } }
        },
        required: ["classical", "siderealAnalysis", "karmicBalance", "incarnations", "akashicMessage", "planets", "siderealPlanets", "profileBreakdown", "starseed", "spiritualAdvice", "ascendant", "midheaven"]
      },
    },
  });

  return JSON.parse(response.text) as Interpretation;
};
