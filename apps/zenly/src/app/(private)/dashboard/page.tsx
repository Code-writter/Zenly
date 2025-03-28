// import MobileNav from "@/components/nav/mobile-nav";
import SideBar from "@/components/full-components/Side-bar";
import TodoList from "@/components/todos/todo-list";
import UserButtonWithDropdown from "@/components/utils/userButton";
import Loader from "@/components/loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <SideBar />

      <div className="flex flex-col">
        {/* <MobileNav /> */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">

          <TodoList />
        </main>
      </div>
    </div>
    </Suspense>
  );
}
