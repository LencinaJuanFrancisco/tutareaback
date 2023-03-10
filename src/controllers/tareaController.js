import { Task } from '../Schemas/Task.js'
import Proyect  from '../Schemas/Proyect.js'

import { validateIdParamas } from '../helpers/validateIdParamas.js'
<<<<<<< HEAD

=======
>>>>>>> 1bdefd5a382cbf69602eb3b10b0185f2f851fad9

const tarea = {
    listarTodos: async (req, res) => {
        try {
            const rta = await Task.find().populate({path: "userCreateTask", select:"name email id"})
            res.status(200).json({status:200, message: "Todas las Tareas", data: rta })
        } catch (error) {
           // console.log("pase por aca", error)
            res.status(400).json(error.message)
        }

    },
    listarUno: async (req, res) => {
        try {
            const { id } = req.params;
            if (validateIdParamas(id)) {
                const allTask = await Task.findById(id).populate("userCreateTask");
                return allTask ? res.status(200).json({status:200, message: "Listado", data: allTask })
                               : res.status(401).json({ message: "Aun no hay registros de Tareas" })
            }
          return  res.status(401).json({message:"Formato id Incorrecto"})
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    crear: async (req, res) => {

        const data = req.body
        const userId = req.uid 
        const {id} = req.params //id del proyecto
       
        try {
            if (!validateIdParamas(id)) {
                return  res.status(401).json({message:"Formato id Incorrecto"})
                
            }
            const newData = ({ ...data, userCreateTask: userId,proyect:id})
            const newTask = new Task(newData);        
            const saveTask = await newTask.save();
            
            //await newTask.dateEnd(aaaammdd(newTask.dateEnd)).save()
            const findProyect = await Proyect.findById(id)
            if (findProyect === null) {
                return res.status(401).json({message:"Proyecto no encontrado"})    
            }

            //agrego la tarea al proyecto
            findProyect.task.push(saveTask.id)
            await findProyect.save()

            return res.status(200).json({
                status:200,
                message: "tarea creada",
                data: saveTask,
            });
        } catch (error) {
            console.log("pase por aca", error)
            return res.status(400).json({ message: error.message });
        }
    },

    editar: async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        try {
            if (validateIdParamas(id)) {
                const upDateTask = await Task.findByIdAndUpdate(id, body, {
                    new: true,
                });

                if (upDateTask != null) {
                    return res.status(200).json({status:200, message: "Editado", data: upDateTask })

                }
                return res.status(401).json({ message: "Usuario no encontrado" });
            }
            return res.status(400).json({ message: "Formato del ID no valido" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    borrar: async (req, res) => {
        const { id } = req.params
        try {
            if (validateIdParamas(id)) {
                const rta = await Task.findByIdAndDelete(id)
                if (rta) return res.status(200).json({status:200, message: `Tarea con ID ${id} fue eliminado` })
                return res.status(401).json({ message: "Tarea no encontrado" })
            }
            return res.status(400).json({ message: "Formato del ID no valido" })
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    cambioEstado:async(req,res)=>{
        const {id}= req.params //id de la tarea
        try {
            if (!validateIdParamas(id)) return res.status(400).json({ message: "Formato del ID no valido" })
            
            const findTask = await Task.findById(id)

            if (findTask === null)   return res.status(401).json({ message: "Tarea no encontrado" })
            
            findTask.state = !findTask.state // modifico el estado a su contrario. si esta false lo pasa a true
            findTask.userStatusChange = req.uid //agrego el id del usuario que cambio el estado de la tarea

            await findTask.save()
            return res.status(200).json({status:200, message:"Estado modificado",data:findTask })
            
        } catch (error) {
            return res.status(400).json({ message:"error en el controlerTask metodo estado",error: error.message });
        }
        
    }
}
export default tarea