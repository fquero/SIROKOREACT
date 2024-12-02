import { ICupon } from "../interfaces/ICupon.js";
import { PreguntaRadio } from "./PreguntaRadio.js";
import { Opcion } from "../types/CuponRadioTypes.js";
import { Respuesta } from "../types/RespuestaType.js";

export class CuponRadio implements ICupon {
  private minutos: number;
  private preguntas: Array<PreguntaRadio>;

  constructor(
    minutos: number,
    preguntas: Array<{
      titular: string;
      descripcion: string | null;
      textoPregunta: string;
      opciones: Array<Opcion>;
    }>
  ) {
    this.minutos = minutos;
    this.preguntas = preguntas.map((pregunta) => {
      return new PreguntaRadio(
        pregunta.titular,
        pregunta.descripcion,
        pregunta.textoPregunta,
        pregunta.opciones
      );
    });
  }

  getPreguntas(): Array<PreguntaRadio> {
    return this.preguntas;
  }

  getTiempoValidez(): number {
    return this.minutos;
  }

  /*
    Esta clase de CuponRadio genera el código siguiendo estos pasos:
    
    - Primero: La suma de los últimos dos números del año elegido en el paso 1. (Ejemplo: 1 + 7 = 8)
    - A continuación: se agregan, en mayúsculas, los últimos 4 caracteres del texto de la opción seleccionada en el paso 2. 
    
    Se aceptan únicamente caracteres de los rangos b-z / B-Z / 0-9, incluyendo tildes, diéresis y otros caracteres especiales, si los hubiera.
    Se deben excluir espacios y los caracteres “a” y “A”. (Ejemplo: cachopo → HOPO)
  */
  generarCodigo(respuestas: Array<Respuesta>): string {
    //Primera parte del código
    const respuesta1 =
      respuestas.find((respuesta) => respuesta.idpregunta === "SirokoP0")
        ?.respuesta ?? "";
    const [digito1, digito2] = respuesta1
      .slice(-2)
      .split("")
      .map((d) => parseInt(d));
    const codigo1 = (digito1 + digito2).toString();

    //Segunda parte del código
    const respuesta2 =
      respuestas.find((respuesta) => respuesta.idpregunta === "SirokoP1")
        ?.respuesta ?? "";

    const filtrada = respuesta2
      .split("")
      .filter(
        (c) => /[b-zB-Z0-9áéíóúüñÁÉÍÓÚÜÑ]/.test(c) && c.toLowerCase() !== "a"
      ) // Filtrado de caracteres. Espacio no incluido en patrón
      .join("");

    // Últimos 4 caracteres y los convertimos a mayúsculas
    const codigo2 = filtrada.slice(-4).toUpperCase();
    const codigoGenerado = [codigo1, codigo2].join("");

    this.persistirCodigo(codigoGenerado, new Date());

    return codigoGenerado;
  }

  /**
   Este tipo de cupón persiste el código en el local storage
  */
  persistirCodigo(codigo: string, fecha: Date): boolean {
    //Sólo se persiste si no existe el código
    if (localStorage.getItem("codigoCupon")) {
      return true;
    }

    //Codigo
    localStorage.setItem("codigoCupon", codigo);

    //Fecha
    localStorage.setItem("fechaCupon", Date.now().toString());

    return true;
  }
}
