import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Login from './components/Login/Login.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import Parking from './components/Park-Unpark/Parking.jsx';
import Unparking from './components/Park-Unpark/Unparking.jsx';
import { authLoader } from './utility/authLoader.js';
import UserManagement from './components/User Management/UserManagement.jsx';

  const router = createBrowserRouter([
    { path: "/", element: <Login/>, errorElement: <PageNotFound />},
    { path: "/login", element: <Login/> },
    { loader: authLoader, 
      errorElement: <PageNotFound/>,
      children: [
        { path: "/home", element: <Home/> },
        { path: "/parking", element: <Parking /> },
        { path: "/unparking", element: <Unparking /> },
        { path: "/manage-user", element: <UserManagement/> }
      ]
    }
  ])

createRoot(document.getElementById('root')).render(
    //<StrictMode>
        <RouterProvider router={router}/>
    //</StrictMode>
    );
