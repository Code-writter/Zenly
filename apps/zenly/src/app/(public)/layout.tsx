import Footer from "@/components/footer";

import { HeroHeader } from "@/components/full-components/hero-header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <HeroHeader />
            {children}
            <Footer />
        </div>
    )
}
