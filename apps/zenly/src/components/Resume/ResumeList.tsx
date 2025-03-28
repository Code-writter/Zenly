import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Star, User, Mail, Briefcase } from "lucide-react";
import { BackgroundGradient } from "../ui/background-gemini-effect-onCard";
import ResumeDetailsModal from "./ResumeDetailsModal";
import { useState } from "react";

export default function ResumeList() {
  const resumes = useQuery(api.resumes.getAll);
  const [selectedResume, setSelectedResume] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!resumes) {
    return <div>Loading...</div>;
  }

  const handleViewDetails = (resume: any) => {
    setSelectedResume(resume);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1400px] mx-auto">
        {resumes.map((resume, index) => (
          <div key={resume._id} className={`${index === resumes.length - 1 && resumes.length % 2 !== 0 ? "md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto" : ""}`}>
            <BackgroundGradient 
              className="rounded-2xl p-6 bg-card h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    {resume.jobTitle}
                  </h3>
                </div>
                {resume.atsScore && (
                  <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">{resume.atsScore}%</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{resume.personalInfo.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{resume.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  <span>{resume.experience[0]?.company || "No company listed"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {resume.skills.split(",").slice(0, 4).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium"
                  >
                    {skill.trim()}
                  </span>
                ))}
                {resume.skills.split(",").length > 4 && (
                  <span className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium">
                    +{resume.skills.split(",").length - 4} more
                  </span>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button 
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleViewDetails(resume)}
                >
                  View Details
                </Button>
                <Link href={`/dashboard/self-improvement/resume-builder?id=${resume._id}`}>
                  <Button 
                    variant="default"
                    size="sm"
                    className="rounded-full"
                  >
                    Edit Resume
                  </Button>
                </Link>
              </div>
            </BackgroundGradient>
          </div>
        ))}
      </div>

      <ResumeDetailsModal
        resume={selectedResume}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 