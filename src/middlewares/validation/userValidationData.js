import {validationResult,check} from 'express-validator'

export const userValidationData = [
    check('name')
        .notEmpty().withMessage('El campo NOMBRE no puede estar vacio')
        .isLength({min:3}).withMessage('El nombre debe contener al menos 3 caracteres')
        .isLength({max:40}).withMessage('El nombre no puede exceder los 40 caracteres'),
    check('email')
        .notEmpty().withMessage('El campo E-MAIL no puede estar vacio')
        .isEmail().withMessage('Debe ingresar un correo electrónico válido'),
    check('password')
        .notEmpty().withMessage('El campo PASSWORD no puede estar vacio')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
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