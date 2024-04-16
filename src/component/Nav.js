import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../page/style.css';


const Nav_bar = () => {
    return (
        <Navbar expand="lg" className="dark-mode">
            <Container fluid>
                <div className="d-flex justify-content-between align-items-center"> 
                    <Navbar.Brand href="/" >
                        <h1 className="text-light">MasterNova</h1>
                    </Navbar.Brand>
                    <div>
                        <Nav className="ms-auto my-2 my-lg-0 nav-hover" style={{ borderRadius: '10px' }}>
                            <Link className="navBtn ms-auto my-1 d-flex align-items-center nav-link" to="/page/question" style={{ textDecoration: 'none', color: 'inherit', height: '100%', paddingRight: '20px' }}>
                                <i className='fs-4 bi-house ms-2'></i>
                                <span className='ms-2 d-none d-sm-inline' style={{ fontSize: '20px' }}>Question</span>
                            </Link>
                        </Nav>
                    </div>
                    <div>
                        <Nav className="ms-auto my-2 my-lg-0 nav-hover" style={{ borderRadius: '10px' }}>
                            <Link className="navBtn ms-auto my-1 d-flex align-items-center nav-link" to="/page/history" style={{ textDecoration: 'none', color: 'inherit', height: '100%', paddingRight: '20px' }}>
                                <i className='fs-4 bi-house ms-2'></i>
                                <span className='ms-2 d-none d-sm-inline' style={{ fontSize: '20px' }}>History</span>
                            </Link>
                        </Nav>
                    </div>
                </div>
                
            </Container>
        </Navbar>

    );
}

export default Nav_bar;
