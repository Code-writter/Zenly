
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Users, Settings } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-[#0A2463] text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-xl font-bold">ResumeAI</h1>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Button 
            variant="link" 
            className="text-white"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
          <Button 
            variant="link" 
            className="text-white"
            onClick={() => navigate('/resume-generator')}
          >
            Resume Generator
          </Button>
          <Button 
            variant="link" 
            className="text-white"
            onClick={() => navigate('/resume-screener')}
          >
            Resume Screener
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-[#0A2463]"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            className="bg-[#3E92CC] hover:bg-[#3E92CC]/80"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
