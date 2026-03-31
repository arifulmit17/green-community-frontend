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
        title: "All Ideas",
        url: "/admin-dashboard/allIdeas",
      },
      {
        title: "All Members",
        url: "/admin-dashboard/allMembers",
      },
      {
        title: "Categories",
        url: "/admin-dashboard/categories",
      },
    ],
  },
  
];