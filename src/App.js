import Home from './components/Home'
import Pessoas from './components/Pessoas'
import Equipes from './components/Equipes'
import { BrowserRouter, Switch, Routes, Route, Link } from 'react-router-dom';
import {Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Activity, Calendar2Check, CardChecklist, Check, ListTask, People, Projector } from 'react-bootstrap-icons';
import teste from './components/img/Logo.webp'
import './App.css'
function App() {

  return (

 <div className='App' >
    <BrowserRouter >
    <Nav variant='tabs' style={{background: '#171821', height: '80px'}}>
      <Nav.Link style={{background: '#171821', color: '#87888C', marginLeft:'2%', fontSize:'1.3rem'}} as={Link} to="/">Home</Nav.Link>
      <Nav.Link style={{background: '#171821', color: '#87888C', marginLeft:'2%', fontSize:'1.3rem'}} as={Link} to="/Pessoas">Pessoas</Nav.Link>
      <Nav.Link style={{background: '#171821', color: '#87888C', marginLeft:'2%', fontSize:'1.3rem'}} as={Link} to="/Equipes">Equipes</Nav.Link>
    <div id='img'><img src={teste} alt=" " width={'60%'} style={{marginTop:'-58px'}}/></div>
    </Nav>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/Pessoas" element={<Pessoas/>}></Route>
    </Routes>
    </BrowserRouter>
</div>

  );
}

export default App;
