import React, { ReactNode } from "react";
import Header from "./Header";

type ContenedorProps = {
  children: ReactNode;
};

export default function Contenedor({ children }: ContenedorProps) {
  return (
    <div id="contenedor">
      <Header />
      {children}
    </div>
  );
}
