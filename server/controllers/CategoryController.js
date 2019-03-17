const mongoose = require('mongoose');

const User = require('../models/User');
const SubCategory = require('../models/SubCategory');
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
  async update(req, res, next) {
    try {
      const { _id, title, content, email } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        return res.json({ message: 'Usuário não encontrado' });
      }
      
      const changeCategories = await Promise.all(user.categories.map(async category => {        
        if (!(_id === String (category._id))) return category;
        const subcategories = await SubCategory.find({ categoryId: category._id });
        
        category.title = title || category.title;
        category.content = content || category.content;
        category.subCategories = subcategories.length < 1 ? null : subcategories;

        return category;
      }));
      
      user.categories = changeCategories;
      
      user.save();

      return res.json({ categories: changeCategories });
    } catch (err) {
      return next(err);      
    }
  },
};