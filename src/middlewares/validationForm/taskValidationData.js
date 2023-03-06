import {validationResult,check} from 'express-validator'

export const taskValidation = [
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
    check('state')
        .isBoolean().withMessage('El campo estado debe ser TRUE or FALSE'),
    check('priority')
        .trim()
        .notEmpty().withMessage('El campo Prioridad no puede estar vacio')
        .isIn(['Baja','Media','Alta']).withMessage('La priorido solo puede ser "Baja,Media,Alta"'),
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


