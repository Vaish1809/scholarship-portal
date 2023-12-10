const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");
//multiple functions
const UserController = {
  createAccount: async function (req, res) {
    try {
      const userData = req.body;
      //create a new user through the user data
      const newUser = new UserModel(userData);
      await newUser.save();
      return res.json({ success: true, message: "User Created", data: newUser });
    } catch (err) {
      return res.json({ success: false, message: err });
    }
  },

  signIn: async function(req,res){
    try{
         const {email,password}= req.body;//taking up only email and pass from the user
         const foundUser = await UserModel.findOne({email: email});//find the user whose email = entered email
         if(!foundUser){
            return res.json({ success: false, message: "User not found" });
         }
         const passwordMatched  = bcrypt.compareSync(password,foundUser.password)//comparing the hash values of (the entered or res password, the pass of the user we matched with the email in our database)
         if(!passwordMatched){
            return res.json({ success: false, message: "Incorrect Password" });
         }
         return res.json({success:true , data:foundUser,message:"Account fetched"});
    }catch(err){
        return res.json({ success: false, message: err });
    }
  }
};

module.exports = UserController;
