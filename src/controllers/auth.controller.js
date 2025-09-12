import bcrypt from 'bcrypt';
import UserRepository from '../repository/UserRepository.js'; // Ajusta la ruta si es necesario
import { generateToken } from '../utils/jwt.js';
import userDao from '../dao/Users.dao.js'
import { usersService } from '../services/index.js';


// Asumiendo que tu DAO existe y tu UserRepository está inicializado
const userRepository = new UserRepository(userDao);

//  Usa una variable de entorno para la clave secreta en producción
//const JWT_SECRET = 'mi_clave_secreta_super_segura';

export const register = async (req, res) => {
//   const { email, password, name } = req.body;
    let { first_name, last_name, email, password, ...resto } = req.body
    const newUser = req.user
    if(!first_name || !last_name || !email || !password) return res.status(400).send({status: 'error', message: 'deben venir todos los campos requeridos'})
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({ status: 'error', message: 'El usuario ya existe' });
    }

  try {

    // Hashear la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      ...resto
       // Guarda la contraseña hasheada
    };
    
    
    //const createdUser = await userRepository.createUser(newUser);
    const createdUser = await usersService.create(newUser)
    //const userObj = createUser.toObject();

    // console.log(createUser)
    // const token = generateToken(createUser)
    // //console.log(createdUser)
    // res.cookie('cookieToken',token,{
    //     httpOnly: true,
    //     signed: true,
    //     maxAge: 24 * 60 * 60 * 1000,
    // })
        const userObj = createdUser.toObject();
        console.log(userObj)
        delete userObj.password; // no enviamos la contraseña

        const token = generateToken({
            _id: userObj._id,
            first_name:userObj.first_name,
            email: userObj.email,
            role: userObj.role
        }); 

    res.status(201).json({ status: 'success',payload: userObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userRepository.getUserByEmail(email) || null;
    if (!user || user.length === 0) {
      return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    }

    const payload = {
        _id: user._id,
        email:user.email,
        fist_name:user.fist_name,
        role:user.role,
        petsID:user.petsID
    }
    const token = generateToken(payload)

    res.cookie('cookieToken',token,{
        httpOnly:true,
        signed:true,
        maxAge:24*60*60*1000,
    })
    // Comparar la contraseña ingresada con la contraseña hasheada en la BD
    // const isMatch = await bcrypt.compare(password, user[0].password);

    // Generar un JWT si las credenciales son correctas
    // const token = jwt.sign({ id: user[0]._id, email: user[0].email }, JWT_SECRET, { expiresIn: '1h' });

    // res.status(200).json({ status: 'success', message: 'Login exitoso', token });
    res.status(200).json({ status: 'success', message: `Bienvenid@ ${user.first_name} Login exitoso ` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en el servidor' });
  }
};