import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderGaming } from "../Frame_Zona_Gaming/HeaderGaming";
import { Nav2 } from "../Frame_Pagina_Principal/Header_Pagina_Principal";
import { Footer } from "../Frame_Pagina_Principal/Footer_Pagina_Principal";
import axios from "axios";
import "../../css/Formato_Frame_iniciarSesion.css";

export function IniciarSesion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && parseJwt(token).exp * 1000 > Date.now()) {
      navigate("/Bienvenido");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://backend-odette-trend.vercel.app/Login/Usuario/IniciarSesion",
        { email, password }
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Inicio de sesión exitoso");
        navigate("/Bienvenido");
      } else {
        alert("Usuario no encontrado o contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error.message);
      alert("Se produjo un error durante el inicio de sesión");
    } finally {
      setLoading(false);
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
      />
      <Nav2 />

      <main>
        <section className="row">
          <p className="p_iniciarsesion">INICIAR SESIÓN</p>

          <div>
            <form onSubmit={handleSubmit}>
              {/* Entrada de correo electrónico */}
              <label>
                <p className="p_label">Correo electrónico</p>
                <input
                  type="text"
                  className="text_input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              {/* Entrada de contraseña */}
              <label>
                <p className="p_label">Contraseña</p>
                <input
                  type="password"
                  className="text_input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              {/* Botón de envío */}
              <div>
                <button
                  type="submit"
                  className="botoncontinuar"
                  disabled={loading}
                >
                  {loading ? "Cargando..." : "Continuar"}
                </button>
              </div>
            </form>
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

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
