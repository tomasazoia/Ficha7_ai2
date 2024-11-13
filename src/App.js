import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListagemFilmes from './views/listarFilmes';
import InserirFilme from './views/inserirFilme';
import EditarFilme from './views/editarFilme';
import DetalhesFilme from './views/detalhesFilme';
import InserirGenero from './views/inserirGenero';
import ListagemGeneros from './views/listarGeneros';
import ListaFilmesHome from './views/listaFilmesHome'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <img src="/logo.png" id="imagem" width="200" height="50" alt="logo" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav p-2 pt-1">
            <li className="nav-item">
              <Link to="/" className="nav-link active text-secondary fs-6">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-secondary fs-6" href="#" id="filmesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Filmes
              </a>
              <ul className="dropdown-menu" aria-labelledby="filmesDropdown">
                <li><Link to="/filme/list" className="dropdown-item">Listar Filmes</Link></li>
                <li><Link to="/filme/create" className="dropdown-item">Inserir Filme</Link></li>
                <li><Link to="/filme/edit/:id" className="dropdown-item">Editar Filme</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-secondary fs-6" href="#" id="generosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Generos
              </a>
              <ul className="dropdown-menu" aria-labelledby="generosDropdown">
                <li><Link to="/genero/list" className="dropdown-item">Listar Generos</Link></li>
                <li><Link to="/genero/create" className="dropdown-item">Inserir Genero</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Body() {
  return (
    <div
      style={{
        height: '600px',
        backgroundSize: 'cover',
        backgroundImage: 'url(/filme1.jpg)'
      }}
    >
      <div className="container" style={{ width: '100%', paddingTop: '9%' }}>
        <p className="fw-light text-white">DESCOBRA OS MELHORES PARA VER</p>
        <h2 className="fw-bold text-white" style={{ fontSize: '70px' }}>MOVIE WEB</h2>
        <hr style={{ height: '10px', width: '50%', opacity: 1, backgroundColor: 'red' }} />
        <Link to="/filme/list" className="text-decoration-none btn btn-danger" style={{ borderRadius: '10px', padding: '10px 30px' }}> COMECE JÁ A EXPLORAR</Link>
      </div>
    </div>
  );
}

function Carroussel() {
  return (
    <div>
      <hr className="mt-5" style={{ marginLeft: '5%', width: '90%' }} />
      <div className="container">
        <h1 className="fs-3 fw-bold text-center mb-3 mt-5">COMING SOON...</h1>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/filme_slider.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="fw-bold text-white">MISSION IMPOSSIBLE</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/filme2_slider.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="fw-bold text-white">SPIDER-MAN</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img src="/filme3_slider.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="fw-bold text-white">FORD VS FERRARI</h5>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

  );
}

function Footer() {
  return (
    <footer className="py-3 my-4 mt-6">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <Link to="/" className="nav-link px-2 text-muted">Home</Link>
      </ul>
      <p className="text-center text-muted">© 2024 MOVIE WEB</p>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Body />
      <ListaFilmesHome />
      <Carroussel />
    </>
  );
}

function App() {
  return (
    <Router>
      <div id="root">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filme/list" element={<ListagemFilmes />} />
          <Route path="/filme/create" element={<InserirFilme />} />
          <Route path="/filme/edit/:id" element={<EditarFilme />} />
          <Route path="/filme/get/:id" element={<DetalhesFilme />} />
          <Route path="/genero/list" element={<ListagemGeneros />} />
          <Route path="/genero/create" element={<InserirGenero />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
