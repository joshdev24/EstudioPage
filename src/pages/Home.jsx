import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import correcto
import { ChevronRight, Scale } from 'lucide-react';
import Footer from '../components/Footer';
import '../styles/Home.css';

export default function HomePage() {
  const [selectedSociety, setSelectedSociety] = useState('');
  const navigate = useNavigate(); // ✅ Inicializar

  const societyTypes = [
    { id: 'SA', name: 'SA', fullName: 'Sociedad Anónima', capital: 'Capital Mínimo $30.000.000', description: '' },
    { id: 'SAU', name: 'SAU', fullName: 'Sociedad Anónima Unipersonal', capital: 'Capital Mínimo $30.000.000', description: '' },
    { id: 'SRL', name: 'SRL', fullName: 'Sociedad de Responsabilidad Limitada', capital: 'Capital Sugerido $100.000', description: '' }
  ];

  const handleNext = () => {
    if (selectedSociety) {
      localStorage.setItem('tipoSociedadSeleccionada', selectedSociety); // ✅ Guardar
      navigate('/formulario'); // ✅ Cambiar por la ruta real del formulario
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-flex">
            <div className="logo-container">
              <Scale size={24} className="logo-icon" />
            </div>
            <div>
              <h1 className="logo-title">Estudio Jurídico</h1>
              <p className="logo-subtitle">Constitución de sociedades</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">Armá tu propia empresa</h1>
          <p className="hero-subtitle">Constitución de sociedades online en CABA</p>
          <div className="hero-divider"></div>
        </div>

        {/* Form Section */}
        <div className="form-container">
          <h2 className="form-title">¿Qué tipo de sociedad te gustaría crear?</h2>

          {/* Society Options */}
          <div className="society-grid">
            {societyTypes.map((society) => (
              <div
                key={society.id}
                onClick={() => setSelectedSociety(society.id)}
                className={`society-option ${selectedSociety === society.id ? 'selected' : ''}`}
              >
                <div className={`selection-indicator ${selectedSociety === society.id ? 'selected' : ''}`}>
                  {selectedSociety === society.id && <div className="selection-dot"></div>}
                </div>

                <div className="society-content">
                  <div className="society-header">
                    <h3 className="society-name">{society.name}</h3>
                    <span className="society-full-name">({society.fullName})</span>
                  </div>
                  <p className="society-capital">{society.capital}</p>
                  <p className="society-description">{society.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <div className="button-container">
            <button
              onClick={handleNext}
              disabled={!selectedSociety}
              className={`next-button ${selectedSociety ? 'enabled' : 'disabled'}`}
            >
              Siguiente
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
