import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App.jsx";
import { MainZonaGaming } from "./Frames/Frame_Zona_Gaming/MainGaming.jsx";
import { Carrito_Compra } from "./Frames/Frames_Variados/Carrito_Compras.jsx";
import { IniciarSesion } from "./Frames/Frames_Variados/IniciarSesion.jsx";
import { MainZonaRopa } from "./Frames/Frame_Zona_Ropa/MainZonaRopa.jsx";
import { MainGamingProducto } from "./Frames/Frame_Zona_Gaming/Frame_Gaming_Seleccion.jsx";
import { Frame2Busquedad } from "./Frames/Frame_Zona_Gaming/Frame_Gaming_Busqueda.jsx";
import { Registro } from "./Frames/Frames_Variados/Registro.jsx";
import { BienvenidosFrame } from "./Frames/Frames_Variados/Bienvenido.jsx";
import { FrameSeleccion_Ropa } from "./Frames/Frame_Zona_Ropa/Frame_Seleccion_Ropa.jsx";
import { Frame_Busquedad_Ropa } from "./Frames/Frame_Zona_Ropa/Frame_Busqueda_Ropa.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Gaming" element={<MainZonaGaming />} />
        <Route path="/Moda" element={<MainZonaRopa />} />
        <Route path="/IniciarSesion" element={<IniciarSesion />} />
        <Route path="/Carrito" element={<Carrito_Compra />} />
        <Route path="/Selecion/:id" element={<MainGamingProducto />} />
        <Route path="/Busqueda" element={<Frame2Busquedad />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Bienvenido" element={<BienvenidosFrame />} />
        <Route path="/Seleccion/Moda/:id" element={<FrameSeleccion_Ropa />} />
        <Route path="/Busqueda/Moda" element={<Frame_Busquedad_Ropa />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
