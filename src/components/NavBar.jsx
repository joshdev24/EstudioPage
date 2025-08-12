import "../styles/NavBar.css";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">PASBBA ABOGADOS</div>
      <ul className="navbar-links">
        <li><a href="#estudio">El Estudio</a></li>
        <li><a href="#areas">Áreas</a></li>
        <li><a href="#profesionales">Profesionales</a></li>
        <li><a href="#conocenos">Conocenos</a></li>
        <li><a href="#publicaciones">Publicaciones</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
      <button className="navbar-button">Trabajá Con Nosotros</button>
    </nav>
  );
}
