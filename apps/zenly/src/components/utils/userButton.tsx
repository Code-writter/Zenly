import { Button } from "../ui/button";
import { LogOut, Moon, Sun } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function UserButtonWithDropdown() {
    const { user } = useUser();
    const { theme, setTheme } = useTheme();

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
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark Mode</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span><SignOutButton /></span>
          </DropdownMenuItem>   
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
