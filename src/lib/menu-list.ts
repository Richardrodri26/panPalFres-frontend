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
          href: "/home",
          label: "Dashboard",
          active: pathname.includes("/home") && pathname.length === 5,
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/home/profile",
          label: "Perfil",
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
          href: "",
          label: "Usuarios",
          active: pathname.includes("/posts"),
          icon: Users2,
          submenus: [
            {
              href: "/home/users",
              label: "Usuarios",
              active: pathname === "/home/users"
            },
            {
              href: "/home/users/new-user",
              label: "Nuevo usuario",
              active: pathname === "/home/users/new-user"
            }
          ]
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