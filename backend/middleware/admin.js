module.exports = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ msg: 'Acesso negado. Apenas administradores podem acessar.' });
  }
  next();
};