import React from 'react';
import './TopBar.css';

const TopBar: React.FC = () => {
  return (
    <div className="topbar hidden">
      <a href="/lista">Lista</a>
      <a href="/livros">Livros</a>
    </div>
  );
};

export default TopBar;
