import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const ListarGeneros = () => {
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    loadGeneros();
  }, []);

  const loadGeneros = async () => {
    try {
      const response = await axios.get('http://localhost:3001/genero/list');
      setGeneros(response.data);
    } catch (error) {
      console.error('Erro ao buscar géneros:', error);
    }
  };

  const deleteGenero = async (id) => {
    try {
      await Swal.fire({
        title: 'Tem certeza?',
        text: 'Esta ação não pode ser desfeita.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:3001/genero/delete/${id}`);
            setGeneros(generos.filter(genero => genero.id !== id));
            Swal.fire(
              'Eliminado!',
              'O género foi eliminado com sucesso.',
              'success'
            );
          } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
              Swal.fire(
                'Erro!',
                error.response.data.error,
                'error'
              );
            } else {
              Swal.fire(
                'Erro!',
                'Ocorreu um erro ao eliminar o género.',
                'error'
              );
            }
          }
        }
      });
    } catch (error) {
      console.error('Erro ao eliminar género:', error);
      Swal.fire(
        'Erro!',
        'Ocorreu um erro ao eliminar o género.',
        'error'
      );
    }
  };

  return (
    <div className="container mt-4">
      <h1>Lista de Géneros</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero) => (
            <tr key={genero.id}>
              <td>{genero.id}</td>
              <td>{genero.descricao}</td>
              <td>
                <button onClick={() => deleteGenero(genero.id)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarGeneros;
