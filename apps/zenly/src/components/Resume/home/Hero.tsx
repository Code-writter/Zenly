
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Users, ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-r from-[#0A2463] to-[#3E92CC] text-white py-20 px-6">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Optimize Your Resume with AI
          </h1>
          <p className="text-xl mb-8">
            Create ATS-friendly resumes and efficiently screen candidates with our AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-[#0A2463] hover:bg-gray-100"
              onClick={() => navigate('/resume-generator')}
            >
              <FileText className="mr-2 h-5 w-5" />
              Generate Resume
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#0A2463]"
              onClick={() => navigate('/resume-screener')}
            >
              <Users className="mr-2 h-5 w-5" />
              Screen Candidates
            </Button>
          </div>
        </div>
        
        <div className="hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
            alt="Resume AI" 
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
