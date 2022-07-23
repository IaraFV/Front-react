import Home from './components/Home/Home'
import Pessoas from './components/Pessoas/Pessoas'
import Equipes from './components/Equipes/Equipes'
import Task from './components/Task/Task';
import Projetos from './components/Projetos/Projetos';
import Sobre from './components/Sobre/Sobre';
import Post from './components/Pessoas/Post/Post';
import Edit from './components/Pessoas/Edit/edit';
import Inspecionar from './components/Pessoas/Inspecionar/Inspecionar'
import Add from './components/Equipes/Add/add'
import EditE from './components/Equipes/EditE/edit'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import teste from './components/Home/img/Logo.webp'
import './App.css'
import PostE from './components/Equipes/Add/add';
function App() {

  return (

 <div className='App' >
    <BrowserRouter >
    <Nav variant='tabs' style={{background: '#171821', height: '80px', border:"none"}}>
      <Nav.Link style={{background: '#171821', color: '#87888C', marginLeft:'2%', fontSize:'1.3rem'}} as={Link} to="/">Home</Nav.Link>

      <Nav.Link style={{background: '#171821', color: '#87888C', marginLeft:'2%', fontSize:'1.3rem'}} as={Link} to="/Pessoas" >Pessoas</Nav.Link>

      <Nav.Link style={{background: '#171821', color: '#87888C', marginLeft:'2%', fontSize:'1.3rem'}} as={Link} to="/Equipes">Equipes</Nav.Link>

      <Nav.Link style={{background: '#171821', color: '#87888C', marginLeft:'2%', fontSize:'1.3rem'}} as={Link} to="/Projetos">Projetos</Nav.Link>

      <Nav.Link style={{background: '#171821', color: '#87888C', marginLeft:'2%', fontSize:'1.3rem'}} as={Link} to="/Task">Task</Nav.Link>

      <Nav.Link style={{background: '#171821', color: '#87888C', marginLeft:'2%', fontSize:'1.3rem'}} as={Link} to="/Sobre">Sobre</Nav.Link>

    <div id='img'><img src={teste} alt=" " width={'80%'} style={{marginTop:'-53px'}}/></div>
    </Nav>

    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/Pessoas" element={<Pessoas/>}></Route>
      <Route path="/Equipes" element={<Equipes/>}></Route>
      <Route path="/Projetos" element={<Projetos/>}></Route>
      <Route path="/Task" element={<Task/>}></Route>
      <Route path="/Sobre" element={<Sobre/>}></Route>
      <Route path="/Post" element={<Post/>}></Route>
      <Route path="/Edit/:id_pessoa" element={<Edit/>}></Route>
      <Route path="/Inspecionar" element={<Inspecionar/>}></Route>
      <Route path="/Add" element={<Add/>}></Route>
      <Route path="/EditE/:id_equipe" element={<Edit/>}></Route>
    </Routes>
    </BrowserRouter>
</div>

  );
}

export default App;
