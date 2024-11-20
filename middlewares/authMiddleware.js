const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store the decoded user information in the request object
        next(); // Call next middleware or controller
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
}

module.exports = verifyToken;
