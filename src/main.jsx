import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Routes/Root.jsx';
import Homepage from './components/layout/Homepage.jsx';
import Profile from './components/Profile.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import PrivateRoutes from './Routes/PrivateRoutes.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Loading from './pages/Loading.jsx';
import SkillListingDetails from './components/SkillListingDetails.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement:<Loading></Loading>,
    children: [
    {
      index: true,
      path: "/",
      Component: Homepage
    },
    
    {
      path: "/profile",
      element: 
        <PrivateRoutes>
          <Profile />
        </PrivateRoutes>,
    },
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/register",
      Component: Register,
    },
    {
      path: "/forgot-password",
      Component: ForgotPassword,
    },
    {
      path: "/skills/:id",
      element: 
        <PrivateRoutes>
          <SkillListingDetails></SkillListingDetails>
        </PrivateRoutes>,
    },
    {
        path: "*",
        element: <ErrorPage />
    }

  ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
