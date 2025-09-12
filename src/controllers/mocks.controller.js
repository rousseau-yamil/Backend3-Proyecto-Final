
import { Router } from "express";
//import { faker } from "@faker-js/faker";
//import { usersService, petsService } from "../services/index.js";
import mongoose from 'mongoose';
import { generateUser,generatePets } from '../utils/generate.js';
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";



const router = Router();

export const generateData = async (req,res)=>{
    const {users,pets} = req.body
    console.log('entrando a generatedata')
    // if(typeof users!=='number'|| typeof pets !== 'number'|| !Number.isInteger(users)||!Number.isInteger(pets)||users<=0||pets<=0){
    //     return res.status(400).send({status:'error',message:'Hubo un error en los parametros solicitados, deben ser numeros'})
    // }
    try {
        const mockUsers = []
        const mockPets = []
        for (let i = 0; i < pets; i++) {
            console.log('entrando en for pets')
            const petgen = await generatePets(1)
            console.log(petgen)
            mockPets.push(...petgen);
            
        }
        for (let index = 0; index < users; index++) {
            const usergen = await generateUser(1)
            console.log(usergen)
            mockUsers.push(...usergen);
            
        }
        await userModel.insertMany(mockUsers)
        await petModel.insertMany(mockPets)

        res.status(201).send({status:'success',message:`${users} usuarios y ${pets} mascotas insertados correctamente`})
    } catch (error) {
        res.status(500).send({status:'error',message:'Error al insertar datos en la base de datos'})
    }
}

export const getUsers = async (req,res)=>{
    try {
        const users = await userModel.find({})
        res.json(users)
    } catch (error) {
        res.status(500).send({status:'error',message:'Error al buscar usuarios en la base de datos'})
    }
}
export const getPets = async (req,res)=>{
    try {
        const pets = await petModel.find({})
        res.json(pets)
    } catch (error) {
        res.status(500).send({status:'error',message:'Error al buscar usuarios en la base de datos'})
    }
}


export default router;