import whats_logo from '../../assets/whatsapp-logo.png'
import redes from '../../assets/redsocial.png'
import cuentafoto from '../../assets/cuenta.png'
import tienda from '../../assets/tienda.png'
import bolsa from '../../assets/bolsa.png'
import './Header.css'
const Header = () =>{
    return (
        <header>
            <div className='divheader'>
                <div className='divextras'>
                <ul>
                    <li> <a href="">Políticas y condiciones de uso</a> </li>
                    <li><a href="/InicioSesion">Iniciar sesión</a></li>
                    <li><a href="/InicioSesion/CrearCuenta">Crear una cuenta</a></li>
                </ul>
                <img src={redes}></img>
                </div>
            
            <div className="mainheader">
                <a href='/'>PHANTOM</a>
                <input type="text" placeholder='Buscar....'></input>
                <img src={whats_logo}></img>
                <ul>
                    <li>COMPRA AHORA</li>
                    <li><a href=''>960-984-854</a></li>
                </ul>
                <div className='divperfiles'>
                    <a href='/InicioSesion'><img src ={cuentafoto}></img></a>
                    <a href=''><img src ={tienda}></img></a>
                    <a href='/carrito'><img className='bolsa' src ={bolsa}></img></a>
                </div>
                
                
            </div>
            </div>
        </header>
    )
}
export default Header;