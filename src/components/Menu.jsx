import { useNavigate } from "react-router-dom";
import "./Menu.css";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <img src="/logo-pct-neg.png" alt="Logo" className="menu-logo" />
      <h1 className="menu-title">Bienvenido al Quiz</h1>
      <button className="menu-button" onClick={() => navigate("./Quiz")}>Jugar</button>
      <button className="menu-button" onClick={() => navigate("")}>Configuración</button>
      <button className="menu-button" onClick={() => navigate("")}>Acerca de</button>
    </div>
  );
}
