import { ReactNode } from "react";
import { IPregunta } from "../interfaces/IPregunta.js";
import { Opcion } from "../types/CuponRadioTypes.js";
import { crearElementoHTML } from "../utils/crearElementoHTML.js";

export class PreguntaRadio implements IPregunta {
  private titular: string;
  private descripcion: string | null;
  private textoPregunta: string;
  private opciones: Array<Opcion>;

  constructor(
    titular: string,
    descripcion: string | null,
    textoPregunta: string,
    opciones: Array<Opcion>
  ) {
    this.titular = titular;
    this.descripcion = descripcion;
    this.textoPregunta = textoPregunta;
    this.opciones = opciones;
  }

  getTitular(): string {
    return this.titular;
  }

  getDescrip(): string | null {
    return this.descripcion;
  }

  getTextoPregunta(): string {
    return this.textoPregunta;
  }

  getOpciones(): Array<Opcion> {
    return this.opciones;
  }

  renderizarInput(idpregunta: number): ReactNode {
    const form = crearElementoHTML("form", "formulario");

    for (const [key, opcion] of Object.entries(this.opciones)) {
      const op = crearElementoHTML("div", "opcion");
      const checked = key == "0" ? "checked" : ""; //Requisito: el primer valor es el que se selecciona por defecto
      /* op.innerHTML = `
        <input type="radio" class="opcion__radio-input" id="op${key}" data-pregunta="SirokoP${idpregunta}" name="PreguntaSiroko" value="${opcion.valor}" ${checked} />
        <label for="op${key}" class="opcion__radio-label">
          <span class="opcion__radio-button"></span>
          ${opcion.texto}
        </label>`;
      form.append(op); */
    }

    return form;
  }
}
