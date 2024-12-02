import { useState } from "react";
import { CuponManager } from "../core/clases/CuponManager";
import Pregunta from "./Pregunta";
import Cupon from "./Cupon";

export default function CuponManagerComp({ cm }: { cm: CuponManager | null }) {
  if (!cm) return <div>No hay cupon</div>;

  const [preguntaActual, setPreguntaActual] = useState(cm.siguientePregunta());

  //Cálculo de preguntas pendientes en base a respuestas
  const respuestasRecibidas = cm
    .getControl()
    .getRespuestas()
    .filter((respuesta) => respuesta.respuesta);
  const indicador = `Paso ${respuestasRecibidas.length + 1} de ${
    cm.getCupon().getPreguntas().length
  }`;

  //Control de preguntas pendientes
  const preguntasPendientes: boolean =
    (preguntaActual.idpregunta || preguntaActual.idpregunta === 0) &&
    preguntaActual.pregunta
      ? true
      : false;

  //Generación de cupón
  let codigoCupon: string | null = null;
  if (!preguntasPendientes) {
    codigoCupon =
      localStorage.getItem("codigoCupon") ??
      cm.getCupon().generarCodigo(cm.getControl().getRespuestas());
  }

  const handlerRespuesta = (pregunta: string, respuesta: string): void => {
    const respuestaEncontrada = cm
      .getControl()
      .getRespuestas()
      .find((respuesta) => respuesta.idpregunta === pregunta);

    if (respuestaEncontrada) {
      respuestaEncontrada.respuesta = respuesta; //Actualizo estado interno
    }

    localStorage.setItem(pregunta, respuesta); //Actualizo local storage
    setPreguntaActual(cm.siguientePregunta());
  };

  return (
    <>
      {preguntasPendientes ? (
        <Pregunta
          idpregunta={preguntaActual.idpregunta!}
          pregunta={preguntaActual.pregunta!}
          indicador={indicador}
          handler={handlerRespuesta}
        />
      ) : (
        <Cupon
          codigoCupon={codigoCupon!}
          minutos={cm.getCupon().getTiempoValidez()}
        />
      )}
    </>
  );
}
