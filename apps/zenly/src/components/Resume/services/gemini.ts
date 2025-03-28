
import { GoogleGenerativeAI } from "@google/generative-ai";

// You'll need to add your API key here or use an environment variable
const API_KEY = "YOUR_GEMINI_API_KEY";

const genAI = new GoogleGenerativeAI(API_KEY);

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string; // Make website optional to fix type errors
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    description?: string;
  }>;
  skills: string;
}

export interface AnalysisResult {
  atsScore: number;
  matchScore: number;
  improvementTips: string[];
  keywordMatches: Array<{
    keyword: string;
    found: boolean;
  }>;
  optimizedResume: ResumeData;
}

export async function generateResumeFromJobDescription(
  jobTitle: string,
  jobDescription: string
): Promise<ResumeData> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      As an expert resume writer, create a professional resume for the following job position. 
      Job Title: ${jobTitle}
      Job Description: ${jobDescription}
      
      Return ONLY a JSON object with the following structure, and no additional text:
      {
        "personalInfo": {
          "name": "John Doe",
          "email": "john.doe@example.com",
          "phone": "(123) 456-7890",
          "location": "San Francisco, CA",
          "website": "linkedin.com/in/johndoe"
        },
        "summary": "Professional summary here...",
        "experience": [
          {
            "title": "Job Title",
            "company": "Company Name",
            "location": "Location",
            "startDate": "MM/YYYY",
            "endDate": "MM/YYYY or Present",
            "description": "Job description with bullet points..."
          }
        ],
        "education": [
          {
            "degree": "Degree Name",
            "school": "School Name",
            "location": "Location",
            "graduationDate": "MM/YYYY",
            "description": "Optional description"
          }
        ],
        "skills": "List of skills separated by commas"
      }
      
      Make sure the experience, skills, and education directly relate to the job description.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse JSON from Gemini response");
    }
    
    const resumeData = JSON.parse(jsonMatch[0]) as ResumeData;
    return resumeData;
  } catch (error) {
    console.error("Error generating resume:", error);
    throw error;
  }
}

export async function optimizeResume(
  jobTitle: string,
  jobDescription: string,
  resumeData: ResumeData
): Promise<AnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      As an expert ATS (Applicant Tracking System) analyst, optimize the following resume for the job position.
      
      Job Title: ${jobTitle}
      Job Description: ${jobDescription}
      
      Current Resume:
      ${JSON.stringify(resumeData, null, 2)}
      
      Return ONLY a JSON object with the following structure, and no additional text:
      {
        "atsScore": 85,
        "matchScore": 78,
        "improvementTips": [
          "Tip 1",
          "Tip 2",
          "Tip 3",
          "Tip 4"
        ],
        "keywordMatches": [
          {"keyword": "React", "found": true},
          {"keyword": "TypeScript", "found": true},
          {"keyword": "Node.js", "found": true},
          {"keyword": "AWS", "found": true},
          {"keyword": "Docker", "found": true},
          {"keyword": "CI/CD", "found": true},
          {"keyword": "Kubernetes", "found": false},
          {"keyword": "Microservices", "found": false},
          {"keyword": "REST APIs", "found": true},
          {"keyword": "Team Leadership", "found": true}
        ],
        "optimizedResume": {
          // Optimized version of the submitted resume with the same structure
          // Include the entire resume structure here
        }
      }
      
      Make sure to extract keywords from the job description and check if they're present in the resume.
      The optimizedResume should include improvements that address the ATS requirements.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse JSON from Gemini response");
    }
    
    const analysisResult = JSON.parse(jsonMatch[0]) as AnalysisResult;
    return analysisResult;
  } catch (error) {
    console.error("Error optimizing resume:", error);
    throw error;
  }
}
