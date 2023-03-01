import { Task } from '../Schemas/Task.js'
import { validateIdParamas } from '../helpers/validateIdParamas.js'

const tarea = {
    listarTodos: async (req, res) => {
        try {
            const rta = await Task.find().populate("userCreateTask", null, null, { strictPopulate: false })
            res.status(200).json({ message: "Todas las Tareas", data: rta })
        } catch (error) {
            console.log("pase por aca", error)
            res.status(400).json(error.message)
        }

    },
    listarUno: async (req, res) => {
        try {
            const { id } = req.params;
            if (validateIdParamas(id)) {
                const allTask = await Task.findById(id);
            return allTask ? res.status(200).json({ message: "Listado", data: allTask })
                    : res.status(200).json({ message: "Aun no hay registros de Tareas" })
            }
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    crear: async (req, res) => {
        const data = req.body
        const userId = { _id: "63fd185b3762f1898bc445bd" }
        const newData = ({ ...data, userCreateTask: userId })
        console.log("newData", newData)
        try {
            const newTask = new Task(newData);
            const saveTask = await newTask.save();

            return res.status(200).json({
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
                    return res.status(200).json({ message: "Editado", data: upDateTask })

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
                if (rta) return res.status(200).json({ message: `Tarea con ID ${id} fue eliminado` })
                return res.status(401).json({ message: "Tarea no encontrado" })
            }
            return res.status(400).json({ message: "Formato del ID no valido" })
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
}
export default tarea