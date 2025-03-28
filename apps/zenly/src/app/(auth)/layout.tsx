import SignInImage from "@/components/sign-in-img";
import { Suspense } from "react";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className=" min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl">
        {/* Left side - Image */}
        <div className=" md:flex relative h-full min-h-[400px]">
          <SignInImage />
        </div>
      
        <div className="flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>

    </Suspense>
  );
}
