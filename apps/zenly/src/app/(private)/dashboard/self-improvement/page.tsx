"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Search } from "lucide-react";

export default function SelfImprovementPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-4">
            <h1 className="text-2xl font-semibold mb-8">Self Improvement Tools</h1>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard/self-improvement/resume-builder">
                    <Button size="lg" className="w-[200px] h-[100px] flex flex-col gap-2">
                        <FileText className="w-6 h-6" />
                        <span>Resume Builder</span>
                    </Button>
                </Link>
                <Link href="/dashboard/self-improvement/resume-screener">
                    <Button size="lg" className="w-[200px] h-[100px] flex flex-col gap-2">
                        <Search className="w-6 h-6" />
                        <span>Resume Screener</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
