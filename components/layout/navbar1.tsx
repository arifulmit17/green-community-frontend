"use client";

import {  Menu, User } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, logoutUser } from "@/services/auth.service";
import LogoutButton from "../shared/LogoutButton";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    profile:{
       title:string;
       url:string;
    };
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}




const handleLogout = async () => {
  await logoutUser();
  
}

const Navbar1 = ({
  logo = {
    
    
    alt: "logo",
    title: "🌿 Green Community",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Ideas",
      url: "/ideas",
      
    },
    {
      title: "About Us",
      url: "/about",
     
    },
    {
      title: "Blog",
      url: "/blog",
     
    },
    
    
  ],
  auth = {
    profile: { title: "My Profile", url: "/profile" },
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: Navbar1Props) => {
  const [session, setSession] = useState<any>(null);
const [loading, setLoading] = useState(true);
console.log(session);
const role = session?.role;

useEffect(() => {
  const fetchSession = async () => {
    const data = await getUser();
    console.log("Session data:", data);
    setSession(data);
    setLoading(false);
  };

  fetchSession();
}, []);

let dashboardItem: MenuItem | null = null;

if (role === "MEMBER") {
  dashboardItem = { title: "Dashboard", url: "/dashboard" };
} else if (role === "ADMIN") {
  dashboardItem = { title: "Dashboard", url: "/admin-dashboard" };
}
 const finalMenu = dashboardItem ? [...menu, dashboardItem] : menu;
  // const session= getUser()
  // console.log(session);
  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            
              
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {finalMenu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center">
  {session && <h1 className="text-sm"><Link href={auth.profile.url}>{auth.profile.title}</Link></h1>}
</div>
           {!session ? <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>:
            <LogoutButton></LogoutButton>}
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
           
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {finalMenu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                   {!session ? <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>:
            <Button asChild variant="outline" size="sm">
              <div onClick={handleLogout}>Logout</div>
            </Button>}
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
      asChild
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        <Link href={item.url}>{item.title}</Link>
       
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  

  return (
    <Link key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Link>
  );
};



export { Navbar1 };
