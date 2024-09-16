import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import AppRouter from "./components/AppRouter";
import { Loader } from "./components/Loader";

function App() {
    const { state, getDecodedIDToken } = useAuthContext();
    const [userRoles, setUserRoles] = useState(undefined);

    // Fetch the user roles and update the state
    const fetchUserRoles = useCallback(async () => {
        try {
            const decodedIdToken = await getDecodedIDToken();
            if (decodedIdToken?.application_roles && decodedIdToken.application_roles.length > 0) {
                setUserRoles(decodedIdToken.application_roles);
            }
        } catch (error) {
            console.error("Error occurred while decoding the ID token", error);
        }
    }, [ getDecodedIDToken ]);

    useEffect(() => {
        fetchUserRoles();
    }, [ fetchUserRoles ]);
    
    if (state.isAuthenticated && userRoles === undefined) {
        return <Loader />;
    }

    return (
        <div>
            <AppRouter currentUserRoles={ userRoles } />
        </div>
    );
}

export default App;
