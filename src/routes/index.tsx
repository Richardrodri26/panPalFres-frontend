import { Outlet, createBrowserRouter } from "react-router-dom";
import { adminRoutes, routerPaths } from "./routes.config";
import { HomePage, LoginPage } from "@/pages";
import { AdminLayout } from "@/components/Layouts";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        // element: <AppGuardLayout />,
        element: <Outlet />,
        children: [
            {
                path: routerPaths.home.path,
                element: <LoginPage />,
            },
            {
                path: routerPaths.admin.path,
                element: <AdminLayout />,
                children: [
                    { path: "", element: <HomePage />, index: true },
                    {
                        path: adminRoutes.details.path, children: [
                            // { path: "", element: <PayrollGroupPage />, index: true },
                            { path: "", element: <>Detail Page</>, index: true },
                        ]
                    },
                ]
            },
            {
                path: "*",
                // element: <NoFound />
                element: <>Not found</>
            }
        ]
    },
])