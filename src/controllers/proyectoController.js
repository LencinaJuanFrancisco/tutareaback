import { validateIdParamas } from '../helpers/validateIdParamas.js'
import Proyect from '../Schemas/Proyect.js'
 const proyecto = {
    listarTodos:async(req,res)=>{
        try {
            const allProyect = await Proyect.find().populate("task")
                                                   .populate('collaborator',"name email")

            allProyect.length > 0 ? res.status(200).json({message:"Totos los proyectos",data: allProyect})
                                  : res.status(401).json({message:"Ahun no hay proyectos"})   
        } catch (error) {
            return res.status(400).json(error.message)
        }
    },
    listarUno:async(req,res)=>{
        const {id}= req.params
        try {
            if (validateIdParamas(id)) {
                const oneProyect = await Proyect.findById(id).populate("task")
                                                             .populate('collaborator',"name email")

                 return oneProyect ? res.status(200).json({ message: "Listado", data: oneProyect })
                                : res.status(200).json({ message: "Proyecto no encontrado" })
            }
            return res.status(401).json({message:"formato de ID no valido"})
        } catch (error) {
            
        }
    },
    crear:async(req,res)=>{
        const newProyect =new Proyect(req.body)
        newProyect.createUser = req.uid
        try {
            const saveProyect = await newProyect.save()
            return res.status(200).json({message:"Proyecto Creado",data:saveProyect})
        } catch (error) {
            return res.status(401).json({message:"error al crear el proyect",error: error.message})
        }
    
    },
    editar:async(req,res)=>{},
    borrar:async(req,res)=>{},
    agregarTarea:async(req,res)=>{},
    agregarColaborador:async(req,res)=>{},
    eliminarColaborador:async(req,res)=>{},

}
 export default proyecto