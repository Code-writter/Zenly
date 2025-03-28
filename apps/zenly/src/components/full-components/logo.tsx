import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { TextHoverEffect } from '../text-hover-effect'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <h1 className={cn(
            "text-3xl font-bold tracking-tight text-white bg-clip-text ",
            "font-['Orbitron']", // Modern tech font
            className
        )}>
            ZENLY
        </h1>
    )
}


