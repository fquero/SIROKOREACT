import { create } from "zustand";
import { CuponManager } from "../core/clases/CuponManager";
import { CuponRadio } from "../core/clases/CuponRadio";
import { Opcion } from "../core/types/CuponRadioTypes";
import { ControlLocalStorage } from "../core/clases/ControlLocalStorage";

// Tipo del estado
interface SirokoState {
  cm: CuponManager | null; // Manager inicializado o null
  initialize: (
    minutos: number,
    preguntas: Array<{
      titular: string;
      descripcion: string | null;
      textoPregunta: string;
      opciones: Array<Opcion>;
    }>
  ) => void; // Método para inicializar el CuponManager
}

// Store con Zustand
export const useSirokoStore = create<SirokoState>((set) => ({
  cm: null,
  initialize: (
    minutos: number,
    preguntas: Array<{
      titular: string;
      descripcion: string | null;
      textoPregunta: string;
      opciones: Array<Opcion>;
    }>
  ) => {
    const cupon = new CuponRadio(minutos, preguntas);
    const control = new ControlLocalStorage(preguntas.length);
    const cm = new CuponManager(cupon, control);
    set({ cm }); // Establecer la instancia de CuponManager
  },
}));
