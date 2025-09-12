
import GenericRepository from "./GenericRepository.js";
import Userdao from "../dao/Users.dao.js"



export default class UserRepository extends GenericRepository{
    constructor(){
        const dao = new Userdao()
        super(dao);
    }
    
    
    getUserByEmail = (email) =>{
        return this.getBy({email});
    }
    getUserById = (id) =>{
        return this.getBy({_id:id})
    }
    
    createUser = (userData) =>{
        return this.create({userData})
    }
    updateUser = (id, updateData) =>{
        return this.update({_id:id, updateData})
    }
    deleteUser = (id)=>{
        return this.delete({_id:id})
    }
}