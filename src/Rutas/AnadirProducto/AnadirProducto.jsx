import React, { useState } from 'react';
import './AnadirProducto.css'; // Importa el archivo CSS

const AnadirProducto = () => {
  const [titulo, setTitulo] = useState('');
  const [precio, setPrecio] = useState('');
  const [descuento, setDescuento] = useState('');
  const [descontado, setDescontado] = useState('');
  const [imagen, setImagen] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !precio || !imagen) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

  
    const nuevoProducto = {
      id:0,
      titulo,
      precio: parseFloat(precio),
      descuento: descuento ? parseFloat(descuento):null,
      descontado: descuento ? parseFloat(producto.precio) - 
      (parseFloat(producto.precio) * (parseFloat(descuento) / 100))
    : null,
      imagen,
    };

    

    try {
      const response = await fetch('http://localhost:4001/producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!response.ok) {
        throw new Error('Error al añadir el producto');
      }

      setMensaje('Producto añadido con éxito');
      setTitulo('');
      setPrecio('');
      setDescuento('');
      setDescontado('');
      setImagen('');
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Hubo un problema al añadir el producto.');
    }
  };

  return (
    <div className="form-container">
      <h2>Añadir Producto</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descuento (%):</label>
          <input
            type="number"
            step="0.01"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            
          />
        </div>
        
        
        <div className="form-group">
          <label>URL de la Imagen:</label>
          <input
            type="url"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Añadir Producto
        </button>
      </form>
      {mensaje && (
        <p className={`message ${mensaje.includes('éxito') ? 'success' : 'error'}`}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default AnadirProducto;