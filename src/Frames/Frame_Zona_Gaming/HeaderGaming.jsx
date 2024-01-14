import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav2 } from "../Frame_Pagina_Principal/Header_Pagina_Principal";
import { MdOutlineAccountBox } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import "/src/css/Formato_Frame_Gaming_Principal.css";

export function HeaderGaming({
  BackgroundColor1,
  nav2_gaming,
  botoncolor,
  icon_nav,
  autocompletado_ropa,
  busqueda,
}) {
  const [search, setSearch] = useState("");

  const CambioBusqueda = (busqueda) => {
    setSearch(busqueda.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/${busqueda}?query=${search}`;
  };

  return (
    <>
      <header>
        <nav
          className={`navbar navbar_2 navbar-expand-lg navbar-dark ${BackgroundColor1}`}
        >
          <div className="container-fluid">
            <Link className="navbar-brand OdetteTrendFrame2" to={"/"}>
              OdetteTrend.com
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav navbar-nav2 me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link nav-linkFrame2 "
                    aria-current="page"
                    to={"/IniciarSesion"}
                  >
                    <MdOutlineAccountBox
                      className={`iconoFrame2 ${icon_nav}`}
                    />
                    <span className="texto-navbar"> Iniciar Sesión</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-linkFrame2" to={"/Carrito"}>
                    <AiOutlineShoppingCart
                      className={`iconoFrame2 ${icon_nav}`}
                    />
                    <span className="texto-navbar">Carrito</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link nav-linkFrame2 "
                    to={"/Registro"}
                    tabIndex="-1"
                    aria-disabled="true"
                  >
                    <AiOutlineUserAdd className={`iconoFrame2 ${icon_nav}`} />
                    <span className="texto-navbar">Registrarse</span>
                  </Link>
                </li>
              </ul>

              <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control me-2"
                  list="names"
                  placeholder="Buscar"
                  aria-label="Search"
                  value={search}
                  onChange={CambioBusqueda}
                />
                <datalist id="names">
                  {autocompletado_ropa &&
                    autocompletado_ropa
                      .filter((item) =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((item, index) => (
                        <option key={index} value={item.name} />
                      ))}
                </datalist>
                <button
                  type="submit"
                  className={`btn btn-outline-success boton_navbar2 ${botoncolor}`}
                >
                  Buscar
                </button>
              </form>
            </div>
          </div>
        </nav>

        <Nav2
          ColorBack="Nav_Gaming"
          coloriconcategoria="icon_categoria_gaming"
          nav2_display={nav2_gaming}
        />
      </header>
    </>
  );
}
