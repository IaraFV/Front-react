import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Nav } from 'react-bootstrap'
import teste from '../../assets/Logo.webp'
import { Link } from 'react-router-dom';
import { AiOutlineFile, AiOutlineSetting } from "react-icons/ai";
import { BsPeople, BsPerson } from "react-icons/bs";
import { BsColumnsGap } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import './Navbar.css';


function NavbarHome() {

    let path = window.location.pathname;
    if (path === '/' | localStorage.getItem('token') === null) {
        return;
    }

    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        [false,].map((expand) => (
            <>

                <Navbar key={expand} id="nav-bar-home-menu" expand={expand} className="mb-3" class="navbar navbar-dark ">
                    <Container fluid >
                        <Navbar.Brand >
                            <div id='img-brisa-home'><img src={teste} alt=" " width={'80%'} style={{ marginTop: '-53px' }} />
                            </div>
                        </Navbar.Brand>

                        <Navbar.Toggle id="menu-a" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>    
                        </Navbar.Toggle> 
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            style={{ backgroundColor: '#171821' }}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} style={{ color: '#fff' }}>
                                    Menu
                                </Offcanvas.Title>
                               
                            </Offcanvas.Header>
                            <Offcanvas.Body style={{ color: '#FFF' }}>
                                <Nav className="justify-content-end flex-grow-1 pe-3" style={{ color: '#fff' }}>
                                    <Nav.Link id='Home' as={Link} to="/Home" ><BsColumnsGap /> Overview</Nav.Link>
                                    <Nav.Link id="Pessoas-Menu" as={Link} to="/Pessoas"><BsPerson /> Pessoas</Nav.Link>
                                    <Nav.Link id="Equipes-Menu" as={Link} to="/Equipes"><BsPeople /> Equipes</Nav.Link>
                                    <Nav.Link id="Projetos-Menu" as={Link} to="/ProjetosConcluidos"><AiOutlineFile /> Projetos</Nav.Link>
                                    <Nav.Link id="Sair-Menu" onClick={logout}><FiLogOut/> Sair</Nav.Link>
                                </Nav>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </>
        )
        ))
}

export default NavbarHome;