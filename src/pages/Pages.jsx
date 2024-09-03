import React, { useState } from 'react'; // Importa React y el hook useState
import Home from './Home'; // Importa el componente Home
import Cuisine from './Cuisine'; // Importa el componente Cuisine
import Searched from "./Searched"; // Importa el componente Searched
import Recipe from './Recipe'; // Importa el componente Recipe
import { Route, Routes, useLocation } from 'react-router-dom'; // Importa Route, Routes y useLocation de react-router-dom para enrutamiento
import { AnimatePresence } from 'framer-motion'; // Importa AnimatePresence de framer-motion para animaciones de presencia
import { Formulario } from '../components/Formulario'; // Importa el componente Formulario
import Register from '../components/Register'; // Importa el componente Register


function Pages( {sesionUsuario, setSesionUsuario} ) {

  const location = useLocation(); // Obtiene la ubicación actual de la URL

  return (
    <AnimatePresence mode="wait"> {/* Envuelve las rutas para animaciones de presencia */}
      <Routes location={location} key={location.pathname}> {/* Define las rutas con la ubicación actual */}
        <Route path='/' element={<Home />} /> {/* Ruta para el componente Home */}
        <Route path='/registro' element={<Register />} /> {/* Ruta para el componente Registro */}
        <Route path='/login' element={<Formulario setSesionUsuario={setSesionUsuario} />} /> {/* Ruta para el componente Formulario */}
        <Route path='/cuisine/:type' element={<Cuisine />} /> {/* Ruta para el componente Cuisine con parámetro de tipo */}
        <Route path='/searched/:search' element={<Searched />} /> {/* Ruta para el componente Searched con parámetro de búsqueda */}
        <Route path='/recipe/:name' element={<Recipe />} /> {/* Ruta para el componente Recipe con parámetro de nombre */}
      </Routes>
    </AnimatePresence>
  );
}

export default Pages; // Exporta el componente Pages
