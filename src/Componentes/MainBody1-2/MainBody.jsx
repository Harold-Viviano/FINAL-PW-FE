import './MainBody.css';
import './MainBody-Square.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


import DBZ from '../../assets/BDZ.jpg';
import TECLADO from '../../assets/TECLADO.jpg';
import SILLA from '../../assets/SILLA.jpg';
import PARLANTE from '../../assets/PARLANTE.jpg';
import audiof from '../../assets/audiof.jpg';
import pokemon from '../../assets/pokemon.jpg';
import logit from '../../assets/logit.jpg';
import MICRO from '../../assets/MICRO.jpg';
import FUNKO from '../../assets/FUNKO.jpg';
import COLECCION from '../../assets/COLECCION.jpg';


function MainBody() {
  
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
    <main>
      <section className="banner">
        <img src={DBZ} alt="DBZ Banner" />
      </section>

      <section className="categories">
        <div className="category-item">
          <img src={TECLADO} alt="Teclado" />
        </div>
        <div className="category-item">
          <img src={SILLA} alt="Silla" />
        </div>
        <div className="category-item">
          <img src={PARLANTE} alt="Parlante" />
        </div>  
        <div className="category-item">
          <img src={audiof} alt="Audio" />
        </div>
        <div className="category-item">
          <img src={pokemon} alt="Pokemon" />
        </div>
        <div className="category-item">
          <img src={logit} alt="Logit" />
        </div>
        <div className="category-item">
          <img src={MICRO} alt="Micro" />
        </div>
        <div className="category-item">
          <img src={FUNKO} alt="Funko" />
        </div>
        <div className="category-item">
          <img src={COLECCION} alt="Colección" />
        </div>
      </section>

      <section className="best-sellers">
        <h2>MÁS VENDIDOS</h2>
        <div className="product-list">
              {showProducto?.map(producto => (


              <Link to={`/producto/${producto.id}`} key={producto.id} className="product-item">
              {producto.descuento !== null  && <span className="discount">-{producto.descuento}%</span>}
              <a href='/producto'><img src={producto.imagen} alt={producto.titulo} /></a>
              <p className="product-title">{producto.titulo}</p>
    

              {producto.descontado !== null ? (
              <p className="price">
              <span className="old-price">S/{producto.precio}</span> S/{producto.descontado}
              </p> ) : ( <p className="price">S/{producto.precio}</p> )}
            </Link> ))}
        </div>


      </section>
    </main>
  );
}

export default MainBody;
