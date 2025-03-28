
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-6 bg-[#0A2463] text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Optimize Your Resume or Streamline Your Hiring?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Join thousands of job seekers and recruiters who are using AI to 
          transform their approach to the hiring process.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-white text-[#0A2463] hover:bg-gray-100"
            onClick={() => navigate('/signup')}
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#0A2463]"
            onClick={() => navigate('/about')}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
