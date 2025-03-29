'use client'
import React, { Suspense, useState } from 'react';
import { useToast } from '@/components/hooks/use-toast';
import { useGemini } from '@/components/hooks/use-gemini';
import { useResumes } from '@/components/hooks/use-resumes';
import ResumeForm from '@/components/Resume/resume-generator/ResumeForm';
import OptimizedResume from '@/components/Resume/resume-generator/OptimizedResume';
import { ResumeData } from '@/components/Resume/services/gemini';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Loader from '@/components/full-components/loader';

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
    website: ''
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

export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState(Step.JOB_DESCRIPTION);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [atsScore, setAtsScore] = useState<number | undefined>(undefined);
  const [matchScore, setMatchScore] = useState<number | undefined>(undefined);
  const [improvementTips, setImprovementTips] = useState<string[]>([]);
  const [keywordMatches, setKeywordMatches] = useState<Array<{ keyword: string; found: boolean }>>([]);
  
  const { toast } = useToast();
  const { generateResume, optimizeResumeWithAI, isGenerating, isOptimizing } = useGemini();
  const { createResume } = useResumes();

  const handleJobDescriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in both job title and description.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Generate initial resume using Gemini API
      const generatedResume = await generateResume(jobTitle, jobDescription);
      
      if (generatedResume) {
        setResumeData(generatedResume);
        setCurrentStep(Step.RESUME_FORM);
        
        toast({
          title: "Resume generated successfully",
          description: "We've created a resume based on the job description. Please review and edit if needed."
        });
      }
    } catch (error) {
      console.error("Error generating resume:", error);
      toast({
        title: "Error generating resume",
        description: "There was an error generating your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleResumeSubmit = async (data: ResumeData) => {
    try {
      setResumeData(data);
      
      // Optimize resume using Gemini API
      const optimizationResult = await optimizeResumeWithAI(
        jobTitle,
        jobDescription,
        data
      );
      
      if (optimizationResult) {
        const { atsScore, matchScore, improvementTips, keywordMatches, optimizedResume } = optimizationResult;
        
        setAtsScore(atsScore);
        setMatchScore(matchScore);
        setImprovementTips(improvementTips);
        setKeywordMatches(keywordMatches);
        setResumeData(optimizedResume);
        
        // Save to Convex
        await createResume(
          jobTitle,
          jobDescription,
          optimizedResume,
          atsScore,
          matchScore,
          improvementTips,
          keywordMatches
        );
        
        setCurrentStep(Step.RESULT);
        
        toast({
          title: "Resume optimized successfully",
          description: "Your resume has been optimized for better ATS compatibility."
        });
      }
    } catch (error) {
      console.error("Error optimizing resume:", error);
      toast({
        title: "Error optimizing resume",
        description: "There was an error optimizing your resume. Please try again.",
        variant: "destructive"
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
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={<Loader />}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Resume Builder
        </h1>
        <p className="text-background/200 max-w-2xl mx-auto">
          Create and optimize your resume for better ATS compatibility and job matching.
        </p>
      </div>

      {currentStep === Step.JOB_DESCRIPTION && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Job Description</CardTitle>
            <CardDescription>
              Enter the job details to generate a tailored resume
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleJobDescriptionSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px]"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                type="submit" 
                className="mt-5 bg-white hover:bg-white/30"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Resume'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      {currentStep === Step.RESUME_FORM && (
        <ResumeForm 
          onSubmit={handleResumeSubmit}
          onBack={handleBack}
          isLoading={isOptimizing}
          initialData={resumeData}
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
      </Suspense>
    </div>
  );
}
