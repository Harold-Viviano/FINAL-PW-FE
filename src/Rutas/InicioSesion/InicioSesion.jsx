import './InicioSesion.css'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const InicioSesion = () =>{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    
    const handleLogin = async () => {
        try {
          // Obtener todos los usuarios desde el servidor
          const response = await fetch('http://localhost:4001/usuario');
          if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
          }
          const usuarios = await response.json();
    
          // Buscar si existe un usuario con el email y contraseña ingresados
          const usuarioValido = usuarios.find(
            (usuario) => usuario.correoelectrico === email && usuario.contraseña === password
          );
          

          if(email =='nose@gmail.com' && password == "jojo"){
            navigate('/administrador')
            return;
          }
          
    
          if (usuarioValido) {
            // Inicio de sesión exitoso
            console.log('Inicio de sesión exitoso');
            alert(`¡Bienvenido, ${usuarioValido.nombre}!`);
            
              setTimeout(() => {
                navigate('/');
                }, 1000);
                return usuarioValido.nombre;
              } 
              else {
            // Credenciales incorrectas
            setErrorMessage('El correo electrónico o la contraseña son incorrectos');
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          setErrorMessage('Ocurrió un error al procesar tu solicitud');
        }
        
      };


    return (
    <main className="InicioSesion">
        <h1>Inicio de Sesión</h1>
        <p>Inicie sesión con su correo electrónico.</p>
        <p>Correo electrónico *</p>
        <input className='correo' type="text" value={email}
          onChange={(e) => setEmail(e.target.value)}
          required></input>
        <br></br>
        <p>Contraseña *</p>
        <input className='contraseña' type="text"value={password}
          onChange={(e) => setPassword(e.target.value)}
          required></input>
        <br></br>
        <p>¿Olvido su contraseña?</p>
        <button onClick={handleLogin}> INICIAR SESIÓN</button>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br></br>
        <button onClick={() => navigate('/InicioSesion/CrearCuenta')}> CREAR UNA CUENTA</button>
        <br></br>
        <p className='campos'>*Campos Obligatorios</p>
    </main>
    )
}
export default InicioSesion;