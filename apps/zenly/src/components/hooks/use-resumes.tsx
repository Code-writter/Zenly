
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { ResumeData } from "@/components/Resume/services/gemini";

export function useResumes() {
  const createResume = useMutation(api.resumes.create);
  const updateResume = useMutation(api.resumes.update);
  const getResume = useQuery.bind(null, api.resumes.getById);
  const getAllResumes = useQuery(api.resumes.getAll);

  const createNewResume = async (
    jobTitle: string,
    jobDescription: string,
    resumeData: ResumeData,
    atsScore?: number,
    matchScore?: number,
    improvementTips?: string[],
    keywordMatches?: Array<{ keyword: string; found: boolean }>
  ) => {
    return await createResume({
      jobTitle,
      jobDescription,
      resumeData,
      atsScore,
      matchScore,
      improvementTips,
      keywordMatches,
    });
  };

  const updateExistingResume = async (
    id: Id<"resumes">,
    resumeData: ResumeData,
    atsScore?: number,
    matchScore?: number,
    improvementTips?: string[],
    keywordMatches?: Array<{ keyword: string; found: boolean }>
  ) => {
    await updateResume({
      id,
      resumeData,
      atsScore,
      matchScore,
      improvementTips,
      keywordMatches,
    });
  };

  return {
    createResume: createNewResume,
    updateResume: updateExistingResume,
    getResume,
    getAllResumes,
  };
}
