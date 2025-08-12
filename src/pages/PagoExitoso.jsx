import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function PagoResultado() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [estado, setEstado] = useState("cargando");

  useEffect(() => {
    const confirmarPago = async () => {
      try {
        await axios.post("http://localhost:3001/api/pago/confirmar-pago", { id });
        setEstado("exito");
      } catch (error) {
        console.error("Error al confirmar el pago:", error);
        setEstado("fallido");
      }
    };

    if (id) {
      confirmarPago();
    } else {
      setEstado("fallido");
    }
  }, [id]);

  if (estado === "cargando") {
    return <p>Cargando...</p>;
  }

  if (estado === "exito") {
    return (
      <div>
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu pago fue exitoso. Te contactaremos pronto.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Pago fallido</h1>
      <p>No pudimos confirmar tu pago. Podés intentar nuevamente.</p>
    </div>
  );
}

export default PagoResultado;
