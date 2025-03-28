
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <FileText className="h-24 w-24 text-[#3E92CC] mb-6" />
      <h1 className="text-6xl font-bold text-[#0A2463] mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        The page you are looking for does not exist
      </p>
      <Button 
        onClick={() => navigate('/')}
        className="flex items-center bg-[#0A2463] hover:bg-[#0A2463]/90"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Return to Home
      </Button>
    </div>
  );
};

export default NotFound;
