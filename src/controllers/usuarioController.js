import { generateAccessToken } from "../helpers/generateAccessToken.js";
import { hashPassword, comparePassword } from "../helpers/hashPassword.js";
import { validateIdParamas } from "../helpers/validateIdParamas.js";

import {ObjectId} from 'mongodb'

import { User } from "./../Schemas/Users.js";
import {Proyect} from './../Schemas/Proyect.js'  
import {Task} from './../Schemas/Task.js'

const usuario = {
  listarTodos: async (req, res) => {
    try {
      const allUsers = await User.find().select("-password");
      allUsers.length > 0
        ? res.status(200).json({status:200, message: "Listado", data: allUsers })
        : res.status(200).json({ message: "Aun no hay registros de Usuarios" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  listarUno: async (req, res) => {
    const { id } = req.params;

    try {
      if (validateIdParamas(id)) {
        const rta = await User.findById(id).select("-password");
        return rta
          ? res.status(200).json({status:200, data: rta })
          : res.status(401).json({ message: "Registro no encontrado" });
      }
      return res.status(400).json({ message: "Formato del ID no valido" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  crear: async (req, res) => {
    console.log("estoy viniendo del frente 😉 😉 😉 😉 ",req.body);
    const { email } = req.body;

    try {
      //validamos que no tengamos un usuario con el mismo email
      const userExists = await User.findOne({ email });

      if (userExists)
        return res.status(401).json({ message: "Usuario ya registrado" });

      const data = req.body;
      const passHas = await hashPassword(data.password);
      const newUser = new User({ ...data, password: passHas });
      const saveUser = await newUser.save();

      return res
        .status(200)
        .json({ status:200,message: "usuario creado", data: saveUser });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  editar: async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    try {
      if (!validateIdParamas(id)) {
        return res.status(400).json({ message: "Formato del ID no valido" });
      }
      const upDateUser = await User.findByIdAndUpdate(id, body, {
        new: true,
      });

        if (upDateUser === null) {
          return res.status(401).json({ message: "Usuario no encontrado" });
        }
        return res.status(200).json({status:200, message: "Editado", data: upDateUser });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  borrar: async (req, res) => {
    const { id } = req.params;
    try {
      if (validateIdParamas(id)) {
        const rta = await User.findByIdAndDelete(id);
        if (rta)
          return res
            .status(200)
            .json({status:200, message: `Usuario con ID ${id} sue eliminado` });
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      return res.status(400).json({ message: "Formato del ID no valido" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    //console.log("log del body paramas", email , password);
    try {
      const findUser = await User.find({ email: email });
      // console.log('findUsers',findUser);
      if (findUser.length > 0) {
        //una vez encontrado el usuario , comparo las password
        const rta = await comparePassword(password, findUser[0].password);
        // rta es boolean
        // console.log("rta de compare" , rta);
        if (rta === true) {
          //si rta es true , genero el JWT
          const { token, expiresIn } = await generateAccessToken(
            findUser[0].id
          );
          // console.log('log del token',jwtUser);

          return res.status(200).json({
            status:200,
            message: "Usuario autenticado",
            token,
            expiresIn,
            id: findUser[0].id,
          });
        } else {
          //utilizamos el mismo msg para indicar al usuario el error pero sin dar pistas si es el usuario o el password el incorrecto
          return res.status(401).json({ message: "Usuario no encontrado" });
        }
      }
      return res.status(401).json({ message: "Usuario no encontrado" });
    } catch (error) {
     // console.log("log del chatch de login", error);
      res.status(400).json({ message: error.message });
    }
  },
  //recuperacion de datos del usuario por token
  giu: async (req, res) => {
    try {
      //con select("-password") traemos todos los datos menos el password del usuario
      const user = await User.findById(req.uid).select("-password");

      return res.status(200).json(user);
    } catch (error) {}
  },
  tareasPorUsuarios:async(req,res)=>{
      const {id}= req.params
      try {
        
        if(!validateIdParamas(id)) return  res.status(400).json({ message: "Formato del ID no valido" });

        const allTask = await Task.find()
        //console.log(allTask);
        if(allTask.length <= 0) return res.status(400).json({message:"Aun no hay tareas"})
        
        const taskByUser =  allTask.filter(task => task.userCreateTask == id)
        //console.log("Tareas por usuarios",taskByUser);
        taskByUser.length > 0 ? res.status(200).json({taskByUser})
                              : res.status(200).json({message:"Aún no tienes tareas asignadas"})  

      } catch (error) {
        return res.status(401).json({messaga:"error en usuarioController metodo tareaPorUsuario",error:error.message})
      }

  },
  proyectosPorUsuarios:async(req,res)=>{
    const {id}= req.params
    try {
      
      if(!validateIdParamas(id)) return  res.status(400).json({ message: "Formato del ID no valido" });

      const allProyect = await Proyect.find();
      //console.log(allProyect);
      if(allProyect.length <= 0) return res.status(400).json({message:"Aún no hay proyectos creados"})
      // se filtra el proyecto y devuelve los proyectos en la que son creadores o colaboradores pro => 
      const proyectByUser =  allProyect.filter(pro=> pro.createUser == id || pro.collaborator.some(c => ObjectId(c.id).equals(ObjectId(id))) )
     
      //console.log("Proyectos por usuarios",proyectByUser.length);
    
      proyectByUser.length > 0 ? res.status(200).json(proyectByUser)
                               : res.status(200).json({message:"Aún no tienes Proyecto creados o estes como colaborador de algun proyecto"})  

    } catch (error) {
      return res.status(401).json({messaga:"error en usuarioController metodo proyectPorUsuario",error:error.message})
    }
  }
};
export default usuario;
