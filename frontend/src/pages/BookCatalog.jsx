import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await api.get('/books');
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container rounded p-2">
      <Navbar />
      <div className="row m-3">
        <div className="input-group rounded mb-4">
          <input 
            type="search" 
            className="form-control rounded" 
            placeholder="Pesquisar..." 
            aria-label="Search" 
            aria-describedby="search-addon" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {filteredBooks.map(book => (
          <div key={book._id} className="col-md-3 d-flex justify-content-center">
            <div
              className="card mb-4"
              style={{
                height: '450px',
                width: '320px',
                overflow: 'hidden',
                border: '1px solid #6bcf08',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              <img
                src={book.coverUrl}
                alt={book.title}
                className="card-img-top"
                style={{
                  height: '280px',
                  objectFit: 'contain',
                  borderTopLeftRadius: '15px',
                  borderTopRightRadius: '15px',
                }}
              />
              <div className="card-body">
                <h5
                  className="card-title text-success"
                  style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
                >
                  {book.title}
                </h5>
                <p className="card-text" style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
                  {book.author}
                </p>
                <p
                  className="card-text"
                  style={{
                    fontSize: '0.85rem',
                    color: '#555',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {book.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookCatalog;
