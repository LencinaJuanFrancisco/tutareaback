import { findRegister } from "../helpers/find.js";
import { hashPassword } from "../helpers/hashPassword.js";

import { User } from "./../Schemas/Users.js";

const usuario = {
  listarTodos: async (req, res) => {
    const allUsers = await User.find();
    res.status(200).json({
      message: "Listado",
      data: allUsers,
    });
  },

  listarUno: async (req, res) => {
    const { id } = req.params;
    try {
      const rta = await findRegister("User", id);
      rta
        ? res.status(200).json({ data: rta })
        : res.status(401).json({ message: "Registro no encontrado" });
    } catch (error) {
      console.log(error);
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
  editar: (req, res) => {},
  borrar: (req, res) => {},
};
export default usuario;
