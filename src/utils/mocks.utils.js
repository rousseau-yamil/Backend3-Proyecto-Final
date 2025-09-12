// import { faker } from "@faker-js/faker";


// export const generateUser = (numUsers) => {
//   const users = [];
//   for (let i = 0; i < numUsers; i++) {
//     const role = faker.helpers.arrayElement(["user", "admin"]);
//     users.push({
//       first_name: faker.name.firstName(),
//       last_name: faker.name.lastName(),
//       email: faker.internet.email(),
//       password: "coder123", // La contraseña se encripta en el controller
//       role: role,
//       pets: [],
//     });
//   }
//   return users;
// };

// //const petTypes= ['perro','gato','pez','pajaro','conejo','hamster','tortuga']

// export const generatePets = (numPets) => {
//   const pets = [];
//   for (let i = 0; i < numPets; i++) {
//     const petTypes = faker.helpers.arrayElement(['perro','gato','pez','pajaro','conejo','hamster','tortuga']);
//     pets.push({
//       name: faker.person.firstName(),
//       specie: petTypes,
//       birthDate: faker.date.past(),
//       adopted: faker.datatype.boolean(),
//     });
//   }
//   return pets;
// };