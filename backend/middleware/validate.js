const { check, body, validationResult } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'usuario': {
      return [
        body('nombre', 'El nombre es obligatorio').exists(),
        body('email', 'El email es obligatorio y debe ser válido').isEmail(),
        body('password', 'La contraseña es obligatoria y debe tener al menos 6 caracteres').isLength({ min: 6 }),
      ];
    }
    case 'login': {
      return [
        body('email', 'El email es obligatorio y debe ser válido').isEmail(),
        body('password', 'La contraseña es obligatoria').exists(),
      ];
    }
    default:
      return [];
  }
};

module.exports = validate;