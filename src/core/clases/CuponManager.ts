import React from "react";
import { ICupon } from "../interfaces/ICupon.js";
import { IPregunta } from "../interfaces/IPregunta.js";
import { IRespuestasManager } from "../interfaces/IRespuestasManager.js";
import { crearElementoHTML } from "../utils/crearElementoHTML.js";
import { iniciarCuentaAtras } from "../utils/cuentaAtras.js";
import { ControlLocalStorage } from "./ControlLocalStorage.js";

export class CuponManager {
  private cupon: ICupon;
  private respuestas: IRespuestasManager;

  constructor(cupon: ICupon, respuestas: IRespuestasManager) {
    this.cupon = cupon;
    this.respuestas = respuestas;
  }

  getCupon(): ICupon {
    return this.cupon;
  }

  getControl(): IRespuestasManager {
    return this.respuestas;
  }

  /* 

  //  Evalúa las respuestas y según corresponda renderiza pregunta o código de cupón
  render(): React.ReactNode {
    console.log("CM renderizando pregunta");
    //1. Si existe pregunta sin respuesta se renderiza
    for (const [idpregunta, pregunta] of this.cupon.getPreguntas().entries()) {
      if (!localStorage.getItem(`SirokoP${idpregunta}`)) {
        return this._renderizarPregunta(idpregunta, pregunta);
      }
    }
    // 2. Si no existe pregunta sin respuesta se genera el código de cupón
    console.log("CM renderizando cupón");
    return this._renderizarCupon(
      this.cupon.generarCodigo(this.respuestas.getRespuestas())
    );
  }

  // Renderiza una pregunta recibida como parámetro

  private _renderizarPregunta(
    idpregunta: number,
    pregunta: IPregunta
  ): React.ReactNode {
    //Cálculo de preguntas pendientes en base a respuestas
    const respuestasRecibidas = this.respuestas
      .getRespuestas()
      .filter((respuesta) => respuesta.respuesta);
    const indicador = `Paso ${respuestasRecibidas.length + 1} de ${
      this.cupon.getPreguntas().length
    }`;

    //Control type descrip de pregunta
    const descripcion: string | undefined = pregunta.getDescrip() ?? "";

    const preguntaHTML: React.ReactNode = crearElementoHTML(
      "div",
      "",
      "",
      "subcontenedor"
    );

    //Cabecera
    const cabecera = crearElementoHTML("section", "encabezado");
    cabecera.innerHTML = `
      <span class="encabezado__indicador">${indicador}</span>
      <h1 class="encabezado__titulo">${pregunta.getTitular()}</h1>
      <p class="encabezado__contenido">${descripcion}</p>
      `;

    //Contenido
    const contenido = crearElementoHTML("section", "contenido");
    contenido.innerHTML = `
      <h2 class="contenido__subtitulo">${pregunta.getTextoPregunta()}</h2>
    `;

    //Botón de envio
    const btnEnviar = crearElementoHTML(
      "a",
      "btn",
      "Siguiente ",
      `btnSend`,
      '<i class="material-icons">arrow_right_alt</i>'
    );

    //Pregunta
    const formulario = pregunta.renderizarInput(idpregunta);
    formulario.append(btnEnviar);

    contenido.append(formulario);
    preguntaHTML.append(cabecera, contenido);

    return preguntaHTML;
  }

  //renderiza el cupón
  private _renderizarCupon(codigo: string): HTMLElement {
    //const cuponHTML = crearElementoHTML("div", "", "", "subcontenedor");
    const cuponHTML = crearElementoHTML("div");

    // Cabecera
    const cabecera = crearElementoHTML("section", "encabezado");
    cabecera.innerHTML = `
      <span class="encabezado__indicador">Tu premio está listo</span>
      <h1 class="encabezado__titulo">¡Enhorabuena!</h1>
    `;

    // Contenido
    const contenido = crearElementoHTML("section", "contenido");
    contenido.innerHTML = `
      <h2 class="contenido__subtitulo">Lo prometido es deuda</h2>
      <div class="cupon">
        <div class="codigo">
          <div class="codigo__texto">${codigo}</div>
          <a href="#" class="codigo__boton">Copiar</a>
        </div>
        <p class="cupon__descrip">
          Introduce este código en tu próxima compra para conseguir tu premio.
          ¡Disponible durante 20 minutos!
        </p>
        <div class="crono">
          <div class="crono__cuentaatras">
            <i class="material-icons">access_alarm</i> <span class="crono__reloj"></span>
          </div>
          <div class="crono__caducado">
            <i class="material-icons">access_alarm</i> Código caducado.
            <a href="#" class="crono__caducado__reiniciar">Reiniciar</a>
          </div>
        </div>
        <a href="https://siroko.com" id="btnSend" class="btn">
          Ir a siroko.com <i class="material-icons">arrow_right_alt</i>
        </a>
      </div>
    `;

    cuponHTML.append(cabecera, contenido);

    this._eventosCupon("00 tras renderizar");

    return cuponHTML;
  }

  lanzarEventos(control: ControlLocalStorage): void {
    //Control cupon creado
    if (!localStorage.getItem("codigoCupon")) {
      this._eventosPreguntas(control);
    } else {
      this._eventosCupon("01 desde lanzarEventos");
    }
  }

  private _eventosPreguntas(control: ControlLocalStorage): void {
    const subcontenedor = document.querySelector("#subcontenedor")!;
    subcontenedor.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).classList.contains("btn")) {
        e.preventDefault();
        //Guardar info
        const seleccion = document.querySelector(
          'input[name="PreguntaSiroko"]:checked'
        )! as HTMLInputElement;
        const idpregunta = seleccion.dataset.pregunta ?? "";
        control.procesarRespuesta(idpregunta, seleccion.value);

        //Renderizar siguiente paso (nueva pregunta o cupón)
        subcontenedor.innerHTML = "";
        subcontenedor.appendChild(this.render());
      }
    });
  }

  private _eventosCupon(tempAlert: string | null = null): void {
    console.log(tempAlert ?? "no controlado");

    // Esperar a que el DOM se haya actualizado para asegurar que el reloj esté en el contenedor
    setTimeout(() => {
      // Inicio cuenta atrás en el reloj
      iniciarCuentaAtras(
        localStorage.getItem("horaCupon")!,
        90,
        "crono__reloj",
        this.anularCupon.bind(this)
      );
    }, 0); // Ejecutar en el siguiente ciclo de eventos

    // // Inicio cuenta atrás en el reloj
    // // Pasamos el contenedor `reloj` donde se actualizará el tiempo
    // iniciarCuentaAtras(
    //   localStorage.getItem("horaCupon")!,
    //   90,
    //   "crono__reloj",
    //   this.anularCupon.bind(this)
    // );
  }

  anularCupon(): boolean {
    console.log("Anulando cupon");

    return true;
  } */
}
