import Home from './Pages/Home/Home'
import Pessoas from './Pages/Pessoas/index/Pessoas'
import Equipes from './Pages/Equipes/Equipes'
import Task from './Pages/Task/Task';
import PostPessoa from './Pages/Pessoas/CadastroPessoa/Post';
import Edit from './Pages/Pessoas/Edit/editPessoa';
import Inspecionar from './Pages/Pessoas/Inspecionar/Inspecionar'
import AdicionarEquipe from './Pages/Equipes/AdicionarEquipe/AdicionarEquipe'
import AddProjeto from './Pages/Projetos/AddProjeto/AddProjeto'
import EditE from './Pages/Equipes/EditE/editeEquipe'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ProjetosConcluidos from './Pages/Projetos/Projetos';
import PostT from './Pages/Task/PostT/postT'
import InspProjeto from './Pages/Projetos/InspecionarProjeto/InspProjeto';
import InspecionarEqui from './Pages/Equipes/inspecionar/InspecionarEqui';
import EditarEquipe from './Pages/Equipes/EditE/editeEquipe'
import Idetiprojeto from './Pages/Projetos/editeprojeto/idetiprojeto';
import Login from './Pages/Login/Login'
import NavbarHome from './Components/Nav/Navbar';
import PostTasks from './Pages/Task/PostT/postT'

const Rout = () => {

  return (

    <BrowserRouter >
      <NavbarHome />
      <Routes>

        <Route path="/" element={<Login />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Pessoas" element={<Pessoas />}></Route>
        <Route path="/PostTasks" element={<PostTasks/>}></Route>
        <Route path="/Equipes" element={<Equipes />}></Route>
        <Route path="/ProjetosConcluidos" element={<ProjetosConcluidos />}></Route>
        <Route path="/Task" element={<Task />}></Route>
        <Route path="/PostPessoa" element={<PostPessoa />}></Route>
        <Route path="/Edit/:id_pessoa" element={<Edit />}></Route>
        <Route path="/Inspecionar/:id_pessoa" element={<Inspecionar />}></Route>
        <Route path="/AdicionarEquipe" element={<AdicionarEquipe />}></Route>
        <Route path="/AddProjeto" element={<AddProjeto />}></Route>
        <Route path="/EditE/:id_equipe" element={<EditE />}></Route>
        <Route path="/postT" element={<PostT />}></Route>
        <Route path='/InspProjeto/:id_projeto' element={<InspProjeto />}></Route>
        <Route path='/InspecionarEqui/:id_equipe' element={<InspecionarEqui />}></Route>
        <Route path='/EditarEquipe/:id_equipe' element={<EditarEquipe />}></Route>
        <Route path='/Idetiprojeto/:id_projeto' element={<Idetiprojeto />}></Route>
        <Route path="/PostTasks/:id_projeto" element={<PostTasks/>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default Rout;