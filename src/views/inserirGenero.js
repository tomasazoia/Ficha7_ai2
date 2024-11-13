import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AdicionarGenero = () => {
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/genero/create", { descricao });
      MySwal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Género adicionado com sucesso!',
      });
      setDescricao("");
    } catch (error) {
      console.error("Erro ao adicionar género:", error);
      MySwal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao adicionar género',
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Adicionar Género</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Género:</label>
          <input type="text" className="form-control" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required placeholder="Insira o género"/>
        </div>
        <button type="submit" className="btn btn-danger">Adicionar Género</button>
      </form>
    </div>
  );
};

export default AdicionarGenero;
