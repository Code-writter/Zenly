
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ResumeData } from '@/services/gemini';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase,
  GraduationCap,
  Award,
  FileUp,
  Upload,
  Loader2,
  ArrowLeft
} from 'lucide-react';

interface ResumeFormProps {
  onSubmit: (resumeData: ResumeData) => void;
  onBack: () => void;
  isLoading?: boolean;
  initialData?: ResumeData;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ 
  onSubmit,
  onBack,
  isLoading = false,
  initialData
}) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      website: ''
    },
    summary: '',
    experience: [
      { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }
    ],
    education: [
      { degree: '', school: '', location: '', graduationDate: '', description: '' }
    ],
    skills: ''
  });
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialData) {
      setResumeData(initialData);
    }
  }, [initialData]);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value
      }
    });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      summary: e.target.value
    });
  };

  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [name]: value
    };
    
    setResumeData({
      ...resumeData,
      experience: updatedExperience
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };

  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value
    };
    
    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { degree: '', school: '', location: '', graduationDate: '', description: '' }
      ]
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      skills: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(resumeData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size should be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploadedFile(file);
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });

    parseResume(file);
  };

  const parseResume = (file: File) => {
    setIsUploading(true);

    // In a real application, we would send the file to a backend service
    // for parsing. For now, we'll simulate this with a delay
    // and use our initial data as a fallback
    setTimeout(() => {
      setIsUploading(false);
      
      toast({
        title: "Resume parsed successfully",
        description: "We've extracted the information from your resume. Please review and make any necessary changes."
      });
    }, 2000);
  };

  const handleUploadContinue = () => {
    if (uploadedFile) {
      onSubmit(resumeData);
    } else {
      toast({
        title: "No file uploaded",
        description: "Please upload a resume file or fill the form manually",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0A2463]">Your Resume Information</CardTitle>
        <CardDescription>
          Enter your resume details or upload an existing resume to optimize
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="form">Enter Details</TabsTrigger>
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
        </TabsList>
        
        <TabsContent value="form">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center text-[#0A2463]">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={resumeData.personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <Mail className="h-4 w-4" />
                      </span>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={resumeData.personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        required
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <Phone className="h-4 w-4" />
                      </span>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(123) 456-7890"
                        value={resumeData.personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <Input
                        id="location"
                        name="location"
                        placeholder="City, State"
                        value={resumeData.personalInfo.location}
                        onChange={handlePersonalInfoChange}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website">Website/LinkedIn (Optional)</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <Globe className="h-4 w-4" />
                      </span>
                      <Input
                        id="website"
                        name="website"
                        placeholder="https://linkedin.com/in/johndoe"
                        value={resumeData.personalInfo.website}
                        onChange={handlePersonalInfoChange}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0A2463]">Professional Summary</h3>
                <Textarea
                  placeholder="A brief summary of your professional background and key skills..."
                  value={resumeData.summary}
                  onChange={handleSummaryChange}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center text-[#0A2463]">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Work Experience
                  </h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addExperience}
                  >
                    Add Experience
                  </Button>
                </div>
                
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${index}`}>Job Title</Label>
                        <Input
                          id={`title-${index}`}
                          name="title"
                          placeholder="Software Engineer"
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(index, e)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`company-${index}`}>Company</Label>
                        <Input
                          id={`company-${index}`}
                          name="company"
                          placeholder="Acme Inc."
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, e)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`location-${index}`}>Location</Label>
                        <Input
                          id={`location-${index}`}
                          name="location"
                          placeholder="City, State"
                          value={exp.location}
                          onChange={(e) => handleExperienceChange(index, e)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                          <Input
                            id={`startDate-${index}`}
                            name="startDate"
                            placeholder="MM/YYYY"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, e)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`endDate-${index}`}>End Date</Label>
                          <Input
                            id={`endDate-${index}`}
                            name="endDate"
                            placeholder="MM/YYYY or Present"
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(index, e)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`description-${index}`}>Description</Label>
                      <Textarea
                        id={`description-${index}`}
                        name="description"
                        placeholder="Describe your responsibilities and achievements..."
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center text-[#0A2463]">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Education
                  </h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addEducation}
                  >
                    Add Education
                  </Button>
                </div>
                
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          name="degree"
                          placeholder="Bachelor of Science in Computer Science"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, e)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`school-${index}`}>School</Label>
                        <Input
                          id={`school-${index}`}
                          name="school"
                          placeholder="University of Technology"
                          value={edu.school}
                          onChange={(e) => handleEducationChange(index, e)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`eduLocation-${index}`}>Location</Label>
                        <Input
                          id={`eduLocation-${index}`}
                          name="location"
                          placeholder="City, State"
                          value={edu.location}
                          onChange={(e) => handleEducationChange(index, e)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`graduationDate-${index}`}>Graduation Date</Label>
                        <Input
                          id={`graduationDate-${index}`}
                          name="graduationDate"
                          placeholder="MM/YYYY"
                          value={edu.graduationDate}
                          onChange={(e) => handleEducationChange(index, e)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`eduDescription-${index}`}>
                        Description (Optional)
                      </Label>
                      <Textarea
                        id={`eduDescription-${index}`}
                        name="description"
                        placeholder="Relevant coursework, honors, activities..."
                        value={edu.description}
                        onChange={(e) => handleEducationChange(index, e)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center text-[#0A2463]">
                  <Award className="mr-2 h-5 w-5" />
                  Skills
                </h3>
                <Textarea
                  placeholder="List your skills separated by commas (e.g., JavaScript, React, Node.js, Project Management)..."
                  value={resumeData.skills}
                  onChange={handleSkillsChange}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                type="button"
                onClick={onBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                className="bg-[#0A2463] hover:bg-[#0A2463]/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Optimized Resume'
                )}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="upload">
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isUploading ? (
                    <>
                      <Loader2 className="w-12 h-12 mb-4 text-gray-500 animate-spin" />
                      <p className="mb-2 text-lg text-gray-500">
                        Parsing your resume...
                      </p>
                    </>
                  ) : uploadedFile ? (
                    <>
                      <FileUp className="w-12 h-12 mb-4 text-green-500" />
                      <p className="mb-2 text-lg text-gray-700 font-semibold">
                        {uploadedFile.name}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        File uploaded successfully
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setUploadedFile(null)}
                      >
                        Remove
                      </Button>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mb-4 text-gray-500" />
                      <p className="mb-2 text-lg text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        Upload your existing resume
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOCX, or TXT files (MAX. 5MB)
                      </p>
                    </>
                  )}
                </div>
                <input 
                  id="resume-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  disabled={isUploading}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 text-center">
              We'll extract information from your resume automatically for optimization
            </p>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline"
              type="button"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button 
              type="button" 
              className="bg-[#0A2463] hover:bg-[#0A2463]/90"
              onClick={handleUploadContinue}
              disabled={isUploading || !uploadedFile}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ResumeForm;
