import SideBar from "@/components/full-components/Side-bar";
import { Suspense } from "react";
import Loader from "@/components/full-components/loader";

export default function SelfImprovementLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<Loader />}>

            <div className="grid max-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <SideBar  />
                <div className="flex flex-col">
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </Suspense>
    )
}
