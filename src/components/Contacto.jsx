import { useState } from "react";
import axios from "axios";

function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/contacto", form);
      setEnviado(true);
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <textarea name="mensaje" placeholder="Mensaje" onChange={handleChange} />
      <button type="submit">Enviar</button>
      {enviado && <p>¡Gracias por contactarte!</p>}
    </form>
  );
}

export default Contacto;