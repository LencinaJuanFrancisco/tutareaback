import { taskDue } from "../helpers/taskDue.js";
import { validateIdParamas } from "../helpers/validateIdParamas.js";
import {Proyect} from "../Schemas/Proyect.js";
import { User } from "../Schemas/Users.js";

const proyecto = {
  listarTodos: async (req, res) => {
    try {
      const allProyect = await Proyect.find()
        .populate("task", "-createdAt -updatedAt")
        .populate("collaborator", "name email")
        .populate({ path: "createUser", select: "name" });

      allProyect.length > 0
        ? res
            .status(200)
            .json({status:200, message: "Totos los proyectos", data: allProyect })
        : res.status(401).json({ message: "Ahun no hay proyectos" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
  listarUno: async (req, res) => {
    const { id } = req.params;
    try {
      if (validateIdParamas(id)) {
        const oneProyect = await Proyect.findById(id)
          .populate("task", "-createdAt -updatedAt")
          .populate("collaborator", "name email")
          .populate({path: "task", populate: {path: "userStatusChange", select: "name"}});
          
        if (oneProyect) {
          if (oneProyect.task.length >= 0) {
            //busco si hay tareas por vencer
            const findTaskDue = await taskDue(oneProyect.task);
            return res.status(200).json({
              status:200,
              message: "Listado", 
              data: oneProyect,
              taskDue: findTaskDue,
            });
          }
          return res.status(200).json({status:200, message: "Listado", data: oneProyect });
        }
        return res.status(401).json({ message: "Proyecto no encontrado 👽" });
      }

      return res.status(401).json({ message: "formato de ID no valido" });
    } catch (error) {}
  },
  crear: async (req, res) => {
    const newProyect = new Proyect(req.body);
    newProyect.createUser = req.uid;
    try {
      const saveProyect = await newProyect.save();
      return res
        .status(200)
        .json({status:200, message: "Proyecto Creado", data: saveProyect });
    } catch (error) {
      return res
        .status(401)
        .json({ message: "error al crear el proyect", error: error.message });
    }
  },
  editar: async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      if (validateIdParamas(id)) {
        const rta = await Proyect.findById(id);
        if (rta) {
          //verifico si el usuario logueado es el mismo que creo el proyecto
          //ya que solo el creador del proyecto puede mosdificarlo
          // console.log("req.uid--->",req.uid.toString());
          // console.log("rta.createUser********>",rta.createUser.toString());
          if (rta.createUser.toString() === req.uid.toString()) {
            // console.log("entre a la igualdad y se puede editar");
            const upDateProyect = await Proyect.findByIdAndUpdate(id, data, {
              new: true,
            });
            return res
              .status(200)
              .json({status:200, message: "Proyecto Editado", data: upDateProyect });
          }
        }
        return res.status(401).json({ message: "Proyecto no encontrado" });
      }
      return res.status(401).json({ message: "Formato ID incorrecto" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "cual puta es el error", error: error.message });
    }
  },
  borrar: async (req, res) => {
    const { id } = req.params;
    try {
      if (validateIdParamas(id)) {
        const findProyect = await Proyect.findById(id);
        if (findProyect) {
          if (findProyect.createUser.toString() === req.uid.toString()) {
            const rtaDelete = await Proyect.findByIdAndDelete(id);
            if (rtaDelete) {
              return res
                .status(200)
                .json({status:200, message: `El proyectocon ID "${id}" fue eliminado` });
            }
            return res
              .status(401)
              .json({ message: "El proyecto no pudo ser eliminado" });
          }
          return res.status(401).json({
            message:
              "Solo el creador del proyecto puedo Eliminar este registro",
          });
        }
        return res.status(401).json({ message: "Proyecto no encontrado" });
      }
      return res.status(401).json({ message: "Formato ID incorrecto" });
    } catch (error) {
      return res.status(401).json({
        message: "error en controlerProyect Borrar",
        error: error.message,
      });
    }
  },
  agregarColaborador: async (req, res) => {
    const { id } = req.params; //id del proyecto
    const dataUser = req.body; //data usuario a agragar
    //console.log("dataUser 🔥🔥🔥🔥--->",dataUser.collaborator);
    try {
      //valido el id
      if (validateIdParamas(id)) {
        //busco proyecto
        const findProyect = await Proyect.findById(id);
        if (findProyect) {
          //busco usuario
          const findUser = await User.findById(dataUser.collaborator);
          // console.log("dataUser ID 👽👽👽👽--->",dataUser.id);
          if (findUser) {
            //verifico que el usuario a agragr no sea el creador del proyecto
            if (findUser.id.toString() !== findProyect.createUser.toString()) {
              //verifico que ya no este como colaborador
              if (!findProyect.collaborator.includes(findUser.id)) {
                //agregamos al colaborador
                findProyect.collaborator.push(findUser.id);
                const updateCollaborato = await findProyect.save();
                if (updateCollaborato !== null) {
                  return res.status(200).json({
                    status:200,
                    message: "Colaborador agragado",
                    data: updateCollaborato,
                  });
                }
                return res
                  .status(401)
                  .json({ message: "no se puedo agregar colaborador" });
              }
              return res.status(401).json({
                message:
                  "El colaborador que desea agragar , ya es parte del proyecto!!!",
              });
            }
            return res.status(401).json({
              message:
                "No se puede agragar colaborador.Es el mismo Creador del Proyecto",
            });
          }
          return res.status(401).json({ message: "Usuario no encontrado" });
        }
        return res.status(401).json({ message: "Proyecto no encontrado" });
      }
      return res.status(401).json({ message: "Formato ID incorrecto" });
    } catch (error) {
      return res.status(401).json({
        message: "error en controlerProyect AgregarColaborador",
        error: error.message,
      });
    }
  },
  eliminarColaborador: async (req, res) => {
    const { id } = req.params; // id del proyecto
    const data = req.body; // data del colaborador a eliminar
    //console.log("xq no viene nada aca",data);
    try {
      if (validateIdParamas(id)) {
        const findProyect = await Proyect.findById(id);
        //Busco el proyecto
        if (findProyect) {
          // busco verifico si el administrador del proyecto es el que desea eliminar un colaborador
          if (findProyect.createUser.toString() === req.uid.toString()) {
            if (findProyect.collaborator.includes(data.id)) {
              findProyect.collaborator.pull(data.id);
              await findProyect.save();
              return res.status(200).json({
                status:200,
                message: "el colaborador a sido eliminado del proyecto",
              });
            }
            return res.status(401).json({
              message:
                "el colaborador que desea eliminar , no es parte del proyecto",
            });
          }
          return res.status(401).json({
            message:
              "solo el administrador del proyecto puede eliminar colaborador",
          });
        }
        return res.status(401).json({ message: "Proyecto no encontrado" });
      }
      return res.status(401).json({ message: "Formato ID incorrecto" });
    } catch (error) {
      return res.status(401).json({
        message: "error en controlerProyect eliminarColaborador",
        error: error.message,
      });
    }
  },
};
export default proyecto;
