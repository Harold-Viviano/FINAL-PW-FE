import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Header from './Componentes/Header/Header.jsx'
import './index.css'
import Footer from './Componentes/Footer/Footer.jsx'
import Banner from './Componentes/Banner/Banner.jsx'
import InicioSesion from './Rutas/InicioSesion/InicioSesion.jsx'
import CrearCuenta from './Rutas/crearcuenta/crearcuenta.jsx'
import Producto from './Rutas/producto/producto.jsx'
import Carrito from './Rutas/Carrito/Carrito.jsx'
import Administrador from './Rutas/PaginaAdministrador/Administrador.jsx'
import AnadirProducto from './Rutas/AnadirProducto/AnadirProducto.jsx'
import ModificarProducto from './Rutas/ModificarProducto/ModificarProducto.jsx'
import VerOrden from './Rutas/VerOrdenes/VerOrden.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },

  {
    path: "/InicioSesion",
    element: <InicioSesion />
    
  },
  {
    path: "/InicioSesion/CrearCuenta", 
    element: <CrearCuenta />
  },

  {
    path: "/producto/:id", 
    element: <Producto />
  },
  {
    path:"/carrito",
    element:<Carrito/>
  },
  {
    path:"/administrador",
    element:<Administrador/>
  },
  {
    path:"/administrador/anadirProducto",
    element:<AnadirProducto/>
  },
  {
    path:"/administrador/modificarProducto/:id",
    element:<ModificarProducto/>
  },
  {
    path:"/verOrden",
    element:<VerOrden/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Header/>
    <main>
    <RouterProvider router={router}/>
    
    </main>
    <Banner/>
    <Footer/>
    
  </StrictMode>,
)