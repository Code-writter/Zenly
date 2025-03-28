'use client'

import React, { useState } from 'react';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import UploadResumes from '@/components/Resume/resume-screener/UploadResumes';
import CandidateResults from '@/components/Resume/resume-screener/CandidateResults';
import { useToast } from '@/components/hooks/use-toast';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

// Mock data for demo
const mockCandidates = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '(123) 456-7890',
    matchScore: 92,
    experience: 6,
    education: 'M.S. in Computer Science',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL', 'MongoDB'],
    missingSkills: [],
    resumeUrl: '#'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '(234) 567-8901',
    matchScore: 85,
    experience: 4,
    education: 'B.S. in Computer Engineering',
    skills: ['React', 'JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    missingSkills: ['GraphQL'],
    resumeUrl: '#'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '(345) 678-9012',
    matchScore: 78,
    experience: 3,
    education: 'B.S. in Information Technology',
    skills: ['React', 'CSS', 'HTML', 'JavaScript', 'Firebase', 'REST APIs'],
    missingSkills: ['Node.js', 'GraphQL'],
    resumeUrl: '#'
  },
  {
    id: '4',
    name: 'James Rodriguez',
    email: 'james.rodriguez@example.com',
    phone: '(456) 789-0123',
    matchScore: 68,
    experience: 5,
    education: 'B.A. in Computer Science',
    skills: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'MySQL', 'Git'],
    missingSkills: ['React', 'Node.js'],
    resumeUrl: '#'
  },
  {
    id: '5',
    name: 'Jessica Lee',
    email: 'jessica.lee@example.com',
    phone: '(567) 890-1234',
    matchScore: 55,
    experience: 2,
    education: 'Associate Degree in Web Development',
    skills: ['HTML', 'CSS', 'JavaScript', 'JQuery', 'PHP', 'WordPress'],
    missingSkills: ['React', 'Node.js', 'TypeScript'],
    resumeUrl: '#'
  }
];

const mockKeySkills = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'REST APIs', 'Team Leadership'];

enum Step {
  UPLOAD,
  RESULTS
}

// API Key for Gemini
const API_KEY = "YOUR_GEMINI_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

const ResumeScreener = () => {
  const [currentStep, setCurrentStep] = useState(Step.UPLOAD);
  const [isLoading, setIsLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [candidates, setCandidates] = useState(mockCandidates);
  const [keySkills, setKeySkills] = useState(mockKeySkills);
  const { toast } = useToast();
  
  // Convex mutation
  const saveScreeningResults = useMutation(api.resumes.create);
  
  const handleUploadSubmit = async (title: string, description: string, files: File[]) => {
    setIsLoading(true);
    
    try {
      setJobTitle(title);
      setJobDescription(description);
      
      // Extract key skills from job description using Gemini
      await extractKeySkills(description);
      
      // In a real app, we would upload the files to a storage service,
      // and then analyze them with Gemini. For demo purposes, we'll use mock data.
      
      // Save results to Convex (using a placeholder resume for demo)
      const mockResumeData = {
        personalInfo: {
          name: "Top Candidate",
          email: "candidate@example.com",
          phone: "(123) 456-7890",
          location: "San Francisco, CA",
        },
        summary: "Experienced software engineer with expertise in " + keySkills.join(", "),
        experience: [
          {
            title: "Senior Developer",
            company: "Tech Company",
            location: "San Francisco, CA",
            startDate: "01/2020",
            endDate: "Present",
            description: "Led development of key features",
          }
        ],
        education: [
          {
            degree: "B.S. Computer Science",
            school: "University of Technology",
            location: "California",
            graduationDate: "05/2015",
          }
        ],
        skills: keySkills.join(", "),
      };
      
      await saveScreeningResults({
        jobTitle: title,
        jobDescription: description,
        resumeData: mockResumeData,
        atsScore: 90,
        matchScore: 85,
      });
      
      setCurrentStep(Step.RESULTS);
      toast({
        title: `${files.length} resumes analyzed`,
        description: "Candidates have been ranked based on job requirements."
      });
    } catch (error) {
      console.error("Error processing resumes:", error);
      toast({
        title: "Error analyzing resumes",
        description: "There was an error processing the resumes.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const extractKeySkills = async (jobDescription: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      
      const prompt = `
        Extract 6-8 key skills from the following job description. Return only an array of skills in JSON format.
        
        Job Description:
        ${jobDescription}
        
        Return format:
        ["Skill 1", "Skill 2", "Skill 3"]
      `;
      
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      // Extract JSON array from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const skills = JSON.parse(jsonMatch[0]) as string[];
        setKeySkills(skills);
      }
    } catch (error) {
      console.error("Error extracting key skills:", error);
      // Fallback to mock skills if there's an error
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow py-10 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#0A2463] mb-2">
              AI Resume Screening App
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quickly analyze and rank job applicants based on how well their resumes match your specific job requirements.
              Our AI technology helps reduce bias and identify the best candidates.
            </p>
          </div>
          
          {currentStep === Step.UPLOAD && (
            <UploadResumes 
              onSubmit={handleUploadSubmit}
              isLoading={isLoading}
            />
          )}
          
          {currentStep === Step.RESULTS && (
            <CandidateResults 
              candidates={candidates}
              keySkills={keySkills}
              jobTitle={jobTitle}
            />
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ResumeScreener;
