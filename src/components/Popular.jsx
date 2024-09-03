// Importa React y los hooks useEffect y useState
import React, { useEffect, useState } from 'react'; 
// Importa styled-components para estilos
import styled from 'styled-components'; 
// Importa Splide y SplideSlide para el carrusel
import { Splide, SplideSlide } from '@splidejs/react-splide'; 
// Importa los estilos CSS de Splide
import '@splidejs/splide/dist/css/splide.min.css'; 
// Importa Link para la navegación
import { Link } from 'react-router-dom'; 

function Popular() {

    // Estado para almacenar las recetas populares
    const [popular, setPopular] = useState([]);

    // useEffect para llamar a getPopular cuando el componente se monte
    useEffect(() => {
        getPopular();
    }, []);

    // Función asíncrona para obtener las recetas populares desde la API
    const getPopular = async () => {

        // Verifica si hay datos en el localStorage
        const check = localStorage.getItem('popular');

        if (check) {
            // Si hay datos en el localStorage, actualiza el estado con esos datos
            setPopular(JSON.parse(check));
        } else {
            // Si no hay datos en el localStorage, realiza una solicitud a la API
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
            const data = await api.json();

            // Guarda los datos en el localStorage y actualiza el estado
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
            console.log(data.recipes);
        }
    };

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>

                <Splide options={{
                    perPage: 4, // Número de elementos por página
                    arrows: false, // Desactiva las flechas de navegación
                    pagination: false, // Desactiva la paginación
                    drag: 'free', // Permite arrastrar libremente
                    gap: '5rem', // Espacio entre elementos
                }}>
                    {popular.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={'/recipe/' + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <Gradient />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>

            </Wrapper>
        </div>
    );
}

// Estilos para el contenedor del carrusel
const Wrapper = styled.div`
    margin: 4rem 0rem; /* Margen superior e inferior */
`;

// Estilos para cada tarjeta de receta
const Card = styled.div`
    min-height: 25rem; /* Altura mínima de la tarjeta */
    border-radius: 2rem; /* Bordes redondeados */
    overflow: hidden; /* Oculta el contenido que se desborda */
    position: relative; /* Posicionamiento relativo para elementos hijos */

    img {
        border-radius: 2rem; /* Bordes redondeados de la imagen */
        position: absolute; /* Posicionamiento absoluto */
        left: 0; /* Alinea a la izquierda */
        width: 100%; /* Ancho completo */
        height: 100%; /* Alto completo */
        object-fit: cover; /* Ajusta la imagen para cubrir el contenedor */
    }

    p {
        position: absolute; /* Posicionamiento absoluto */
        z-index: 10; /* Nivel de apilamiento */
        left: 50%; /* Centra horizontalmente */
        bottom: 0%; /* Alinea al fondo */
        transform: translate(-50%, 0%); /* Ajusta la posición para centrar */
        color: white; /* Color del texto */
        width: 100%; /* Ancho completo */
        text-align: center; /* Texto centrado */
        font-weight: 600; /* Peso de la fuente */
        font-size: 1rem; /* Tamaño de la fuente */
        height: 40%; /* Altura del contenedor de texto */
        display: flex; /* Usamos flexbox para el layout */
        justify-content: center; /* Centramos los elementos horizontalmente */
        align-items: center; /* Centramos los elementos verticalmente */
    }
`;

// Estilos para el gradiente superpuesto en las imágenes
const Gradient = styled.div`
    z-index: 3; /* Nivel de apilamiento */
    position: absolute; /* Posicionamiento absoluto */
    width: 100%; /* Ancho completo */
    height: 100%; /* Alto completo */
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)); /* Gradiente de fondo */
`;

export default Popular;
