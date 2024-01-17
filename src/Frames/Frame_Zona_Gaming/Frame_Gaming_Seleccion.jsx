import { HeaderGaming } from "../Frame_Zona_Gaming/HeaderGaming";
import { Footer } from "../Frame_Pagina_Principal/Footer_Pagina_Principal";
import { LiaMemorySolid } from "react-icons/lia";
import { AiFillAlert } from "react-icons/ai";
import { BiSolidShoppingBags } from "react-icons/bi";
import { FaWindows, FaShoppingCart, FaDigitalTachograph } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";
import { GiProcessor } from "react-icons/gi";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "/src/css/Formato_Frame_Seleccion.css";
const URI = "https://backend-odette-trend.vercel.app/Gaming/";

export function MainGamingProducto() {
  const [autocompletado, setCompletado] = useState([]);

  useEffect(() => {
    MostrarRegistrosName();
  }, []);

  const MostrarRegistrosName = async () => {
    const res = await axios.get(URI);
    setCompletado(res.data);
    console.log(autocompletado);
  };
  return (
    <>
      <HeaderGaming autocompletado_ropa={autocompletado} busqueda="Busqueda" />
      <main>
        <MainSelecion />
      </main>
      <Footer
        backgroundClass="FooterFrameGaming"
        colorfooter="BackgroundFooter"
      />
    </>
  );
}

