import { useSirokoStore } from "../store/SirokoStore";
import Reloj from "./Reloj";
import { useState } from "react";

export default function Cupon({
  codigoCupon,
  minutos,
}: {
  codigoCupon: string;
  minutos: number;
}) {
  const { cm } = useSirokoStore();
  const [copiado, setCopiado] = useState(false);

  const reiniciarCupon = () => {
    localStorage.removeItem("codigoCupon");
    localStorage.removeItem("fechaCupon");
    cm?.getControl().limpiar();
    window.location.reload();
  };

  const copiarAlPortapapeles = async () => {
    try {
      await navigator.clipboard.writeText(codigoCupon);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
    }
  };

  return (
    <>
      <section className="encabezado">
        <span className="encabezado__indicador">Tu premio está listo</span>
        <h1 className="encabezado__titulo">¡Enhorabuena!</h1>
      </section>

      <section className="contenido">
        <h2 className="contenido__subtitulo">Lo prometido es deuda</h2>
        <div className="cupon">
          <div className="codigo" onClick={copiarAlPortapapeles}>
            <div className="codigo__texto">{codigoCupon}</div>
            {copiado && <span className="copiado">¡Copiado!</span>}
            <a href="#" className="codigo__boton">
              Copiar
            </a>
          </div>
          <p className="cupon__descrip">
            Introduce este código en tu próxima compra para conseguir tu premio.
            ¡Disponible durante 20 minutos!
          </p>
          <div className="crono">
            <Reloj minutos={minutos} onTimeComplete={reiniciarCupon} />
          </div>
          <a
            href="https://siroko.com"
            id="btnSend"
            className="btn"
            target="_blank"
          >
            Ir a siroko.com <i className="material-icons">arrow_right_alt</i>
          </a>
        </div>
      </section>
    </>
  );
}
