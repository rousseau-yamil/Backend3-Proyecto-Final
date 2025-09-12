import { usersService } from "../services/index.js"
import { generateToken } from "../utils/jwt.js";

//validacion ObjectId de mongoose 
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// const createUser = async(req,res)=>{
//     const user = await usersService.create();
//     res.send({status:"success",payload:user})
// }


const getAllUsers = async(req,res)=>{
    try {
        const users = await usersService.getAll();
        res.status(200).send({status:"success",payload:users})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    try {
        
        const user = await usersService.getUserById(userId);

        //validacion objectId de usuario inexistente

        console.log(user)
        // if(!user) return res.status(404).send({status:"error",error:"User not found"})
        if(!user ){
            return res.status(404).send({status:"error", error:"User not found"});
        }
        res.status(200).send({status:"success",payload:user})
    } catch (error) {
        if (error.kind === 'ObjectId') {
             return res.status(404).json({ status: "error", error: "User not found" });
        }
        res.status(500).json({error: error.message})
    }
}

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    try {
        const user = await usersService.getUserById(userId);
        
        if(!user) return res.status(404).send({status:"error", error:"User not found"})
        const result = await usersService.update(userId,updateBody);
        res.status(200).send({status:"success",message:"User updated"})
        
    } catch (error) {
        if (error.kind === 'ObjectId') {
             return res.status(404).json({ status: "error", error: "User not found" });
        }
        res.status(500).json({error: error.message})       
    }
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    try {
        const result = await usersService.getUserById(userId);
        res.status(200).send({status:"success",message:"User deleted"})
    } catch (error) {
        if (error.kind === 'ObjectId') {
             return res.status(404).json({ status: "error", error: "User not found" });
        }
        res.status(500).json({error: error.message})
    }
}

// const register = async(req,res)=>{
//     let { first_name, last_name, email, password, ...resto } = req.body
//     const Newusuario = req.user
//     if(!first_name || !last_name || !email || !password) return res.status(400).send({status: 'error', message: 'deben venir todos los campos requeridos'})
//     try {
//         console.log("usuario creado", Newusuario)
//         //token
//         const token = generateToken(Newusuario)

//         //guardar cookie firmada
//         res.cookie('cookieToken', token,{
//             httpOnly:true,
//             signed:true,
//             maxAge:24*60*60*1000
//         })

//         res.status(201).json({
//             message: 'Usuario registrado',
//             user:Newusuario
//         })

//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }


// const login = async(req,res)=>{
//     try {
//         const {email,password} = req.body
//         const user = await userser
//     } catch (error) {
        
//     }
// }


export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}