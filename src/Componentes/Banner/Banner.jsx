import './Banner.css';
import Powerpay from '../../assets/Powerpay.png'

const Banner = () => {
    return (
        <div className="bannerOuter"> {/* Contenedor morado que ocupa el 100% */}
            <div className="bannerBackground">
                <div className="banner">
                    <img src={Powerpay} alt="Powerpay" className="bannerLogo" />
                    <p>Cuotas <b>desde 0% de interés</b> con <b>todas las tarjetas de<br/> crédito</b> y sin afectar toda tu línea</p>
                    <a href="#" className="bannerButton" id="moreInfoButton">Más información</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;