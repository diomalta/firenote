const SubCategory = require('../models/SubCategory');

module.exports = {
  async store(req, res, next) {
    try {
      const subCategory = await SubCategory.create({ ...req.body });
      
      return res.status(200).json({ 
        subCategory,
        message: 'Sub categoria criada com sucesso'
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { _id, title, content, color } = req.body;
      
      const subCategory = await SubCategory.findOne({ _id });
      if(!subCategory) {
        return res.status(400).json({ message: 'Subcategoria não encontrada' });
      }

      subCategory.title = title;
      subCategory.content = content;
      subCategory.color = color;

      await subCategory.save();

      return res.status(200).json({ 
        subCategory,
        message: 'Sub categoria criada com sucesso'
      });
    } catch (err) {
      return next(err);
    }
  },

  async showAll(req, res, next) {
    try {
      const { _id } = req.params;
      
      let subCategory = await SubCategory.findOne({ _id });

      if (!subCategory) {
        return res.status(200).json({ message: 'Sub categoria não encontrada' });
      }
      
      if (subCategory.anotations.length < 1) subCategory.anotations = null;

      return res.status(200).json({ 
        subCategory,
        message: 'Sub categoria criada com sucesso'
      });
    } catch (err) {
      return next(err);
    }
  },
};