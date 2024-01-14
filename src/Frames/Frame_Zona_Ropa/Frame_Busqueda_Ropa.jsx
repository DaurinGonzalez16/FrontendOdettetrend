import { HeaderGaming } from "../Frame_Zona_Gaming/HeaderGaming";
import { Footer } from "../Frame_Pagina_Principal/Footer_Pagina_Principal";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "/src/css/Formato_Frame_Busqueda_Ropa.css";
import { TipoRopaNav } from "./MainZonaRopa.jsx";

export function Frame_Busquedad_Ropa() {
  const URL =
    " https://backend-odette-trend.vercel.app/Moda/CardModaName/name/";
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [autocompletadoRopa, setCompletadoRopa] = useState([]);
  const MostrarRegistrosName = async () => {
    const res = await axios.get(URL);
    setCompletadoRopa(res.data);
    console.log(autocompletadoRopa);
  };

  const buscarProductos = async () => {
    try {
      const response = await axios.get(
        `https://backend-odette-trend.vercel.app/Moda/CardModabuscar/${searchQuery}`,
        {
          params: { tipo: searchQuery },
        }
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
    MostrarRegistrosName();
  }, [searchQuery]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    setSearchQuery(query);
  }, [location.search]);

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
        <h2 className="h2_busqueda_ropa">
          Resultado de:{" "}
          <span className="span_resultado_ropa">{searchQuery}</span>
        </h2>

        <div className="row div_contenedor_busqueda_ropa">
          {results.length > 0 ? (
            results.map((producto) => (
              <Tarjetas
                key={producto.clothing_id}
                nombre={producto.name}
                img={producto.image_url}
                precio={producto.price}
                id={producto.clothing_id}
              />
            ))
          ) : (
            <p className="p_validacion_resultado_ropa">
              No se encontraron resultados...
            </p>
          )}
        </div>
      </main>
      <Footer
        backgroundClass="BackColor"
        colorfooter="BackColorFooter"
        colorletras="colorletras2"
      />
    </>
  );
}

function Tarjetas({ id, nombre, precio, img }) {
  return (
    <>
      <div className="col-md-auto col_md_auto_busqueda_ropa">
        <Link
          to={`/Seleccion/Moda/${id}`}
          className="a_Tarjetas_busqueda_Ropa"
          href=""
        >
          <div className="card card_busqueda">
            <img
              src={img}
              className=" img-fluid img_tarjetas_buscar_ropa"
              alt={nombre}
            />
            <div className="card-body card-body-busqueda-ropa">
              <h5 className="card-title card_title_Busquedad">
                {" "}
                {nombre.length > 10 ? `${nombre.substring(0, 14)}...` : nombre}
              </h5>
              <h5 className="card-title precio_title_Busquedad">
                Precio: ${precio}.00
              </h5>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
