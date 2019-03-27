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
      
      const objectId = new ObjectId();
      subCategory.anotations.push({ 
        ...req.body,
        _id: objectId
      });

      await subCategory.save();

      return res.status(200).json({ 
        subCategory,
        anotation: { ...req.body, _id: objectId },
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
        if(String(post._id) === postId) return post;
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

  async update(req, res, next) {
    try {
      const { _id, title, content, idAnotation } = req.body;
      
      const subCategory = await SubCategory.findOne({ _id });

      if (!subCategory) {
        return res.status(200).json({ message: 'Sub categoria não encotrada' });
      }

      const post = await Promise.all(subCategory.anotations.map(post => {
        if(String(post._id) === idAnotation) {
          post.title = title;
          post.content = content;
        }
        return post;
      }));

      subCategory.anotations = post;
      subCategory.markModified('anotations'); 
      await subCategory.save();
      
      return res.status(200).json({ 
        subCategory,
        message: 'Anotação atualizada'
      });
    } catch (err) {
      return next(err);
    }
  },
};