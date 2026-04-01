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
        url: "/dashboard/createidea",
      },
      {
        title: "My Ideas",
        url: "/dashboard/myidea",
      },
      
    ],
  },
];