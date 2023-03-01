import { generateAccessToken } from "../helpers/generateAccessToken.js";
import { hashPassword, comparePassword } from "../helpers/hashPassword.js";
import { validateIdParamas } from "../helpers/validateIdParamas.js";


import { User } from "./../Schemas/Users.js";

const usuario = {
  listarTodos: async (req, res) => {
    try {
      const allUsers = await User.find().select("-password");
      allUsers.length > 0
        ? res.status(200).json({ message: "Listado", data: allUsers })
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
          ? res.status(200).json({ data: rta })
          : res.status(401).json({ message: "Registro no encontrado" });
      }
      return res.status(400).json({ message: "Formato del ID no valido" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  crear: async (req, res) => {
    const {email} = req.body;

    try {
      //validamos que no tengamos un usuario con el mismo email
      const userExists = await User.findOne({email})

      if(userExists) return res.status(401).json({message:"Usuario ya registrado"})

      const data =  req.body
      const passHas = await hashPassword(data.password);
      const newUser = new User({ ...data, password: passHas });
      const saveUser = await newUser.save();

      return res.status(200).json({message: "usuario creado",data: saveUser});
    } catch (error) {
      return res.status(400).json({ message: error.message });
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

        if (upDateUser != null) {
          return res.status(200).json({ message: "Editado", data: upDateUser });
        }
        return res.status(401).json({ message: "Usuario no encontrado" });
      }
      return res.status(400).json({ message: "Formato del ID no valido" });
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
            .json({ message: `Usuario con ID ${id} sue eliminado` });
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
          const {token,expiresIn} = await generateAccessToken(findUser[0].id);
          // console.log('log del token',jwtUser);
        
          return res.header("autorizado", token).json({
            message: "Usuario autenticado",
            token,expiresIn,id:findUser[0].id
          });
        } else {
       
          //utilizamos el mismo msg para indicar al usuario el error pero sin dar pistas si es el usuario o el password el incorrecto
          return res
            .status(401)
            .json({ message: "Usuario no encontrado" });
        }
      }
      return res.status(401).json({ message: "Usuario no encontrado" });
    } catch (error) {
      console.log("log del chatch de login", error);
      res.status(400).json({ message: error.message });
    }
  },
  //recuperacion de datos del usuario por token
  giu:async(req,res)=>{
    try {
      //con select("-password") traemos todos los datos menos el password del usuario 
      const user = await User.findById(req.uid).select("-password")
     
      console.log(user);
      return res.status(200).json({user})
    } catch (error) {
      
    }
  }
};
export default usuario;
