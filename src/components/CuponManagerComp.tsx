import { useState } from "react";
import { CuponManager } from "../core/clases/CuponManager";
import Pregunta from "./Pregunta";

export default function CuponManagerComp({ cm }: { cm: CuponManager | null }) {
  if (!cm) return <div>No hay cupon</div>;

  const [preguntaActual, setPreguntaActual] = useState(cm.siguientePregunta());
  console.log("PREGUNTA ACTUAL", preguntaActual);

  //Cálculo de preguntas pendientes en base a respuestas
  const respuestasRecibidas = cm
    .getControl()
    .getRespuestas()
    .filter((respuesta) => respuesta.respuesta);
  const indicador = `Paso ${respuestasRecibidas.length + 1} de ${
    cm.getCupon().getPreguntas().length
  }`;

  const handlerRespuesta = (pregunta: string, respuesta: string): void => {
    const respuestaEncontrada = cm
      .getControl()
      .getRespuestas()
      .find((respuesta) => respuesta.idpregunta === pregunta);

    if (respuestaEncontrada) {
      localStorage.setItem(pregunta, respuesta);
      console.log(`SIGUIENTE PREGUNTA ES.... ${cm.siguientePregunta()}`);
      setPreguntaActual(cm.siguientePregunta());
    }
  };

  return (
    <>
      {(preguntaActual.idpregunta || preguntaActual.idpregunta === 0) &&
      preguntaActual.pregunta ? (
        <Pregunta
          idpregunta={preguntaActual.idpregunta}
          pregunta={preguntaActual.pregunta}
          indicador={indicador}
          handler={handlerRespuesta}
        />
      ) : (
        "Renderizo cupón final"
      )}
    </>
  );
}
