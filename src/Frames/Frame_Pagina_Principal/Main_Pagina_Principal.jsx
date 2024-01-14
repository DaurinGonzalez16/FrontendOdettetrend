import "/src/css/Formato_Frame_Inicio.css";

export default function Main() {
  return (
    <div>
      <main className="container-fluid mainc">
        <section className="row main1">
          <div className="col-md-auto col_row_1">
            <span className="material-symbols-outlined smart_display">
              smart_display
            </span>
            <p className="conoce">
              Conoce mas sobre
              <a href="" className="a_odette">
                <span className="odette"> “OdetteTrend.com"</span>
              </a>
            </p>
          </div>

          <div className="col-md-auto">
            <p className="explora">
              Explora un Mundo de Ofertas en{" "}
              <span className="odette odette2 ">OdetteTrend.com </span>
              Tu Destino en Línea para una Variedad de Productos y Servicios Sin
              Límites.
            </p>
          </div>
        </section>

        <section className="row section2 d-flex">
          <div className="col-md-auto col_blanco">
            <div className="titulo">
              <span className="material-symbols-outlined span_icon">
                workspace_premium
              </span>
              <span>CALIDAD CONSISTENTE</span>
            </div>
            <p className="main2_p ">
              En OdetteTrend.com, ofrecemos una amplia gama de productos de alta
              calidad, a diferencia de otras paginas, donde la calidad puede
              variar.
            </p>
          </div>

          <div className="col-md-auto col_blanco">
            <div className="titulo">
              <span className="material-symbols-outlined span_icon">
                local_shipping
              </span>

              <span>ENVIO RAPIDO Y CONFIABLE</span>
            </div>
            <p className="main2_p">
              Nuestra tienda garantiza envío rápido y servicios confiables,
              evitando las demoras y los costos de envío elevados de otras
              paginas.
            </p>
          </div>

          <div className="col-md-auto col_blanco">
            <div className="titulo">
              <span className="material-symbols-outlined span_icon">
                diversity_1
              </span>
              <span>ATENCION AL CLIENTE EFICIENTE</span>
            </div>
            <p className="main2_p">
              En OdetteTrend.com, nos enorgullece brindar una atención al
              cliente receptiva y eficiente, superando los tiempos de respuesta
              lentos de otras paginas y mejorando la experiencia del cliente.
            </p>
          </div>
        </section>

        <section className="row section3">
          <p className="section_titulo">
            "Negocia con seguridad, desde la calidad de la producción hasta la
            protección de tu compra."
          </p>
          <div className="texto">
            <div className="col-md-auto section2_col">
              <div className="titulo2">
                <span className="material-symbols-outlined span_icon2">
                  verified_user
                </span>
                <span className="spantitulo">A I C A - AGENCY</span>
              </div>
              <p className="parrafo3">
                "Establece conexiones con una amplia gama de proveedores,
                incluyendo fabricantes de productos personalizados, titulares de
                marcas y proveedores de múltiples especialidades, todos con
                credenciales y capacidades verificadas."
              </p>
            </div>

            <div className="col-md-auto section2_col section2_col2">
              <div className="titulo2">
                <img
                  src="/src/Img/Img_Frame_Principal/Icon_TM.webp"
                  className="img_tm"
                  alt=""
                />
                <span className="spantitulo">TRADEM - AGENCY</span>
              </div>

              <p className="parrafo3">
                En OdetteTrend.com, nos enorgullece brindar una atención al
                cliente receptiva y eficiente, superando los tiempos de
                respuesta lentos de otras paginas y mejorando la experiencia del
                cliente.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
