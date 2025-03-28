
import React from 'react';
import { FileText, Mail, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0A2463] text-white py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-6 w-6" />
              <h2 className="text-xl font-bold">ResumeAI</h2>
            </div>
            <p className="text-gray-300">
              AI-powered tools to optimize your resume and streamline your hiring process.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/resume-generator" className="text-gray-300 hover:text-white transition-colors">Resume Generator</a></li>
              <li><a href="/resume-screener" className="text-gray-300 hover:text-white transition-colors">Resume Screener</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
