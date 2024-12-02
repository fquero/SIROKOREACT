import { useEffect } from "react";
import { cuponData } from "./core/data/cupon";
import { useSirokoStore } from "./store/SirokoStore";
import Contenedor from "./components/Contenedor";
import CuponManagerComp from "./components/CuponManagerComp";

import "./styles/main.scss";
import Footer from "./components/Footer";

function App() {
  const { cm, initialize } = useSirokoStore();

  useEffect(() => {
    initialize(cuponData.minutos, cuponData.preguntas);
  }, [initialize]);

  return (
    <>
      <Contenedor>
        <CuponManagerComp cm={cm} />
      </Contenedor>
      <Footer />
    </>
  );
}
export default App;
