import React, { useState } from 'react';
// import { auth } from '../firebaseConfig';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');



  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      
      const nuevoUsuario = { name, password };
      usuarios.push(nuevoUsuario)
      
      alert('Usuario registrado con éxito');

      localStorage.setItem('usuarios', JSON.stringify(usuarios));

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro de Usuario</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;