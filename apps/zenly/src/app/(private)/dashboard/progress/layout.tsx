import SideBar from "@/components/full-components/Side-bar";


export default function ProgressLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
      <div>

        {children}
      </div>
    )
}