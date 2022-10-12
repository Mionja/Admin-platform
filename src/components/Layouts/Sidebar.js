import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-light bg-light" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Menu</div>
                  

                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Professeurs
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/add-professeur">Ajouts Professeurs</Link>
                            <Link className="nav-link" to="/view-professeur">Listes des professeurs</Link>
                        </nav>
                    </div>
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Etudiants
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/add-student">Ajouts Etudiants</Link>
                            <Link className="nav-link" to="/view-student">Listes des Etudiants</Link>
                        </nav>
                    </div>


                    <Link className="nav-link" to="/listemodule">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Modules
                    </Link>

                    <Link className="nav-link" to="/add-module">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Ajouts des modules
                    </Link>

                
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
