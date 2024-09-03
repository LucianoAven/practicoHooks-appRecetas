// Importamos los iconos que vamos a usar desde react-icons
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
// Importamos styled-components para crear componentes con estilos
import styled from "styled-components";
// Importamos NavLink de react-router-dom para la navegación
import { NavLink } from "react-router-dom";

// Definimos el componente Category
function Category() {
  return (
    // Usamos el componente List para contener los enlaces
    <List>
        {/* Enlace a la categoría Italiana */}
        <SLink to={'/cuisine/Italian'}>
            <FaPizzaSlice /> {/* Icono de pizza */}
            <h4>Italian</h4> {/* Texto de la categoría */}
        </SLink>
        {/* Enlace a la categoría Americana */}
        <SLink to={'/cuisine/American'}>
            <FaHamburger /> {/* Icono de hamburguesa */}
            <h4>American</h4> {/* Texto de la categoría */}
        </SLink>
        {/* Enlace a la categoría Tailandesa */}
        <SLink to={'/cuisine/Thai'}>
            <GiNoodles /> {/* Icono de fideos */}
            <h4>Thai</h4> {/* Texto de la categoría */}
        </SLink>
        {/* Enlace a la categoría Japonesa */}
        <SLink to={'/cuisine/Japanese'}>
            <GiChopsticks /> {/* Icono de palillos */}
            <h4>Japanese</h4> {/* Texto de la categoría */}
        </SLink>
    </List>
  );
}

// Definimos el componente List con estilos
const List = styled.div`
    display: flex; /* Usamos flexbox para el layout */
    justify-content: center; /* Centramos los elementos horizontalmente */
    margin: 2rem 0rem; /* Margen superior e inferior */
    margin-left: 10rem;
`;

// Definimos el componente SLink con estilos
const SLink = styled(NavLink)`
    display: flex; /* Usamos flexbox para el layout */
    flex-direction: column; /* Colocamos los elementos en columna */
    justify-content: center; /* Centramos los elementos verticalmente */
    align-items: center; /* Centramos los elementos horizontalmente */
    border-radius: 50%; /* Hacemos los bordes redondeados */
    margin-right: 2rem; /* Margen derecho */
    text-decoration: none; /* Quitamos la subrayado del texto */
    background: linear-gradient(35deg, #494949, #313131); /* Fondo con degradado */
    width: 6rem; /* Ancho del enlace */
    height: 6rem; /* Alto del enlace */
    cursor: pointer; /* Cambiamos el cursor al pasar por encima */
    transform: scale(0.8); /* Escalamos el tamaño del enlace */

    h4 {
        color: white; /* Color del texto */
        font-size: 0.8rem; /* Tamaño de la fuente */
    }

    svg {
        color: white; /* Color del icono */
        font-size: 1.5rem; /* Tamaño del icono */
    }

    &.active {
        background: linear-gradient(to right, #f27121, #e94057); /* Fondo con degradado cuando está activo */

        svg {
            color: white; /* Color del icono cuando está activo */
        }

        h4 {
            color: white; /* Color del texto cuando está activo */
        }
    }
`;

// Exportamos el componente Category como predeterminado
export default Category
