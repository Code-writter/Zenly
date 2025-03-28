import TeamSection from "@/components/team";
import { LampDemo } from "@/components/ui/lamp-effect";

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-background pt-20">
            <div className="container mx-auto space-y-24">
                <TeamSection />
            </div>
        </div>
    );
}
