import Proyect from "../Schemas/Proyect.js";
import { Task } from "../Schemas/Task.js";

export async function taskDue(tasks) {
 // console.log("entre a taskDue 😪 😪 😪 😪",tasks);
  try {
   
    const now = new Date();

    const yearNow = parseInt(now.getFullYear());
    const monthNow = parseInt(now.getMonth()+1);
    const dayNow = parseInt(now.getDate());

    let hoy = new Date(yearNow, monthNow, dayNow);
    console.log(yearNow,monthNow,dayNow,"Fecha de hoy  ",hoy);
  
    //itero en el array de tareas para calcular la fecha de vto de la entrega
    const buscarTareas = tasks.filter(t => {
      
      const fechaFinal = t.dateEnd;
    //   console.log("que mierda es findTask --- 🚀 🚀 🚀 🚀 🚀 ", findTask);
      console.log("que mierda es findTask.dateEnd --- 🚀 🚀 🚀 🚀 🚀 ", t.dateEnd);
     
      const anioF = fechaFinal.getFullYear();
      const mesF = fechaFinal.getMonth()+1; //los meses se cuentan de 0 al 11 , por ese motivo hay que sumarle uno a la fecha para poder igualar
      const diaF = fechaFinal.getDate();
  
      const fin = new Date(anioF,mesF,diaF)
      console.log("fin - hoy  🎉 🎉 🎉 🎉 🎉 ",(((fin-hoy)/1000)));
       
      const calculateDay = diaF - dayNow
      console.log(anioF,mesF,diaF,"diferencia de dias ", calculateDay <= 2 , calculateDay);
      return  ((anioF === yearNow && mesF === monthNow && calculateDay <= 2)===true )

       
    });
   
    return buscarTareas;
  } catch (error) {
    console.log("Error en la funcion taskDue 🔥 🔥 🔥 🔥 🔥", error.message);
    return json({ message: "Error en la funcion taskDue" });
  }
}
