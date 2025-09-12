import { Router } from 'express';

const router = Router();
import { generateUser,generatePets } from '../utils/generate.js';
import {getUsers,getPets ,generateData } from '../controllers/mocks.controller.js';

router.get("/mockingpets", async (req, res) => {
  const pets = await generatePets(50); 
  res.send({ status: "success", payload: pets });
});

router.get("/mockingusers",async (req, res) => {
  const users = await generateUser(50);
  res.send({ status: "success", payload: users });
});

// Obtener todos los usuarios desde la DB
router.get("/users", getUsers);
// Obtener todos las mascotas desde la DB
router.get("/pets", getPets);


// Generar e insertar usuarios y mascotas en la DB
// Espera body: { "users": 5, "pets": 10 }
router.post("/generateData", generateData);

export default router;
