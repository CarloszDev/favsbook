import React, { useState, useEffect } from 'react';
import api from '../services/api';

function AdminUserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        alert('Erro ao carregar a lista de usuários.');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center bg-dark text-white py-3 rounded">Gestão de Usuários</h2>

      <div className="card bg-light mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-center">Lista de Usuários</h5>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Sim' : 'Não'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUserManagement;