function MainSelecion() {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [imagenPrincipal, setImagenPrincipal] = useState("");
  const [mensajeCarrito, setMensajeCarrito] = useState("");
  const [cantidadCarrito, setCantidadCarrito] = useState(1);

  useEffect(() => {
    setImagenPrincipal(producto.image_url);
  }, [producto.image_url]);

  const cambiarImagenPrincipal = (nuevaImagen) => {
    setImagenPrincipal(nuevaImagen);
  };

  const agregarAlCarrito = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      // Obtener el userId del token almacenado en el localStorage
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      // Realiza la solicitud al servidor para agregar el producto al carrito
      await axios.post(
        "https://backend-odette-trend.vercel.app/Carrito/AnadirCarrito",
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

  const obtenerDetallesProducto = async () => {
    try {
      const res = await axios.get(`${URI}${id}`);
      setProducto(res.data);
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
    }
  };

  useEffect(() => {
    obtenerDetallesProducto();
  }, [id]);

  const cantidadMaxima = producto.stock;

  const decrementarCantidad = () => {
    setCantidadCarrito((prev) => Math.max(prev - 1, 1));
  };

  const incrementarCantidad = () => {
    if (cantidadCarrito < cantidadMaxima) {
      setCantidadCarrito((prev) => prev + 1);
    } else {
      console.log("No se puede superar el stock disponible");
    }
  };

  return (
    <>
      {/*Fila de las imagenes  */}
      <section className="row row_principal">
        {/* COLUMNA IMAGENES */}
        <article className="col-md-auto col-1-seleccion-gaming">
          <div className="div_mini_imagenes_gaming">
            <img
              className="img-fluid mini_img_seleccion_gaming"
              src={producto.image_url_1}
              alt=""
              onClick={() => cambiarImagenPrincipal(producto.image_url_1)}
            />
            <img
              className="img-fluid mini_img_seleccion_gaming"
              src={producto.image_url_2}
              alt=""
              onClick={() => cambiarImagenPrincipal(producto.image_url_2)}
            />
            <img
              className="img-fluid mini_img_seleccion_gaming"
              src={producto.image_url_3}
              alt=""
              onClick={() => cambiarImagenPrincipal(producto.image_url_3)}
            />
            <img
              className="img-fluid mini_img_seleccion_gaming"
              src={producto.image_url_4}
              alt=""
              onClick={() => cambiarImagenPrincipal(producto.image_url_4)}
            />
          </div>
          <div className="div_img_principal_gaming">
            <img
              className="img-fluid img_principal_seleccion_gaming"
              src={imagenPrincipal}
              alt=""
            />
          </div>
        </article>

        {/* COLUMNA IDENTIDICACION DEL PRODUCTO */}
        <article className="col-md-auto identificacion_producto">
          <div className="contenedor_Nombre_producto">
            <p className="Nombre_Producto">{producto.name}</p>
            <hr className="hr_Nombre_Producto" />
          </div>

          <MostrarEstado
            condicion={producto.condition}
            modelo={producto.model}
            producto={producto.stock}
          />

          <div className="contenedor_pedido_añadir">
            <div className="subcontenedor_pedido">
              <p className="P_pedido_especial">Pedido Especial</p>
              <AiFillAlert className="icono_PedidoEspecial" />
            </div>

            <div className="P_Ordenalo">
              <BiSolidShoppingBags className="icon_ordenalo" />
              <p className="p_Ordenalo_Text">
                Ordénalo hoy & Recíbelo de 6 a 10 días
              </p>
            </div>
          </div>

          <div className="contenedor_Precio">
            <p className="precio">${producto.price} USD</p>
          </div>

          <div className="contenedor_boton_carrito">
            <div className="contenedor_cantidad_carrito">
              <button
                className="boton_cantidad_carrito"
                onClick={decrementarCantidad}
              >
                -
              </button>
              <p className="cantidad_carrito">
                {isNaN(cantidadCarrito) ? 1 : cantidadCarrito}
              </p>
              <button
                className="boton_cantidad_carrito"
                onClick={incrementarCantidad}
              >
                +
              </button>
            </div>

            <button
              className="boton_carrito"
              type="button"
              onClick={agregarAlCarrito}
            >
              <p className="icon_boton_carrito">
                <FaShoppingCart />
              </p>
              Añadir al Carrito
            </button>
          </div>
          {mensajeCarrito && (
            <p className="mensaje_carrito">{mensajeCarrito}</p>
          )}
        </article>

        {/* COLUMNA DE CARATERISTICAS */}
        <article className="col-md-auto contenedor_caracteristicas2 ">
          <div>
            <p className="Caracteristicas_Nombre">
              <strong>CARACTERISTICAS </strong>
            </p>
            <hr className="hr_caracteristicas" />
            <MostrarCaracteristicas {...producto} />
          </div>
        </article>
      </section>
    </>
  );
}

const MostrarCaracteristicas = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    const obtenerDetallesProducto = async () => {
      const res = await axios.get(
        `https://backend-odette-trend.vercel.app/Gaming/${id}`
      ); // Reemplaza con la URL de tu API
      setProducto(res.data);
    };

    obtenerDetallesProducto();
  }, [id]);

  return (
    <div className="contenedor_caracteristicas">
      <p>
        <FaWindows /> Windows: <strong>{producto.operating_system}</strong>
      </p>
      <p>
        <GiProcessor /> Procesador: <strong>{producto.processor}</strong>
      </p>
      <p>
        <LiaMemorySolid /> Memoria Ram: <strong>{producto.memory_ram}</strong>
      </p>
      <p>
        <MdOutlineStorage /> Almacenamiento: <strong>{producto.storage}</strong>
      </p>
      <p>
        <FaDigitalTachograph /> Tarjeta Grafica:{" "}
        <strong>{producto.graphics_card}</strong>
      </p>
    </div>
  );
};

export const MostrarEstado = ({
  condicion,
  modelo,
  producto,
  clasecontenedor,
  clasecondiciones,
  clasemodelo,
  clasecantidad,
}) => {
  return (
    <div className={`contenedor_condiciones ${clasecontenedor}`}>
      <p className={`Condiciones ${clasecondiciones}`}>
        <strong>Condiciones:</strong> {condicion}
      </p>
      <p className={`Modelo ${clasemodelo}`}>
        <strong>Modelo:</strong> {modelo}
      </p>
      <p className={`Cantidad ${clasecantidad}`}>
        <strong>Cantidad Disponible:</strong> {producto}
      </p>
    </div>
  );
};
