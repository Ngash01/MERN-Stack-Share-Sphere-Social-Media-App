import Users from "../models/User.js";
import bcrypt from "bcrypt";


// Register a new User

export const RegisterUser = async(req, res)=>{

    const salt = await bcrypt.genSalt(3);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    try{
    const newUser = await Users.create({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
        city: req.body.city,
        from: req.body.from
    });

    const {password, ...info} = newUser._doc
    const data = info

    res.status(200).json({data})
    }catch(err){
        res.status(400).send(err)
        console.log(err)
    }
}

// Login

export const Login = async(req, res)=>{
    try{
        const user = await Users.findOne({
            email: req.body.email
        })
        if(!user){
            res.status(404).send("Email does not exist!")
        }else{
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                res.status(400).send("Password mismatch!")
            }else{
                const {password, ...info} = user._doc
                const data = info
                res.status(200).send({data})
            }
        }
    }
    catch(err){
        res.status(400).send(err)
    }
}


// 400 - Bad request
// 404 - not found