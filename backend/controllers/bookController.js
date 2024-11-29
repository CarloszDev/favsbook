const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao buscar livros' });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao criar livro' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedBook = await Book.findByPk(req.params.id);
      return res.json(updatedBook);
    }
    
    throw new Error('Livro não encontrado');
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao atualizar livro' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.json({ msg: 'Livro removido' });
    }
    
    throw new Error('Livro não encontrado');
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao remover livro' });
  }
};