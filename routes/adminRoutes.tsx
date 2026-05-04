import { Route } from "@/types/routes.type";



export const adminRoutes: Route[] = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "User Data",
        url: "/admin-dashboard/userstats",
      },
      {
        title: "All Ideas",
        url: "/admin-dashboard/allideas",
      },
      {
        title: "All Members",
        url: "/admin-dashboard/allmembers",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
    ],
  },
  
];