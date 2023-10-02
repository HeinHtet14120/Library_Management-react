import {
  Navigate,
  RouterProvider,
    createBrowserRouter,
  } from "react-router-dom";
import Layout from "../pages/Layout/Layout.jsx";
import Home from '../pages/Home.jsx'
import Bookform from "../pages/Bookform.jsx";
import Search from "../pages/Search.jsx";
import BookDetails from "../pages/BookDetails.jsx";
import Register from "../pages/Register.jsx";
import Login from '../pages/Login.jsx'
import React, { useContext } from 'react'
import { AuthContex } from "../contexts/AuthContex.jsx";

export default function index() {

  let { authReady, user } = useContext(AuthContex);

  let isAuthenticated = Boolean(user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: isAuthenticated ? <Home/> : <Navigate to={'/login'}/>
        },
        {
          path: "/create",
          element: isAuthenticated ? <Bookform/> : <Navigate to={'/login'}/>
        },
        {
          path: "/edit/:id",
          element: isAuthenticated ? <Bookform/> : <Navigate to={'/login'}/>
        },
        {
          path: "/search",
          element: isAuthenticated ? <Search/> : <Navigate to={'/login'}/>
        },
        {
          path:'/books/:id',    //dynamic route can be accepted by ":" (full column)
          element: isAuthenticated ? <BookDetails/>  : <Navigate to={'/login'}/>
        },
        {
          path:'/register',
          element: !isAuthenticated ? <Register/> : <Navigate to={'/'}/>
        },
        {
          path:'/login',
          element: !isAuthenticated ? <Login/> : <Navigate to={'/'}/>
        }
      ]
    },
  ]);

  
  return (
    authReady && <RouterProvider router={router} />
  )
}
