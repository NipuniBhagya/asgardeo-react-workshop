import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthenticatedComponent } from "@asgardeo/auth-react";
import ProtectedRoute from "./ProtectedRoute";
import { LandingPage } from "../pages/LandingPage";
import { HomePage } from "../pages/HomePage";
import { InsightsPage } from "../pages/InsightsPage";
import { Unauthorized } from "../pages/UnauthorizedPage";

const AppRouter = ({ currentUserRoles }) => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage />,
        },
        {
            path: "/unauthorized",
            element: <Unauthorized />,
        },
        {
            path: "/home",
            element: (
                <AuthenticatedComponent fallback={<Navigate to='/' />}>
                    <HomePage />
                </AuthenticatedComponent>
            ),
            exact: true,
        },
        {
            path: "/insights",
            element: <ProtectedRoute allowedRoles={ [ "Anime-App-Admin" ] } userRoles={ currentUserRoles } />,
            children: [
                {
                    path: "",
                    element: <InsightsPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={ router } />;
};

export default AppRouter;
