import React, { useEffect, useState } from 'react';
import './ProductList.css';
import NoDataImage from '../assets/nodata.svg'; 
import { format } from 'date-fns';
import axios from 'axios';
import api from '../service/api';

interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  data_criacao: string;
  imagem_url?: string;
}

interface ProductListProps {
  products: Product[];
  fetchProducts: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, fetchProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleItemClick = (product: Product) => {
    setSelectedProduct(product);
    setNome(product.nome);
    setDescricao(product.descricao);
    setPreco(product.preco.toString());
    setImagemUrl(product.imagem_url || '');
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setError(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'HH:mm - dd/MM/yyyy');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (selectedProduct) {
      try {
        await api.put(`/produtos/${selectedProduct.id}`, {
          nome,
          descricao,
          preco: parseFloat(preco),
          imagem_url: imagemUrl,
        });
        fetchProducts();
        closeModal();
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(`Erro: ${err.response.data.message || err.response.statusText}`);
          } else if (err.request) {
            setError('Erro: Nenhuma resposta do servidor.');
          } else {
            setError(`Erro: ${err.message}`);
          }
        } else {
          setError(`Erro inesperado: ${String(err)}`);
        }
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        await api.delete(`/produtos/${selectedProduct.id}`);
        fetchProducts();
        closeModal();
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(`Erro: ${err.response.data.message || err.response.statusText}`);
          } else if (err.request) {
            setError('Erro: Nenhuma resposta do servidor.');
          } else {
            setError(`Erro: ${err.message}`);
          }
        } else {
          setError(`Erro inesperado: ${String(err)}`);
        }
      }
    }
  };

  return (
    <div className="product-list-container">
      <h2>Estante</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div
            className="product-item"
            key={product.id}
            onClick={() => handleItemClick(product)}
          >
            <div className="image-container">
              {product.imagem_url ? (
                <img src={product.imagem_url} alt={product.nome} />
              ) : (
                <img src={NoDataImage} alt="No Data Available" />
              )}
            </div>
            <h3>{product.nome}</h3>
            <p>R${product.preco}</p>
            <p className="date">{formatDate(product.data_criacao)}</p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <h2>{selectedProduct.nome}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="inner-container">
                <div className="column">
                  <div className="form-item small-input">
                    <label>Nome: </label>
                    <input
                      type="text"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      placeholder={selectedProduct.nome}
                      required
                    />
                  </div>
                  <div className="form-item small-input">
                    <label>Preço: </label>
                    <input
                      type="number"
                      value={preco}
                      onChange={e => setPreco(e.target.value)}
                      placeholder={selectedProduct.preco.toString()}
                      required
                    />
                  </div>
                  <div className="form-item small-input">
                    <label>Imagem: </label>
                    <input
                      type="url"
                      value={imagemUrl}
                      onChange={e => setImagemUrl(e.target.value)}
                      placeholder={selectedProduct.imagem_url || 'URL da imagem'}
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="form-item large-input">
                    <label>Descrição: </label>
                    <textarea
                      className="large-text"
                      value={descricao}
                      onChange={e => setDescricao(e.target.value)}
                      placeholder={selectedProduct.descricao}
                    />
                  </div>
                  <button type="submit" className="submit-button">Atualizar Produto</button>
                  {error && <p className="error-message">{error}</p>}
                </div>
              </div>
            </form>
            <button onClick={handleDeleteProduct} className="delete-button">Excluir Livro</button>
            {selectedProduct.imagem_url ? (
              <img src={selectedProduct.imagem_url} alt={selectedProduct.nome} />
            ) : (
              <img src={NoDataImage} alt="No Data Available" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
