import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Navbar() {
  const { user, isAdmin, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-3">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://images.vexels.com/media/users/3/203312/isolated/lists/e1a51c32b1d0e0afc5927d7cfa3d571a-icone-de-livro-aberto-icone-de-livro.png"
            height="36"
            alt="Logo"
            loading="lazy"
            className="me-2"
          />
          FavsBook
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Dashboard
                </Link>
              </li>
            )}
            {/* {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">
                  Gestão de Usuários
                </Link>
              </li>
            )} */}
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center">
            {!user ? (
              <div className="d-flex flex-column flex-lg-row">
                <Link
                  className="btn btn-outline-light me-0 me-lg-2 mb-2 mb-lg-0"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-light"
                  to="/register"
                >
                  Registrar
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center">
                {isAdmin && (
                <>
                  <Link className="btn btn-outline-light me-2" to="/admin/books">
                    Gestão de Livros
                  </Link>
                  {/* <Link className="btn btn-outline-light me-2" to="/admin/users">
                    Gestão de Usuários
                  </Link> */}
                </>
              )}
                <button
                  onClick={logout}
                  className="btn btn-danger"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
