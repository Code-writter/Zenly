'use client'
import Link from 'next/link'
import { Logo } from './logo'
import { Menu, X } from 'lucide-react'
import { ButtonRound } from '../moving-border'
import React from 'react'
import { useScroll } from 'motion/react'
import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { redirect } from 'next/navigation'

const menuItems = [
    { index : 1, name: 'Features', href: '/features' },
    {index : 2, name: 'Contact Us', href: '/contact' },
    { index : 3,name: 'About Us', href: '/about-us' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn(
                    'fixed z-50 w-full transition-all duration-300',
                    scrolled 
                        ? 'bg-background/40 backdrop-blur-xl shadow-sm' 
                        : 'bg-transparent'
                )}>
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-background/80 backdrop-blur-xl in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <SignedOut>
                                    <Button
                                        asChild
                                        className='h-11 w-25 rounded-full hover:bg-transparent border-2 border-white hover:border-2 hover:border-white hover:text-white ease-in-out duration-300 '
                                    >
                                        <SignInButton />
                                    </Button>
                                    <Button
                                        asChild
                                        className='h-11 w-25 rounded-full bg-secondary text-primary-foreground hover:bg-secondary/90 hover:text-white hover:border-2 hover:border-white  border-2 border-secondary ease-in-out duration-300 '
                                    >
                                        <SignUpButton />
                                    </Button>
                                </SignedOut>

                                <SignedIn>
                                    <UserButton />
                                
                                    <Button
                                        asChild
                                        onClick={() => redirect('/')}
                                        className='h-11 w-25 rounded-full hover:bg-transparent border-2 border-white hover:border-2 hover:border-white hover:text-white'
                                    >
                                        <SignOutButton />
                                    </Button>
                                </SignedIn>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
