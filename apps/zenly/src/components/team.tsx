import Link from 'next/link'
import Image from 'next/image'

const members = [
    {
        name: 'Abhishek Tiwari',
        role: 'Full Stack Developer, Lead',
        avatar: '/abhishek.webp',
        link: 'www.linkedin.com/in/abhishektiwari007',
    },
    {
        name: 'Aayush Tirole',
        role: 'Graphical Designer, UI/UX Designer',
        avatar: '/aayush-img.webp',
        link: 'https://www.linkedin.com/in/aayush-tirole-8421b4256/',
    }
]

export default function TeamSection() {
    return (
        <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-5xl border-t px-6">
                <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">Team</span>
                <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
                    <div className="sm:w-2/5">
                        <h2 className="text-3xl font-bold sm:text-4xl">Meet Our Founders</h2>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <p>The visionaries behind our success, leading the way in innovation and technology.</p>
                    </div>
                </div>
                <div className="mt-12 md:mt-24">
                    <div className="flex justify-center gap-12">
                        {members.map((member, index) => (
                            <div key={index} className="group w-[300px] overflow-hidden">
                                <div className="relative h-[400px] w-full">
                                    <Image 
                                        className="rounded-xl object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:scale-105" 
                                        src={member.avatar} 
                                        alt={member.name} 
                                        fill
                                        priority
                                    />
                                </div>
                                <div className="px-4 pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-xl font-medium transition-all duration-500 group-hover:tracking-wider">{member.name}</h3>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">{member.role}</span>
                                        <Link 
                                            target="_blank"
                                            href={member.link} 
                                            className="text-sm tracking-wide text-primary-600 dark:text-primary-400 hover:underline"
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
