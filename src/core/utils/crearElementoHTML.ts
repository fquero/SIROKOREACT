// Crea elementos React recibiendo etiqueta, clase, contenido e id (opcional)
import React from "react";

export function crearElementoHTML(
  etiqueta: keyof JSX.IntrinsicElements, // Cambiado para ser compatible con JSX
  clase: string = "",
  contenido: string = "",
  id: string = "",
  innerHTML: string = ""
): React.ReactNode {
  return React.createElement(
    etiqueta,
    {
      className: clase || undefined,
      id: id || undefined,
      dangerouslySetInnerHTML: innerHTML
        ? { __html: contenido + innerHTML }
        : undefined,
    }
    // !innerHTML ? contenido : null // Si no hay `innerHTML`, se usa `contenido` como hijo.
  );
}
