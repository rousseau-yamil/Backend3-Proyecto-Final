import { faker } from '@faker-js/faker';

import bcrypt from 'bcrypt'

// const passwordhash= bcrypt.hashSync("coder123",10) // la contraseña es unica 

export const generateUser = async(numUsers) => {
    console.log('generando usuarios')


    const users = [];
    const password = 'coder123'
    const passwordhash = await bcrypt.hash(password,10)

  for (let i = 0; i < numUsers; i++) {
      const role = faker.helpers.arrayElement(["user", "admin"]);
      const newUser = {
        id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password:passwordhash,
        role: role,
        pets: [],
        //image:faker.internet.avatar()
    }
    users.push(newUser);
  }
  return users;
};

//const petTypes= ['perro','gato','pez','pajaro','conejo','hamster','tortuga']

export const generatePets = async (numPets) => {
    console.log('generando mascotas')
  const pets = [];
  for (let i = 0; i < numPets; i++) {
      const petTypes = faker.helpers.arrayElement(['perro','gato','pez','pajaro','conejo','hamster','tortuga']);
    const newPet = {
        // _id :faker.string.uuid(),
        id: faker.database.mongodbObjectId(),
        name: faker.person.firstName(),
        specie: petTypes,
        birthDate: faker.date.past(),
        adopted: faker.datatype.boolean(),
        image:faker.image.urlLoremFlickr({category:'pets'})
    }
    pets.push(newPet);
  }
  return pets;
};

