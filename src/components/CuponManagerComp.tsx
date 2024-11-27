import { CuponManager } from "../core/clases/CuponManager";

export default function CuponManagerComp({ cm }: { cm: CuponManager | null }) {
  if (!cm) return <div>No hay cupon</div>;

  return (
    <>
      <div className="cuponManager">Soy el cupon manager, ou yeah</div>
      <div>
        Tengo en mi haber {cm.getCupon().getPreguntas().length} preguntas
      </div>
    </>
  );
}
