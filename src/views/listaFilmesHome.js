import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const ListarFilmesHome = () => {
    const [filmes, setFilmes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadFilmes();
    }, []);

    const loadFilmes = async () => {
        try {
            const response = await axios.get('http://localhost:3001/filme/list');
            setFilmes(response.data);
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        }
    };


    return (
        <div className="container mt-4">
            <h1 class="fs-3 fw-bold text-center mb-5">FILMES DISPONIVEIS</h1>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {filmes.map((filme) => (
                    <div className="col" key={filme.id}>
                        <Link to={`/filme/get/${filme.id}`}>
                            <img src={`http://localhost:3001/${filme.foto}`} className="card-img-top" alt='FotoFilme' style={{ width: '100%', height: '400px' }} />
                        </Link>
                        <h2 className="fw-light text-black fs-5 pt-2">{filme.titulo}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListarFilmesHome;
