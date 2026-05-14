import logo from './assets/logo.png';
import './App.css';
import Personas from "./pages/personas/Personas.jsx";

function App() {
    return(
        <>
            <Header />
            <Main />
            <Footer />
        </>
  );
}

function Header() {
  return (
      <header className="header">
        <img src={logo} className="logo" alt="logo"/>
        <p>Sistema de Personas</p>
      </header>
  );
}

function Main() {
  return (
      <div className={"main"}>
        <Personas/>
      </div>
  );
}

function Footer() {
    return (
        <footer className="footer">
            <div>
                <strong>Sist. Personas</strong><br/>
                <small>Total Soft Inc.</small>
            </div>
            <div>
                <small> Contacto: info@sistpersonas.local</small><br/>
                <small> Créditos: Equipo de desarrollo</small>
            </div>
        </footer>
    );
}
export default App;
