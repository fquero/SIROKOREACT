export default function Boton({
  texto,
  icono,
  onClick,
}: {
  texto: string;
  icono: string;
  onClick: () => void;
}) {
  return (
    <a className="btn" onClick={onClick}>
      {texto} <i className="material-icons">{icono}</i>
    </a>
  );
}
