import { GoogleGenAI, Type } from "@google/genai";
import { GradeLevel, Semester, MathTopic, MathQuestion } from '../types';

// NOTE: In a real environment, always check if API KEY exists.
// We are assuming process.env.API_KEY is available as per instructions.

export const generateQuestions = async (
  grade: GradeLevel,
  semester: Semester,
  topic: MathTopic
): Promise<MathQuestion[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    你是一位专业的小学数学老师。
    请根据以下要求生成50道口算习题。
    
    年级: 小学${grade}年级
    学期: ${semester}
    知识点/题型: ${topic.name} (${topic.description})
    
    要求:
    1. 题目难度要符合该年级学生的认知水平。
    2. 题目类型应为直接计算题（如 12 + 5 = ）、填空题（如 5 + ( ) = 12）或简单的单位换算。
    3. 必须生成50道不重复的题目。
    4. 返回格式必须是严格的JSON数组。
    5. 每道题包含 "question" (题目内容，不含答案，例如 '25 + 35 =') 和 "answer" (答案，例如 '60')。
    6. "question" 字段如果是填空题，请使用 '(__)' 或 '( )' 表示空格。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: "The math question string, e.g., '1 + 1 ='",
              },
              answer: {
                type: Type.STRING,
                description: "The answer to the question",
              }
            }
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text) as MathQuestion[];
      // Validate length roughly
      if (Array.isArray(data)) {
        return data.slice(0, 50); // Ensure max 50
      }
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};