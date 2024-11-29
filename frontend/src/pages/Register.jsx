import React, { useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Register() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', userData);
      alert('Usuário registrado com sucesso');
      await login(userData.email, userData.password);
      navigate('/');
    } catch (err) {
      alert('Erro no registro');
    }
  };

  return (
    <section className="background-radial-gradient vh-100 overflow-hidden">
      <style>
        {`
          .background-radial-gradient {
            background-color: hsl(98, 41%, 15%);
            background-image: radial-gradient(650px circle at 0% 0%,
                hsl(98, 41%, 35%) 15%,
                hsl(98, 41%, 30%) 35%,
                hsl(98, 41%, 20%) 75%,
                hsl(98, 41%, 19%) 80%,
                transparent 100%),
              radial-gradient(1250px circle at 100% 100%,
                hsl(98, 41%, 45%) 15%,
                hsl(98, 41%, 30%) 35%,
                hsl(98, 41%, 20%) 75%,
                hsl(98, 41%, 19%) 80%,
                transparent 100%);
          }

          #radius-shape-1 {
            height: 220px;
            width: 220px;
            top: -60px;
            left: -130px;
            background: radial-gradient(#6bcf08, #3d7804);
            overflow: hidden;
          }

          #radius-shape-2 {
            border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
            bottom: -60px;
            right: -110px;
            width: 300px;
            height: 300px;
            background: radial-gradient(#6bcf08, #3d7804);
            overflow: hidden;
          }

          .bg-glass {
            background-color: hsla(0, 0%, 100%, 0.9) !important;
            backdrop-filter: saturate(200%) blur(25px);
          }
        `}
      </style>

      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(98, 81%, 95%)' }}>
              Bem-Vindo a BookFav <br />
              <span style={{ color: 'hsl(98, 81%, 75%)' }}>Crie sua conta</span>
            </h1>
            <p className="mb-4 opacity-70" style={{ color: 'hsl(98, 81%, 85%)' }}>
            Uma plataforma dedicada aos amantes da leitura, onde você pode compartilhar seus livros favoritos, descobrir o que outros leitores estão lendo e receber recomendações personalizadas. Explore novos mundos literários e conecte-se com uma comunidade apaixonada por histórias. 
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12 mb-4">
                      <div className="form-outline">
                      <label className="form-label" htmlFor="form3Example1">Nome</label>
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control"
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          required
                        />
                        
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">Email</label>
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      required
                    />
                    
                  </div>

                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4">Senha</label>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block mb-4">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
