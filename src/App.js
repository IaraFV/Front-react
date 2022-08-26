import Home from './components/Home/Home'
import Pessoas from './components/Pessoas/Pessoas'
import Equipes from './components/Equipes/Equipes'
import Task from './components/Task/Task';
import Sobre from './components/Sobre/Sobre';
import Post from './components/Pessoas/Post/Post';
import Edit from './components/Pessoas/Edit/editPessoa';
import Inspecionar from './components/Pessoas/Inspecionar/Inspecionar'
import Add from './components/Equipes/Add/add'
import AddProjeto from './components/Projetos/AddProjeto/AddProjeto'
import EditE from './components/Equipes/EditE/editeEquipe'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import teste from './components/Home/img/Logo.webp'
import './App.css'
import ProjetosConcluidos from './components/Projetos/Projetos';
import PostT from './components/Task/PostT/postT'
import InspProjeto from './components/Projetos/InspecionarProjeto/InspProjeto';
import InspecionarEqui from './components/Equipes/inspecionar/InspecionarEqui';
import EditarEquipe from './components/Equipes/EditE/editeEquipe'
import { BsColumnsGap } from "react-icons/bs";
import { AiOutlineFile, AiOutlineSetting } from "react-icons/ai";
import { BsPeople, BsPerson } from "react-icons/bs";
import Idetiprojeto from './components/Projetos/editeprojeto/idetiprojeto';
import Login from './components/Login/Login'
import Rotas from './routes';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
function App() {

  return (

    <div className='App' >

      <BrowserRouter >

        {[false,].map((expand) => (
          <Navbar key={expand} id="nav-bar-home-menu" expand={expand} className="mb-3" class="navbar navbar-dark ">
            <Container fluid >
              <Navbar.Brand >
                <div id='img-brisa-home'><img src={teste} alt=" " width={'80%'} style={{ marginTop: '-53px' }} />
                </div>
              </Navbar.Brand>
              
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                style={{ backgroundColor: '#171821' }}
              >
                <Offcanvas.Header closeButton >
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}  style={{ color: '#FFF' }}>
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ color: '#FFF' }}>
                  <Nav className="justify-content-end flex-grow-1 pe-3" style={{ color: '#fff' }}>
                    <Nav.Link style={{ background: '#171821', color: '#87888C', marginLeft: '2%', fontSize: '1.4rem' }} as={Link} to="/Home" ><BsColumnsGap />Overview</Nav.Link>
                    <Nav.Link style={{ background: '#171821', color: '#87888C', marginLeft: '2%', fontSize: '1.5rem' }} as={Link} to="/Pessoas"><BsPerson />Pessoas</Nav.Link>
                    <Nav.Link style={{ background: '#171821', color: '#87888C', marginLeft: '2%', fontSize: '1.4rem' }} as={Link} to="/Equipes"><BsPeople />Equipes</Nav.Link>
                    <Nav.Link style={{ background: '#171821', color: '#87888C', marginLeft: '2%', fontSize: '1.4rem' }} as={Link} to="/ProjetosConcluidos"><AiOutlineFile />Projetos</Nav.Link>

                  </Nav>

                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}


        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Pessoas" element={<Pessoas />}></Route>
          <Route path="/Equipes" element={<Equipes />}></Route>
          <Route path="/ProjetosConcluidos" element={<ProjetosConcluidos />}></Route>
          <Route path="/Task" element={<Task />}></Route>
          <Route path="/Post" element={<Post />}></Route>
          <Route path="/Edit/:id_pessoa" element={<Edit />}></Route>
          <Route path="/Inspecionar/:id_pessoa" element={<Inspecionar />}></Route>
          <Route path="/Add" element={<Add />}></Route>
          <Route path="/AddProjeto" element={<AddProjeto />}></Route>
          <Route path="/EditE/:id_equipe" element={<EditE />}></Route>
          <Route path="/postT" element={<PostT />}></Route>
          <Route path='/InspProjeto/:id_projeto' element={<InspProjeto />}></Route>
          <Route path='/InspecionarEqui/:id_equipe' element={<InspecionarEqui />}></Route>
          <Route path='/EditarEquipe/:id_equipe' element={<EditarEquipe />}></Route>
          <Route path='/Idetiprojeto/:id_projeto' element={<Idetiprojeto />}></Route>
        </Routes>
      </BrowserRouter>

    </div>


  );
}

export default App;