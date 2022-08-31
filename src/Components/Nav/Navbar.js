import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Nav } from 'react-bootstrap'
import teste from '../../Pages/Home/img/Logo.webp'
import { Link } from 'react-router-dom';
import { AiOutlineFile, AiOutlineSetting } from "react-icons/ai";
import { BsPeople, BsPerson } from "react-icons/bs";
import { BsColumnsGap } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
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

                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            style={{ backgroundColor: '#171821' }}
                        >
                            <Offcanvas.Header >
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} >
                                    Menu
                                </Offcanvas.Title>
                                <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
                            </Offcanvas.Header>
                            <Offcanvas.Body style={{ color: '#FFF' }}>
                                <Nav className="justify-content-end flex-grow-1 pe-3" style={{ color: '#fff' }}>
                                    <Nav.Link style={{ background: '#171821', color: '#87888C', marginLeft: '2%', fontSize: '1.4rem' }} as={Link} to="/Home" ><BsColumnsGap />Overview</Nav.Link>
                                    <Nav.Link style={{ background: '#171821', color: '#87888C', marginLeft: '2%', fontSize: '1.5rem' }} as={Link} to="/Pessoas"><BsPerson />Pessoas</Nav.Link>
                                    <Nav.Link style={{ background: '#171821', color: '#87888C', marginLeft: '2%', fontSize: '1.4rem' }} as={Link} to="/Equipes"><BsPeople />Equipes</Nav.Link>
                                    <Nav.Link style={{ background: '#171821', color: '#87888C', marginLeft: '2%', fontSize: '1.4rem' }} as={Link} to="/ProjetosConcluidos"><AiOutlineFile />Projetos</Nav.Link>
                                    <Nav.Link style={{ background: '#171821', color: '#87888C', marginLeft: '2%', fontSize: '1.4rem' }} onClick={logout}><FiLogOut/>Sair</Nav.Link>
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