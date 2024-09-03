import Pages from "./pages/Pages"; // Importa el componente Pages
import Category from "./components/Category"; // Importa el componente Category
import Search from "./components/Search"; // Importa el componente Search
import styled from "styled-components"; // Importa styled-components para estilos
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter para habilitar el enrutamiento
import { Link } from "react-router-dom"; // Importa Link para navegación
import { GiKnifeFork } from "react-icons/gi"; // Importa un ícono de cuchillo y tenedor
import { useState } from "react";

function App() {

  const [sesionUsuario, setSesionUsuario] = useState(null);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioIniciado');
    setSesionUsuario(null);
  }

  return (
    <div className="App">

      {/* Envuelve la aplicación y habilita el enrutamiento */}
      <BrowserRouter>

        <Nav>
          <div>
            <GiKnifeFork /> {/* Ícono de cuchillo y tenedor */}
            <Logo to={"/"}>Delicious</Logo> {/* Enlace al inicio con el logo */}
          </div>

          <div className="category">
            <Category /> {/* Componente de categorías */}
          </div>

          {
            sesionUsuario ?
            <>
              <h1
                onClick={() => cerrarSesion()}
              >Cerrar sesión</h1> 

            </>
            :
            <div>
              <Login to={"/login"}>Iniciar sesión</Login> {/* Enlace a la página de inicio de sesión */}
              <Register to={"/registro"}>Registrarse</Register>
            </div>
          }



        </Nav>

        <Search /> {/* Componente de búsqueda */}
        <Pages sesionUsiario={sesionUsuario} setSesionUsuario={setSesionUsuario} /> {/* Componente de páginas */}
      </BrowserRouter>
    </div>
  );
}

// Estilos para el logo
const Logo = styled(Link)`
  text-decoration: none; // Sin subrayado
  font-size: 1.5rem; // Tamaño de fuente de 1.5rem
  font-weight: 400; // Peso de fuente de 400
  font-family: 'Lobster Two', cursive; // Fuente Lobster Two
`;

// Estilos para el enlace de inicio de sesión
const Login = styled(Link)`
  text-decoration: none; // Sin subrayado
  font-size: 1.5rem; // Tamaño de fuente de 1.5rem
  font-weight: 400; // Peso de fuente de 400
  padding-right: 20px; // Tamaño del margen derecho.
  font-family: 'Lobster Two', cursive; // Fuente Lobster Two
`;

// Estilos para el enlace de inicio de registro
const Register = styled(Link)`
  text-decoration: none; // Sin subrayado
  font-size: 1.5rem; // Tamaño de fuente de 1.5rem
  font-weight: 400; // Peso de fuente de 400
  font-family: 'Lobster Two', cursive; // Fuente Lobster Two
`;

// Estilos para la barra de navegación
const Nav = styled.div`
  padding: 4rem 0rem; // Relleno de 4rem arriba y abajo
  display: flex; // Flexbox para el contenedor
  justify-content: space-between; // Espacio entre los elementos
  align-items: center; // Alineación centrada de los elementos
  svg {
    font-size: 2rem; // Tamaño de fuente de 2rem para el ícono
  }
`;

export default App;
