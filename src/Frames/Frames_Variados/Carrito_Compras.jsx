import React, { useState, useEffect } from "react";
import { HeaderGaming } from "../Frame_Zona_Gaming/HeaderGaming";
import { Nav2 } from "../Frame_Pagina_Principal/Header_Pagina_Principal";
import { Footer } from "../Frame_Pagina_Principal/Footer_Pagina_Principal";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { MdDeleteForever } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import { Link } from "react-router-dom";
import "../../css/Formato_Frame_Carrito.css";

export function Carrito_Compra() {
  const [gamingItems, setGamingItems] = useState([]);
  const [modaItems, setModaItems] = useState([]);
  const [user_id, setUserId] = useState("");
  const [precioTotalGaming, setPrecioTotalGaming] = useState(0);
  const [precioTotalModa, setPrecioTotalModa] = useState(0);
  const URLCONSEGUIRCARRITO = `https://backend-odette-trend.vercel.app/Carrito/ConseguirCarrito/${user_id}`;
  const URLCONSEGUIRCARRITOROPA = `https://backend-odette-trend.vercel.app/Carrito/ConseguirCarritoModa/${user_id}`;
  const precioTotalTotal = precioTotalGaming + precioTotalModa;
  const [mensajeCarrito, setMensaje] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    if (user_id) {
      ConseguirCarritoGaming(URLCONSEGUIRCARRITO);
      ConseguirCarritoModa(URLCONSEGUIRCARRITOROPA);
    }
  }, [user_id]);

  useEffect(() => {
    calcularPrecioTotal(gamingItems, setPrecioTotalGaming);
  }, [gamingItems]);

  useEffect(() => {
    calcularPrecioTotal(modaItems, setPrecioTotalModa);
  }, [modaItems]);

  const calcularPrecioTotal = (items, setPrecioTotal) => {
    if (Array.isArray(items) && items.length > 0) {
      const total = items.reduce((accumulator, item) => {
        let itemPrice = 0;
        let itemQuantity = 0;

        if (item.gaming_product) {
          itemPrice = item.gaming_product?.price || 0;
          itemQuantity = item.quantity || 0;
        } else if (item.clothings_product) {
          itemPrice = item.clothings_product?.price || 0;
          itemQuantity = item.quantity || 0;
        }

        console.log(
          `Item: ${
            item.gaming_product?.name || item.clothings_product?.name
          }, Price: ${itemPrice}, Quantity: ${itemQuantity}`
        );

        return accumulator + itemPrice * itemQuantity;
      }, 0);

      const totalRedondeado = Math.round(total * 100) / 100;
      if (!isNaN(totalRedondeado)) {
        setPrecioTotal(totalRedondeado);
      } else {
        console.error("Error: El total no es un número válido.");
      }
    } else {
      console.error("Error: No hay elementos en el carrito.");
    }
  };

  const ConseguirCarritoGaming = async (url) => {
    try {
      const response = await axios.get(url);
      if (response.data && Array.isArray(response.data)) {
        setGamingItems(response.data);
      } else {
        console.error(
          "La respuesta del backend (Gaming) no tiene el formato esperado:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error al obtener elementos del carrito (Gaming):", error);
    }
  };

  const ConseguirCarritoModa = async (url) => {
    try {
      const response = await axios.get(url);
      if (response.data && Array.isArray(response.data)) {
        setModaItems(response.data);
      } else {
        console.error(
          "La respuesta del backend (Moda) no tiene el formato esperado:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error al obtener elementos del carrito (Moda):", error);
    }
  };

  const EliminarDelCarrito = async (productId, type) => {
    try {
      if (type === "gaming") {
        await axios.post(
          `https://backend-odette-trend.vercel.app/Carrito/EliminarCarrito/${user_id}/${productId}`
        );
        ConseguirCarritoGaming(URLCONSEGUIRCARRITO);
      } else if (type === "moda") {
        await axios.post(
          `https://backend-odette-trend.vercel.app/Carrito/EliminarCarritoModa/${user_id}/${productId}`
        );
        ConseguirCarritoModa(URLCONSEGUIRCARRITOROPA);
      }
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
  };

  const DisminuirCantidad = async (productId, type) => {
    try {
      if (type === "gaming") {
        await axios.post(
          `https://backend-odette-trend.vercel.app/Carrito/DisminuirCantidad/${user_id}/${productId}`
        );
        ConseguirCarritoGaming(URLCONSEGUIRCARRITO);
      } else if (type === "moda") {
        await axios.post(
          `https://backend-odette-trend.vercel.app/Carrito/DisminuirCantidadModa/${user_id}/${productId}`
        );
        ConseguirCarritoModa(URLCONSEGUIRCARRITOROPA);
      }
    } catch (error) {
      console.error(
        "Error al reducir cantidad del producto en el carrito:",
        error
      );
    }
  };

  const RemoverTodoCarrito = async () => {
    try {
      await axios.delete(
        `https://backend-odette-trend.vercel.app/Carrito/RemoverTodoCarrito/${user_id}`
      );

      await axios.delete(
        `https://backend-odette-trend.vercel.app/Carrito/RemoverTodoCarritoModa/${user_id}`
      );
      ConseguirCarritoGaming(URLCONSEGUIRCARRITO);
      ConseguirCarritoModa(URLCONSEGUIRCARRITOROPA);
      setMensaje("GRACIAS POR SU COMPRA DE " + precioTotalTotal + " USD");
    } catch (error) {
      console.error("Error al eliminar el carrito:", error);
    }
  };

  return (
    <>
      <HeaderGaming
        BackgroundColor1="nav_ropa_principal"
        BackgroundColor2="nav_ropa"
        nav2_gaming="nav2_display"
        botoncolor="botonbuscar_nav"
        icon_nav="icon_nav_color"
        buscador_header="BuscadorHeader_Carrito"
        Navbar_Variados="Navbar_Header_Carrito"
      />
      <Nav2 />
      <main>
        <div>
          <h2 className="h2_nombre_carrito">Carrito de Compras</h2>
        </div>

        <section className="contenedor_principal_carrito_compras">
          {/* DIV DE LOS PRODUCTOS */}
          <div className="col-md-auto col-lg-6">
            <article>
              {Array.isArray(gamingItems) && gamingItems.length > 0 ? (
                gamingItems.map((item) => (
                  <article
                    key={item.gaming_product.id}
                    className="contenedor_article_carrito"
                  >
                    <div className="div_img_carrito">
                      <Link to={`/Selecion/${item.gaming_product.id}`}>
                        <img
                          src={item.gaming_product.image_url}
                          alt={item.gaming_product.name}
                          className="img-fluid img_producto_carrito"
                        />
                      </Link>
                    </div>

                    <div className="div_detalles_carrito">
                      <p className="p_nombre_producto_carrito">
                        <strong>{item.gaming_product.name}</strong>
                      </p>
                      <p className="p_cantidad_producto_carrito">
                        <strong className="strong_cantidad_carrito">
                          Cantidad:
                        </strong>{" "}
                        {item.quantity}
                      </p>
                      <p className="p_precio_producto_carrito">
                        ${item.gaming_product.price} USD
                      </p>
                    </div>

                    <div className="div_button_carrito">
                      <button
                        className="boton_disminuir_carrito"
                        onClick={() =>
                          DisminuirCantidad(item.gaming_product.id, "gaming")
                        }
                      >
                        <FaCartArrowDown />
                      </button>
                      <button
                        className="boton_eliminar_carrito"
                        onClick={() =>
                          EliminarDelCarrito(item.gaming_product.id, "gaming")
                        }
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p>No hay elementos en el carrito (Gaming).</p>
              )}
            </article>

            <article>
              {Array.isArray(modaItems) && modaItems.length > 0 ? (
                modaItems.map((item) => (
                  <article
                    key={item.product_id}
                    className="contenedor_article_carrito"
                  >
                    <div className="div_img_carrito">
                      <Link to={`/Seleccion/Moda/${item.product_id}`}>
                        <img
                          src={item.clothings_product?.image_url || ""}
                          alt={item.clothings_product?.name || ""}
                          className="img-fluid img_producto_carrito"
                        />
                      </Link>
                    </div>

                    <div className="div_detalles_carrito">
                      <p className="p_nombre_producto_carrito">
                        <strong>{item.clothings_product?.name || ""}</strong>
                      </p>
                      <p className="p_cantidad_producto_carrito">
                        <strong className="strong_cantidad_carrito">
                          Cantidad:
                        </strong>{" "}
                        {item.quantity}
                      </p>
                      <p className="p_cantidad_producto_carrito">
                        <strong className="strong_cantidad_carrito">
                          Talla:
                        </strong>{" "}
                        {item.clothings_product.size}
                      </p>
                      <p className="p_precio_producto_carrito">
                        ${item.clothings_product?.price || ""} USD
                      </p>
                    </div>
                    <div className="div_button_carrito">
                      <button
                        className="boton_disminuir_carrito"
                        onClick={() =>
                          DisminuirCantidad(item.product_id, "moda")
                        }
                      >
                        <FaCartArrowDown />
                      </button>
                      <button
                        className="boton_eliminar_carrito"
                        onClick={() =>
                          EliminarDelCarrito(item.product_id, "moda")
                        }
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p>No hay elementos en el carrito (Moda).</p>
              )}
            </article>
          </div>

          {/* DIV CONTENEDOR DE RESUMEN CARRITO - ACEPTAMOS*/}
          <div className="col-md-auto col-lg-6">
            <article className="contenedor_Pago_carrito">
              <h2 className="h2_titulo_resumen_carrito">RESUMEN DEL PEDIDO</h2>
              <div className="div_ordenalo_carrito">
                <BiSolidShoppingBags className="icono_ordenalo_carrito" />
                <p>Ordénalo hoy & Recíbelo de 6 a 10 días</p>
              </div>
              <div className="div_cantidadTotal_carrito">
                {(Array.isArray(gamingItems) && gamingItems.length > 0) ||
                (Array.isArray(modaItems) && modaItems.length > 0) ? (
                  <div>
                    {" "}
                    <strong className="strong_cantidadtotal_carrito">
                      Cantidad Total:{" "}
                    </strong>{" "}
                    <span className="span_cantidadtotal_carrito">
                      ${precioTotalTotal.toFixed(2)} USD
                    </span>
                  </div>
                ) : (
                  <p>No hay elementos en el carrito.</p>
                )}
              </div>
              <div>
                <button
                  className="boton_comprarTodo_carrito"
                  onClick={RemoverTodoCarrito}
                >
                  COMPRAR AHORA
                </button>
              </div>
              {mensajeCarrito && (
                <p className="mensaje_carrito_compraTotal">{mensajeCarrito}</p>
              )}
            </article>

            <article className="contenedor_Aceptamos_carrito">
              <h2 className="h2_aceptamos_carrito">ACEPTAMOS</h2>
              <div className="div_img_aceptamos_carrito">
                <img
                  src="\img_Frame_Aceptamos\imagen_visa.webp"
                  alt="imagen_visa"
                  className="img-fluid"
                />
                <img
                  src="\img_Frame_Aceptamos\imagen_paypal.webp"
                  alt="imagen_paypal"
                  className="img-fluid"
                />
                <img
                  src="\img_Frame_Aceptamos\imagen_mastercad.webp"
                  alt="imagen_mastercad"
                  className="img-fluid"
                />
              </div>
            </article>
          </div>
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
