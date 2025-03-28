
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Copy, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  summary: string;
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    description: string;
  }[];
  skills: string;
}

interface OptimizedResumeProps {
  resumeData: ResumeData;
  atsScore: number;
  matchScore: number;
  improvementTips: string[];
  keywordMatches: { keyword: string; found: boolean }[];
  onEditResume: () => void;
}

const OptimizedResume: React.FC<OptimizedResumeProps> = ({ 
  resumeData,
  atsScore,
  matchScore,
  improvementTips,
  keywordMatches,
  onEditResume
}) => {
  const { toast } = useToast();

  const handleCopy = () => {
    const resumeText = `
      ${resumeData.personalInfo.name}
      ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}
      ${resumeData.personalInfo.website}
      
      PROFESSIONAL SUMMARY
      ${resumeData.summary}
      
      EXPERIENCE
      ${resumeData.experience.map(exp => `
        ${exp.title} | ${exp.company} | ${exp.location}
        ${exp.startDate} - ${exp.endDate}
        ${exp.description}
      `).join('\n')}
      
      EDUCATION
      ${resumeData.education.map(edu => `
        ${edu.degree} | ${edu.school} | ${edu.location}
        ${edu.graduationDate}
        ${edu.description}
      `).join('\n')}
      
      SKILLS
      ${resumeData.skills}
    `;
    
    navigator.clipboard.writeText(resumeText);
    toast({
      description: "Resume copied to clipboard",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      description: "Downloading PDF...",
    });
    // PDF generation logic would go here
  };

  const handleDownloadDOCX = () => {
    toast({
      description: "Downloading DOCX...",
    });
    // DOCX generation logic would go here
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl text-[#0A2463]">Your Optimized Resume</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleCopy}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-[#0A2463] hover:bg-[#0A2463]/90"
                    onClick={handleDownloadPDF}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pb-6">
              <div className="border border-gray-200 rounded-lg p-8 bg-white shadow-sm">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-[#0A2463] mb-2">
                    {resumeData.personalInfo.name}
                  </h1>
                  <div className="flex flex-wrap justify-center text-sm text-gray-600 gap-x-4 gap-y-1">
                    {resumeData.personalInfo.email && (
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {resumeData.personalInfo.email}
                      </div>
                    )}
                    {resumeData.personalInfo.phone && (
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {resumeData.personalInfo.phone}
                      </div>
                    )}
                    {resumeData.personalInfo.location && (
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {resumeData.personalInfo.location}
                      </div>
                    )}
                    {resumeData.personalInfo.website && (
                      <div className="flex items-center">
                        <Globe className="h-3 w-3 mr-1" />
                        {resumeData.personalInfo.website}
                      </div>
                    )}
                  </div>
                </div>
                
                {resumeData.summary && (
                  <div className="mb-6">
                    <h2 className="text-md font-bold uppercase text-[#0A2463] border-b border-gray-300 pb-1 mb-3">
                      Professional Summary
                    </h2>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{resumeData.summary}</p>
                  </div>
                )}
                
                {resumeData.experience.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-md font-bold uppercase text-[#0A2463] border-b border-gray-300 pb-1 mb-3">
                      Experience
                    </h2>
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-semibold">{exp.title}</h3>
                            <p className="text-sm">{exp.company} - {exp.location}</p>
                          </div>
                          <p className="text-sm text-gray-600 whitespace-nowrap">
                            {exp.startDate} - {exp.endDate}
                          </p>
                        </div>
                        <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {resumeData.education.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-md font-bold uppercase text-[#0A2463] border-b border-gray-300 pb-1 mb-3">
                      Education
                    </h2>
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-semibold">{edu.degree}</h3>
                            <p className="text-sm">{edu.school} - {edu.location}</p>
                          </div>
                          <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                        </div>
                        {edu.description && (
                          <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {resumeData.skills && (
                  <div>
                    <h2 className="text-md font-bold uppercase text-[#0A2463] border-b border-gray-300 pb-1 mb-3">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.split(',').map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center pt-0">
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={onEditResume}
                >
                  Edit Resume
                </Button>
                <Button 
                  variant="default"
                  size="sm"
                  className="bg-[#0A2463] hover:bg-[#0A2463]/90"
                >
                  Save to Profile
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadDOCX}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  DOCX
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl text-[#0A2463]">Resume Analysis</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ATS Compatibility</span>
                  <span className="text-sm font-medium">{atsScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      atsScore >= 80 
                        ? 'bg-green-500' 
                        : atsScore >= 60 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${atsScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Job Match Score</span>
                  <span className="text-sm font-medium">{matchScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      matchScore >= 80 
                        ? 'bg-green-500' 
                        : matchScore >= 60 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${matchScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Keyword Matches</h4>
                <div className="grid grid-cols-2 gap-2">
                  {keywordMatches.map((keyword, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center p-2 rounded text-xs ${
                        keyword.found 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {keyword.found ? (
                        <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <span className="h-3 w-3 mr-1 inline-block rounded-full border border-gray-400"></span>
                      )}
                      {keyword.keyword}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Improvement Tips</h4>
                <ul className="space-y-2 text-sm">
                  {improvementTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#3E92CC] mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OptimizedResume;
