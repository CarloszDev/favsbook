import React, { useState, useEffect } from 'react';
import api from '../services/api';

function AdminBookManagement() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '', author: '', description: '', coverUrl: ''
  });

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await api.get('/books');
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/books', newBook);
      setBooks([...books, res.data]);
      setNewBook({ title: '', author: '', description: '', coverUrl: '' });
    } catch (err) {
      alert('Erro ao adicionar livro');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      alert('Erro ao excluir livro');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center bg-dark text-white py-3 rounded">Gestão de Livros</h2>

      <div className="card bg-light mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-center">Adicionar Novo Livro</h5>
          <form onSubmit={handleAddBook} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Título"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Autor"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                required
              />
            </div>
            <div className="col-12">
              <textarea
                className="form-control"
                placeholder="Descrição"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                required
              />
            </div>
            <div className="col-12">
              <input
                type="url"
                className="form-control"
                placeholder="URL da Capa"
                value={newBook.coverUrl}
                onChange={(e) => setNewBook({ ...newBook, coverUrl: e.target.value })}
                required
              />
            </div>
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success">Adicionar Livro</button>
            </div>
          </form>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map(book => (
          <div className="col" key={book.id}>
            <div className="card h-100">
              <img
                src={book.coverUrl || 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'}
                className="card-img-top"
                alt={book.title}
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  <strong>Autor:</strong> {book.author}
                  <br />
                  <strong>Descrição:</strong> {book.description}
                </p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <button
                  className="btn btn-danger w-100"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBookManagement;
