export const validateDateToTask=(taskDateEnd,proyectDateEnd)=>{
    

    const now = new Date();
     
     if (taskDateEnd > proyectDateEnd || taskDateEnd < now ) {
        return true
     }
    
}