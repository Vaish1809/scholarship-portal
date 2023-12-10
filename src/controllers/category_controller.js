const categoryModel = require("../models/category_model");

const CategoryController = {
  createCategory: async function (req, res) {
    try {
      const categoryData = req.body;
      const newCategory = new categoryModel(categoryData);
      await newCategory.save();

      return res.json({
        success: true,
        message: "Category created",
        data: categoryData,
      });
    } catch (err) {
      return res.json({ success: false, messsage: err });
    }
  },

  fetchAllCategories: async function (req, res) {
    try {
      const categories = await categoryModel.find();
      return res.json({ success: true, data: categories });
    } catch (err) {
      return res.json({ success: false, messsage: err });
    }
  },
  fetchCategoryById: async function (req, res) {
    try {
        const id = req.params.id;
      const foundCategory = await categoryModel.findById(id);
      if(!foundCategory){
        return res.json({ success: false, messsage:"Category not found" }); 
      }
      return res.json({ success: true, data: foundCategory });
    
    } catch (err) {
      return res.json({ success: false, messsage: err });
    }
  },
};
module.exports = CategoryController;
