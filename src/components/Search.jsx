// Importa styled-components para estilos
import styled from "styled-components"; 
// Importa useState para manejar el estado
import { useState } from "react"; 
// Importa el icono de búsqueda de react-icons
import { FaSearch } from "react-icons/fa"; 
// Importa useNavigate para la navegación
import { useNavigate } from "react-router-dom"; 

function Search() {

    // Estado para almacenar el valor del input
    const [input, setInput] = useState("");

    // Hook para la navegación
    const navigate = useNavigate();

    // Manejador del submit del formulario
    const submitHandler = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        navigate('/searched/' + input); // Navega a la ruta de búsqueda con el valor del input
    };

    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch /> {/* Icono de búsqueda */}
                <input 
                    onChange={(e) => setInput(e.target.value)} // Actualiza el estado con el valor del input
                    type="text" 
                    value={input} // Valor del input
                />
            </div>
        </FormStyle>
    );
}

// Estilos para el formulario
const FormStyle = styled.form`
    margin: 0rem 20rem; /* Margen superior e inferior */

    div {
        width: 100%; /* Ancho completo */   
        position: relative; /* Posicionamiento relativo */
    }

    input {
        border: none; /* Sin borde */
        background: linear-gradient(35deg, #494949, #313131); /* Fondo con degradado */
        font-size: 1.5rem; /* Tamaño de la fuente */
        color: white; /* Color del texto */
        padding: 1rem 3rem; /* Relleno interno */
        border-radius: 1rem; /* Bordes redondeados */
        outline: none; /* Sin contorno */
        width: 100%; /* Ancho completo */
    }

    svg {
        position: absolute; /* Posicionamiento absoluto */
        top: 50%; /* Centrado verticalmente */
        left: 0%; /* Alineado a la izquierda */
        transform: translate(100%, -50%); /* Ajuste de posición */
        color: white; /* Color del icono */
    }
`;

export default Search;
