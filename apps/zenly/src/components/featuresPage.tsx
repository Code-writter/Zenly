import { Brain, FileUser, ListCheck, Pencil, Settings2, Sparkles, Zap } from 'lucide-react'

export default function Features() {
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-balance text-4xl font-medium lg:text-5xl">Powerful Features for Your Success</h2>
                    <p className="text-muted-foreground">Discover how our AI-powered platform helps you organize tasks and create professional resumes with ease.</p>
                </div>

                <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <ListCheck className="size-4" />
                            <h3 className="text-sm font-medium">Smart To-Do Lists</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">AI-powered task organization with intelligent suggestions and priority management.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <FileUser className="size-4" />
                            <h3 className="text-sm font-medium">Resume Builder</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Create professional resumes with AI assistance and customizable templates.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Brain className="size-4" />
                            <h3 className="text-sm font-medium">Gemini AI</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Powered by Google's Gemini AI for intelligent task and resume suggestions.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Pencil className="size-4" />
                            <h3 className="text-sm font-medium">Customization</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Personalize your experience with custom templates and preferences.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Settings2 className="size-4" />
                            <h3 className="text-sm font-medium">Easy Control</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Intuitive interface for managing tasks and resumes efficiently.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="size-4" />
                            <h3 className="text-sm font-medium">AI Integration</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Seamless AI integration for enhanced productivity and creativity.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
