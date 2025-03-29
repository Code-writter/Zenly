// 'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Brain, FileUser, ListCheck, Settings2, Sparkles, Zap } from 'lucide-react'
import { ReactNode } from 'react'
import { HoverEffect } from './ui/card-hover-effect'

const features = [
    {
        title: "To-Do List",
        description: "Customizable to-do lists with AI-powered suggestions and personalized templates.",
        link: "#",
        iconName: "ListCheck"
    },
    {
        title: "Resume Builder",
        description: "Resume builder with AI-powered suggestions and personalized templates.",
        link: "#",
        iconName: "FileUser"
    },
    {
        title: "Powered By Google Gemini",
        description: "Our platform leverages the power of Google Gemini to provide you with the best possible AI-powered experience.",
        link: "#",
        iconName: "Brain"
    }
]

const iconMap = {
    ListCheck,
    FileUser,
    Brain,
    Settings2,
    Sparkles,
    Zap
}

export default function Features() {
    return (
        <section className="bg-zinc-50 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="mx-auto mt-12 md:mt-24">
                    <HoverEffect 
                        items={features.map(feature => ({
                            ...feature,
                            icon: iconMap[feature.iconName as keyof typeof iconMap]
                        }))} 
                        className="gap-6" 
                    />
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div aria-hidden className="bg-radial to-background absolute inset-0 from-transparent to-75%" />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
