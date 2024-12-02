import { useEffect, useState } from "react";
import { PreguntaRadio } from "../core/clases/PreguntaRadio.js";
import { Opcion as OpcionType } from "../core/types/CuponRadioTypes.js";
import Boton from "./Boton.js";
import Opcion from "./Opcion.js";

export default function Pregunta({
  idpregunta,
  pregunta,
  indicador,
  handler,
}: {
  idpregunta: number;
  pregunta: PreguntaRadio;
  indicador: string;
  handler: (pregunta: string, respuesta: string) => void;
}) {
  //Control de la respuesta
  const [seleccion, setSeleccion] = useState<string>(
    pregunta.getOpciones()[0].valor //Por defecto, la primera opción seleccionada
  );

  useEffect(() => {
    // Actualiza el estado seleccionado cuando cambia la prop pregunta
    setSeleccion(pregunta.getOpciones()[0].valor);
  }, [pregunta]);

  //Cambio de valor seleccionadp
  const handleCambioOpcion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeleccion(event.target.value);
  };

  //PRocesado de respuesta devuelto a componente padre
  const procesarRespuesta = () => {
    handler(`SirokoP${idpregunta}`, seleccion);
  };

  return (
    <>
      <section className="encabezado">
        <span className="encabezado__indicador">{indicador}</span>
        <h1 className="encabezado__titulo">{pregunta.getTitular()}</h1>
        <p className="encabezado__contenido">{pregunta.getDescrip()}</p>
      </section>

      <section className="contenido">
        <h2 className="contenido__subtitulo">{pregunta.getTextoPregunta()}</h2>
        <form className="formulario">
          {pregunta.getOpciones().map((opcion: OpcionType, index: number) => (
            <Opcion
              key={index}
              clave={index.toString()}
              valor={opcion.valor}
              texto={opcion.texto}
              onChange={handleCambioOpcion}
            />
          ))}
          <Boton
            texto="Enviar"
            icono="arrow_right_alt"
            onClick={procesarRespuesta}
          />
        </form>
      </section>
    </>
  );
}
