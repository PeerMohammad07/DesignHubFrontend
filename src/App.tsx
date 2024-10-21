import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Templates from "./pages/templates/templates"


function App() {

  const router = createBrowserRouter([
    {
      path : '/',
      element : <Home/>
    },
    {
      path : '/login',
      element : <Login/>
    },
    {
      path : '/register',
      element : <Register/>
    },
    {
      path : '/templates',
      element : <Templates/>
    }
  ])

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App