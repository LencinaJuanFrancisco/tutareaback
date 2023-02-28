import { Task } from '../Schemas/Task.js'
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
    buscar: (req, res) => {
        console.log("con facu")
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

    editar: (req, res) => { },
    borrar: (req, res) => { }
}
export default tarea