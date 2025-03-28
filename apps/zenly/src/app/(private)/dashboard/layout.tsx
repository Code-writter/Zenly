// import { useSession } from "next-auth/react";
// import Providers from "../providers";
// import { auth } from "@/auth";
'use client'

import UserButtonWithDropdown from "@/components/utils/userButton";

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();
  return(
    <div className="relative">
      <div className="absolute top-4 right-10 z-50">
        <UserButtonWithDropdown />
      </div>
      {children}
    </div>
  )
}
