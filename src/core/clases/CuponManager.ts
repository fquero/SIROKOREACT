import React from "react";
import { ICupon } from "../interfaces/ICupon.js";
import { IPregunta } from "../interfaces/IPregunta.js";
import { IRespuestasManager } from "../interfaces/IRespuestasManager.js";

import { ControlLocalStorage } from "./ControlLocalStorage.js";
import { PreguntaRadio } from "./PreguntaRadio.js";

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

  siguientePregunta(): {
    idpregunta: number | null;
    pregunta: PreguntaRadio | null;
  } {
    for (const [idpregunta, pregunta] of this.cupon.getPreguntas().entries()) {
      if (!localStorage.getItem(`SirokoP${idpregunta}`)) {
        return { idpregunta: idpregunta, pregunta: pregunta };
      }
    }
    return { idpregunta: null, pregunta: null };
  }
}
