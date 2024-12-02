import './Footer.css'
import tarjetas from '../../assets/tarjetasweb.png'
const Footer =() =>{
    return(
        <div className="footerbackground">
            <footer>
            <ul>
                    <li><h1>Contacto</h1></li>
                    <li><h2>960984854</h2></li>
                    <li>lun-vie: 8:30 hrs - 19:00 hrs</li>
                    <hr></hr>
                    <li><h2>EMAIL</h2></li>
                    <li>atencionalcliente1@phantom.com.pe</li>
                    <hr></hr>
                </ul>
            
                <ul className='enlacesfooter'>
                    <li><h1>Enlaces Importantes</h1></li>
                    <li>Libro de reclamaciones</li>
                    <li>Políticas y condiciones de uso</li>
                    <li>Sugerencias</li>
                    <li>Guía para padres</li>
                    <li>Trabaja con nosotros</li>
                    
                </ul>
                <ul className='informacionfooter'>
                    <li><h1>Informacion</h1></li>
                    <li>Nosotros</li>
                    <li>Nuestras tiendas</li>
                    <li>¿Cómo Comprar?</li>
                    <li>Preguntas Frecuentes</li>
                    <li>Comprobantes Electronicos</li>
                    
                </ul>

                <ul>
                    <li><h1>Suscríbete</h1></li>
                    <li>Suscríbete a nuestro Phantom News.</li>
                    <li><div class="input-container">
                        <input type="text" placeholder="Dirección de email" />
                        <button type="submit">IR</button> </div></li>
                        
                </ul>
            </footer>
            <hr className='subraya'></hr>
            <div className='footerfin'>
                <img src={tarjetas}></img>
                <ul>
                    <li>PHANTOM © 2024. Todos los derechos</li>
                    <li>reservados. Desarrollo por TGA Software</li>
                </ul>
            </div>
        </div>
        
    )
}
export default Footer;