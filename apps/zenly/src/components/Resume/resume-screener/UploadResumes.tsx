'use client'
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileUp, Upload, X, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/components/hooks/use-toast';

interface UploadResumesProps {
  onSubmit: (jobTitle: string, jobDescription: string, files: File[]) => void;
  isLoading?: boolean;
}

const UploadResumes: React.FC<UploadResumesProps> = ({ 
  onSubmit,
  isLoading = false
}) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "No resumes uploaded",
        description: "Please upload at least one resume to continue",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(jobTitle, jobDescription, files);
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-[#0A2463]">Screen Candidate Resumes</CardTitle>
        <CardDescription>
          Upload resumes to analyze and rank candidates based on job requirements
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="e.g. Senior Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
              className="min-h-[150px]"
            />
          </div>
          
          <div 
            className="border-2 border-dashed rounded-lg p-8 text-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center">
              <FileUp className="h-10 w-10 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium mb-2">
                Upload Candidate Resumes
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop files here, or click to browse
              </p>
              <Button 
                variant="outline" 
                type="button"
                className="relative"
              >
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                />
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Supports: PDF, DOC, DOCX, TXT files (Max 10MB each)
              </p>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Resumes ({files.length})</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto p-2 border rounded-md">
                {files.map((file, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-[#3E92CC] mr-2" />
                      <span className="text-sm truncate max-w-[250px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="bg-[#0A2463] hover:bg-[#0A2463]/90 ml-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Resumes...
              </>
            ) : (
              'Screen Resumes'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UploadResumes;
