import { Header as Navbar } from "./Frames/Frame_Pagina_Principal/Header_Pagina_Principal";
import Main from "./Frames/Frame_Pagina_Principal/Main_Pagina_Principal";
import { Footer } from "./Frames/Frame_Pagina_Principal/Footer_Pagina_Principal";

export function App() {
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}
