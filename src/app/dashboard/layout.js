import DashboardSidebar from "../component/dashboard/DashboardSidebar";
import DashboardNavbar from "../component/dashboard/DashboardNavbar";

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen bg-background w-full overflow-hidden">
      
      {/* Server Component Sidebar */}
      <DashboardSidebar />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 h-full min-w-0 bg-zinc-50">
        <div className="flex-1 overflow-y-auto w-full">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-4">
            
            {/* Navbar Area */}
            <div className="w-full bg-white border-b border-zinc-200">
              <DashboardNavbar />
            </div>
            
            {/* Page Content */}
            <main className="w-full p-5 pb-20 md:pb-5">
              {children}
            </main>

          </div>
        </div>
      </div>

    </div>
  );
}