export default function Opcion({
  clave,
  valor,
  texto,
  onChange,
}: {
  clave: string;
  valor: string;
  texto: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="opcion">
      <input
        type="radio"
        className="opcion__radio-input"
        id={`op${clave}`}
        name="PreguntaSiroko"
        value={valor}
        defaultChecked={parseInt(clave) === 0}
        onChange={onChange}
      />
      <label htmlFor={`op${clave}`} className="opcion__radio-label">
        <span className="opcion__radio-button"></span>
        {texto}
      </label>
    </div>
  );
}
