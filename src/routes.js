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
import NavbarHome from './components/Nav/Navbar';



const Rout = () => {

  return (

    <BrowserRouter >
      <NavbarHome />
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

  );
}

export default Rout;