const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ msg: 'Usuário já existe' });

    user = await User.create({ name, email, password });

    const payload = { 
      user: { 
        id: user.id, 
        isAdmin: user.isAdmin 
      } 
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'isAdmin'],
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: 'Credenciais inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciais inválidas' });

    const payload = { 
      user: { 
        id: user.id, 
        isAdmin: user.isAdmin 
      } 
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};