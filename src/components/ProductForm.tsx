import React, { useState } from 'react';
import api from '../service/api';
import './ProductForm.css';
import axios from 'axios';

interface ProductFormProps {
  onProductAdded: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post('/produtos', { nome, descricao, preco, imagem_url: imagemUrl });
      setNome('');
      setDescricao('');
      setPreco('');
      setImagemUrl('');
      onProductAdded();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
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
  };

  return (
    <div className="outer-container">
      {success && <div className="tooltip">Livro adicionado com sucesso!</div>}
      <div className="text-container">
        <p>Insira seus livros favoritos na sua Estante, preenchendo os dados do livro e ele ficará disponível na sua prateleira virtual!
        </p>
        Uma vez Preenchidos você pode seleciona-los na sua lista e fazer as alterações que quiser ou até mesmo exclui-los da sua estante!
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="inner-container">
          <div className="column">
            <div className="form-item small-input">
              <label>Nome: </label>
              <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
            </div>
            <div className="form-item small-input">
              <label>Preço: </label>
              <input type="number" value={preco} onChange={e => setPreco(e.target.value)} required />
            </div>
            <div className="form-item small-input">
              <label>Imagem: </label>
              <input type="url" value={imagemUrl} onChange={e => setImagemUrl(e.target.value)} />
            </div>
          </div>
          <div className="column">
            <div className="form-item large-input">
              <label>Descrição: </label>
              <textarea className="large-text" value={descricao} onChange={e => setDescricao(e.target.value)} />
            </div>
            <button type="submit" className="submit-button">Adicionar Produto</button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
