import { TextHoverEffect } from "../text-hover-effect";
import { ContainerScroll } from "./scroll-animation-hero";
import Image from "next/image";

export default function ScrollHeroPage(){
return(
    <div className="flex flex-col overflow-hidden">
    <ContainerScroll
      titleComponent={
        <>
          <h1 className="text-4xl font-semibold text-black dark:text-white">
          <div className="h-[20rem] flex items-center justify-center">
                <TextHoverEffect text="ZENLY" />
            </div>
            <span className="text-2xl md:text-[6rem] font-bold leading-none">
              Scroll Animations
            </span>
          </h1>
        </>
      }
    >
      <Image
        src={`/linear.webp`}
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
