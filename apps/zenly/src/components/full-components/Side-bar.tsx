"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { primaryNavItems } from '../utils/index';
// import UserProfile from "./user-profile";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { api } from '../../../convex/_generated/api';
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Hash, PlusIcon, LogOut } from "lucide-react";
import { Doc } from '../../../convex/_generated/dataModel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AddProjectDialog from "@/components/projects/add-projects";
import AddLabelDialog from '@/components/labels/add-lebel-dialog';
import { useUser, useClerk, SignOutButton } from "@clerk/nextjs";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButton } from "@clerk/nextjs";

interface MyListTitleType {
  [key: string]: string;
}

export default function SideBar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const projectList = useQuery(api.projects.getProjects);
  const todos = useQuery(api.todo.getAllTodosOfUser, { userId: user?.id as string });

  const LIST_OF_TITLE_IDS: MyListTitleType = {
    primary: "",
    projects: "My Projects",
  };

  const [navItems, setNavItems] = useState([...primaryNavItems]);

  const renderItems = (projectList: Array<Doc<"projects">>) => {
    return projectList.map(({ _id, name }, idx) => {
      return {
        ...(idx === 0 && { id: "projects" }),
        name,
        link: `/dashboard/projects/${_id.toString()}`,
        icon: <Hash className="w-4 h-4" />,
      };
    });
  };
  useEffect(() => {
    if (projectList) {
      const projectItems = renderItems(projectList);
      const items = [...primaryNavItems, ...projectItems];
      setNavItems(items);
    }
  }, [projectList]);

  const getDaysWithTodos = () => {
    if (!todos) return new Set();
    return new Set(
      todos.map(todo => moment(todo.dueDate).format('YYYY-MM-DD'))
    );
  };

  const daysWithTodos = getDaysWithTodos();
  const currentDate = moment();
  const firstDayOfMonth = moment().startOf('month');
  const lastDayOfMonth = moment().endOf('month');
  const daysInMonth = lastDayOfMonth.diff(firstDayOfMonth, 'days') + 1;
  const firstDayOfWeek = firstDayOfMonth.day();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col">
        <div className="shadow-sm  flex items-center justify-center h-14 border-b p-1 lg:h-[60px] lg:px-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl text-center font-['Orbitron']">ZENLY</span>
          </div>
        </div>
        <nav className="grid items-start px-1 text-sm font-medium lg:px-4 py-1">
          {navItems.map(({ name, icon, link, id }, idx) => (
            <div key={idx} className="mb-0.5">
              {id && (
                <div
                  className={cn(
                    "flex items-center mt-2 mb-0.5",
                    id === "Hustle" && "my-0",
                    id === "SaaS" && "my-0",
                    id === "progress" && "my-0",
                  )}
                >
                  <p className="flex flex-1 text-base">
                    {LIST_OF_TITLE_IDS[id]}
                  </p>
                  {LIST_OF_TITLE_IDS[id] === "My Projects" && (
                    <AddProjectDialog />
                  )}
                </div>
              )}
              <div className={cn("flex items-center lg:w-full")}>
                <div
                  className={cn(
                    "flex items-center text-left lg:gap-2 rounded-lg py-1 transition-all hover:text-primary justify-between w-full",
                    pathname === link
                      ? "active rounded-lg bg-primary/10 text-primary transition-all hover:text-primary"
                      : "text-foreground"
                  )}
                >
                  <Link
                    key={idx}
                    href={link}
                    className={cn(
                      "flex items-center text-left gap-2 rounded-lg transition-all hover:text-primary w-full"
                    )}
                  >
                    <div className="flex gap-2 items-center w-full">
                      <div className="flex gap-2 items-center">
                        <p className="flex text-base text-left">
                          {icon || <Hash />}
                        </p>
                        <p>{name}</p>
                      </div>
                    </div>
                  </Link>
                  {id === "filters" && (
                    <Dialog>
                      <DialogTrigger id="closeDialog">
                        <PlusIcon
                          className="h-5 w-5"
                          aria-label="Add a Label"
                        />
                      </DialogTrigger>
                      <AddLabelDialog />
                    </Dialog>
                  )}
                </div>
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-auto">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="-m-3 md:p-4">
              <CardTitle>{currentDate.format('MMMM YYYY')}</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <div className="">
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="font-medium">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 42 }, (_, i) => {
                    const dayOffset = i - firstDayOfWeek;
                    const currentDay = firstDayOfMonth.clone().add(dayOffset, 'days');
                    const isCurrentMonth = currentDay.month() === currentDate.month();
                    const dateString = currentDay.format('YYYY-MM-DD');
                    
                    return (
                      <div key={i} className="aspect-square p-1">
                        <div className={cn(
                          "relative h-full w-full rounded border border-border/50 flex items-center justify-center",
                          daysWithTodos.has(dateString) && "bg-black text-white dark:bg-muted/50",
                          !isCurrentMonth && "opacity-30"
                        )}>
                          <span className="text-xs">{currentDay.format('D')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
