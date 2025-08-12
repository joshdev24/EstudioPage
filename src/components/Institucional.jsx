import "../styles/header.css"
import { Scale } from "lucide-react";

export default function Header() {
    return (
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
    )




}














