import React, { useEffect, useState } from 'react';
import TopBar from './components/TopBar';
import HomeScreen from './components/HomeScreen';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import api from './service/api';
import './assets/static/fonts.css';

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  data_criacao: string;
  imagem_url?: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await api.get('/produtos');
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <TopBar />
      <HomeScreen />
      <ProductForm onProductAdded={fetchProducts} />
      <ProductList products={products} fetchProducts={fetchProducts} />
    </div>
  );
};

export default App;
