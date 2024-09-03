import React, { useEffect, useState } from 'react'; // Importa React y los hooks useEffect y useState
import styled from 'styled-components'; // Importa styled-components para estilos
import { motion } from 'framer-motion'; // Importa motion de framer-motion para animaciones
import { Link, useParams } from 'react-router-dom'; // Importa Link y useParams de react-router-dom para navegación y parámetros de URL

function Cuisine() {

    // Estado para almacenar las recetas de la cocina seleccionada
    const [cuisine, setCuisine] = useState([]);
    // Hook para obtener los parámetros de la URL
    let params = useParams();

    // Función asíncrona para obtener las recetas de la cocina seleccionada desde la API
    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
        const recipes = await data.json();
        // Actualiza el estado con los resultados de la búsqueda
        setCuisine(recipes.results);
    };

    // useEffect para llamar a getCuisine cuando cambie el parámetro de tipo
    useEffect(() => {
        getCuisine(params.type);
        console.log(params.type);
    }, [params.type]);

    return (
        <Grid 
            animate={{ opacity: 1 }} // Animación para la opacidad al montar el componente
            initial={{ opacity: 0 }} // Estado inicial de la opacidad
            exit={{ opacity: 0 }} // Estado de la opacidad al desmontar el componente
            transition={{ duration: 0.5 }} // Duración de la transición de la animación
        >
            {cuisine.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                            <img src={item.image} alt="" />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                );
            })}
        </Grid>
    );
}

// Estilos para el contenedor de la cuadrícula con animaciones
const Grid = styled(motion.div)`
    display: grid; // Utiliza grid layout
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); // Define las columnas de la cuadrícula
    grid-gap: 3rem; // Espacio entre los elementos de la cuadrícula
`;

// Estilos para cada tarjeta de receta
const Card = styled.div`

    img {
        width: 100%; // Ancho completo de la imagen
        border-radius: 2rem; // Bordes redondeados de 2rem
    }

    a {
        text-decoration: none; // Sin subrayado para los enlaces
    }

    h4 {
        text-align: center; // Texto centrado
        padding: 1rem; // Relleno de 1rem    
    }
`;

export default Cuisine;
