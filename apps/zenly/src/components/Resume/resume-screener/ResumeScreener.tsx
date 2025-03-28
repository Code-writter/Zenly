'use client'

import React, { useState } from 'react';
import UploadResumes from './UploadResumes';
import CandidateResults from './CandidateResults';
import { generateResumeFromJobDescription, optimizeResume } from '../services/gemini';
import { useToast } from '@/components/hooks/use-toast';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  matchScore: number;
  experience: {
    years: number;
    relevant: boolean;
    details: string;
  };
  education: {
    level: string;
    field: string;
    relevance: string;
  };
  skills: {
    matched: string[];
    missing: string[];
    additional: string[];
  };
  analysis: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
  summary: string;
  resumeUrl: string;
}

const ResumeScreener: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [keySkills, setKeySkills] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const analyzeResume = async (
    resumeText: string,
    jobTitle: string,
    jobDescription: string,
    keySkills: string[]
  ) => {
    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText,
          jobTitle,
          jobDescription,
          keySkills,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw error;
    }
  };

  const handleSubmit = async (title: string, description: string, files: File[]) => {
    setIsLoading(true);
    setJobTitle(title);
    setShowResults(true);

    try {
      // Generate a sample resume from the job description to extract key skills
      const sampleResume = await generateResumeFromJobDescription(title, description);
      
      // Optimize the resume to get key skills and requirements
      const optimizationResult = await optimizeResume(title, description, sampleResume);
      
      // Extract key skills from the optimization result
      const extractedSkills = optimizationResult.keywordMatches
        .map(match => match.keyword)
        .filter(keyword => keyword.length > 0);
      
      setKeySkills(extractedSkills);

      // Process each uploaded resume
      const processedCandidates = await Promise.all(
        files.map(async (file, index) => {
          try {
            // Extract text from the resume file
            const resumeText = await extractTextFromFile(file);
            
            // Analyze the resume using our API
            const analysis = await analyzeResume(resumeText, title, description, extractedSkills);
            
            // Create candidate profile with the analysis results
            const candidate: Candidate = {
              id: `candidate-${index + 1}`,
              name: `Candidate ${index + 1}`,
              email: `candidate${index + 1}@example.com`,
              phone: `(555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
              matchScore: analysis.matchScore,
              experience: analysis.experience,
              education: analysis.education,
              skills: analysis.skills,
              analysis: analysis.analysis,
              summary: analysis.summary,
              resumeUrl: URL.createObjectURL(file)
            };
            
            return candidate;
          } catch (error) {
            console.error(`Error processing resume ${index + 1}:`, error);
            toast({
              title: "Error processing resume",
              description: `Failed to analyze resume ${index + 1}. Please try again.`,
              variant: "destructive"
            });
            return null;
          }
        })
      );

      // Filter out any failed analyses and set the candidates
      setCandidates(processedCandidates.filter((c): c is Candidate => c !== null));
      
      toast({
        title: "Resume Analysis Complete",
        description: `Successfully analyzed ${processedCandidates.length} resumes.`,
      });
    } catch (error) {
      console.error('Error processing resumes:', error);
      toast({
        title: "Error",
        description: "Failed to process resumes. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {!showResults ? (
        <UploadResumes onSubmit={handleSubmit} isLoading={isLoading} />
      ) : (
        <CandidateResults
          candidates={candidates}
          keySkills={keySkills}
          jobTitle={jobTitle}
        />
      )}
    </div>
  );
};

export default ResumeScreener; 