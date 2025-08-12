import React from "react";
import "../styles/Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Estudios Jurídico</h1>
        <p>Asociate a nosotros y disfruta de nuestros servicios</p>
        <a href="#formulario" className="btn-contratar">Contratar ahora</a>
      </div>
    </section>
  );
}