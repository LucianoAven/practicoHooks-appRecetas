import { useEffect, useState } from "react"; // Importa hooks de React
import { useParams } from "react-router-dom"; // Importa hook para obtener parámetros de la URL
import styled from "styled-components"; // Importa styled-components para estilos

import React from 'react';

function Recipe() {

    // Hook para obtener los parámetros de la URL
    let params = useParams();
    // Estado para almacenar los detalles de la receta
    const [details, setDetails] = useState({});
    // Estado para controlar la pestaña activa (instrucciones o ingredientes)
    const [activeTab, setActiveTab] = useState("instructions");

    // Función asíncrona para obtener los detalles de la receta desde la API
    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        // Actualiza el estado con los detalles de la receta
        setDetails(detailData);
        console.log(detailData);
    };

    // useEffect para llamar a fetchDetails cuando cambie el parámetro de nombre
    useEffect(() => {
        fetchDetails();
    }, [params.name]);

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt="" />
            </div>

            <Info>
                <Button 
                    className={activeTab === 'instructions' ? 'active' : ''} 
                    onClick={() => setActiveTab("instructions")}
                >
                    Instructions
                </Button>
                <Button 
                    className={activeTab === 'ingredients' ? 'active' : ''} 
                    onClick={() => setActiveTab("ingredients")}
                >
                    Ingredients
                </Button>

                {activeTab === 'instructions' && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                        <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                    </div>
                )}
                {activeTab === 'ingredients' && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    );
}

// Estilos para el contenedor de detalles
const DetailWrapper = styled.div`
    margin-top: 10rem; // Margen superior de 10rem
    margin-bottom: 5rem; // Margen inferior de 5rem
    display: flex; // Flexbox para el contenedor

    .active {
        background: linear-gradient(35deg, #494949, #313131); // Gradiente de fondo para la pestaña activa
        color: white; // Color de texto blanco para la pestaña activa
    }

    h2 {
        margin-bottom: 2rem; // Margen inferior de 2rem para el título
    }

    li {
        font-size: 1.2rem; // Tamaño de fuente de 1.2rem para los elementos de la lista
        line-height: 2.5rem; // Altura de línea de 2.5rem para los elementos de la lista
    }

    ul {
        margin-top: 2rem; // Margen superior de 2rem para la lista
    }
`;

// Estilos para los botones de pestañas
const Button = styled.button`
    padding: 1rem 2rem; // Relleno de 1rem arriba y abajo, 2rem a los lados
    color: #313131; // Color de texto
    background: white; // Fondo blanco
    border: 2px solid black; // Borde negro de 2px
    margin-right: 2rem; // Margen derecho de 2rem
    font-weight: 600; // Peso de fuente de 600
`;

// Estilos para la sección de información
const Info = styled.div`
    margin-left: 10rem; // Margen izquierdo de 10rem
`;

export default Recipe;
