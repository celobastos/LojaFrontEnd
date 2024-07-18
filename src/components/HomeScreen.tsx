import React from 'react';
import './HomeScreen.css';
import logo from '../assets/estante-high-resolution-logo-transparent.png'; // Importar a imagem

const HomeScreen: React.FC = () => {
  return (
    <div className="homeScreen">
      <img src={logo} alt="Estante Logo" className="logo" /> 
      <h1>Bem-vindo ao Estante</h1>
      <p>Aqui, transformamos suas leituras em um catálogo pessoal e interativo, permitindo que você organize e compartilhe sua jornada literária de maneira única.</p>
      <h2>Comece agora mesmo a construir sua Estante!</h2>
    </div>
  );
};

export default HomeScreen;
