import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './producto.css'

function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Fetch para cargar el producto desde el backend
    fetch(`http://localhost:4001/producto/${id}`)
      .then(response => response.json())
      .then(data => setProducto(data))
      .catch(error => console.error('Error al cargar el producto:', error));
  }, [id]);

  const agregarAlCarrito = (producto) => {
    // Envía el producto al backend para agregarlo al carrito
    fetch('http://localhost:4001/carrito/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Producto agregado:', data);
      alert('Agregado al carrito')
      setCarrito(data.items || []);
    })
    .catch((error) => console.error('Error al agregar el producto:', error));
};

  if (!producto) {
    return <p>Cargando producto...</p>;
  }


  return (
    <div className="produc">
      <img src={producto.imagen} alt={producto.titulo} />
      <h2>{producto.titulo}</h2>
      <p>Precio: S/{producto.precio}</p>

      {producto.descuento && <p>Descuento: {producto.descuento}%</p>}
      {producto.descontado && <p>Precio Final: S/{producto.descontado}</p>}
      
      <button onClick={() => agregarAlCarrito(producto)}>Añadir al carrito</button>
    </div>
  );
}
export default Producto;