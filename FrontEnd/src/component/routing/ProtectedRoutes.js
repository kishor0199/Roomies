import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedAdminUserRoutes = ({ user }) => {
    console.log(user);
    return (user.role === 4 || user.role === 2) ? <Outlet /> : <Navigate to='/' />;
};
export const ProtectedAdminOwnerRoutes = ({ user }) => {
    console.log(user);
    return (user.role === 4 || user.role === 1) ? <Outlet /> : <Navigate to='/' />;
};
export const ProtectedUserOnlyRoutes = ({ user }) => {
    console.log(user);
    return user.role === 1 ? <Outlet /> : <Navigate to='/' />;
};  
export const ProtectedOwnerOnlyRoutes = ({ user }) => {
    console.log(user);
    return user.role === 1 ? <Outlet /> : <Navigate to='/' />;
};
export const ProtectedLogInUsersOnlyRoutes = ({ user }) => {
    console.log(user);
    return user.role  ? <Outlet /> : <Navigate to='/' />;
};
// module.exports =  { ProtectedAdminOwnerRoutes, ProtectedAdminUserRoutes, ProtectedOwnerOnlyRoutes, ProtectedUserOnlyRoutes };
