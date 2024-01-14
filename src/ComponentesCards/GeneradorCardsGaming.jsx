import { Link } from "react-router-dom";
import "/src/css/Formato_Frame_Gaming_Principal.css";

export function CardGaming({
  imagenRuta,
  cardtitulo,
  cardprecio,
  enOferta,
  productid,
  clasesinoferta,
}) {
  return (
    <div className="col-md-auto">
      <div
        className={`card ${
          enOferta === "no" ? "" : "tablet1_contenedor"
        } ${clasesinoferta}`}
      >
        <img
          src={imagenRuta}
          className="card-img-top p-2 img-thumbnail carta-img-tamaño"
          alt="Imagen"
        />

        <div className="inf_tablet ">
          <h5 className="card-title titulocard">{cardtitulo}</h5>
          {enOferta === "Si" && <h6 className="oferta">- EN OFERTA -</h6>}
          <h5 className="card-text">
            Precio: <span className="cantidad">${cardprecio} USD</span>
          </h5>
          <Link
            to={`/Selecion/${productid}`}
            className="btn btn-primary botonCard"
          >
            VER DETALLES
          </Link>
        </div>
      </div>
    </div>
  );
}
