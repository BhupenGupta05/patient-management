const {body, validationResult} = require('express-validator')

const validatePatient = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('dob').notEmpty().isISO8601().withMessage('Valid date of birth is required'),
    body('phoneNumber').notEmpty().isMobilePhone().withMessage('Valid phone number is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('occupation').notEmpty().withMessage('Occupation is required'),
    body('physician').notEmpty().withMessage('Physician is required'),
    body('identificationType').notEmpty().withMessage('Identification type is required'),
    body('identificationNumber').notEmpty().withMessage('Identification number is required'),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          next();
    }
]

module.exports = { validatePatient };