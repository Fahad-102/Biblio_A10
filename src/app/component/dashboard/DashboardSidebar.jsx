import { auth } from "@/app/lib/auth";
import { House, Book } from "@gravity-ui/icons"; 
import { headers } from "next/headers";
import Link from "next/link";
import { BiMoney as BiMoneyIcon } from "react-icons/bi";
import { FaChartArea as FaChartAreaIcon } from "react-icons/fa6";
import { RiUser2Line as RiUser2LineIcon } from "react-icons/ri";
import { TbAsset as TbAssetIcon } from "react-icons/tb";

export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  const role = user?.role || "user";
  
  const dashboarditems = {
    librarian: [
      { icon: House, label: "Home", link: '/dashboard/librarian' },
      { icon: FaChartAreaIcon, label: "Overview", link: '/dashboard/librarian/chart' },
      { icon: TbAssetIcon, label: "Books", link: '/dashboard/librarian/books' },
      { icon: BiMoneyIcon, label: "Transaction", link: '/dashboard/librarian/transaction' },
    ],
    user: [
      { icon: House, label: "Home", link: '/dashboard/user' },
      { icon: FaChartAreaIcon, label: "Overview", link: '/dashboard/user/chart' },
      { icon: Book, label: "Books", link: '/dashboard/user/books' },
      { icon: BiMoneyIcon, label: "Transaction", link: '/dashboard/user/transaction' },
    ],
    user_pro: [
      { icon: House, label: "Home", link: '/dashboard/user' }, 
      { icon: FaChartAreaIcon, label: "Overview", link: '/dashboard/user/chart' },
      { icon: Book, label: "Books", link: '/dashboard/user/books' },
      { icon: BiMoneyIcon, label: "Transaction", link: '/dashboard/user/transaction' },
    ],
    admin: [
      { icon: House, label: "Home", link: '/dashboard/admin' },
      { icon: RiUser2LineIcon, label: "Users", link: '/dashboard/admin/userManage' },
      { icon: FaChartAreaIcon, label: "Overview", link: '/dashboard/admin/chart' },
      { icon: Book, label: "Books", link: '/dashboard/admin/books' },
      { icon: BiMoneyIcon, label: "Transaction", link: '/dashboard/admin/transaction' },
    ],
  };

  const navItems = dashboarditems[role] || [];

  return (
    <>
      
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-t border-slate-200/80 md:hidden flex items-center justify-around px-2 z-50 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)] rounded-t-2xl">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.link}
            className="flex flex-col items-center justify-center gap-1 w-full h-full text-slate-600 active:scale-95 transition-all"
          >
            <item.icon className="size-5.5 text-slate-700 stroke-[1.8]" />
            <span className="text-[10px] font-semibold tracking-wide text-slate-500">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      <aside className="w-64 border-r border-divider h-screen sticky top-0 bg-background hidden md:flex flex-col p-6 z-30">
        <div className="mb-8 pl-4">
          <Link href="/">
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Biblio<span className="text-foreground"><span className="text-red-800">D</span>rop</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:text-indigo-600 group"
            >
              <item.icon className="size-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}