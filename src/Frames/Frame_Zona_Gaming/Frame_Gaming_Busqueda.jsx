import React, { useEffect, useState } from "react";
import { Footer } from "../Frame_Pagina_Principal/Footer_Pagina_Principal";
import { HeaderGaming } from "./HeaderGaming";
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdOutlineInventory2 } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { MostrarEstado } from "./Frame_Gaming_Seleccion";
import axios from "axios";
import "../../../src/css/Formato_Frame_Busqueda.css";

export function Frame2Busquedad() {
  const URI = "https://backend-odette-trend.vercel.app/Gaming/";
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [autocompletado, setCompletado] = useState([]);

  useEffect(() => {
    MostrarRegistrosName();
  }, []);

  const MostrarRegistrosName = async () => {
    const res = await axios.get(URI);
    setCompletado(res.data);
  };

  const buscarProductos = async () => {
    try {
      const response = await axios.get(
        `https://backend-odette-trend.vercel.app/Gaming/buscar/${searchQuery}`
      );

      if (Array.isArray(response.data)) {
        setResults(response.data);
      } else {
        console.error("La respuesta de la API no es un array válido.");
      }
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };

  useEffect(() => {
    buscarProductos();
  }, [searchQuery]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    setSearchQuery(query);
  }, [location.search]);

  return (
    <>
      <HeaderGaming
        autocompletado_ropa={autocompletado}
        busqueda={"Busqueda"}
      />
      <main>
        <section className="row resultados_contenedor_busqueda">
          <p className="Result_busqueda">
            Resultados de:{" "}
            <span className="Productos_busqueda"> {searchQuery}</span>
          </p>
          <hr className="hr_busqueda" />
        </section>
        {results.map((producto) => (
          <PresentarResultados
            key={producto.id}
            nombre={producto.name}
            precio={producto.price}
            rutaimg={producto.image_url}
            name={producto.name}
            id={producto.id}
            condicion={producto.condition}
            modelo={producto.model}
            stock={producto.stock}
          />
        ))}
      </main>
      <Footer
        backgroundClass="FooterFrameGaming"
        colorfooter="BackgroundFooter"
      />
    </>
  );
}

function PresentarResultados({
  nombre,
  precio,
  rutaimg,
  id,
  condicion,
  modelo,
  stock,
}) {
  return (
    <section className="row section_contenedor_busquedad">
      <article className="col-md-auto article_img_busqueda">
        <div className="div_imagenBusqueda">
          <img className="img_Busqueda img-fluid m-auto" src={rutaimg} alt="" />
        </div>
      </article>

      <article className="col-md-auto article_detalles_busqueda ">
        <div>
          <p className="p_nombre_busqueda">{nombre}</p>
          <hr className="hr_busquedad" />
          <MostrarEstado
            condicion={condicion}
            modelo={modelo}
            producto={stock}
            clasecondiciones="condicionesbusquedas"
            clasemodelo="modelobusqueda"
            clasecontenedor="contenedor_condiciones_busqueda"
          />
        </div>

        <div className="div_p_ordenalo_busqueda">
          <BiSolidShoppingBags className="icono_ordenalo_busqueda" />
          <p>Ordénalo hoy & Recíbelo de 6 a 10 días</p>
        </div>

        <div className="div_precio_boton_busqueda">
          <p className="precio_busqueda">${precio} USD</p>
          <div className="div_boton_busqueda">
            <Link to={`/Selecion/${id}`} className="Link_Producto_busqueda">
              <span>
                <MdOutlineInventory2 className="" />
              </span>
              VER PRODUCTO
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
