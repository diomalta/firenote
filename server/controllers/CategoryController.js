const mongoose = require('mongoose');

const User = require('../models/User');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  async store(req, res, next) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(200).json({ message: 'Usuário não encontrado'});
      }
      
      const _id = new ObjectId();
      user.categories.push({
        ...req.body,
        _id,
      });

      await user.save();

      return res.status(200).json({ 
        category: { ...req.body, _id },
        message: 'Categoria criada com sucesso'
      });
    } catch (err) {
      return next(err);
    }
  },
};