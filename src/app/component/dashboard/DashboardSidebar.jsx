import { auth } from "@/app/lib/auth";
import { Bars, House, Book, FaChartArea, BiMoney, RiUser2Line, TbAsset } from "@gravity-ui/icons"; // আপনার আইকনগুলো নিশ্চিত করুন
import { Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";
import { BiMoney as BiMoneyIcon } from "react-icons/bi";
import { FaChartArea as FaChartAreaIcon } from "react-icons/fa6";
import { RiUser2Line as RiUser2LineIcon } from "react-icons/ri";
import { TbAsset as TbAssetIcon } from "react-icons/tb";

export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers()
  }) 

  const user = session?.user;
  const role = user?.role || "user";
  console.log("Current logged in user:", user);
  
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
      { icon: RiUser2LineIcon, label: "USER Manage", link: '/dashboard/admin/userManage' },
      { icon: FaChartAreaIcon, label: "Overview", link: '/dashboard/admin/chart' },
      { icon: Book, label: "Books", link: '/dashboard/admin/books' },
      { icon: BiMoneyIcon, label: "Transaction", link: '/dashboard/admin/transaction' },
    ],
  }

  const navItems = dashboarditems[role] || [];
  console.log("Allowed Nav Items for this user:", navItems);

  return (
    <Drawer>
      <Button className="block md:hidden lg:hidden" variant="secondary">
        <Bars />
        Menu
      </Button>
      <Link href="/" className="flex flex-col absolute w-52 p-3.5 border-2 items-center">
        <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Biblio<span className="text-foreground"><span className="text-red-800">D</span>rop</span>
        </span>
      </Link>
      
      <nav className="relative gap-1 w-52 pt-20 pl-5 hidden md:block lg:block">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.link}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          >
            <item.icon className="size-7 text-muted" />
            {item.label}
          </Link>
        ))}
      </nav>
      
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}