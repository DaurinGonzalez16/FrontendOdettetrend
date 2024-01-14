import React, { useState } from "react";
import { HeaderGaming } from "../Frame_Zona_Gaming/HeaderGaming";
import { Nav2 } from "../Frame_Pagina_Principal/Header_Pagina_Principal";
import { Footer } from "../Frame_Pagina_Principal/Footer_Pagina_Principal";
import { parseJwt } from "../Frames_Variados/IniciarSesion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Formato_Frame_iniciarSesion.css";

export function Registro() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && parseJwt(token).exp * 1000 > Date.now()) {
      navigate("/Bienvenido");
      alert("ESTAS REGISTRADO");
    } else {
    }
  }, []);

  const mandarformulario = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const Ruta = await axios.post(
        "https://backend-odette-trend.vercel.app/Login/Registro",
        {
          username,
          password,
          email,
          first_name,
          last_name,
          address,
        }
      );

      const Mensaje = Ruta.data.message;
      if (Mensaje === "El nombre de usuario ya existe") {
        alert("Ya existe el Nombre de Usuario");
        return;
      }

      console.log(Ruta);

      if (Ruta.data) {
        navigate("/IniciarSesion");
      }
    } catch (error) {
      console.log(error.message);
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
          <p className="p_iniciarsesion">REGISTRARSE</p>
          <p className="p_mensaje_listo">
            ¿Listo/a para Entrar a Nuestra Familia?
          </p>

          <div>
            <form action="">
              <label>
                <p className="p_label">Nombre de Usuario</p>
                <input
                  type="text"
                  className="text_input"
                  required
                  minLength="8"
                  maxLength="12"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>

              <label>
                <p className="p_label">Contraseña</p>
                <input
                  type="password"
                  className="text_input"
                  required
                  minLength="8"
                  maxLength="10"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <label>
                <p className="p_label">Correo Electronico</p>
                <input
                  type="email"
                  className="text_input"
                  required
                  minLength="15"
                  maxLength="25"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label>
                <p className="p_label">Nombre</p>
                <input
                  type="text"
                  className="text_input"
                  required
                  minLength="8"
                  maxLength="15"
                  onChange={(e) => setFirst_Name(e.target.value)}
                />
              </label>

              <label>
                <p className="p_label">Apellido</p>
                <input
                  type="text"
                  className="text_input"
                  required
                  minLength="8"
                  maxLength="20"
                  onChange={(e) => setLast_Name(e.target.value)}
                />
              </label>

              <label>
                <p className="p_label">Dirección</p>
                <input
                  type="text"
                  className="text_input"
                  required
                  minLength="10"
                  maxLength="50"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>

              <div className="div_boton_continuar">
                <button
                  type="submit"
                  className="botoncontinuar"
                  onClick={mandarformulario}
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
