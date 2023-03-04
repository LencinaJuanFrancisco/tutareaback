import Proyect from "../Schemas/Proyect.js";
import { Task } from "../Schemas/Task.js";

export async function taskDue(idProyect) {
  console.log("entre a taskDue 😪 😪 😪 😪");
  try {
    const findProyect = await Proyect.findById(idProyect);
    const now = new Date();

    const yearNow = parseInt(now.getFullYear());
    const monthNow = parseInt(now.getMonth()+1);
    const dayNow = parseInt(now.getDate());

    console.log(yearNow,monthNow,dayNow,"Fecha de hoy  ");
    // let hoy = new Date(yearNow, monthNow, dayNow);
    //verifico so hay tareas
    if (findProyect.task.length <= 0) {
      return json({ message: "proyecto sin tar" });
    }
    //itero en el array de tareas para calcular la fecha de vto de la entrega
    const buscarTareas = findProyect.task.filter(async (t) => {
      
        const findTask = await Task.findById(t);

      const fechaFinal = findTask.dateEnd;
      console.log("que mierda es findTask --- 🚀 🚀 🚀 🚀 🚀 ", findTask);
      console.log("que mierda es findTask.dateEnd --- 🚀 🚀 🚀 🚀 🚀 ", findTask.dateEnd);
     
      const anioF = fechaFinal.getFullYear();
      const mesF = fechaFinal.getMonth()+1; //los meses se cuentan de 0 al 11 , por ese motivo hay que sumarle uno a la fecha para poder igualar
      const diaF = fechaFinal.getDate();
  
       
      const calculateDay = diaF - dayNow
      console.log(anioF,mesF,diaF,"diferencia de dias ", calculateDay <= 2 , calculateDay);
     if  ((anioF === yearNow && mesF === monthNow && calculateDay <= 2) === true){
        return findTask
     };
       
    });
    console.log("buscarTareas **** 😡 😡 😡",buscarTareas);
    return buscarTareas;
  } catch (error) {
    console.log("Error en la funcion taskDue 🔥 🔥 🔥 🔥 🔥", error.message);
    return json({ message: "Error en la funcion taskDue" });
  }
}
