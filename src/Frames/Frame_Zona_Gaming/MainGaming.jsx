import { Footer } from "../Frame_Pagina_Principal/Footer_Pagina_Principal";
import { CardGaming } from "../../ComponentesCards/GeneradorCardsGaming";
import { HeaderGaming } from "../../Frames/Frame_Zona_Gaming/HeaderGaming";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "/src/css/Formato_Frame_Gaming_Principal.css";

const URL = "https://backend-odette-trend.vercel.app/Gaming";
/*URL PARA LAS TABLETS - MOSTRAR REGISTROS*/
const URL2 = "https://backend-odette-trend.vercel.app/Gaming/tipo/Tablet";
/*URL PARA LOS ACCESORIOS - MOSTRAR REGISTROS*/
const URL3 = "https://backend-odette-trend.vercel.app/Gaming/tipo/Accessory/";
/*URL OFERTA*/
const URL4 = "https://backend-odette-trend.vercel.app/Gaming/oferta/6";
/*URL MAS VENDIDO*/
const URL5 = "https://backend-odette-trend.vercel.app/Gaming/limite/3";
/*URL DESCUENTO*/
const URL6 = "https://backend-odette-trend.vercel.app/Gaming/Descuento";

export function MainZonaGaming() {
  const [autocompletado, setCompletado] = useState([]);

  useEffect(() => {
    MostrarRegistrosName();
  }, []);

  const MostrarRegistrosName = async () => {
    const res = await axios.get(URL);
    setCompletado(res.data);
  };
  return (
    <>
      <HeaderGaming autocompletado_ropa={autocompletado} busqueda="Busqueda" />
      <main>
        <ComponenteZonas nombre_zona="ZONA TECNOLOGICA" />
        <section className="row contenedorcarta desplazar2 ">
          {/*OFERTAS */}
          <Cards cantidad={URL4} oferta="Si" desplazar="desplazarofertas" />
        </section>

        {/* SECCION MAS VENDIDO */}
        <section className="row">
          <Frame_Mas_Vendido />
        </section>

        {/* SECCION TABLET */}
        <section className="row">
          <h2 className="h2_tablet">Tablets</h2>
          <Cards cantidad={URL2} oferta="no" sin_oferta="sinoferta" />
        </section>

        {/* SECTION ACCESORIOS */}
        <section className="row">
          <h2 className="h2_Accesorios">Accesorios</h2>
          <Cards cantidad={URL3} oferta="no" sin_oferta="sinoferta" />
        </section>
      </main>

      <Footer
        backgroundClass="FooterFrameGaming"
        colorfooter="BackgroundFooter"
        footer_svg_color="Footer_Svg_Color_Gaming"
        redes_sociales_color="Redes_Sociales_Color_Gaming"
        footer_color_p="footer_color_p_gaming"
      />
    </>
  );
}

const Frame_Mas_Vendido = () => {
  const [productosGaming, setProductosGaming] = useState([]);
  const [productosdescuentos, setDescuentos] = useState([]);

  useEffect(() => {
    mostrarGaming();
    mostrardescuentos();
  }, []);

  const mostrarGaming = async () => {
    const res = await axios.get(URL5);
    setProductosGaming(res.data);
  };

  const mostrardescuentos = async () => {
    const res = await axios.get(URL6);
    setDescuentos(res.data);
  };

  return (
    <>
      <div className="SoloCelulares">
        <div className="col-md-auto contenedorText_masvendido">
          <div className="col-md-auto Contenedormasvendido">
            {productosdescuentos.length > 0 && (
              <div className="card masvendido" key={productosdescuentos[0].id}>
                <img
                  src={`${productosdescuentos[0].image_url}`}
                  className="card-img-top img-decuento"
                  alt="..."
                />
                <div className="card-body">
                  <span className="descuento">
                    ¿QUE ESPERAS PARA ADQUIRIR ESTE PRODRUCTO?
                  </span>
                  <h3 className="card-title h3Descuento">
                    {productosdescuentos[0].name}
                  </h3>
                  <p className="precio_descuento_red">
                    ${productosdescuentos[0].price} USD
                  </p>
                  <Link
                    to={`/Selecion/${productosdescuentos[0].id}`}
                    className="botonCard2"
                  >
                    COMPRAR PRODUCTO
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FRAME DE COMPUTADORA */}
      <div className="MasVendidoPC">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {productosGaming.map((producto, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {productosGaming.map((producto, index) => {
              const num = Math.floor(Math.random() * 66) + 35;
              return (
                <div
                  key={producto.id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <Link
                    to={`/Selecion/${producto.id}`}
                    className="Contenedor_img_carusel"
                  >
                    <img
                      src={`${producto.image_url}`}
                      alt={`${producto.name}`}
                      className="img-carrusel-pc"
                    />
                  </Link>

                  <div className="carousel-caption ">
                    <h2>Productos Más Vendidos</h2>
                    <h5>
                      Este Producto ha sido comprado por más de{" "}
                      <strong>{num}</strong> personas.
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTONES LATERALES */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
};

const Cards = ({ cantidad, oferta = "no", sin_oferta, desplazar }) => {
  const [productosGaming, setProductosGaming] = useState([]);

  useEffect(() => {
    mostrarGaming();
  }, []);

  const mostrarGaming = async () => {
    const res = await axios.get(cantidad);
    setProductosGaming(res.data);
  };

  return (
    <>
      <section className="section_tablet">
        <div className={`contenedorHijo_cards ${desplazar}`}>
          {productosGaming.map((producto) => (
            <div key={producto.id}>
              <CardGaming
                imagenRuta={producto.image_url}
                cardtitulo={producto.name}
                cardprecio={producto.price}
                enOferta={`${oferta}`}
                productid={producto.id}
                clasesinoferta={sin_oferta}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export function ComponenteZonas({
  nombre_zona,
  rutaimg,
  contenedor_img2,
  span_moda,
}) {
  return (
    <section className={`row section1_maingaming ${rutaimg}`}>
      <div className={`contenedor_img ${contenedor_img2}`}>
        <span className={`span_zona_tecnologia ${span_moda}`}>
          {nombre_zona}
        </span>
      </div>
    </section>
  );
}
