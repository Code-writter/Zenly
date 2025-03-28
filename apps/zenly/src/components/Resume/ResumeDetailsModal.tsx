import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Star, User, Mail, Briefcase, GraduationCap, MapPin, Globe } from "lucide-react";

interface ResumeDetailsModalProps {
  resume: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeDetailsModal({ resume, isOpen, onClose }: ResumeDetailsModalProps) {
  if (!resume) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            {resume.jobTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <span>{resume.personalInfo.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <span>{resume.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{resume.personalInfo.location}</span>
              </div>
              {resume.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>{resume.personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Professional Summary</h3>
            <p className="text-neutral-600 dark:text-neutral-400">{resume.summary}</p>
          </div>

          {/* Experience Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Experience</h3>
            {resume.experience.map((exp: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{exp.title}</h4>
                  <span className="text-sm text-neutral-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Briefcase className="w-4 h-4" />
                  <span>{exp.company}</span>
                  <span>•</span>
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Education</h3>
            {resume.education.map((edu: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{edu.degree}</h4>
                  <span className="text-sm text-neutral-500">{edu.graduationDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <GraduationCap className="w-4 h-4" />
                  <span>{edu.school}</span>
                  <span>•</span>
                  <MapPin className="w-4 h-4" />
                  <span>{edu.location}</span>
                </div>
                {edu.description && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{edu.description}</p>
                )}
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {resume.skills.split(",").map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-sm text-black dark:text-neutral-200"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* ATS Score Section */}
          {resume.atsScore && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">ATS Score</h3>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-medium">{resume.atsScore}%</span>
              </div>
            </div>
          )}

          {/* Improvement Tips Section */}
          {resume.improvementTips && resume.improvementTips.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Improvement Tips</h3>
              <ul className="list-disc list-inside space-y-2">
                {resume.improvementTips.map((tip: string, index: number) => (
                  <li key={index} className="text-sm text-neutral-600 dark:text-neutral-400">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 