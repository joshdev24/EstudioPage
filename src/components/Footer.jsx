import "../styles/footer.css";
import { Scale } from "lucide-react";

export default function Footer() {
  return (
     <footer className="footer">
        <div className="footer-content">
          <div className="footer-text">
            <div className="footer-header">
              <div className="footer-icon">
                <Scale size={20} className="text-white" />
              </div>
              <h3 className="footer-title">Estudio Jurídico</h3>
            </div>
            <p className="footer-description">Especialistas en constitución de sociedades</p>
            <div className="footer-contact">
              <span>📧 contacto@estudiojuridico.com</span>
              <span>📞 +54 11 1234-5678</span>
              <span>📍 Buenos Aires, Argentina</span>
            </div>
          </div>
        </div>
      </footer>
    
  );
}