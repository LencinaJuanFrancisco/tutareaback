import {validationResult,check} from 'express-validator'

export const ProyectValidation = [
    check('name')
        .trim()
        .notEmpty().withMessage('El campo NOMBRE no puede estar vacio')
        .isLength({min:3}).withMessage('El nombre debe contener al menos 3 caracteres')
        .isLength({max:40}).withMessage('El nombre no puede exceder los 40 caracteres'),
    check('descripcion')
        .trim()
        .notEmpty().withMessage('El campo Descripción no puede estar vacio')
        .isLength({min:3}).withMessage('La descripción debe contener al menos 3 caracteres')
        .isLength({max:250}).withMessage('La descripción no puede exceder los 250 caracteres'),
        
    check('dateEnd')
        .trim()
        .notEmpty().withMessage('El campo Fecha de entrega no puede estar vacio')
        .toDate(),
    check('customer')
        .trim()
        .notEmpty().withMessage('El campo Cliente no puede estar vacio')
        .isLength({min:3}).withMessage('El campo Cliente debe contener al menos 3 caracteres')
        .isLength({max:100}).withMessage('El campo Cliente no puede exceder los 100 caracteres'),
        
    (req,res,next)=>{
        try {
            validationResult(req).throw()
            return next()
        } catch (error) {
            res.status(403).json({
                message: error.array()
              })
        }
    }
]


