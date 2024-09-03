import React, { useEffect, useState } from 'react'; // Importa React y los hooks useEffect y useState
import styled from 'styled-components'; // Importa styled-components para estilos
import { Splide, SplideSlide } from '@splidejs/react-splide'; // Importa Splide y SplideSlide para el carrusel
import '@splidejs/splide/dist/css/splide.min.css'; // Importa los estilos CSS de Splide
import { Link } from 'react-router-dom'; // Importa Link para la navegación

function Veggie() {

  // Estado para almacenar las recetas vegetarianas
  const [veggie, setVeggie] = useState([]);

  // useEffect para llamar a getVeggie cuando el componente se monte
  useEffect(() => {
      getVeggie();
  }, []);

  // Función asíncrona para obtener las recetas vegetarianas desde la API
  const getVeggie = async () => {

      // Verifica si hay datos en el localStorage
      const check = localStorage.getItem('veggie');

      if (check) {
          // Si hay datos en el localStorage, actualiza el estado con esos datos
          setVeggie(JSON.parse(check));
      } else {
          // Si no hay datos en el localStorage, realiza una solicitud a la API
          const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
          const data = await api.json();

          // Guarda los datos en el localStorage y actualiza el estado
          localStorage.setItem('veggie', JSON.stringify(data.recipes));
          setVeggie(data.recipes);
          console.log(data.recipes);
      }
  };

  return (
    <div>
      <Wrapper>
          <h3>Our Vegetarian Picks</h3>

          <Splide options={{
              perPage: 4, // Número de elementos por página
              arrows: false, // Desactiva las flechas de navegación
              pagination: false, // Desactiva la paginación
              drag: 'free', // Permite arrastrar libremente
              gap: '5rem', // Espacio entre elementos
          }}>
              {veggie.map((recipe) => {
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
    margin: 4rem 0rem; // Margen superior e inferior de 4rem
`;

// Estilos para cada tarjeta de receta
const Card = styled.div`
    min-height: 25rem; // Altura mínima de 25rem
    border-radius: 2rem; // Bordes redondeados de 2rem
    overflow: hidden; // Oculta el contenido que se desborda
    position: relative; // Posicionamiento relativo

    img {
        border-radius: 2rem; // Bordes redondeados de 2rem
        position: absolute; // Posicionamiento absoluto
        left: 0; // Alineación a la izquierda
        width: 100%; // Ancho completo
        height: 100%; // Altura completa
        object-fit: cover; // Ajuste de la imagen para cubrir el contenedor
    }

    p {
        position: absolute; // Posicionamiento absoluto
        z-index: 10; // Índice Z para superposición
        left: 50%; // Alineación horizontal al centro
        bottom: 0%; // Alineación vertical al fondo
        transform: translate(-50%, 0%); // Transformación para centrar horizontalmente
        color: white; // Color del texto blanco
        width: 100%; // Ancho completo
        text-align: center; // Alineación del texto al centro
        font-weight: 600; // Peso de la fuente
        font-size: 1rem; // Tamaño de la fuente
        height: 40%; // Altura del contenedor de texto
        display: flex; // Uso de flexbox
        justify-content: center; // Centrado horizontal
        align-items: center; // Centrado vertical
    }
`;

// Estilos para el gradiente superpuesto en las imágenes
const Gradient = styled.div`
    z-index: 3; // Índice Z para superposición
    position: absolute; // Posicionamiento absoluto
    width: 100%; // Ancho completo
    height: 100%; // Altura completa
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)); // Gradiente lineal
`;

export default Veggie;
