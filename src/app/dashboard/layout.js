import Link from "next/link";
import DashboardSidebar from "../component/dashboard/DashboardSidebar";
import DashboardNavbar from "../component/dashboard/DashboardNavbar";

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen bg-background w-full overflow-hidden">
      
      {/* 1. Sidebar Area */}
     
     <DashboardSidebar/>

      {/* 2. Main Content Right Wrapper */}
      <div className="flex flex-col flex-1 h-full min-w-0 bg-zinc-50">
        
        {/* 3. Scrollable Container with Max Width Grid */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-4">
            
            {/* Navbar Area */}
            <div className="w-full bg-white ">
              <DashboardNavbar />
            </div>
            
            {/* Page Content */}
            <main className="w-full p-5">

              {children}
            </main>

          </div>
        </div>

      </div>

    </div>
  );
}