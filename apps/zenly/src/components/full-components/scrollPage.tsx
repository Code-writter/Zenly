import { TextHoverEffect } from "../text-hover-effect";
import { ContainerScroll } from "./scroll-animation-hero";
import Image from "next/image";

export default function ScrollHeroPage(){
return(
    <div className="flex flex-col overflow-hidden">
    <ContainerScroll
      titleComponent={
        <>
          <h1 className="text-4xl mt-30 font-semibold text-black dark:text-white">
          <div className="h-[20rem] flex items-center justify-center">
                <TextHoverEffect text="ZENLY" />
            </div>
            <span className="text-md md:text-4xl font-bold leading-none">
            Organize, Optimize, Succeed – Smart To-Do Lists & AI-Powered Resumes!
            </span>
          </h1>
        </>
      }
    >
      <Image
        src={`/hero-banner-img.png`}
        alt="hero"
        height={720}
        width={1400}
        className="mx-auto rounded-2xl object-cover h-full object-left-top"
        draggable={false}
      />
    </ContainerScroll>
  </div>  
)  
}
