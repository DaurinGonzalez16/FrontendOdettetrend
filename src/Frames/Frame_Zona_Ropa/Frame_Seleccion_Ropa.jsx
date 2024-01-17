import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HeaderGaming } from "../Frame_Zona_Gaming/HeaderGaming";
import { Footer } from "../Frame_Pagina_Principal/Footer_Pagina_Principal";
import { IoIosStar } from "react-icons/io";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { TipoRopaNav } from "./MainZonaRopa.jsx";
import "../../css/Formato_Frame_Seleccion_Ropa.css";
export function FrameSeleccion_Ropa() {
  const { id } = useParams();
  const [producto, setProducto] = useState([]);
  const [imagenPrincipal, setImagenPrincipal] = useState("");
  const [cantidadCarrito, setCantidadCarrito] = useState(1);
  const [autocompletadoRopa, setAutocompletadoRopa] = useState([]);
  const URLDATOS = `https://backend-odette-trend.vercel.app/Moda/CardModaid/${id}`;
  const URLROPA = `https://backend-odette-trend.vercel.app/Moda/CardModaName/name`;
  const [mensajeCarrito, setMensajeCarrito] = useState("");

  const cantidadMaxima = producto.stock;

  const datosAutocompletadoRopa = async () => {
    try {
      const res = await axios.get(URLROPA);
      setAutocompletadoRopa(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setImagenPrincipal(producto.image_url);
  }, [producto.image_url]);

  useEffect(() => {
    MostrarDatos();
    datosAutocompletadoRopa();
  }, []);

  const cambiarImagenPrincipal = (nuevaImagen) => {
    setImagenPrincipal(nuevaImagen);
  };

  const agregarAlCarritoRopa = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      await axios.post(
        "https://backend-odette-trend.vercel.app/Carrito/AnadirCarritoModa",
        { productId: id, quantity: cantidadCarrito, userId: userId },
        config
      );

      const mensaje = `Se agregaron ${cantidadCarrito} ${
        cantidadCarrito > 1 ? "productos" : "producto"
      } al carrito.`;

      setMensajeCarrito(mensaje);
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  };

  const MostrarDatos = async () => {
    try {
      const datos = await axios.get(URLDATOS);
      setProducto(datos.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const decrementarCantidadRopa = () => {
    setCantidadCarrito((prev) => Math.max(prev - 1, 1));
  };

  const incrementarCantidadRopa = () => {
    if (cantidadCarrito < cantidadMaxima) {
      setCantidadCarrito((prev) => prev + 1);
    } else {
      console.log("No se puede superar el stock disponible");
    }
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

      <main>
        <section className="row section1_ropa_selecion">
          <article className="col-md-auto col-1-seleccion-ropa">
            <div className="div_mini_imagenes">
              <img
                className="img-fluid mini_img_seleccion"
                src={producto.image_url_1}
                alt=""
                onClick={() => cambiarImagenPrincipal(producto.image_url_1)}
              />
              <img
                className="img-fluid mini_img_seleccion"
                src={producto.image_url_2}
                alt=""
                onClick={() => cambiarImagenPrincipal(producto.image_url_2)}
              />
              <img
                className="img-fluid mini_img_seleccion"
                src={producto.image_url_3}
                alt=""
                onClick={() => cambiarImagenPrincipal(producto.image_url_3)}
              />
              <img
                className="img-fluid mini_img_seleccion"
                src={producto.image_url_4}
                alt=""
                onClick={() => cambiarImagenPrincipal(producto.image_url_4)}
              />
            </div>
            <div className="div_img_principal_ropa">
              <img
                className="img-fluid img_principal_seleccion_ropa"
                src={imagenPrincipal}
                alt=""
              />
            </div>
          </article>

          <article className="col-md-auto col-2-seleccion-ropa">
            <h2 className="titulo_selecion_ropa">{producto.name}</h2>
            <hr className="hr_seleccion_moda_Ropa" />
            <div className="div_valoracion">
              <span>Valoración </span>
              <div>
                {Array.from({ length: producto.valoracion }, (_, index) => (
                  <IoIosStar key={index} className="estrellas" />
                ))}
              </div>
            </div>

            <div className="div_ordenalo_ropa">
              <BiSolidShoppingBags className="icon_ordenalo" />
              <span className="span_ordenalo_ropa">
                Ordénalo hoy & Recíbelo de 6 a 10 días
              </span>
            </div>

            <div className="colores_d">
              <span>Color Disponible: </span>
              <div className="circulos_col">
                <FaCircle
                  className="circulo_color_seleccion"
                  style={{ color: producto.color }}
                />
              </div>
            </div>

            <div className="tallas_dropdown">
              <span className="span_talla">Size:</span>
              <span className="size_moda_seleccion">{producto.size}</span>
            </div>

            <div>
              <h3 className="precio_selecion_ropa">${producto.price} USD</h3>
            </div>

            {/* BOTON */}
            <div className="contenedor_boton_carrito">
              <div className="contenedor_cantidad_carrito">
                <button
                  className="boton_cantidad_carrito"
                  onClick={decrementarCantidadRopa}
                >
                  -
                </button>
                <p className="cantidad_carrito">
                  {isNaN(cantidadCarrito) ? 1 : cantidadCarrito}
                </p>
                <button
                  className="boton_cantidad_carrito"
                  onClick={incrementarCantidadRopa}
                >
                  +
                </button>
              </div>

              <button
                className="boton_carrito"
                type="button"
                onClick={agregarAlCarritoRopa}
              >
                <p className="icon_boton_carrito">
                  <MdAddShoppingCart />
                </p>
                Añadir al Carrito
              </button>
            </div>
            {mensajeCarrito && (
              <p className="mensaje_carrito">{mensajeCarrito}</p>
            )}
          </article>
        </section>
      </main>

      <Footer
        backgroundClass="BackColor"
        colorfooter="BackColorFooter"
        colorletras="colorletras2"
      />
    </>
  );
}
