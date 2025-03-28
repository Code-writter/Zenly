import ResumeScreener from '@/components/Resume/resume-screener/ResumeScreener';

export default function ResumeScreenerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-8xl font-bold text-[#0A2463] mb-8">
          Resume Screener
        </h1>
        <ResumeScreener />
      </div>
    </main>
  );
} 