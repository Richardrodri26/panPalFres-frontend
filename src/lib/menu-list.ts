import { adminRoutes } from "@/routes/routes.config";
import {
  Bookmark,
  LayoutGrid,
  LucideIcon,
  Users2,
  User
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard") && pathname.length === 5,
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/aboutUs",
          label: "Acerca de nosotros",
          active: pathname.includes("/profile"),
          icon: User,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Opciones de administrador",
      menus: [
        {
          href: `/dashboard/${adminRoutes.users.path}`,
          label: "Usuarios",
          active: pathname.includes("/posts"),
          icon: Users2,
          submenus: []
          // submenus: [
          //   {
          //     href: "/dashboard/users",
          //     label: "Usuarios",
          //     active: pathname === "/dashboard/users"
          //   },
          //   {
          //     href: "/dashboard/users/new-user",
          //     label: "Nuevo usuario",
          //     active: pathname === "/dashboard/users/new-user"
          //   }
          // ]
        },

        {
          href: `/dashboard/${adminRoutes.products.path}`,
          label: "Productos",
          active: pathname === `/dashboard/${adminRoutes.products.path}`,
          icon: Bookmark,
          submenus: []
        },
        // {
        //   href: "/tags",
        //   label: "Tags",
        //   active: pathname.includes("/tags"),
        //   icon: Tag,
        //   submenus: []
        // }
      ]
    },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       active: pathname.includes("/users"),
    //       icon: Users,
    //       submenus: []
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       active: pathname.includes("/account"),
    //       icon: Settings,
    //       submenus: []
    //     }
    //   ]
    // }
  ];
}