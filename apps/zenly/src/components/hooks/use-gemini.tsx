
import { useState } from "react";
import { 
  generateResumeFromJobDescription, 
  optimizeResume, 
  ResumeData, 
  AnalysisResult 
} from "@/components/Resume/services/gemini";
import { useToast } from "@/components/hooks/use-toast";

export function useGemini() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { toast } = useToast();

  const generateResume = async (jobTitle: string, jobDescription: string): Promise<ResumeData | null> => {
    setIsGenerating(true);
    try {
      const resumeData = await generateResumeFromJobDescription(jobTitle, jobDescription);
      return resumeData;
    } catch (error) {
      console.error("Error generating resume:", error);
      toast({
        title: "Resume Generation Failed",
        description: "There was an error generating your resume. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const optimizeResumeWithAI = async (
    jobTitle: string,
    jobDescription: string,
    resumeData: ResumeData
  ): Promise<AnalysisResult | null> => {
    setIsOptimizing(true);
    try {
      const result = await optimizeResume(jobTitle, jobDescription, resumeData);
      return result;
    } catch (error) {
      console.error("Error optimizing resume:", error);
      toast({
        title: "Resume Optimization Failed",
        description: "There was an error optimizing your resume. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsOptimizing(false);
    }
  };

  return {
    generateResume,
    optimizeResumeWithAI,
    isGenerating,
    isOptimizing,
  };
}
