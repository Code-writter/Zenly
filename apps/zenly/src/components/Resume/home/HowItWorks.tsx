
import React from 'react';
import { Upload, FileText, Search, Check } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Upload Job Description",
    description: "Start by uploading the job description to analyze required skills and qualifications.",
    icon: <Upload className="h-12 w-12 text-[#3E92CC]" />
  },
  {
    number: "02",
    title: "Generate or Screen",
    description: "Choose to generate an optimized resume or screen candidate applications.",
    icon: <FileText className="h-12 w-12 text-[#3E92CC]" />
  },
  {
    number: "03",
    title: "AI Analysis",
    description: "Our AI analyzes keywords, skills, and experiences to match with the job requirements.",
    icon: <Search className="h-12 w-12 text-[#3E92CC]" />
  },
  {
    number: "04",
    title: "Get Results",
    description: "Receive your optimized resume or ranked candidate list with match scores.",
    icon: <Check className="h-12 w-12 text-[#3E92CC]" />
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A2463] mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple process to optimize your resume or screen candidates with AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 h-full">
                <div className="absolute -top-4 -left-4 bg-[#0A2463] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
                <div className="mt-6 mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-[#0A2463] mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <svg width="40" height="12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 6H0M34 1L40 6 34 11" stroke="#3E92CC" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
