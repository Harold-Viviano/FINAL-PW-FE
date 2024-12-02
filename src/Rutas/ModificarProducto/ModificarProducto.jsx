
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ModificarProducto.css';

function ModificarProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [form, setForm] = useState({
    titulo: "",
    precio: "",
    descuento: ""
  });

  useEffect(() => {
    fetch(`http://localhost:4001/producto/${id}`)
      .then(response => response.json())
      .then(data => {
        setProducto(data);
        setForm({
          titulo: data.titulo || "",
          precio: data.precio || "",
          descuento: data.descuento || ""
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const updatedProducto = {
      ...producto,
      titulo: form.titulo || producto.titulo,
      precio: parseFloat(form.precio) || producto.precio,
      descuento: form.descuento ? parseFloat(form.descuento) : null,
      descontado: form.descuento
        ? parseFloat(form.precio || producto.precio) - 
          (parseFloat(form.precio || producto.precio) * (parseFloat(form.descuento) / 100))
        : null
    };

    fetch(`http://localhost:4001/producto`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProducto)
    })
      .then(response => response.json())
      .then(data => {
        setProducto(data);
        alert("Producto actualizado con éxito!");
      })
      .catch((error) => {
        console.error("Error al actualizar el producto:", error);
      });
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="modiproduct">
      <img src={producto.imagen} alt={producto.titulo} />
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            placeholder={producto.titulo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            placeholder={producto.precio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descuento (%):</label>
          <input
            type="number"
            name="descuento"
            value={form.descuento}
            placeholder={producto.descuento || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Precio Final: S/
            {form.descuento
              ? (parseFloat(form.precio || producto.precio) -
                (parseFloat(form.precio || producto.precio) * (parseFloat(form.descuento) / 100))).toFixed(2)
              : "N/A"}
          </p>
        </div>
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}
export default ModificarProducto;