export function validateIdParamas(paramsId){
   // utiulizo expreciones regulares para definir el formato de ID de Mongo , para validar el ID enviado por parametro
   
   if ( !paramsId.match(/^[0-9a-fA-F]{24}$/)  ) {
    console.log("longitud del paramsId",paramsId.length);
    return false
   }
   return true
}