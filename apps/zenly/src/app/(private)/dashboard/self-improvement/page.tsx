"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Search, Plus } from "lucide-react";
import ResumeList from "@/components/Resume/ResumeList";

export default function SelfImprovementPage() {
    return (
        <div className="flex flex-col gap-8">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-bold mb-2">Self Improvement Tools</h1>
                <p className="text-muted-foreground">
                    Create and manage your professional documents
                </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/dashboard/self-improvement/resume-builder" className="block">
                    <div className="group relative overflow-hidden rounded-xl border bg-card hover:bg-accent/50 transition-colors p-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="rounded-full bg-primary/10 p-4">
                                <FileText className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-1">Resume Builder</h3>
                                <p className="text-sm text-muted-foreground">
                                    Create and optimize your resume
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="/dashboard/self-improvement/resume-screener" className="block">
                    <div className="group relative overflow-hidden rounded-xl border bg-card hover:bg-accent/50 transition-colors p-6">
                        <div className="flex flex-col items-center gap-4">
                            <div className="rounded-full bg-primary/10 p-4">
                                <Search className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-1">Resume Screener</h3>
                                <p className="text-sm text-muted-foreground">
                                    Analyze and improve your resume
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Resumes Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold mb-1">Your Resumes</h2>
                        <p className="text-sm text-muted-foreground">
                            Manage and view all your created resumes
                        </p>
                    </div>
                    <Link href="/dashboard/self-improvement/resume-builder">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create New Resume
                        </Button>
                    </Link>
                </div>
                <div className="overflow-x-hidden">
                    <ResumeList />
                </div>
            </div>
        </div>
    )
}
