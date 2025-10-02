import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './routes/Error'
import Login from './routes/Login'
import Cadastro from './routes/Cadastro'
import "./global.css";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {path: "/", element: <Login/> },
      {path: "/cadastro", element: <Cadastro/> }
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
