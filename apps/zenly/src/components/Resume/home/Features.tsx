
import React from 'react';
import { 
  FileText, 
  CheckCircle, 
  BarChart, 
  Shield, 
  Download,
  Users
} from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-12 w-12 text-[#3E92CC]" />,
    title: "AI Resume Generator",
    description: "Automatically tailors resumes and cover letters based on job descriptions, optimizing keywords and structure."
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-[#3E92CC]" />,
    title: "ATS Optimization",
    description: "Ensures resumes pass ATS filters by formatting and enhancing content based on industry trends."
  },
  {
    icon: <BarChart className="h-12 w-12 text-[#3E92CC]" />,
    title: "Candidate Ranking",
    description: "Uses NLP to analyze experience, skills, and keywords to score and rank applicants for recruiters."
  },
  {
    icon: <Shield className="h-12 w-12 text-[#3E92CC]" />,
    title: "Bias Reduction",
    description: "Implements blind screening to reduce unconscious bias in hiring decisions."
  },
  {
    icon: <Download className="h-12 w-12 text-[#3E92CC]" />,
    title: "Multi-Format Export",
    description: "Export resumes in PDF, DOCX, or HTML for easy sharing and application."
  },
  {
    icon: <Users className="h-12 w-12 text-[#3E92CC]" />,
    title: "Recruiter Dashboard",
    description: "Streamlined interface for HR teams to manage, filter, and evaluate candidates efficiently."
  }
];

const Features = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A2463] mb-4">Key Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform provides tools for both job seekers and recruiters, streamlining the hiring process.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-[#0A2463] mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
