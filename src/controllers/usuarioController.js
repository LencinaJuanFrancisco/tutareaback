
import { generateAccessToken } from "../helpers/generateAccessToken.js";
import { hashPassword,comparePassword } from "../helpers/hashPassword.js";
import { validateIdParamas } from "../helpers/validateIdParamas.js";

import { User } from "./../Schemas/Users.js";

const usuario = {
  listarTodos: async (req, res) => {
    try {
      const allUsers = await User.find();
      allUsers.length > 0 ?  res.status(200).json({ message: "Listado", data: allUsers })
                          :  res.status(200).json({ message: "Aun no hay registros de Usuarios" })
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  listarUno: async (req, res) => {
    const { id } = req.params;

    try {
      if (validateIdParamas(id)) {
        const rta = await User.findById(id);
        rta
          ? res.status(200).json({ data: rta })
          : res.status(401).json({ message: "Registro no encontrado" });
      }
      res.status(400).json({ message: "Formato del ID no valido" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  crear: async (req, res) => {
    const data = req.body;

    try {
      const passHas = await hashPassword(data.password);
      const newUser = new User({ ...data, password: passHas });
      const saveUser = await newUser.save();
      res.status(200).json({
        message: "usuario creado",
        data: saveUser,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  editar: async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    try {
      if (validateIdParamas(id)) {
        const upDateUser = await User.findByIdAndUpdate(id, body, {
          new: true,
        });

        upDateUser != null
          ? res.status(200).json({ message: "Editado", data: upDateUser })
          : res.status(401).json({ message: "Usuario no encontrado" });
      }
      res.status(400).json({ message: "Formato del ID no valido" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  borrar: async(req, res) => {
    const {id} = req.params
    try {
      if (validateIdParamas(id)) {
        const rta = await User.findByIdAndDelete(id)
        rta ? res.status(200).json({message:`Usuario con ID ${id} sue eliminado`})
            : res.status(401).json({message: "Usuario no encontrado"})
      }
      res.status(400).json({message:"Formato del ID no valido"})
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  login:async (req,res)=>{
    
    const {email, password} = req.body
    console.log("log del body paramas", email , password);
    try {
        const findUser = await User.find({email:email})
        console.log('findUsers',findUser);
        if (findUser.length > 0) {
          //una vez encontrado el usuario , comparo las password
          const rta = await comparePassword(password,findUser[0].password)
          // rta es boolean
          console.log("rta de compare" , rta);
          if (rta === true) {
              //si rta es true , genero el JWT
              const jwtUser = await generateAccessToken(findUser[0].name)
              console.log('log del token',jwtUser);
              return res.header('autorizado',jwtUser).json({
                message:"Usuario autenticado",
                token: jwtUser
              })
          }else{
            console.log("else de la respuesta de rta");
          return  res.status(401).json({message:"LAS CREDENCIALES NO SON CORRECTAS"})

          }
        }
       return res.status(401).json({message:"Usuario no encontrado"})
    } catch (error) {
      console.log('entro al catch de login -------lpm',error);
      res.status(400).json({ message: error.message });
    }
  }
};
export default usuario;
