const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  async signup(req, res, next) {
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.status(200).json({ message: 'Email já cadastrado'});
      }
      const password = await bcrypt.hash(req.body.password, 5);

      const user = await User.create({ ...req.body, password });

      return res.status(200).json({ 
        user,
        message: 'Usuário cadastrado com sucesso'
      });
    } catch (err) {
      return next(err);
    }
  },

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(200).json({ message: 'Email não cadastrado'});
      }
      
      if (!await bcrypt.compare(password, user.password)) {
        return res.status(200).json({ message: 'Senha incorreta' });
      }

      return res.status(200).json({ 
        user,
        token: user.generateToken(),
        message: 'Login efetuado com sucesso'
      });
    } catch (err) {
      return next(err);
    }
  },
};