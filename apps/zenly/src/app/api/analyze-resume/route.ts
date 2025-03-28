import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

// Get API key from environment variable
const API_KEY = process.env.NEXT_GOOGLE_AI_API_KEY!;

if (!API_KEY) {
  throw new Error('NEXT_GOOGLE_AI_API_KEY environment variable is not set');
}

const genAI = new GoogleGenAI({ apiKey: API_KEY });

export async function POST(request: Request) {
  try {
    const { resumeText, jobTitle, jobDescription, keySkills } = await request.json();

    if (!resumeText || !jobTitle || !jobDescription || !keySkills) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = `
      As an expert resume screener, analyze this candidate's resume for the following job position.
      
      Job Title: ${jobTitle}
      Job Description: ${jobDescription}
      Required Skills: ${keySkills.join(', ')}

      Resume Content:
      ${resumeText}

      Please provide a detailed analysis in the following JSON format:
      {
        "matchScore": number (0-100),
        "experience": {
          "years": number,
          "relevant": boolean,
          "details": string
        },
        "education": {
          "level": string,
          "field": string,
          "relevance": string
        },
        "skills": {
          "matched": string[],
          "missing": string[],
          "additional": string[]
        },
        "analysis": {
          "strengths": string[],
          "weaknesses": string[],
          "recommendations": string[]
        },
        "summary": string
      }

      Guidelines for analysis:
      1. Match Score: Consider skills match (40%), experience relevance (30%), and education fit (30%)
      2. Experience: Extract years of relevant experience and assess its relevance to the job
      3. Education: Evaluate the education level and field of study
      4. Skills: Compare required skills with candidate's skills
      5. Provide specific strengths, weaknesses, and actionable recommendations
      6. Write a brief summary of the candidate's overall fit
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt,
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini");
    }

    // Extract JSON from the response
    const jsonMatch = response.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse JSON from Gemini response");
    }

    const analysisResult = JSON.parse(jsonMatch[0]);
    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze resume', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 