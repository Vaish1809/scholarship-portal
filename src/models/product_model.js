const { Schema,model} = require("mongoose");

const productSchema = new Schema({
    category:{type:Schema.Types.ObjectId,ref:"Categoy",required:true},
    title:{type:String,required:[true,'title is required']},
    description:{type: String,default:" "},
    provider:{type:Schema.Types.ObjectId,ref:"Provider",required:true},
    price: {type:Number, min:[0,"Invalid Price"],required:true},
    images:{type:Array,default:[]},
    technology:{type:Array,default:[]},
    rating:{type:Number, min:[0,"Invalid Rating"],max: [5,"Invalid Rating"]},
    reviews:{type:Array,default:[]},
    updatedOn: {type:Date},
    createdOn:{type:Date}
})

productSchema.pre('save', function(next){

    this.updatedOn = new Date();
    this.createdOn = new Date();
  
    next();
});

productSchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    const update = this.getUpdate();
    delete update._id;
    this.updatedOn = new Date();
    next();
})



const productModel = model("Product",productSchema);
//Schema is like the blueprint which stores the properties 
// Product is the name of the collection or u can say class
// Model is the instance or object of the class

module.exports =productModel;