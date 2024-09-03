// Importamos el archivo de estilos CSS
import "./Formulario.css"
// Importamos useState de React para manejar el estado
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Definimos el componente Formulario
export function Formulario( {setSesionUsuario} ) {

    // Definimos los estados para nombre, password y error
    const [name, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navegacion = useNavigate();

    // Función que maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

        // Validamos que los campos no estén vacíos
        if (name == "" || password == "") {
            setError(true); // Si hay un campo vacío, mostramos el error
            return;
        };

        setError(false); // Si no hay errores, ocultamos el mensaje de error

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const encontrarUsuario = usuarios.find(a => a.name === name && a.password === password);

        localStorage.setItem('usuarioIniciado', JSON.stringify(encontrarUsuario));

        setSesionUsuario(encontrarUsuario)

        navegacion("/");
    };

    return (
        <section>
            <h1>Login</h1> {/* Título del formulario */}

            {/* Formulario de inicio de sesión */}
            <form className="formulario" onSubmit={handleSubmit}>
                {/* Campo de entrada para el nombre */}
                <input type="text" value={name} onChange={e => setNombre(e.target.value)}/>
                {/* Campo de entrada para la contraseña */}
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                {/* Botón para enviar el formulario */}
                <button>Iniciar sesión</button>
            </form>

            {/* Mensaje de error si hay campos vacíos */}
            {error && <p>Todos los campos son obligatorios</p>}
        </section>
    );
};
