import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { UserData } from "@/types";

const openaiApiKey = process.env.OPENAI_API_KEY;
const hfApiKey = process.env.HF_API_KEY;

const openai = openaiApiKey
  ? new OpenAI({
      apiKey: openaiApiKey,
    })
  : null;

const hf = hfApiKey
  ? new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: hfApiKey,
    })
  : null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userData: UserData = req.body;

    // Calculate BMR using Mifflin-St Jeor equation
    const bmr =
      userData.sex === "man"
        ? userData.weight * 10 +
          userData.height * 100 * 6.25 -
          userData.age * 5 +
          5
        : userData.weight * 10 +
          userData.height * 100 * 6.25 -
          userData.age * 5 -
          161;

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extremely_active: 1.9,
    };

    const tdee = bmr * activityMultipliers[userData.activityLevel];

    // Adjust calories based on goal
    let targetCalories = tdee;
    if (userData.goal === "lose_fat") {
      targetCalories = tdee * 0.8; // 20% deficit
    } else if (userData.goal === "gain_muscle") {
      targetCalories = tdee * 1.1; // 10% surplus
    }

    const prompt = `Crie um plano alimentar detalhado para ${
      userData.name
    }, com base nas seguintes informações:

Idade: ${userData.age}
Altura: ${userData.height} m
Peso: ${userData.weight} kg
Nível de Atividade: ${userData.activityLevel.replace("_", " ")}
Objetivo: ${userData.goal.replace("_", " ")}

Métricas calculadas:
- TMB: ${Math.round(bmr)} calorias/dia
- Gasto energético diário (TDEE): ${Math.round(tdee)} calorias/dia
- Calorias alvo: ${Math.round(targetCalories)} calorias/dia

Inclua:
1. **Resumo metabólico** (TMB, calorias alvo, macros)
2. **Plano alimentar diário** (café, almoço, jantar, lanches, com calorias aproximadas)
3. **Lista de compras organizada**
4. **Alimentos acessíveis**

Responda em **Português**, bem formatado em markdown, claro e prático.`;

    let dietPlan: string | null;

    const systemPrompt =
      "You are a certified nutritionist and dietitian. Provide scientifically accurate, practical, and personalized nutrition advice. Always emphasize the importance of consulting with healthcare professionals for medical conditions. Respond in Portuguese.";

    if (openai) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 4000,
        temperature: 0.7,
      });
      dietPlan = completion.choices[0]?.message?.content;
    } else if (hf) {
      const hfResult = await hf.chat.completions.create({
        model: "deepseek-ai/DeepSeek-V3.1:fireworks-ai",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      dietPlan = hfResult.choices[0]?.message?.content;
    } else {
      throw new Error("No AI service configured");
    }

    if (!dietPlan) {
      throw new Error("Failed to generate diet plan");
    }

    res.status(200).json({
      tmb: Math.round(bmr),
      dailyCalories: Math.round(targetCalories),
      dietPlan,
      success: true,
    });
  } catch (error) {
    console.error("Error generating diet plan:", error);
    res.status(500).json({
      message: "Failed to generate diet plan",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
