
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    content: "ResumeAI helped me optimize my resume for tech roles. I started getting more interview calls almost immediately!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "HR Manager",
    content: "As a recruiter, this tool has saved me countless hours screening resumes. The AI ranking is surprisingly accurate.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Specialist",
    content: "I was struggling to get past ATS systems. The resume generator gave me valuable suggestions that made a huge difference.",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A2463] mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from job seekers and recruiters who have used our platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="bg-[#3E92CC] text-white h-10 w-10 rounded-full flex items-center justify-center font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-[#0A2463]">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
