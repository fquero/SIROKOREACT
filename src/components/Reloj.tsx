import React, { useEffect, useState } from "react";
import { render } from "react-dom";

export default function Reloj({
  minutos,
  onTimeComplete,
}: {
  minutos: number;
  onTimeComplete: () => void;
}) {
  const tiempoGuardado = localStorage.getItem("fechaCupon");

  const renderCaducado = () => {
    return (
      <div className="crono__caducado">
        <i className="material-icons">access_alarm</i> Código caducado.
        <a
          href="#"
          className="crono__caducado__reiniciar"
          onClick={onTimeComplete}
        >
          Reiniciar
        </a>
      </div>
    );
  };

  if (!tiempoGuardado) {
    renderCaducado();
  }

  const inicio: number = parseInt(tiempoGuardado!, 10);
  const horaFinal: number = inicio + minutos * 60 * 1000;

  const [segundosRestantes, setSegundosRestantes] = useState<number>(
    Math.max(0, Math.floor((horaFinal - Date.now()) / 1000))
  );

  useEffect(() => {
    const intervalo = setInterval(() => {
      const tiempoRestante = Math.max(
        0,
        Math.floor((horaFinal - Date.now()) / 1000)
      );
      setSegundosRestantes(tiempoRestante);

      if (tiempoRestante <= 0) {
        clearInterval(intervalo);
        renderCaducado();
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, [horaFinal, renderCaducado]);

  // Formato mm:ss
  const minutosRestantes = Math.floor(segundosRestantes / 60);
  const segundosFormato = segundosRestantes % 60;
  const tiempoFormateado = `${String(minutosRestantes).padStart(
    2,
    "0"
  )}:${String(segundosFormato).padStart(2, "0")}`;

  return (
    <>
      {segundosRestantes > 0 ? (
        <div className="crono__cuentaatras">
          <i className="material-icons">access_alarm</i>{" "}
          <span className="crono__reloj">{tiempoFormateado}</span>
        </div>
      ) : (
        renderCaducado()
      )}
    </>
  );
}
