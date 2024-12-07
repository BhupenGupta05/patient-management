require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginAdmin = async (req, res) => {
    const { passcode } = req.body
    

    // CHECK IF PASSWORD IS EMPTY
    if(!passcode) {
        return res.status(400).json({message: 'Passcode is required'})
    }

    // COMPARE ENTERED PASSCODE WITH HASHED PASSWORD
    try {
        const isValid = await bcrypt.compare(passcode, process.env.ADMIN_PASSCODE_HASH)

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid passcode' });
        }

        // CREATE A JWT TOKEN
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
}

module.exports = { loginAdmin }