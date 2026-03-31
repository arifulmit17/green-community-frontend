import { Route } from "@/types/routes.type";



export const memberRoutes: Route[] = [
  {
    title: "Member Dashboard",
    items: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Create Ideas",
        url: "/dashboard/createIdeas",
      },
      {
        title: "My Ideas",
        url: "/dashboard/myIdeas",
      },
      
    ],
  },
];