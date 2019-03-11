const mongoose = require('mongoose');
const SubCategory = require('../models/SubCategory');

const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  async store(req, res, next) {
    try {
      const { _id } = req.body;

      const subCategory = await SubCategory.findOne({ _id });

      if (!subCategory) {
        return res.status(200).json({ message: 'Sub categoria não encotrada' });
      }
      
      subCategory.anotations.push({ 
        ...req.body,
        _id: new ObjectId()
      });

      await subCategory.save();

      return res.status(200).json({ 
        subCategory,
        anotation: { ...req.body },
        message: 'Anotação criada com sucesso'
      });
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { _id, postId } = req.params;
      
      const subcategory = await SubCategory.findOne({ _id });

      if (!subcategory) {
        return res.status(200).json({ message: 'Sub categoria não encotrada' });
      }

      const { anotations } = subcategory;
      const post = await Promise.all(anotations.map(post => {
        if(String(post._id)=== postId) return post;
      }));
      
      return res.status(200).json({ 
        post,
        subcategory,
        message: 'Anotação encontrada'
      });
    } catch (err) {
      return next(err);
    }
  },
};