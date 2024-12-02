import './crearcuenta.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CrearCuenta = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    await fetch('http://localhost:4001/usuario', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({id:0,nombre:nombre,
        apellido:apellidos,
        telefono:telefono,
        fechaNacimiento:fechaNacimiento,
        DNI:dni,
        correoelectrico:email,
        contraseña:password,}),
  })
    // Aquí puedes procesar los datos o enviarlos a un servidor
    console.log({
      nombre,
      apellidos,
      telefono,
      fechaNacimiento,
      dni,
      email,
      password,
    });
    setShowPopup(true);
    setErrorMessage('');

    // Ocultar popup después de 3 segundos
    setTimeout(() => {
      setShowPopup(false);
      navigate('/'); // Redirigir a la página de inicio
    }, 3000);
  
  };

  return (
    <main className="crear-cuenta-main-container">
      <h1 className="crear-cuenta-title">Crear Cuenta</h1>
      <div className="crear-cuenta-form-wrapper">
        <div className="crear-cuenta-personal-info">
          <h2>Información Personal</h2>
          <label className="crear-cuenta-label">Nombre *</label>

          <input type="text" className="crear-cuenta-input" placeholder="" value={nombre}
            onChange={(e) => setNombre(e.target.value)}
             required />
          
          <label className="crear-cuenta-label">Apellidos *</label>
          <input type="text" className="crear-cuenta-input" placeholder="" value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required />
          
          <label className="crear-cuenta-label">Teléfono *</label>
          <input type="tel" className="crear-cuenta-input" placeholder="" value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required />
          
          <label className="crear-cuenta-label">Fecha de nacimiento *</label>
          <input type="date" className="crear-cuenta-input"value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required />
          
          <label className="crear-cuenta-label">DNI / Carnet de Extranjería *</label>
          <input type="text" className="crear-cuenta-input"
           value={dni}
           onChange={(e) => setDni(e.target.value)}
           required />
          
          <div>
            <input type="checkbox" id="newsletter" className="crear-cuenta-checkbox" />
            <label htmlFor="newsletter" className="crear-cuenta-label">Suscribirse al newsletter</label>
          </div>
        </div>
        
        <div className="crear-cuenta-login-info">
          <h2>Información de inicio de sesión</h2>
          <label className="crear-cuenta-label">Correo electrónico *</label>
          <input type="email" className="crear-cuenta-input" placeholder=""  value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          
          <label className="crear-cuenta-label">Contraseña *</label>
          <input type="password" className="crear-cuenta-input" placeholder="" value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          
          <label className="crear-cuenta-label">Confirmar contraseña *</label>
          <input type="password" className="crear-cuenta-input" placeholder=""value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          
        </div>
      </div>
      
      <button className="crear-cuenta-button crear-cuenta-submit-btn"onClick={handleSubmit}>CREAR UNA CUENTA</button>
     
      {showPopup && (
        <div className="popup">
          <p>¡Cuenta creada exitosamente!</p>
        </div>
      )}
    </main>
  );
}

export default CrearCuenta;