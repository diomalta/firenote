const User = require('../models/User');
const SubCategory = require('../models/SubCategory');

module.exports = {
  async show(req, res, next) {
    try {
      const { _id } = req.params;

      const user = await User.findOne({ _id });

      if (!user) {
        return res.status(200).json({ message: 'Usuário não existe'});
      }

      const categories = await Promise.all(
        user.categories.map(async category => {
          const subcategories = await SubCategory.find({ categoryId: category._id });
          
          return {
            _id: category._id,
            title: category.title,
            content: category.content,
            color: category.color,
            subCategories: (subcategories.length < 1 ? null : subcategories)
          };
        })
      );
      
      return res.status(200).json({ 
        categories,
        message: 'Todas as categorias e subs foram encontrados com sucesso'
      });
    } catch (err) {
      return next(err);
    }
  },
};