import React, { useEffect, useState } from "react";
import { HeaderGaming } from "../Frame_Zona_Gaming/HeaderGaming";
import { Nav2 } from "../Frame_Pagina_Principal/Header_Pagina_Principal";
import { Footer } from "../Frame_Pagina_Principal/Footer_Pagina_Principal";
import { TiShoppingBag } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { IoChatboxEllipsesOutline, IoWalletOutline } from "react-icons/io5";
import { TbPigMoney } from "react-icons/tb";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../../css/Formato_Frame_Bienvenida.css";

export function BienvenidosFrame() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [id, setIdToken] = useState("");
  const [nombrenuevo, setNuevoNombre] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodificar = jwtDecode(token);
      const nombretoken = decodificar.nombre;
      const tokenid = decodificar.id;
      setNombre(nombretoken);
      setIdToken(tokenid);
    }
  }, []);

  const Desconectar = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const CambiarNombre = async () => {
    try {
      await axios.put(
        `https://backend-odette-trend.vercel.app/Login/ActualizarNombre/${id}/${nombrenuevo}`
      );
      alert("NOMBRE CAMBIADO CORRECTAMENTE, POR FAVOR VUELVA A INICIAR SESION");
      localStorage.removeItem("token");
      navigate("/IniciarSesion");
    } catch (error) {
      console.log("A OCURRIDO UN ERROR ACTUALIZANDO EL USUARIO", error);
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
        buscador_header="BuscadorHeader_Bienvenido"
        Navbar_Variados="Bienvenidos_Navbar"
      />
      <Nav2 />
      <main className="container">
        <h1 className="h1_bienvenido">
          SALUDOS, <span className="nombre_usuario">{nombre}</span>
        </h1>
        <section className="row col-padre-bienvenidos">
          <article className="col-12 ">
            <p className="p_perfil">PERFIL</p>
            <div className="div_nombre_bienvenido">
              <label className="div_bienvenido_1">
                <p className="span_nombre">Nombre</p>
                <input
                  type="text"
                  className="input_nombre"
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  placeholder={nombre}
                />
                <button
                  type="button"
                  className="boton_cambiar_nombre"
                  onClick={CambiarNombre}
                >
                  Cambiar
                </button>
              </label>
            </div>
          </article>

          <article className="col-12">
            <p className="p_mis_pedidos">MIS PEDIDOS</p>
          </article>
          <BienvenidosFrameCelulares />
        </section>
        <div className="div_boton_desconectarse">
          <button
            type="button"
            className="boton_desconectarse"
            onClick={Desconectar}
          >
            Desconectarse
          </button>
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

function BienvenidosFrameCelulares() {
  const alertPedido = () => {
    alert(
      "ESTA FUNCION POR EL MOMENTO ESTA FUERA DE SERVICIO, GRACIAS POR SU CURIOSIDAD JAJAJA"
    );
  };

  return (
    <div>
      <section className="row">
        <div className="col col-pedidos-abajo">
          <div>
            <button className="botonesMisPedidos" onClick={alertPedido}>
              <IoWalletOutline className="icon_mis_pedidos" />
            </button>
            <p>No Pagados</p>
          </div>

          <div>
            <button className="botonesMisPedidos" onClick={alertPedido}>
              <TiShoppingBag className="icon_mis_pedidos" />
            </button>
            <p>Procesados</p>
          </div>

          <div>
            <button className="botonesMisPedidos" onClick={alertPedido}>
              <BsCartCheck className="icon_mis_pedidos" />
            </button>
            <p>Enviados</p>
          </div>

          <div>
            <button className="botonesMisPedidos" onClick={alertPedido}>
              <IoChatboxEllipsesOutline className="icon_mis_pedidos" />
            </button>
            <p>Comentarios</p>
          </div>

          <div>
            <button className="botonesMisPedidos" onClick={alertPedido}>
              <TbPigMoney className="icon_mis_pedidos" />
            </button>
            <p>Devoluciones</p>
          </div>
        </div>
      </section>
    </div>
  );
}
