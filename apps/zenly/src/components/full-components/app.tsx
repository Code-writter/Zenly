import Features from "../features";
import GoogleGeminiEffectDemo from "../geminiEffect";
import { HeroHeader } from "./hero-header";
import InfiniteMovingCardComponent from "./infinite-moving-cards";
import ScrollHeroPage from "./scrollPage";
import TimelineDemo from "./timeline";
import Footer from "../footer";




export default function App(){
    return(
        <div>
            <HeroHeader />
            <ScrollHeroPage />
            <Features />
            <TimelineDemo />
            <GoogleGeminiEffectDemo />
            <Footer />
        </div>
    )
}
