import {Task} from './../Schemas/Task.js'
const tarea = {
    listarTodos: (req, res) => { },
    buscar: (req, res) => {
        console.log("con facu")
    },
    crear: async (req, res) => {
        console.log("pase por aca", req.body)
        const data = req.body;
        try {
            const newTask = new Task(data);
            const saveTask = await newTask.save();

            return res.status(200).json({
                message: "tarea creada",
                data: saveTask,
            });
        } catch (error) {
            console.log("pase por aca", req.body)
            return res.status(400).json({ message: error.message });
        }
    },

    editar: (req, res) => { },
    borrar: (req, res) => { }
}
export default tarea