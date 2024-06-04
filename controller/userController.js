const Models = require("../models")
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
let secret = "7732487129"

const Users = Models.users;

//Create Data
const addData = async (req,res) => {

    try{
        const data=req.body;

        // //Salt
        // const salt = crypto.randomBytes(16).toString('hex');
        // //Hash the pswrd with salt
        // const hashedPassword = crypto.createHmac('sha256', salt)
        //                              .update(upassword)
        //                              .digest('hex');

        await Users.findAll({
            where:{
                email:req.body.email
            }
        })

        .then(async(values) => {
            if(values.length==0){
                await Users.create(data)
                .then(async(val) => {
                    let token = jsonwebtoken.sign({
                        id: val.id
                    }, secret, {expiresIn:"2h"} )
                    await Users.update(
                        {token:token},
                        {where:{id:val.id}}
                    )
                    res.json({message:"Successful", data:{id:val.id, token:token}})

                })
                
            }
            else{
                res.json({message:"Email have already register"})

            }
        })
        .catch((error) => {
            res.send(error)
        } ) 
        // await Users.create(data);
        // res.status(200).send("Data added Successfully");
    }
   
    catch(err){
    console.error(err);
    res.status(500).send(err)
    }
}

//For login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await Users.findOne({ where: { email: email } });

        // Log the password sent in the request
        console.log('Password sent in the request:', password);

        // Log the hashed password retrieved from the database
        console.log('Hashed password from the database:', user.password);

        // If user not found
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

         // Temporarily compare passwords in plain text (for debugging)
         if (password !== user.password) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // If username and password are valid, return success response
        return res.status(200).json({ message: "Login successful." });
    } catch (err) {
        console.error("Login error:", err);
        // Handle other errors
        return res.status(500).json({ message: "Internal server error." });
    }
};

//get all users
const getAllUsers = async(req,res) => {
    try{
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal Server Error"});
    }
};

//User Details Update
const updateUser = async (req,res) => {
    const { userId } = req.params;
    const { name, phonenumber, email,password } = req.body;
    try{
        const user = await Users.findByPk(userId);
        if(!user){
            return res.status(404).json({ message: "User Not Found"});
        }

        //update user details
        user.name = name;
        user.phonenumber = phonenumber;
        user.email = email;
        user.password = password;
        
        await user.save();

        res.status(200).json({message:"User Details updated successfully"});
    } catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

//Delete User
const deleteUser = async (req,res) => {
    const { userId } = req.params;
    try{
        console.log('Delete user Id:', userId);
        const user = await Users.findByPk(userId);
        console.log('user Found:', user);
        if(!user){
            return res.status(404).json({message: "User Not Found"});
        }

        await user.destroy();

        res.status(200).json({message:"User Deleted Successfully"});
    } catch(err){
        console.error(err);
        res.status(500).json({ message:"Internal server Error"})
    }
}
module.exports ={
    addData,
    userLogin,
    getAllUsers,
    updateUser,
    deleteUser
}
