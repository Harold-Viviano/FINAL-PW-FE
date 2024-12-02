import { useNavigate } from 'react-router-dom';
import '../../Componentes/MainBody1-2/MainBody.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Administrador =()=>{
  const [showProducto, setShowProducto] = useState();
  const navigate = useNavigate();

  const cargarProductos = async () => {
    await fetch('http://localhost:4001/producto')
        .then(response => response.json())
        .then(data => setShowProducto(data));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/producto/${id}`);
  };

    
    return (
        <main className="administrado">
            <div className="anadirproducto">
            <button onClick={() => navigate('/administrador/anadirProducto')}>Añadir producto</button>
            <button> Ver órdenes</button>
            </div>

        <section className="best-sellers">
        <h2>Modificar productos</h2>
        <div className="product-list">
              {showProducto?.map(producto => (


              <Link to={`/administrador/modificarProducto/${producto.id}`} key={producto.id} className="product-item">
              {producto.descuento !== null && <span className="discount">-{producto.descuento}%</span>}
              <a href='/producto'><img src={producto.imagen} alt={producto.titulo} /></a>
              <p className="product-title">{producto.titulo}</p>
    

              {producto.descontado !== null? (
              <p className="price">
              <span className="old-price">S/{producto.precio}</span> S/{producto.descontado}
              </p> ) : ( <p className="price">S/{producto.precio}</p> )}
            </Link> ))}
        </div>


      </section>
        </main>
    )
}
export default Administrador