import { SiPcgamingwiki } from "react-icons/si";
import { MdPhoneIphone } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import { FaUserSecret } from "react-icons/fa";
import "../../css/Formato_Frame_Inicio.css";

function Header() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark text-black">
          <div className="container-fluid nav-container">
            <Link className="navbar-brand odette_nav" to={"/"}>
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to={"/Registro"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-person-fill-add svg_nav"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                    </svg>
                    Regístrate
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to={"/IniciarSesion"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-person-fill svg_nav"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                    Iniciar Sesión
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Nav2 />
      </header>
    </div>
  );
}

function Sectionnav2({}) {
  return (
    <section className="section_nav3">
      <div className="div_descargar_aplicacion">
        <MdPhoneIphone />
        <a href="">Descargar Aplicación</a>
      </div>

      <div className="div_idioma_header">
        <a
          href="https://wa.link/0bzcko"
          type="button"
          className="d-flex"
          target="_blank"
        >
          Contactar Creador <FaUserSecret />
        </a>
      </div>
    </section>
  );
}

function Nav2({ ColorBack, coloriconcategoria, nav2_display }) {
  return (
    <div className={`contenedornav2   ${nav2_display}`}>
      <div className={`dropdown nav2 section_nav2 ${ColorBack}`}>
        <div className="div_categoria_svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-list svgCateroria"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>

          <button
            className=" dropdown-toggle categoriaboton"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categorías
          </button>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link className="dropdown-item" to={"/"}>
                <span className={`icon_categoria ${coloriconcategoria}`}>
                  <FaHome className="icon_nav2_frame2" />
                </span>
                Página Principal
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={"/Gaming"}>
                <span className={`icon_categoria ${coloriconcategoria}`}>
                  <SiPcgamingwiki />
                </span>
                Gaming
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={"/Moda"}>
                <span className={`icon_categoria ${coloriconcategoria}`}>
                  <GiClothes />
                </span>
                Moda
              </Link>
            </li>
          </ul>
        </div>

        <Sectionnav2 />
      </div>
    </div>
  );
}

export { Header, Nav2 };
