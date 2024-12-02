import './Carrito.css';
import { useEffect, useState } from 'react';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const abrirPopup = () => setMostrarPopup(true);
  const cerrarPopup = () => setMostrarPopup(false);

  const finalizarCompra = () => {
    // Aquí puedes llamar a la función guardar orden con los datos de dirección y tarjeta
    console.log('Dirección:', direccion);
    console.log('Tarjeta:', tarjeta);
    guardarOrden();
    cerrarPopup();
  };

  // Cargar carrito desde el backend al iniciar
  useEffect(() => {
    fetch('http://localhost:4001/carrito')
      .then(response => response.json())
      .then(data => setCarrito(data.items || []))
      .catch(error => console.error('Error al cargar el carrito:', error));
  }, []);

  const calcularSubtotal = (precio, cantidad) => {
    return precio && cantidad ? parseFloat(precio) * parseInt(cantidad, 10) : 0;
  };

  const incrementarCantidad = (id, cantidadActual) => {
    const nuevaCantidad = cantidadActual + 1;
    actualizarCantidad(id, nuevaCantidad);
  };

  const disminuirCantidad = (id, cantidadActual) => {
    if (cantidadActual > 1) {
      const nuevaCantidad = cantidadActual - 1;
      actualizarCantidad(id, nuevaCantidad);
    }
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    fetch(`http://localhost:4001/carrito/item/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cantidad: nuevaCantidad }),
    })
      .then(() => {
        // Actualizar el carrito desde el backend
        fetch('http://localhost:4001/carrito')
          .then(response => response.json())
          .then(data => setCarrito(data.items || []))
          .catch(error => console.error('Error al recargar el carrito:', error));
      })
      .catch(error => console.error('Error al actualizar la cantidad:', error));
  };

  const quitarProducto = (id) => {
    fetch(`http://localhost:4001/carrito/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Actualizar el carrito desde el backend
        fetch('http://localhost:4001/carrito')
          .then(response => response.json())
          .then(data => setCarrito(data.items || []))
          .catch(error => console.error('Error al recargar el carrito:', error));
      })
      .catch(error => console.error('Error al quitar el producto:', error));
  };

  const guardarOrden = () => {
    const subtotal = carrito.reduce(
      (acc, item) => acc + item.cantidad * item.precio,
      0
    );

    fetch('http://localhost:4001/orden', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:0,
        items: carrito,
        subtotal: subtotal.toFixed(2), // Asegúrate de enviar el subtotal con dos decimales
        direccion:direccion,
        tarjeta:tarjeta
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al enviar la orden');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Orden enviada:', data);
         //Vaciar el carrito en el backend
        return fetch('http://localhost:4001/carrito', { method: 'DELETE' });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al vaciar el carrito');
        }
        alert('Orden enviada y carrito vaciado exitosamente');
        setCarrito([]); // Vacía el carrito localmente
      })
      .catch((error) => console.error('Error al procesar la orden:', error));
  };

  const subtotal = carrito.reduce(
    (acc, item) => acc + calcularSubtotal(item.precio, item.cantidad),
    0
  );

  return (
    
    <div className="carrito">
      {mostrarPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Finalizar Compra</h2>
            <label>
              Dirección:
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)} required
              />
            </label>
            <label>
              Tarjeta:
              <input
                type="text"
                value={tarjeta}
                onChange={(e) => setTarjeta(e.target.value)} required
              />
            </label>
            <button onClick={finalizarCompra}>Finalizar Compra</button>
            <button onClick={cerrarPopup}>Cancelar</button>
          </div>
        </div>
      )}
      <h2>Cesta</h2>
      {carrito.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Artículo</th>
              <th></th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.imagen} alt={item.titulo} style={{ width: '50px' }} />
                </td>
                <td>{item.titulo}</td>
                <td>S/{parseFloat(item.precio).toFixed(2)}</td>
                <td>
                  <button onClick={() => disminuirCantidad(item.id, item.cantidad)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => incrementarCantidad(item.id, item.cantidad)}>+</button>
                </td>
                <td>S/{calcularSubtotal(item.precio, item.cantidad).toFixed(2)}</td>
                <td>
                  <button onClick={() => quitarProducto(item.id)}>Quitar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Tu carrito está vacío</p>
      )}
      <div className="resumen">
        <p>Subtotal: S/{subtotal.toFixed(2)}</p>
        {carrito.length > 0 && (
          <button onClick={abrirPopup}>Procedor con Compra</button>
        )}
      </div>
    </div>
  );
}

export default Carrito;