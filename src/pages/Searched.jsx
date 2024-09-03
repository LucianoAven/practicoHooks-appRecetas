import React from 'react';
import { useEffect, useState } from 'react'; // Importa hooks de React
import { useParams } from 'react-router-dom'; // Importa hook para obtener parámetros de la URL
import styled from 'styled-components'; // Importa styled-components para estilos
import { Link } from 'react-router-dom'; // Importa Link para navegación

function Searched() {

  // Estado para almacenar las recetas buscadas
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  // Hook para obtener los parámetros de la URL
  let params = useParams();

  // Función asíncrona para obtener las recetas buscadas desde la API
  const getSearched = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
    const recipes = await data.json();
    // Actualiza el estado con los resultados de la búsqueda
    setSearchedRecipes(recipes.results);
  };

  // useEffect para llamar a getSearched cuando cambie el parámetro de búsqueda
  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searchedRecipes.map((item) => {
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

// Estilos para el contenedor de la cuadrícula
const Grid = styled.div`
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

export default Searched;
