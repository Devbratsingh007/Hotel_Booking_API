const User = require('../models/UserModel')
const  customErrorHandler = require('../middleware/customErr')
const bcrypt = require('bcrypt')

const register =  async (req,res,next) => {
        const { name, email, password } = req.body;
        if (!name || ! email || !password){
            return res.status(200).json({ msg: "incomplete information" });
        }
        try{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const newUser = new User({ name, email, password: hash });
            await newUser.save();

            res.status(200).json({ msg: "User registered seccessfully" });
        }catch(err){
            next(err);
        }
}



const login = async (req, res, next) => {
        const { email } = req.body;
        try{
            const isExist = await User.findOne({ email });
            if(!isExist) {
                return res.status(401).json({ msg: "Your email and password is wrong" });
            }

            const isPassCorrect = await bcrypt.compareSync(req.body.password, isExist.password);
            if(!isPassCorrect) {
                return res.status(401).json({ msg: "Your email and password is wrong" });
            }

            // const generateToken = jwt.sign({
            //     id: isExist._id,
            //     isAdmin: isExist.isAdmin
            // }, JWT_SECRET, { expiresIn: "3d" });

            const { password, isAdmin, ...otherDetails } = isExist._doc;

            res.status(200).json({...otherDetails});
            
        }catch(err){
            next(err);
        }
}


const updateUser = async (req,res,next)=>{
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
        next(customErrorHandler.wrongCredentials());
    }
  }

const updateUserPassword =async (req,res,next) => {
        try{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            await User.findByIdAndUpdate(req.params.id, { password: hash}, { new: true });
            res.status(200).json({ msg: "Password has been chenged"});
        }catch(err) {
           next(customErrorHandler.wrongCredentials());
        }
}

const deleteUser = async (req,res,next) => {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ msg: "Your account has been deleted"});
        }catch(err) {
            next(err);
        }
}

const getUser = async (req,res,next) => {
        try{
            const userData = await User.findById(req.params.id);
            const { password, __v, ...other} = userData._doc; 
            res.status(200).json(other);
        }catch(err) {
            next(err);
        }
}

const getAllUser =   async(req,res,next) => {
        try{
            const allUser = await User.find();
            res.status(200).json(allUser);
        }catch(err){
            next(err);
        }
}


module.exports = {
    login,
    register,
    updateUser,
    updateUserPassword,
    deleteUser,
    getUser,
    getAllUser
}