
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JobDescriptionForm from '@/components/resume-generator/JobDescriptionForm';
import ResumeForm from '@/components/resume-generator/ResumeForm';
import OptimizedResume from '@/components/resume-generator/OptimizedResume';
import { useToast } from '@/hooks/use-toast';
import { useGemini } from '@/hooks/use-gemini';
import { useResumes } from '@/hooks/use-resumes';
import { Id } from '../../convex/_generated/dataModel';
import { ResumeData } from '@/services/gemini';

enum Step {
  JOB_DESCRIPTION,
  RESUME_FORM,
  RESULT
}

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    website: '' // Can be empty string but must be defined to satisfy all code paths
  },
  summary: '',
  experience: [
    {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  education: [
    {
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      description: ''
    }
  ],
  skills: ''
};

const ResumeGenerator = () => {
  const [currentStep, setCurrentStep] = useState(Step.JOB_DESCRIPTION);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [currentResumeId, setCurrentResumeId] = useState<Id<"resumes"> | null>(null);
  const [atsScore, setAtsScore] = useState<number | undefined>(undefined);
  const [matchScore, setMatchScore] = useState<number | undefined>(undefined);
  const [improvementTips, setImprovementTips] = useState<string[]>([]);
  const [keywordMatches, setKeywordMatches] = useState<Array<{ keyword: string; found: boolean }>>([]);
  
  const { toast } = useToast();
  const { generateResume, optimizeResumeWithAI, isGenerating, isOptimizing } = useGemini();
  const { createResume, updateResume } = useResumes();
  
  const handleJobDescriptionSubmit = async (title: string, description: string) => {
    setJobTitle(title);
    setJobDescription(description);
    
    // Generate resume using Gemini API
    const generatedResume = await generateResume(title, description);
    
    if (generatedResume) {
      setResumeData(generatedResume);
      setCurrentStep(Step.RESUME_FORM);
      
      toast({
        title: "Resume generated successfully",
        description: "We've created a resume based on the job description. Please review and edit if needed."
      });
    }
  };
  
  const handleResumeSubmit = async (data: ResumeData) => {
    setResumeData(data);
    
    // Optimize resume using Gemini API
    const optimizationResult = await optimizeResumeWithAI(jobTitle, jobDescription, data);
    
    if (optimizationResult) {
      const { atsScore, matchScore, improvementTips, keywordMatches, optimizedResume } = optimizationResult;
      
      setAtsScore(atsScore);
      setMatchScore(matchScore);
      setImprovementTips(improvementTips);
      setKeywordMatches(keywordMatches);
      setResumeData(optimizedResume);
      
      // Save to Convex
      const resumeId = await createResume(
        jobTitle,
        jobDescription,
        optimizedResume,
        atsScore,
        matchScore,
        improvementTips,
        keywordMatches
      );
      
      setCurrentResumeId(resumeId);
      setCurrentStep(Step.RESULT);
      
      toast({
        title: "Resume optimized successfully",
        description: "Your resume has been tailored to match the job requirements."
      });
    }
  };

  const handleEditResume = () => {
    setCurrentStep(Step.RESUME_FORM);
    toast({
      title: "Edit Resume",
      description: "You can now edit your resume details."
    });
  };

  const handleBack = () => {
    if (currentStep === Step.RESUME_FORM) {
      setCurrentStep(Step.JOB_DESCRIPTION);
    } else if (currentStep === Step.RESULT) {
      setCurrentStep(Step.RESUME_FORM);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#0A2463] mb-2">
              AI Resume Generator & Optimizer
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create an ATS-friendly resume tailored specifically to the job you're applying for.
              Our AI analyzes job descriptions to optimize your resume for the best match.
            </p>
          </div>
          
          <div className="flex justify-center mb-10">
            <div className="flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep >= Step.JOB_DESCRIPTION ? 'bg-[#0A2463] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${
                currentStep > Step.JOB_DESCRIPTION ? 'bg-[#0A2463]' : 'bg-gray-200'
              }`}></div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep >= Step.RESUME_FORM ? 'bg-[#0A2463] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${
                currentStep > Step.RESUME_FORM ? 'bg-[#0A2463]' : 'bg-gray-200'
              }`}></div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep >= Step.RESULT ? 'bg-[#0A2463] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
            </div>
          </div>
          
          {currentStep === Step.JOB_DESCRIPTION && (
            <JobDescriptionForm 
              onSubmit={handleJobDescriptionSubmit}
              isLoading={isGenerating}
            />
          )}
          
          {currentStep === Step.RESUME_FORM && (
            <ResumeForm 
              onSubmit={handleResumeSubmit}
              isLoading={isOptimizing}
              initialData={resumeData}
              onBack={handleBack}
            />
          )}
          
          {currentStep === Step.RESULT && (
            <OptimizedResume 
              resumeData={resumeData}
              atsScore={atsScore || 0}
              matchScore={matchScore || 0}
              improvementTips={improvementTips}
              keywordMatches={keywordMatches}
              onEditResume={handleEditResume}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeGenerator;
