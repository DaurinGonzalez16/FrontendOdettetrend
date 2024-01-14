import { Link } from "react-router-dom";
export function GeneradorCardsRopa({
  name,
  img,
  precio,
  nameclass,
  precioclass,
  id,
}) {
  return (
    <>
      <Link to={`/Seleccion/Moda/${id}`} className="Link_Direccionar_ROPA">
        <img className="img-fluid img_main1" src={img} alt="" />
        <div>
          <h2 className={nameclass}></h2>
        </div>
        <p className={precioclass}>${precio} USD</p>
      </Link>
    </>
  );
}

export function GeneradorSection3({ type, img }) {
  return (
    <article className="col-md-auto article_generadorSection3">
      <div className="div_contenedor_img_GeneradorSection3">
        <img className="img-fluid img_GeneradorSection3" src={img} alt="" />
      </div>
      <Link to={`/Busqueda/Moda/?query=${type}`} className="Link_to_h3_Moda">
        <h3 className="h3_section3_tipo">{type}</h3>
      </Link>
    </article>
  );
}

export function GeneradorSection4({ id, Name, Img, Precio }) {
  return (
    <article className="col-md-auto article_generadorSection4">
      <div className="div_contenedor_img_GeneradorSection4">
        <img className="img-fluid img_GeneradorSection4" src={Img} alt="" />
      </div>
      <h3 className="h3_section4_tipo">
        {" "}
        {Name.length > 10 ? `${Name.substring(0, 25)}...` : Name}
      </h3>
      <p className="totalmente_section4_Moda">TOTALMENTE NUEVOS</p>
      <Link
        to={`/Seleccion/Moda/${id}`}
        type="button"
        className="button_Generador_Section4"
      >
        COMPRAR AHORA
      </Link>
    </article>
  );
}

// export function GeneradorSection5({ Titulo, img }) {
//   return (
//     <div className="col-md-auto colum_section5">
//       <img className="img-fluid img_section5Ropa" src={img} alt="" />
//       <div className="text_card_section5">
//         <p className="Titulo">{Titulo}</p>
//         <p className="Titulo2">Totalmente Nuevos</p>
//         <a href="" className="Enlace_comprar_ahora">
//           Comprar Ahora
//         </a>
//       </div>
//     </div>
//   );
// }
