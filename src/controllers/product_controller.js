const productModel = require("../models/product_model");

const ProductController = {
  createProduct: async function (req, res) {
    try {
      const productData = req.body;
      const newProduct = new productModel(productData);
      await newProduct.save();

      return res.json({
        success: true,
        message: "Product created",
        data: productData,
      });
    } catch (err) {
      return res.json({ success: false, messsage: err });
    }
  },

  fetchAllProducts: async function (req, res) {
    try {
      const products = await productModel.find().populate("category.title");
      return res.json({ success: true, data: products });
    } catch (err) {
      return res.json({ success: false, messsage: err });
    }
  },
  fetchProductById: async function (req, res) {
    try {
        const id = req.params.id;
      const foundProduct = await productModel.findById(id).populate("category.title");
      if(!foundProduct){
        return res.json({ success: false, messsage:"Product not found" }); 
      }
      return res.json({ success: true, data: foundProduct});
    
    } catch (err) {
      return res.json({ success: false, messsage: err });
    }
  },
fetchProductByCateogory:async function(req,res){
    try{
const CategoryId = req.params.id;
const products = await productModel.find({category : CategoryId}).populate("category.title");
return res.json({ success: true, data: products });
    }catch(err){
return res.json({success:false,message:err})
    }
},
fetchProductByProvider:async function(req,res){
  try{
const ProviderId = req.params.id;
const products = await productModel.find({provider : ProviderId}).populate("category.title");
return res.json({ success: true, data: products });
  }catch(err){
return res.json({success:false,message:err})
  }
}
};
module.exports = ProductController;