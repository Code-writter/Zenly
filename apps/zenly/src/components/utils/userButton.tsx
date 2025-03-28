import { Button } from "../ui/button";

import { LogOut } from "lucide-react";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";



export default function UserButtonWithDropdown() {
    const { user, isSignedIn } = useUser();
    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <UserButton />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start space-x-2 p-2">
            <UserButton />
            <span className="font-medium">{user?.fullName}</span>
          </div>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span><SignOutButton /></span>
          </DropdownMenuItem>   
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
