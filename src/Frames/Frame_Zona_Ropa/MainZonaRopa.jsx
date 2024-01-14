import { Footer } from "../Frame_Pagina_Principal/Footer_Pagina_Principal.jsx";
import { HeaderGaming } from "../Frame_Zona_Gaming/HeaderGaming.jsx";
import { ComponenteZonas } from "../Frame_Zona_Gaming/MainGaming.jsx";
import {
  GeneradorCardsRopa,
  GeneradorSection3,
  GeneradorSection4,
} from "../../ComponentesCards/GeneradorCardsRopa.jsx";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { MdEmojiPeople } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import "/src/css/Formato_Frame_Ropa.css";

export const MainZonaRopa = () => {
  const URL = "https://backend-odette-trend.vercel.app/Moda/CardModaName/name/";
  const [autocompletadoRopa, setCompletadoRopa] = useState([]);

  useEffect(() => {
    MostrarRegistrosName();
  }, []);

  const MostrarRegistrosName = async () => {
    const res = await axios.get(URL);
    setCompletadoRopa(res.data);
  };

  function handleSearchSubmit(tipoRopa) {
    window.location.href = `/Busqueda/Moda?query=${tipoRopa}`;
  }

  return (
    <>
      <HeaderGaming
        BackgroundColor1="nav_ropa_principal"
        BackgroundColor2="nav_ropa"
        nav2_gaming="nav2_display"
        botoncolor="botonbuscar_nav"
        icon_nav="icon_nav_color"
        autocompletado_ropa={autocompletadoRopa}
        busqueda="Busqueda/Moda"
      />

      {/* NAV 2 */}
      <TipoRopaNav handleSearchSubmit={handleSearchSubmit} />

      {/* MAIN */}
      <MainRopa />

      {/* FOOTER */}
      <Footer
        backgroundClass="BackColor"
        colorfooter="BackColorFooter"
        colorletras="colorletras2"
      />
    </>
  );
};

function MainRopa() {
  const [data, setData] = useState([]);
  const [datasection4, setSection4] = useState([]);

  const URLNAME =
    "https://backend-odette-trend.vercel.app/Moda/CardModaName/name/7";
  const URLSECTION4 =
    "https://backend-odette-trend.vercel.app/Moda/CardModaName/name/2";

  const ObtenerCardsModaName = async () => {
    try {
      const datos = await axios.get(URLNAME);
      setData(datos.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const ObtenerCardSection3 = async () => {
    try {
      const datosSection_4 = await axios.get(URLSECTION4);
      setSection4(datosSection_4.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    ObtenerCardsModaName();
    ObtenerCardSection3();
  }, []);

  return (
    <main>
      <ComponenteZonas
        nombre_zona="ZONA DE ESTILO"
        rutaimg="section_p"
        contenedor_img2="Contenedor_1"
        span_moda="span_moda_2"
      />

      <section className="row contenedor_main1_ropa">
        {data.map((producto) => (
          <div className="col-md-auto div_main1_ropa ">
            <GeneradorCardsRopa
              key={producto.clothing_id}
              name={producto.name}
              img={producto.image_url}
              precio={producto.price}
              nameclass="nombre_producto_main1_Moda"
              precioclass="precio_producto_main1_Moda"
              id={producto.clothing_id}
            />
          </div>
        ))}
      </section>

      <section className="section2_ropa">
        <h2>
          <MdEmojiPeople className="emoji" />
          DIVIERTETE EXPLORANDO NUESTRA VARIEDAD DE CATEGORIAS
        </h2>
      </section>

      <section className="row section3_ropa">
        <GeneradorSection3
          img="\img_Frame_Ropa\Imagenes_Frame_4\Ninos.webp"
          type="NIÑOS"
        />
        <GeneradorSection3
          img="\img_Frame_Ropa\Imagenes_Frame_4\Pantalones.webp"
          type="PANTALONES"
        />
        <GeneradorSection3
          img="\img_Frame_Ropa\Imagenes_Frame_4\Sudadera.webp"
          type="SUDADERAS"
        />
        <GeneradorSection3
          img="\img_Frame_Ropa\Imagenes_Frame_4\Calzados.webp"
          type="CALZADOS"
        />
        <GeneradorSection3
          img="\img_Frame_Ropa\Imagenes_Frame_4\Deportiva.webp"
          type="DEPORTIVA"
        />
      </section>

      <section className="section4_ropa">
        <h2 className="h2_section4_ropa">
          RECUERDA DESCARGAR NUESTRA APLICACION
        </h2>
        <div className="div_odettetrend_ropa">
          <a href="" className="a_odettetrend_ropa">
            <MdOutlinePhoneIphone className="iphone_icon_section4_ropa" />
            <p className="p_odettetrend_ropa">OdetteTrend</p>
          </a>
        </div>
      </section>

      <section className="row section5_ropa_moda">
        {datasection4.map((producto) => (
          <>
            <GeneradorSection4
              key={producto.clothing_id}
              Img={producto.image_url}
              Name={producto.name}
              id={producto.clothing_id}
            />
          </>
        ))}
      </section>
    </main>
  );
}

export const TipoRopaNav = ({ handleSearchSubmit }) => {
  const tiposDeRopa = [
    "Niños",
    "Pantalones",
    "Sudaderas",
    "Calzados",
    "Deportiva",
  ];

  return (
    <div className="nav2_ropa_red">
      {tiposDeRopa.map((tipo, index) => (
        <a
          key={index}
          href="#"
          onClick={() => handleSearchSubmit(tipo)}
          className="nav2_items"
        >
          {tipo}
        </a>
      ))}
    </div>
  );
};
