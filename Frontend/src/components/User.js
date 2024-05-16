import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/user.css";
import LoggedOut from "./LoggedOut";
import LoggedIn from "./LoggedIn";

export default function User() {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="user-page">
      {/* 
      {isAuthenticated ? (
        <LoggedIn />
      ) : (
        <div>
          <LoggedOut />
        </div>
      )}
      */}
      {isAuthenticated ? (
        <LoggedIn />
      ) : (
        <div onClick={() => loginWithRedirect()}>Potrebna je prijava</div>
      )}
    </div>
  );
}
