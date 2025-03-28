
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo signup - would be replaced with actual auth logic
    toast({
      title: "Account created",
      description: "Welcome to ResumeAI! You can now log in."
    });
    
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <FileText className="h-12 w-12 text-[#0A2463]" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-[#0A2463]">
            Create your account
          </h2>
          <p className="mt-2 text-gray-600">
            Start optimizing your resume and screening candidates
          </p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                />
                <p className="text-xs text-gray-500">
                  Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  required 
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" className="mt-1" />
                <label
                  htmlFor="terms"
                  className="text-sm leading-tight"
                >
                  I agree to the 
                  <a href="#" className="text-[#3E92CC] hover:underline ml-1">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-[#3E92CC] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-[#0A2463] hover:bg-[#0A2463]/90"
              >
                Create Account
              </Button>
              
              <div className="text-center text-sm">
                Already have an account?{' '}
                <a 
                  href="/login" 
                  className="font-medium text-[#3E92CC] hover:text-[#3E92CC]/80"
                >
                  Sign in
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
