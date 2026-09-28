import Joi from "joi";

export const registerSchema = Joi.object({
    nombre: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.min": "El nombre debe tener al menos 2 caracteres",
            "any.required": "El nombre es obligatorio"
        }),

    apellido: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.min": "El apellido debe tener al menos 2 caracteres",
            "any.required": "El apellido es obligatorio"
        }),

    correo: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "El correo no tiene un formato válido",
            "any.required": "El correo es obligatorio"
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "La contraseña debe tener al menos 6 caracteres",
            "any.required": "La contraseña es obligatoria"
        }),

    telefono: Joi.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .required()
        .messages({
            "string.pattern.base": "El teléfono solo debe contener números",
            "string.min": "El teléfono debe tener al menos 10 dígitos",
            "any.required": "El teléfono es obligatorio"
        }),

    id_rol: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "El rol es obligatorio",
            "number.min": "El rol debe ser válido",
            "any.required": "El rol es obligatorio"
        })
});

export const loginSchema = Joi.object({
    correo: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "El correo no tiene un formato válido",
            "any.required": "El correo es obligatorio"
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "La contraseña debe tener al menos 6 caracteres",
            "any.required": "La contraseña es obligatoria"
        })
});