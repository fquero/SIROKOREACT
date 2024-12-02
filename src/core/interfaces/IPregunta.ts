import { ReactNode } from "react";

export interface IPregunta {
  //Devuelve titular
  getTitular(): string;

  //Devuelve descripción de pregunta, que puede ser nula
  getDescrip(): string | null;

  //Devuelve el texto de la pregunta
  getTextoPregunta(): string;

  //renderiza el input de la pregunta
  renderizarInput(idpregunta: number): ReactNode;
}
